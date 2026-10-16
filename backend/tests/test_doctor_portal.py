import unittest
import os
from unittest.mock import patch

from fastapi import FastAPI, HTTPException
from fastapi.testclient import TestClient
from pydantic import ValidationError

from app.models.consultation import Consultation
from app.models.doctor import Doctor
from app.models.health_tracking import HealthTracking
from app.models.menstrual_model import MenstrualCycle
from app.models.mental_wellness import MentalWellnessAssessment
from app.models.notification_model import Notification
from app.models.pmo_assessment import PMOSAssessment
from app.models.pregnancy import PregnancyRecord
from app.models.user import User
from app.routes import auth as auth_routes
from app.routes import consultation as consultation_routes
from app.routes import doctor as doctor_routes
from app.routes import health_tracking as health_tracking_routes
from app.routes import mental_wellness as mental_wellness_routes
from app.schemas.consultation_schema import (
    ConsultationNotesUpdate,
    ConsultationStatusUpdate,
)
from app.schemas.doctor_schema import DoctorRegister
from app.schemas.health_tracking_schema import HealthTrackingCreate
from app.schemas.user_schema import UserLogin, UserRegister
from app.utils.auth_dependency import (
    get_current_user,
    get_current_doctor,
    get_current_patient,
    get_db as auth_get_db,
)
from app.utils.jwt import (
    _get_secret_key,
    create_access_token,
    verify_access_token,
)


class FakeQuery:
    def __init__(self, first_result=None, rows=None):
        self.first_result = first_result
        self.rows = rows or []

    def filter(self, *args):
        return self

    def join(self, *args):
        return self

    def order_by(self, *args):
        return self

    def first(self):
        return self.first_result

    def all(self):
        return self.rows


class FakeSession:
    def __init__(
        self,
        doctor,
        consultation,
        patient=None,
        patient_name="Patient Example",
    ):
        self.doctor = doctor
        self.consultation = consultation
        self.patient = patient
        self.patient_name = patient_name
        self.notifications = []

    def query(self, model, *entities):
        if model is Doctor:
            return FakeQuery(first_result=self.doctor)
        if model is User:
            return FakeQuery(first_result=self.patient)
        if model is Consultation and entities:
            return FakeQuery(
                rows=[(self.consultation, self.patient_name)]
            )
        if model is Consultation:
            return FakeQuery(first_result=self.consultation)
        raise AssertionError(f"Unexpected query model: {model}")

    def add(self, item):
        if isinstance(item, Notification):
            self.notifications.append(item)

    def commit(self):
        pass

    def refresh(self, item):
        pass


class ReportQuery:
    def __init__(self, rows, filters_by_model, model):
        self.rows = rows
        self.filters_by_model = filters_by_model
        self.model = model

    def filter(self, *conditions):
        self.filters_by_model.setdefault(self.model, []).extend(conditions)
        self.rows = [
            row
            for row in self.rows
            if all(
                getattr(row, condition.left.key, None)
                == condition.right.value
                for condition in conditions
            )
        ]
        return self

    def order_by(self, *args):
        return self

    def first(self):
        return self.rows[0] if self.rows else None

    def all(self):
        return self.rows


class PatientReportSession:
    def __init__(self, doctor, consultation, patient):
        self.doctor = doctor
        self.consultation = consultation
        self.patient = patient
        self.filters_by_model = {}

    def query(self, model, *entities):
        rows_by_model = {
            Consultation: [self.consultation],
            User: [self.patient],
            HealthTracking: [],
            MenstrualCycle: [],
            PregnancyRecord: [],
            MentalWellnessAssessment: [],
            PMOSAssessment: [],
        }
        return ReportQuery(
            rows_by_model.get(model, []),
            self.filters_by_model,
            model,
        )


class DoctorPortalTests(unittest.TestCase):
    def setUp(self):
        self.doctor = Doctor(
            id=7,
            full_name="Dr. Example",
            email="doctor@example.com",
            password="hashed-password",
            specialization="Gynecology",
        )
        self.patient = User(
            id=7,
            full_name="Patient Example",
            email="patient@example.com",
            password="hashed-password",
        )
        self.consultation = Consultation(
            id=12,
            user_id=3,
            doctor_id=7,
            reason="Consultation request",
            status="Pending",
        )
        self.db = FakeSession(
            self.doctor,
            self.consultation,
            patient=self.patient,
        )

    def test_role_dependencies_reject_the_other_account_type(self):
        with self.assertRaises(HTTPException) as patient_error:
            get_current_patient(self.doctor)
        with self.assertRaises(HTTPException) as doctor_error:
            get_current_doctor(self.patient)

        self.assertEqual(patient_error.exception.status_code, 403)
        self.assertEqual(doctor_error.exception.status_code, 403)
        self.assertIs(get_current_patient(self.patient), self.patient)
        self.assertIs(get_current_doctor(self.doctor), self.doctor)

    def test_http_routes_enforce_roles_without_mysql(self):
        app = FastAPI()
        app.include_router(consultation_routes.router)
        app.include_router(health_tracking_routes.router)
        app.dependency_overrides[consultation_routes.get_db] = lambda: self.db
        app.dependency_overrides[health_tracking_routes.get_db] = lambda: self.db

        app.dependency_overrides[get_current_user] = lambda: self.patient
        with TestClient(app) as client:
            patient_response = client.get("/consultation/doctor-requests")

        self.assertEqual(patient_response.status_code, 403)

        app.dependency_overrides[get_current_user] = lambda: self.doctor
        with TestClient(app) as client:
            doctor_response = client.get("/consultation/doctor-requests")
            patient_data_response = client.get("/health/tracking")

        self.assertEqual(doctor_response.status_code, 200)
        self.assertEqual(
            doctor_response.json()[0]["patient_name"],
            "Patient Example",
        )
        self.assertEqual(patient_data_response.status_code, 403)

    def test_registration_rejects_email_used_by_the_other_role(self):
        doctor_db = FakeSession(
            doctor=None,
            consultation=None,
            patient=self.patient,
        )
        patient_db = FakeSession(
            doctor=self.doctor,
            consultation=None,
            patient=None,
        )

        with self.assertRaises(HTTPException) as doctor_error:
            doctor_routes.register_doctor(
                DoctorRegister(
                    full_name="Dr. New",
                    email=self.patient.email,
                    password="new-password",
                    specialization="Gynecology",
                ),
                doctor_db,
            )

        with self.assertRaises(HTTPException) as patient_error:
            auth_routes.register(
                UserRegister(
                    full_name="New Patient",
                    email=self.doctor.email,
                    password="new-password",
                    age=30,
                    language="English",
                    life_stage="Adult",
                ),
                patient_db,
            )

        self.assertEqual(doctor_error.exception.status_code, 400)
        self.assertEqual(patient_error.exception.status_code, 400)

    def test_shared_login_rejects_ambiguous_legacy_credentials(self):
        self.doctor.email = self.patient.email
        login_data = UserLogin(
            email=self.patient.email,
            password="shared-password",
        )
        self.patient.password = "shared-password"
        self.doctor.password = "shared-password"

        with patch(
            "app.routes.auth.verify_password",
            side_effect=lambda password, stored: password == stored,
        ):
            with self.assertRaises(HTTPException) as error:
                auth_routes.login(login_data, self.db)

        self.assertEqual(error.exception.status_code, 409)

        self.doctor.password = "doctor-password"
        doctor_login = UserLogin(
            email=self.patient.email,
            password="doctor-password",
        )
        with (
            patch(
                "app.routes.auth.verify_password",
                side_effect=lambda password, stored: password == stored,
            ),
            patch(
                "app.routes.auth.create_access_token",
                return_value="test-token",
            ),
        ):
            response = auth_routes.login(doctor_login, self.db)

        self.assertEqual(response["role"], "doctor")

    def test_jwt_requires_a_configured_key_and_uses_runtime_value(self):
        with patch.dict(os.environ, {"JWT_SECRET_KEY": "test-only-key"}):
            self.assertEqual(_get_secret_key(), "test-only-key")
            token = create_access_token({"sub": "test-user"})
            self.assertEqual(
                verify_access_token(token)["sub"],
                "test-user",
            )

        with patch.dict(os.environ, {}, clear=True):
            with self.assertRaisesRegex(RuntimeError, "JWT_SECRET_KEY"):
                create_access_token({"sub": "test-user"})

    def test_auth_token_and_login_share_ambiguous_account_handling(self):
        self.doctor.email = self.patient.email
        self.patient.password = "shared-password"
        self.doctor.password = "shared-password"

        app = FastAPI()
        app.include_router(auth_routes.router)
        app.dependency_overrides[auth_routes.get_db] = lambda: self.db

        with (
            patch(
                "app.routes.auth.verify_password",
                side_effect=lambda password, stored: password == stored,
            ),
            TestClient(app) as client,
        ):
            login_response = client.post(
                "/auth/login",
                json={
                    "email": self.patient.email,
                    "password": "shared-password",
                },
            )
            token_response = client.post(
                "/auth/token",
                data={
                    "username": self.patient.email,
                    "password": "shared-password",
                },
            )

        self.assertEqual(login_response.status_code, 409)
        self.assertEqual(token_response.status_code, 409)

    def test_auth_login_and_token_preserve_valid_account_roles(self):
        self.patient.password = "patient-password"
        self.doctor.password = "doctor-password"

        app = FastAPI()
        app.include_router(auth_routes.router)
        app.dependency_overrides[auth_routes.get_db] = lambda: self.db

        with (
            patch(
                "app.routes.auth.verify_password",
                side_effect=lambda password, stored: password == stored,
            ),
            patch(
                "app.routes.auth.create_access_token",
                return_value="test-token",
            ),
            TestClient(app) as client,
        ):
            patient_response = client.post(
                "/auth/login",
                json={
                    "email": self.patient.email,
                    "password": "patient-password",
                },
            )
            doctor_response = client.post(
                "/auth/token",
                data={
                    "username": self.doctor.email,
                    "password": "doctor-password",
                },
            )

        self.assertEqual(patient_response.status_code, 200)
        self.assertEqual(patient_response.json()["role"], "patient")
        self.assertEqual(doctor_response.status_code, 200)
        self.assertEqual(doctor_response.json()["role"], "doctor")

    def test_auth_token_reports_missing_jwt_configuration(self):
        self.patient.password = "patient-password"
        app = FastAPI()
        app.include_router(auth_routes.router)
        app.dependency_overrides[auth_routes.get_db] = lambda: self.db

        with (
            patch(
                "app.routes.auth.verify_password",
                side_effect=lambda password, stored: password == stored,
            ),
            patch(
                "app.routes.auth.create_access_token",
                side_effect=RuntimeError(
                    "JWT_SECRET_KEY must be set in the runtime environment "
                    "or backend/.env"
                ),
            ),
            TestClient(app) as client,
        ):
            response = client.post(
                "/auth/token",
                data={
                    "username": self.patient.email,
                    "password": "patient-password",
                },
            )

        self.assertEqual(response.status_code, 503)
        self.assertIn("JWT_SECRET_KEY", response.json()["detail"])

    def test_health_tracking_bounds_match_frontend_controls(self):
        HealthTrackingCreate(cycle_day=1, mood=1, sleep_hours=0)
        HealthTrackingCreate(cycle_day=45, mood=5, sleep_hours=24)
        HealthTrackingCreate(cycle_day=12, mood=3, sleep_hours=7.5)

        invalid_values = [
            {"cycle_day": 0},
            {"cycle_day": 46},
            {"mood": 0},
            {"mood": 6},
            {"sleep_hours": -0.1},
            {"sleep_hours": 24.1},
            {"sleep_hours": 7.3},
        ]

        for values in invalid_values:
            with self.subTest(values=values):
                with self.assertRaises(ValidationError):
                    HealthTrackingCreate(**values)

    def test_health_and_questionnaire_routes_reject_out_of_range_values(self):
        app = FastAPI()
        app.include_router(health_tracking_routes.router)
        app.include_router(mental_wellness_routes.router)
        app.dependency_overrides[health_tracking_routes.get_db] = lambda: self.db
        app.dependency_overrides[mental_wellness_routes.get_db] = lambda: self.db
        app.dependency_overrides[get_current_patient] = lambda: self.patient

        with TestClient(app) as client:
            valid_health = client.post(
                "/health/tracking",
                json={"cycle_day": 45, "mood": 5, "sleep_hours": 24},
            )
            invalid_health = client.post(
                "/health/tracking",
                json={"cycle_day": 46, "mood": 6, "sleep_hours": 24.1},
            )
            valid_assessment = client.post(
                "/mental-wellness/assessment?assessment_type=PHQ9",
                json=[0, 1, 2, 3, 0, 1, 2, 3, 0],
            )
            invalid_assessment = client.post(
                "/mental-wellness/assessment?assessment_type=PHQ9",
                json=[0, 1, 2, 3, 0, 1, 2, 3, 4],
            )

        self.assertEqual(valid_health.status_code, 200)
        self.assertEqual(invalid_health.status_code, 422)
        self.assertEqual(valid_assessment.status_code, 200)
        self.assertEqual(invalid_assessment.status_code, 422)

    def test_doctor_request_includes_patient_name(self):
        requests = consultation_routes.doctor_requests(
            self.db,
            self.doctor,
        )

        self.assertEqual(requests[0]["patient_name"], "Patient Example")
        self.assertEqual(requests[0]["user_id"], 3)

    def test_patient_report_requires_doctor_role_and_assigned_consultation(self):
        report_patient = User(
            id=3,
            full_name="Report Patient",
            email="report-patient@example.com",
            password="unused",
        )
        report_db = PatientReportSession(
            self.doctor,
            self.consultation,
            report_patient,
        )
        app = FastAPI()
        app.include_router(consultation_routes.router)
        app.dependency_overrides[consultation_routes.get_db] = lambda: report_db

        app.dependency_overrides[get_current_user] = lambda: report_patient
        with TestClient(app) as client:
            patient_response = client.get(
                "/consultation/doctor/12/patient-report"
            )
        self.assertEqual(patient_response.status_code, 403)

        other_doctor = Doctor(
            id=99,
            full_name="Dr. Other",
            email="other-doctor@example.com",
            password="unused",
            specialization="Gynecology",
        )
        app.dependency_overrides[get_current_user] = lambda: other_doctor
        with patch.object(
            consultation_routes,
            "build_today_insights",
            return_value={"insights": []},
        ):
            with TestClient(app) as client:
                unauthorized_response = client.get(
                    "/consultation/doctor/12/patient-report"
                )
        self.assertEqual(unauthorized_response.status_code, 404)

        app.dependency_overrides[get_current_user] = lambda: self.doctor
        with patch.object(
            consultation_routes,
            "build_today_insights",
            return_value={"insights": [{"type": "no_data"}]},
        ):
            with TestClient(app) as client:
                response = client.get(
                    "/consultation/doctor/12/patient-report"
                )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["patient"]["id"], report_patient.id)
        self.assertNotIn("email", response.json()["patient"])
        self.assertEqual(response.json()["health_tracking"], [])
        self.assertEqual(response.json()["menstrual_history"], [])
        self.assertEqual(response.json()["pregnancy_history"], [])
        self.assertEqual(response.json()["mental_wellness_history"], [])
        self.assertEqual(response.json()["pmos_history"], [])
        self.assertEqual(
            response.json()["health_insights"]["insights"],
            [{"type": "no_data"}],
        )
        for model in (
            HealthTracking,
            MenstrualCycle,
            PregnancyRecord,
            MentalWellnessAssessment,
            PMOSAssessment,
        ):
            self.assertTrue(
                any(
                    condition.left.key == "user_id"
                    and condition.right.value == report_patient.id
                    for condition in report_db.filters_by_model[model]
                ),
                f"{model.__name__} query must be scoped to the selected patient",
            )

    def test_patient_report_rejects_unauthenticated_requests(self):
        report_db = PatientReportSession(
            self.doctor,
            self.consultation,
            self.patient,
        )
        app = FastAPI()
        app.include_router(consultation_routes.router)
        app.dependency_overrides[consultation_routes.get_db] = lambda: report_db
        app.dependency_overrides[auth_get_db] = lambda: report_db

        with TestClient(app) as client:
            response = client.get(
                "/consultation/doctor/12/patient-report"
            )

        self.assertEqual(response.status_code, 401)

    def test_patient_report_returns_404_for_missing_consultation_or_patient(self):
        app = FastAPI()
        app.include_router(consultation_routes.router)
        app.dependency_overrides[get_current_user] = lambda: self.doctor

        missing_consultation_db = PatientReportSession(
            self.doctor,
            None,
            self.patient,
        )
        app.dependency_overrides[consultation_routes.get_db] = (
            lambda: missing_consultation_db
        )

        with TestClient(app) as client:
            missing_consultation_response = client.get(
                "/consultation/doctor/999/patient-report"
            )

        self.assertEqual(missing_consultation_response.status_code, 404)

        missing_patient_db = PatientReportSession(
            self.doctor,
            self.consultation,
            None,
        )
        app.dependency_overrides[consultation_routes.get_db] = (
            lambda: missing_patient_db
        )

        with TestClient(app) as client:
            missing_patient_response = client.get(
                "/consultation/doctor/12/patient-report"
            )

        self.assertEqual(missing_patient_response.status_code, 404)

    def test_status_changes_follow_the_existing_ui_flow(self):
        consultation_routes.update_status(
            12,
            ConsultationStatusUpdate(status="Accepted"),
            self.db,
            self.doctor,
        )
        self.assertEqual(self.consultation.status, "Accepted")

        consultation_routes.update_status(
            12,
            ConsultationStatusUpdate(status="Completed"),
            self.db,
            self.doctor,
        )
        self.assertEqual(self.consultation.status, "Completed")

        with self.assertRaises(HTTPException) as error:
            consultation_routes.update_status(
                12,
                ConsultationStatusUpdate(status="Pending"),
                self.db,
                self.doctor,
            )

        self.assertEqual(error.exception.status_code, 400)

    def test_notes_notify_only_for_changed_non_empty_text(self):
        notes = ConsultationNotesUpdate(doctor_notes="Follow-up advised")
        consultation_routes.update_notes(12, notes, self.db, self.doctor)
        consultation_routes.update_notes(12, notes, self.db, self.doctor)

        self.assertEqual(len(self.db.notifications), 1)
        self.assertEqual(self.db.notifications[0].user_id, 3)

        consultation_routes.update_notes(
            12,
            ConsultationNotesUpdate(doctor_notes=""),
            self.db,
            self.doctor,
        )
        self.assertEqual(len(self.db.notifications), 1)


if __name__ == "__main__":
    unittest.main()
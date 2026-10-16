import unittest
from datetime import date, datetime, timezone

from fastapi import FastAPI
from fastapi.testclient import TestClient

from app.models.doctor import Doctor
from app.models.health_tracking import HealthTracking
from app.models.pmo_assessment import PMOSAssessment
from app.models.user import User
from app.routes import pmo_history as pmo_history_routes
from app.routes import prediction as prediction_routes
from app.utils.auth_dependency import (
    get_current_user,
    get_db as auth_get_db,
)


class PMOSQuery:
    def __init__(self, rows):
        self.rows = rows

    def filter(self, *conditions):
        for condition in conditions:
            key = condition.left.key
            value = condition.right.value
            self.rows = [
                row for row in self.rows if getattr(row, key) == value
            ]
        return self

    def order_by(self, *expressions):
        if self.rows and expressions:
            key = expressions[0].element.key
            reverse = expressions[0].modifier.__name__ == "desc_op"
            self.rows.sort(
                key=lambda row: getattr(row, key) or datetime.min.replace(
                    tzinfo=timezone.utc
                ),
                reverse=reverse,
            )
        return self

    def first(self):
        return self.rows[0] if self.rows else None

    def all(self):
        return self.rows


class PMOSSession:
    def __init__(self, health_records, assessments=None):
        self.health_records = health_records
        self.assessments = assessments or []
        self.commit_count = 0

    def query(self, model):
        if model is HealthTracking:
            return PMOSQuery(list(self.health_records))
        if model is PMOSAssessment:
            return PMOSQuery(self.assessments)
        raise AssertionError(f"Unexpected query model: {model}")

    def add(self, item):
        if isinstance(item, PMOSAssessment):
            item.id = len(self.assessments) + 1
            item.created_at = datetime.now(timezone.utc)
            self.assessments.append(item)

    def commit(self):
        self.commit_count += 1

    def refresh(self, item):
        pass


class PMOSPredictionTests(unittest.TestCase):
    def setUp(self):
        self.patient = User(
            id=7,
            full_name="Patient",
            email="patient@example.com",
            password="unused",
        )
        self.other_patient = User(
            id=8,
            full_name="Other Patient",
            email="other@example.com",
            password="unused",
        )
        self.health_records = [
            HealthTracking(
                id=1,
                user_id=7,
                mood=2,
                sleep_hours=5,
                activity_level="low",
                cycle_day=25,
                tracking_date=date(2026, 10, 1),
            ),
            HealthTracking(
                id=2,
                user_id=8,
                mood=5,
                sleep_hours=8,
                activity_level="high",
                cycle_day=5,
                tracking_date=date(2026, 10, 2),
            ),
        ]
        self.assessments = [
            PMOSAssessment(
                id=1,
                user_id=7,
                score=30,
                risk_level="Low",
                created_at=datetime(2026, 10, 1, tzinfo=timezone.utc),
            ),
            PMOSAssessment(
                id=2,
                user_id=8,
                score=80,
                risk_level="High",
                created_at=datetime(2026, 10, 2, tzinfo=timezone.utc),
            ),
        ]
        self.db = PMOSSession(
            self.health_records,
            self.assessments,
        )

    def make_client(self, current_user):
        app = FastAPI()
        app.include_router(prediction_routes.router)
        app.include_router(pmo_history_routes.router)
        app.dependency_overrides[get_current_user] = lambda: current_user
        app.dependency_overrides[auth_get_db] = lambda: self.db
        app.dependency_overrides[prediction_routes.get_db] = lambda: self.db
        app.dependency_overrides[pmo_history_routes.get_db] = lambda: self.db
        return TestClient(app)

    def test_repeated_get_calculates_current_result_without_saving(self):
        initial_count = len(self.db.assessments)
        with self.make_client(self.patient) as client:
            first = client.get("/prediction/pmo-risk")
            second = client.get("/prediction/pmo-risk")

        self.assertEqual(first.status_code, 200)
        self.assertEqual(second.status_code, 200)
        self.assertEqual(first.json(), second.json())
        self.assertEqual(first.json()["risk_percentage"], 100)
        self.assertEqual(len(self.db.assessments), initial_count)
        self.assertEqual(self.db.commit_count, 0)

    def test_post_explicitly_saves_assessment_for_current_patient(self):
        with self.make_client(self.patient) as client:
            response = client.post("/prediction/pmo-risk")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["risk_percentage"], 100)
        self.assertEqual(len(self.db.assessments), 3)
        self.assertEqual(self.db.assessments[-1].user_id, self.patient.id)
        self.assertEqual(self.db.assessments[-1].score, 100)
        self.assertEqual(self.db.commit_count, 1)

    def test_assessment_history_is_scoped_to_authenticated_patient(self):
        with self.make_client(self.patient) as client:
            response = client.get("/prediction/pmo-history")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            [assessment["user_id"] for assessment in response.json()],
            [self.patient.id],
        )
        self.assertEqual(response.json()[0]["score"], 30)

    def test_doctor_cannot_use_patient_pmos_endpoints(self):
        doctor = Doctor(
            id=9,
            full_name="Doctor",
            email="doctor@example.com",
            password="unused",
            specialization="Gynecology",
        )
        with self.make_client(doctor) as client:
            response = client.get("/prediction/pmo-risk")

        self.assertEqual(response.status_code, 403)


if __name__ == "__main__":
    unittest.main()

export type Language = "English" | "Kannada" | "Hindi";
export const translations = {
  English: {
    common: {
      save: "Save",
      update: "Update",
      create: "Create",
      cancel: "Cancel",
      delete: "Delete",
      logout: "Logout",
      loading: "Loading...",
      yes: "Yes",
      no: "No",
      back: "Back",
      next: "Next",
      submit: "Submit",
      close: "Close",
      success: "Success",
      error: "Error",
    },

    auth: {
      selectLanguage: "Select website language",
      loginTitle: "Welcome Back",
      loginSubtitle: "Login to your SakhiAI account",
      oneLoginTitle: "One login for everyone",
      oneLoginDescription: "SakhiAI identifies your account type and takes you to the correct portal.",
      email: "Email",
      emailPlaceholder: "Enter your email",
      password: "Password",
      passwordPlaceholder: "Enter your password",
      login: "Login",
      loggingIn: "Logging in...",
      loginRequired: "Please enter your email and password.",
      loginMissingToken: "Login could not be completed. Please try again.",
      invalidCredentials: "Invalid email or password.",
      accountConflict: "We could not verify this account. Please contact support.",
      loginUnavailable: "Unable to login right now. Please try again.",
      serviceUnavailable: "The service is temporarily unavailable. Please try again later.",
      backendUnavailable: "Unable to connect to the service. Please try again later.",
      unknownRole: "Unable to identify this account type. Please contact support.",
      noAccount: "Don't have a SakhiAI account?",
      createAccount: "Create an account",
      registerTitle: "Join SakhiAI",
      registerDescription: "Choose how you would like to use SakhiAI. Create a patient wellness or healthcare professional account.",
      patientAccount: "Patient Account",
      patientDescription: "Track your menstrual health, wellness, pregnancy, mood, and lifestyle, and receive supportive health-awareness insights.",
      healthTracking: "Health and wellness tracking",
      cycleTracking: "Menstrual and pregnancy tracking",
      emotionalSupport: "SakhiAI emotional support",
      healthInsights: "AI health insights",
      consultationRequests: "Doctor consultation requests",
      registerPatient: "Register as Patient",
      professionalAccount: "Healthcare Professional",
      professionalDescription: "Create a professional account to receive and manage patient consultation requests through SakhiAI.",
      professionalProfile: "Professional profile",
      viewRequests: "View consultation requests",
      acceptDecline: "Accept or decline requests",
      consultationNotes: "Add consultation notes",
      consultationHistory: "Manage consultation history",
      registerProfessional: "Register as Healthcare Professional",
      alreadyHaveAccount: "Already have a SakhiAI account?",
      loginToAccount: "Login to your account",
      back: "Back",
      patientRegisterTitle: "Create Patient Account",
      patientRegisterSubtitle: "Create your SakhiAI wellness account",
      fullName: "Full Name",
      fullNamePlaceholder: "Enter your full name",
      age: "Age",
      agePlaceholder: "Enter your age",
      preferredLanguage: "Preferred Language",
      languageEnglish: "English",
      languageKannada: "Kannada",
      languageHindi: "Hindi",
      lifeStage: "Life Stage",
      adult: "Adult",
      adolescent: "Adolescent",
      pregnancy: "Pregnancy",
      postpartum: "Postpartum",
      perimenopause: "Perimenopause",
      menopause: "Menopause",
      requiredFields: "Please fill in all required fields.",
      registrationSuccess: "Registration successful.",
      registrationFailed: "Registration failed. Please try again.",
      registrationUnavailable: "Unable to connect to the service. Please try again later.",
      unableToRegister: "Unable to register right now. Please try again.",
      creatingAccount: "Creating account...",
      alreadyHavePatientAccount: "Already have an account?",
      doctorRegisterTitle: "Doctor Registration",
      doctorRegisterSubtitle: "Create your professional account to manage patient consultation requests.",
      specialization: "Specialization",
      hospitalClinic: "Hospital / Clinic",
      hospitalPlaceholder: "Hospital name",
      experienceYears: "Experience (Years)",
      phone: "Phone",
      phonePlaceholder: "Phone number",
      professionalBio: "Professional Bio",
      bioPlaceholder: "Brief professional description...",
      doctorRegisterSuccess: "Doctor registration successful. Redirecting to login...",
      registerDoctor: "Register as Doctor",
      doctorRegistrationFailed: "Unable to register right now. Please try again.",
      duplicateEmail: "This email is already registered. Try logging in or use another email.",
    },

    doctorDashboard: {
      title: "Doctor Dashboard",
      subtitle: "Manage patient consultation requests and track their status.",
      loading: "Loading consultation requests...",
      tryAgain: "Try Again",
      pending: "Pending",
      accepted: "Accepted",
      completed: "Completed",
      cancelled: "Cancelled",
      awaitingResponse: "Awaiting response",
      activeConsultations: "Active consultations",
      finishedConsultations: "Finished consultations",
      declinedRequests: "Declined requests",
      all: "All",
      consultationRequests: "Consultation Requests",
      reportWorkspace: "Patient reports and consultation details",
      consultationCountSingular: "consultation",
      consultationCount: "consultations",
      refresh: "Refresh",
      refreshing: "Refreshing...",
      noConsultations: "No consultation requests",
      noFilteredConsultations: "There are no consultations in this status.",
      requestsEmptyHelp: "Patient consultation requests will appear here.",
      consultation: "Consultation",
      patient: "Patient",
      unknownPatient: "Unknown patient",
      patientId: "Patient ID",
      requestedOn: "Requested on",
      patientsReason: "Patient's Reason",
      reasonUnavailable: "No reason provided.",
      showFullReason: "Read full reason",
      hideFullReason: "Show less",
      viewDetails: "View Details",
      acceptRequest: "Accept Request",
      declineRequest: "Decline Request",
      markCompleted: "Mark as Completed",
      accepting: "Accepting...",
      declining: "Declining...",
      completing: "Completing...",
      consultationCompleted: "Consultation completed.",
      consultationDeclined: "This consultation request was declined.",
      statusUpdated: "Consultation status updated.",
      statusUpdateError: "Unable to update consultation status. Please try again.",
      detailsTitle: "Consultation Details",
      patientInformation: "Patient Information",
      consultationInformation: "Consultation Information",
      doctorId: "Doctor ID",
      status: "Status",
      requestedDate: "Requested On",
      doctorNotes: "Doctor Notes",
      notesPlaceholder: "Enter observations, advice, recommendations, or follow-up instructions...",
      saveNotes: "Save Notes",
      saving: "Saving...",
      notesSaved: "Doctor notes saved successfully.",
      notesSaveError: "Unable to save doctor notes. Please try again.",
      closeDetails: "Close Details",
      close: "Close",
      authError: "Authentication failed. Please login as a doctor.",
      accessError: "You do not have doctor access.",
      loadError: "Unable to load consultation requests.",
      popupsBlocked: "Allow pop-ups to print or save the patient report.",
      preparingReport: "Preparing Patient Report...",
      downloadPatientReport: "Download Patient Report",
    },

    landing: {
      selectLanguage: "Select language",
      login: "Login",
      getStarted: "Get Started",
      heroBadge: "AI-powered women's wellness platform",
      heroTitle: "Your health journey,",
      heroHighlight: "understood with care.",
      heroDescription: "SakhiAI is a culturally sensitive, explainable AI-based women's life-cycle health management system designed to support health awareness, wellbeing tracking, emotional support, and connection with healthcare professionals.",
      startJourney: "Start Your Journey",
      doctorPortal: "Doctor Portal",
      learnMore: "Learn More",
      awarenessNotice: "For health awareness and wellbeing support — not medical diagnosis.",
      journey: "Your wellness journey",
      manyNeeds: "One place. Many needs.",
      cycle: "Cycle",
      trackPatterns: "Track patterns",
      wellness: "Wellness",
      understandTrends: "Understand trends",
      sakhiAi: "SakhiAI",
      emotionalSupport: "Emotional support",
      doctors: "Doctors",
      connectSafely: "Connect safely",
      about: "About SakhiAI",
      lifeCycleTitle: "Designed around the woman's life-cycle",
      aboutDescription: "SakhiAI brings health tracking, emotional wellbeing, educational awareness, AI-based insights, and healthcare professional support together in one platform.",
      menstrualHealth: "Menstrual Health",
      menstrualDescription: "Track periods, cycle information, symptoms, pain, mood and PMS patterns.",
      pregnancyPostpartum: "Pregnancy & Postpartum",
      pregnancyDescription: "Record pregnancy wellbeing information and monitor postpartum emotional wellbeing.",
      mentalWellness: "Mental Wellness",
      mentalDescription: "Complete awareness questionnaires and monitor wellbeing trends over time.",
      generalWellness: "General Wellness",
      generalDescription: "Track sleep, activity, mood and other everyday wellbeing information.",
      twoExperiences: "One platform, two experiences",
      portalsTitle: "Designed for both patients and healthcare professionals",
      portalsDescription: "SakhiAI provides a dedicated experience for women managing their wellbeing and healthcare professionals supporting them.",
      patientPortal: "Patient Portal",
      patientDescription: "A personal space to track your women's health journey, understand wellbeing patterns and access supportive resources.",
      healthTracking: "Health and wellness tracking",
      cycleTracking: "Menstrual cycle tracking",
      pmosAwareness: "PMOS awareness",
      pregnancyWellbeing: "Pregnancy & postpartum wellbeing",
      mentalAssessments: "Mental wellness assessments",
      companion: "AI-powered SakhiAI companion",
      explainableInsights: "Explainable wellness insights",
      consultations: "Doctor consultations",
      reportsHistory: "Reports and health history",
      createPatientAccount: "Create Patient Account",
      patientLogin: "Patient Login",
      doctorDescription: "A dedicated workspace for registered healthcare professionals to manage consultation requests and patient interactions.",
      doctorRegistration: "Doctor registration",
      secureDoctorLogin: "Secure doctor login",
      doctorDashboard: "Doctor dashboard",
      incomingRequests: "Incoming consultation requests",
      patientInformation: "Patient information",
      acceptDecline: "Accept or decline requests",
      statusManagement: "Consultation status management",
      doctorNotes: "Doctor notes",
      consultationHistory: "Consultation history",
      registerDoctor: "Register as Doctor",
      doctorLogin: "Doctor Login",
      intelligentSupport: "Intelligent support",
      aiTitle: "AI that explains, supports and guides",
      aiDescription: "SakhiAI combines AI-based awareness with understandable explanations so users can better understand their wellbeing patterns.",
      companionTitle: "SakhiAI Companion",
      companionDescription: "A supportive conversational companion for emotional wellbeing and health awareness.",
      explainableAi: "Explainable AI",
      explainableDescription: "Understand which recorded factors contribute to an awareness score and why.",
      privacySafety: "Privacy & Safety",
      privacyDescription: "Designed around responsible health awareness, secure access and clear limitations.",
      healthcareConnection: "Healthcare connection",
      professionalSupport: "When you need professional support",
      connectionDescription: "SakhiAI also provides a structured connection between patients and registered healthcare professionals through consultation requests.",
      selectProfessional: "Patient selects a healthcare professional",
      sendRequest: "Patient sends a consultation request",
      doctorReviews: "Doctor reviews and responds to the request",
      accessibleHistory: "Consultation status and history remain accessible",
      patientDoctor: "Patient ↔ Doctor",
      structuredCommunication: "Structured healthcare communication",
      patientRequest: "Patient consultation request",
      doctorReview: "Doctor review",
      statusHistory: "Consultation status & history",
      healthDisclaimerTitle: "Health awareness, not medical diagnosis",
      healthDisclaimer: "SakhiAI is designed to help users track wellbeing, understand health-related information, receive supportive guidance and recognize when professional support may be appropriate. It does not replace a qualified healthcare professional or provide medical diagnosis.",
      beginJourney: "Begin your SakhiAI journey",
      startDescription: "Start tracking your wellbeing and understanding your health journey in one place.",
      joinDoctor: "Join as Doctor",
      brandTagline: "Culturally Sensitive Explainable AI-Based Women's Life-Cycle Health Management System",
      footerNotice: "For awareness & wellbeing support only.",
    },

    navigation: {
      patientTagline: "Women's Health Companion",
      notifications: "Notifications",
      healthTracking: "Health Tracking",
      doctorConsultation: "Doctor Consultation",
      menstrual: "Menstrual Tracking",
      mentalWellness: "Mental Wellness",
      pmos: "PMOS Awareness",
      pregnancy: "Pregnancy Support",
      aiAssistant: "AI Assistant",
      community: "Community",
      dietWorkout: "Diet & Workout",
      reports: "Reports",
      profile: "Profile",
      settings: "Settings",
      logout: "Logout",
    },

    settings: {
      title: "Settings",
      subtitle: "Manage your preferences, privacy and account settings.",
      preferences: "Preferences",
      preferencesDescription: "Customize how SakhiAI works for you.",
      language: "Language",
      languageDescription: "Choose your preferred language.",
      notifications: "Notifications",
      notificationsDescription:
        "Receive important SakhiAI notifications.",
      reminders: "Health Reminders",
      remindersDescription:
        "Receive reminders for health tracking and wellness activities.",
      savePreferences: "Save Preferences",
      saved: "Settings saved successfully.",
      saveError: "Unable to save settings.",
      privacySecurity: "Privacy & Security",
      privacyDescription:
        "Understand how your information is handled.",
      healthDataPrivacy: "Health Data Privacy",
      healthDataPrivacyDescription:
        "Learn how your health information is protected.",
      aiDataUsage: "AI Data Usage",
      aiDataUsageDescription:
        "Understand how your information supports AI features.",
      healthPrivacyDetails:
        "SakhiAI uses the health information you provide to support health tracking, wellbeing insights and personalized awareness features.",
      accessDetails:
        "Your information should only be accessed by authorized parts of the system and should not be shared with other users without appropriate authorization.",
      aiUsageDetails:
        "SakhiAI may use information recorded within the platform to generate personalized awareness insights and predictions.",
      aiDisclaimer:
        "AI-generated information is intended for health awareness and wellbeing support and should not be treated as a medical diagnosis.",
      account: "Account",
      accountDescription:
        "Manage access to your SakhiAI account.",
      deleteAccount: "Delete Account",
      deleteConfirmation:
        "Are you sure you want to delete your account? This action cannot be undone.",
      deleteUnavailable:
        "Account deletion is not currently available.",
      logout: "Logout",
      privacyTitle: "Your privacy matters",
      privacyFooter:
        "SakhiAI supports health awareness and wellbeing. It does not replace professional medical advice.",
      toggleNotifications: "Toggle notifications",
      toggleReminders: "Toggle health reminders",
    },

    profile: {
      title: "My Profile",
      subtitle: "Manage your personal and health information.",
      loading: "Loading your profile...",
      loadingDescription: "Please wait.",
      loginRequired: "Please log in to view your profile.",
      loadError: "Unable to load your profile.",
      saveError: "Unable to save profile.",
      backendUnavailable: "Unable to connect to the backend.",
      accountInformation: "Account Information",
      accountDescription:
        "Basic information associated with your SakhiAI account.",
      fullName: "Full Name",
      email: "Email",
      age: "Age",
      lifeStage: "Life Stage",
      lifeStageAdult: "Adult",
      lifeStageAdolescent: "Adolescent",
      lifeStagePregnancy: "Pregnancy",
      lifeStagePostpartum: "Postpartum",
      lifeStagePerimenopause: "Perimenopause",
      lifeStageMenopause: "Menopause",
      healthProfile: "Health Profile",
      healthDescription:
        "This information helps SakhiAI provide more personalized insights.",
      dateOfBirth: "Date of Birth",
      height: "Height (cm)",
      heightPlaceholder: "e.g. 165",
      weight: "Weight (kg)",
      weightPlaceholder: "e.g. 60",
      bloodGroup: "Blood Group",
      selectBloodGroup: "Select blood group",
      medicalHistory: "Medical History",
      allergies: "Allergies",
      menstrualStatus: "Menstrual Status",
      selectMenstrualStatus: "Select menstrual status",
      pregnancyStatus: "Pregnancy Status",
      selectPregnancyStatus: "Select pregnancy status",
      dateOfBirthRequired: "Please enter your date of birth.",
      heightRequired: "Please enter a valid height.",
      weightRequired: "Please enter a valid weight.",
      bloodGroupRequired: "Please select your blood group.",
      menstrualStatusRequired: "Please select your menstrual status.",
      pregnancyStatusRequired: "Please select your pregnancy status.",
      medicalHistoryPlaceholder: "Enter any relevant medical history...",
      allergiesPlaceholder: "Enter any known allergies...",
      regular: "Regular",
      irregular: "Irregular",
      absent: "Absent",
      notApplicable: "Not Applicable",
      notPregnant: "Not Pregnant",
      pregnant: "Pregnant",
      postpartum: "Postpartum",
      preferNotToSay: "Prefer not to say",
      saving: "Saving...",
      createProfile: "Create Profile",
      updateProfile: "Update Profile",
      profileCreated: "Profile created successfully!",
      profileUpdated: "Profile updated successfully!",
      privacyTitle: "Your health information matters",
      privacyDescription:
        "Your profile information personalizes SakhiAI health insights and predictions. Consult a qualified healthcare professional for medical decisions.",
    },

dashboard: {
  title: "Dashboard",

  welcome: "Welcome to SakhiAI",
  welcomeMessage: "Here is your personalized women's health overview.",

  overview: "Your health overview",
  healthOverview: "Health Overview",
  healthSummary: "Health Summary",
  healthInsights: "Health Insights",
  recentActivity: "Recent Activity",

  cycle: "Cycle",
  currentCycleDay: "Current cycle day",
  day: "Day",
  dayLabel: "Day",

  pmosRisk: "PMOS Risk",
  estimatedRisk: "estimated risk",

  mood: "Mood",
  latestRecordedMood: "Latest recorded mood",

  lifestyle: "Lifestyle",
  latestActivityLevel: "Latest activity level",

  wellness: "Wellness",
  wellnessDescription:
    "Understand your recent sleep, mood, activity and wellness patterns.",

  latestSleep: "Latest Sleep",
  averageSleep: "Average Sleep",
  latestMood: "Latest Mood",
  averageMood: "Average Mood",

  sleepDuration: "Sleep duration",
  hours: "hours",

  mostRecentRecording: "Most recent recording",
  basedOnRecordedHistory: "Based on recorded history",

  latestActivity: "Latest Activity",
  healthRecords: "Health Records",
  mostRecentActivityLevel: "Most recent activity level",
  totalRecordedEntries: "Total recorded entries",

  wellnessStatus: "Wellness Status",

  healthTrends: "Health Trends",
  trackHealthChanges:
    "Track how your mood and sleep have changed over time.",

  moodTrend: "Mood Trend",
  sleepTrend: "Sleep Trend",

  moodScale: "Mood is recorded on a scale from 1 to 5.",
  sleepMeasured: "Sleep duration is measured in hours.",

  aiHealthInsights: "AI Health Insights",
  aiInsightsDescription:
    "Personalized insights based on your health information.",

  noPersonalizedInsights: "No personalized insights yet",

  contributingFactors: "Contributing Factors",
  factorsInfluenceScore:
    "These recorded factors currently influence the awareness score.",

  recordedValue: "Recorded value",
  impact: "impact",

  currentAwarenessScore: "Current Awareness Score",
  whyScoreShown: "Why is this score shown?",

  pmosRiskAwareness: "PMOS Risk Awareness",

  pmosDescription:
    "This awareness score is based on your recorded wellness information. It helps you understand which factors are contributing to the current estimate.",

  noData: "No Data",

  yourProfile: "Your Profile",
  email: "Email",
  age: "Age",
  lifeStage: "Life Stage",
  language: "Language",

  wellnessDisclaimer:
    "Wellness information is intended for self-awareness and general wellbeing tracking. It is not a medical diagnosis.",

  pmosDisclaimer:
    "PMOS Risk Awareness is an informational wellness feature and is not a medical diagnosis. It should not be used as a substitute for professional healthcare advice.",

  insightsDisclaimer:
    "These insights are informational and are not a medical diagnosis. If you have concerning or persistent symptoms, consult a qualified healthcare professional.",
        cycleDayValue: "Day",
      hoursValue: "hours",
      estimatedRiskValue: "estimated risk",

      wellnessStart:
        "Start recording your health information to build your wellness history.",

      wellnessPositive:
        "Your recent sleep and mood patterns look positive. Keep maintaining consistent wellness habits.",

      wellnessLowSleep:
        "Your recent sleep duration is lower than ideal. Try maintaining a consistent sleep routine and getting adequate rest.",

      wellnessLowMood:
        "Your recent mood ratings are relatively low. Consider self-care, supportive social connection, and monitoring how you feel.",

      wellnessTracking:
        "Your wellness information is being tracked. Continue recording your daily health patterns to understand your trends better.",

      noInsights:
        "No personalized insights yet",

      continueRecording:
        "Continue recording your health information to receive personalized insights.",

      noHealthHistory: "No health history available yet",
      noMoodChartData: "No mood entries are available to chart.",
      noSleepChartData: "No sleep entries are available to chart.",
      recordHealthInfo:
        "Record your health information to see contributing factors.",

      low: "Low",
      moderate: "Moderate",
      high: "High",

      activityLow: "Low",
      activityModerate: "Moderate",
      activityHigh: "High",

      aiInsightSleepVeryLow: "Your recorded average sleep is {value} hours. Your recent sleep pattern appears lower than ideal. Try maintaining a consistent sleep schedule and getting adequate rest.",

      aiInsightSleepSlightlyLow: "Your recorded average sleep is {value} hours. Your sleep duration is slightly below the range you may want to aim for. Continue monitoring your sleep pattern.",

      aiInsightSleepPositive: "Your recorded average sleep is {value} hours. Your recent sleep pattern looks positive. Maintaining consistent sleep can support overall wellbeing.",

      aiInsightMoodLow: "Your recorded average mood is {value} out of 5. Your recent mood ratings have been relatively low. Consider self-care, supportive social connection, and continuing to monitor how you feel.",

      aiInsightMoodVariable: "Your recorded average mood is {value} out of 5. Your mood has varied across your recorded entries. Continue tracking your mood to understand your personal patterns.",

      aiInsightMoodPositive: "Your recorded average mood is {value} out of 5. Your recent mood pattern appears positive.",

      aiInsightMoodVariation: "Your recorded mood has shown noticeable variation over time. Continuing to track your mood alongside sleep and cycle information may help you recognize patterns.",

      aiInsightActivityLow: "Your latest recorded activity level is low. If you feel comfortable, gentle movement such as walking or stretching may support general wellbeing.",

      aiInsightActivityModerate: "Your latest recorded activity level is moderate. Maintaining regular movement can be a positive wellness habit.",

      aiInsightActivityHigh: "Your latest recorded activity level is high. Remember to balance activity with sufficient rest and recovery.",

      aiInsightCycleMenstrual: "You are currently around cycle day {value}. This is commonly within the menstrual phase.",

      aiInsightCycleEarly: "You are currently around cycle day {value}. Continue observing changes in mood, energy, and symptoms.",

      aiInsightCycleMid: "You are currently around cycle day {value}. Continue monitoring changes in mood, energy, sleep, and other symptoms.",

      aiInsightCycleLate: "You are currently around cycle day {value}. Pay attention to changes in mood, sleep, energy, and symptoms as your next period approaches.",

      aiInsightTracking: "You have recorded {value} health entries. Continue tracking regularly to build a clearer picture of your personal wellness patterns.",

      aiInsightNoData: "Start recording your health information to receive personalized health insights.",

      aiInsightContinueTracking: "Continue recording your health information to receive more personalized wellness insights.",

      currentEstimatedRisk: "Current estimated risk",

      latestRecordedMoodDescription: "Latest recorded mood",
      latestActivityLevelDescription: "Latest activity level",

      user: "User",
    },

    tracking: {
      title: "Health Tracking",
      heading: "Track Your Health",
      subtitle:
        "Record your daily wellness information and understand your health patterns.",
      menstrualCycle: "Menstrual Cycle",
      currentCycleInformation: "Current cycle information",
      currentCycleDay: "Current Cycle Day",
      cycleDayPlaceholder: "Example: 12",
      mood: "Mood",
      howFeeling: "How are you feeling today?",
      moodLevel: "Mood Level",
      selectMood: "Select mood",
      excellent: "Excellent",
      good: "Good",
      okay: "Okay",
      low: "Low",
      veryLow: "Very Low",
      sleep: "Sleep",
      sleepDurationDescription: "Track your sleep duration",
      hoursOfSleep: "Hours of Sleep",
      sleepPlaceholder: "Example: 7.5",
      activity: "Activity",
      physicalActivity: "Physical Activity",
      recordActivityToday: "Record today's activity",
      activityLevel: "Activity Level",
      selectActivity: "Select activity",
      activityLow: "Low",
      activityModerate: "Moderate",
      activityHigh: "High",
      saveToday: "Save Today's Data",
      saveSuccess: "Today's health data saved successfully!",
      loginRequired: "Please log in again.",
      saveError: "Unable to save health data.",
      validationError:
        "Check that cycle day is 1-45, mood is 1-5, and sleep is 0-24 hours in 0.5-hour steps.",
      recentRecords: "Recent Health Records",
      noRecords: "No health records yet.",
      date: "Date",
      cycleDay: "Cycle Day",
      hours: "hours",
      saveTracking: "Save Health Record",
    },

   menstrual: {
  subtitle: "Track your menstrual cycle and understand your cycle patterns.",
  selectFlow: "Select flow level",
  light: "Light",
  medium: "Medium",
  heavy: "Heavy",

  saveCycle: "Save Cycle",
  savingCycle: "Saving...",
  deleteConfirmation: "Are you sure you want to delete this cycle?",

  aiRequirement:
    "The AI requires at least 7 chronological daily observations.",
  minimumDaysError:
    "At least 7 days of health tracking are required. Current number of days recorded: {count}.",

  confidenceDescription:
    "Confidence represents the model's predicted probability for the selected phase.",

  featuresImputed: "Features Imputed",
  personalizedEstimates:
    "Personalized estimates based on your recorded cycles.",

  days: "days",
  insufficientData: "Insufficient Data",
  noData: "No Data",
  regular: "Regular",
  slightlyIrregular: "Slightly Irregular",
  irregular: "Irregular",

  currentCycle: "Current Cycle",
  currentEstimatedCycleDay: "Current estimated cycle day",

  averageCycle: "Average Cycle",
  basedOnRecordedCycles: "Based on recorded cycles",

  averagePeriod: "Average Period",
  averageBleedingDuration: "Average bleeding duration",

  cyclePattern: "Cycle Pattern",
  basedOnAvailableHistory: "Based on available history",

  estimatedFromCycleHistory: "Estimated from your cycle history",

  fertileWindow: "Estimated Fertile Window",
  approximateBasedOnCycleLength:
    "Approximate estimate based on cycle length",

  estimateDisclaimer:
    "These cycle dates are estimates based on the information you provide. They are not a medical diagnosis or reliable contraception. Cycle timing may vary from month to month.",

  noCycleRecords: "No cycle records yet.",
  addFirstCycle: "Add your first cycle above.",

  start: "Start",
  end: "End",
  action: "Action",
  day: "Day",
  cramps: "Cramps",
  features: "features",

  title: "Menstrual Tracking",
  addCycle: "Add Menstrual Cycle",
  aiPrediction: "AI Menstrual Phase Prediction",

  aiDescription:
    "The AI model analyzes your recent health observations to estimate your current menstrual phase.",

  availableDays: "Available health-tracking days",
  confidence: "Confidence",
  continueAddingRecords: "Continue adding health records",

  cycleHistory: "Cycle History",
  cycleHistoryDescription:
    "Your previously recorded menstrual cycles are shown here.",

  cycleInsights: "Cycle Insights",
  cycleLength: "Cycle Length",

  deleteCycle: "Delete Cycle",
  featuresProvided: "Features Provided",

  fertility: "Fertility",
  follicular: "Follicular",

  historyLoadError: "Unable to load cycle history.",
  loadingCycleHistory: "Loading cycle history...",

  loginRequired: "Please log in to access menstrual tracking.",

  luteal: "Luteal",
  menstrual: "Menstrual",

  nextPeriod: "Next Period",

  notEnoughData: "Not enough data for AI prediction.",

  periodEnd: "Period End",
  periodStart: "Period Start",
  cycleLengthPlaceholder: "e.g. 28",
  symptomsPlaceholder: "e.g. cramps, headache, fatigue...",
  periodStartRequired: "Period start date is required.",

  phaseProbabilities: "Phase Probabilities",
  predictedPhase: "Predicted Phase",

  predicting: "Predicting...",
  predictPhase: "Predict Menstrual Phase",

  researchModelInfo:
    "Research model based on menstrual-cycle data.",

  saveError: "Unable to save the cycle.",

  sequence: "Sequence Length",
  sequenceLength: "Sequence Length",

  symptoms: "Symptoms",
  flowLevel: "Flow Level",

  researchNote:
  "This research LSTM was trained using mcPHASES data containing menstrual, hormonal, wearable and self-reported features. Features not collected by SakhiAI are filled using training-set medians.",

aiDisclaimer:
  "This AI prediction is for informational and wellness support only. It is not a medical diagnosis and should not replace professional medical advice.",

  healthTrackingLoadError:
    "Unable to load health tracking records.",

  deleteError: "Unable to delete the cycle.",

  predictionError:
    "Unable to generate menstrual phase prediction.",
},

    pmos: {
      title: "PMOS Awareness",
      pageTitle: "PMOS Risk Awareness",
      subtitle: "Understand your current wellness awareness score and the factors contributing to it.",
      loading: "Loading PMOS awareness...",
      loadingDescription: "Analyzing your recorded wellness information.",
      loginRequired: "Please log in to continue.",
      loadError: "Unable to load PMOS information.",
      currentScore: "Current awareness score",
      whatThisMeans: "What this means",
      meaningHigh: "Several recorded wellness factors are contributing to a higher awareness score. Consider reviewing your recent health information and seeking professional guidance if you have concerns.",
      meaningModerate: "Some recorded wellness factors are contributing to the current awareness score. Continue tracking your wellbeing consistently.",
      meaningLow: "Your currently recorded wellness factors result in a lower awareness score. Continue monitoring your wellbeing.",
      meaningNoData: "Record your wellness information to generate an awareness score.",
      scoreFallback: "Your score is calculated from your latest recorded wellness information.",
      noHealthDataMessage: "Please record your health information first.",
      informationalMessage: "This is an informational wellness estimate and not a medical diagnosis.",
      historyNoHealthData: "There is not enough recorded wellness information to calculate an awareness score.",
      historyNoFactorsExplanation: "None of the currently recorded wellness factors added points to the awareness score.",
      historyFactorsExplanation: "The current awareness score is based on your latest recorded wellness information. The factors contributing to this score are: {factors}. Each factor contributes a predefined amount according to the current transparent awareness rules.",
      dayValue: "Day {value}",
      hoursValue: "{value} hours",
      riskLevel: "Risk Level",
      riskScore: "Risk Score",
      low: "Low",
      moderate: "Moderate",
      high: "High",
      noData: "No Data",
      contributingFactors: "Contributing Factors",
      factorsDescription: "These factors explain which recorded wellness information influences your current awareness score.",
      recordedValue: "Recorded value:",
      impactLabel: "{level} impact",
      noFactors: "No contributing factors available",
      noFactorsDescription: "Record more wellness information to generate a detailed explanation.",
      explainabilityTitle: "How the awareness score is generated",
      explainabilityDescription: "SakhiAI currently uses transparent wellness rules based on your recorded information. Each contributing factor adds to the awareness score according to its predefined contribution.",
      factorMood: "Mood",
      factorSleep: "Sleep",
      factorActivity: "Activity",
      factorCycle: "Cycle",
      moodLowExplanation: "Your recorded mood rating is relatively low and contributes more strongly to the current awareness score.",
      moodModerateExplanation: "Your recorded mood is around the middle of the selected scale and contributes moderately to the current awareness score.",
      sleepVeryLowExplanation: "Your recorded sleep duration is below 6 hours and contributes strongly to the current awareness score.",
      sleepLowExplanation: "Your recorded sleep duration is below 7 hours and contributes moderately to the current awareness score.",
      activityLowExplanation: "Your recorded activity level is low and contributes to the awareness score.",
      cycleLaterExplanation: "The recorded cycle day is 21 or later and contributes to the current awareness score.",
      historyTitle: "Assessment History",
      historyDescription: "Review your previous PMOS awareness assessments and observe how your awareness score changes over time.",
      date: "Date",
      score: "Score",
      awarenessLevel: "Awareness Level",
      explanation: "Explanation",
      noHistory: "No previous assessments",
      noHistoryDescription: "Save a new PMOS awareness assessment to keep a record here.",
      saveAssessment: "Save assessment to history",
      savingAssessment: "Saving assessment...",
      assessmentSaved: "Assessment saved to your history.",
      assessmentSaveError: "Unable to save this assessment. Please try again.",
      historyRefreshError: "Assessment saved, but its history could not be refreshed.",
      disclaimer: "PMOS awareness information is for education and general wellness only. It is not a medical diagnosis. Consult a qualified healthcare professional for medical concerns.",
    },

    pregnancy: {
  title: "Pregnancy Support",
  description:
    "Track your pregnancy and postpartum wellbeing information.",
  currentStatus: "Current Status",
  pregnancy: "Pregnancy Status",
  pregnancyWeek: "Pregnancy Week",
  dueDate: "Expected Due Date",
  postpartum: "Postpartum",
  postpartumWellbeing: "Postpartum Wellbeing",
  postpartumStatus: "Postpartum Status",
  postpartumWeek: "Postpartum Week",
  postpartumMood: "Postpartum Mood",
  wellbeingNotes: "Wellbeing Notes",
  saveInformation: "Save Information",
  saving: "Saving...",
  updateMessage:
    "Update your information whenever you want to keep your wellness record current.",
  selectMood: "Select mood",
  veryLow: "Very low",
  lowMood: "Low",
  neutral: "Neutral",
  good: "Good",
  veryGood: "Very good",
  notPregnant: "Not Pregnant",
  pregnant: "Pregnant",
  postpartumStatusValue: "Postpartum",
  notPostpartum: "Not Postpartum",
  week: "Week",
  noRecords: "No pregnancy records yet",
  noRecordsDescription:
    "Your saved pregnancy and postpartum wellbeing records will appear here.",
  historyTitle: "Pregnancy & Postpartum History",
  historyDescription:
    "Previous wellness records saved to your account.",
  wellbeingGuidance: "Wellbeing Guidance",
  gentleSelfCare: "Gentle self-care",
  gentleSelfCareDescription:
    "Keep track of rest, hydration, emotional wellbeing, and other everyday habits that help you feel supported.",
  stayConnected: "Stay connected",
  stayConnectedDescription:
    "If you are concerned about persistent physical or emotional changes, consider speaking with a qualified healthcare professional.",
  disclaimer:
    "This module is intended for wellbeing tracking and educational support only. It does not provide medical diagnosis, treatment, or emergency medical advice. Please consult a qualified healthcare professional for medical concerns.",
  loading: "Loading pregnancy wellness...",
  loadingDescription:
    "Preparing your personalized information.",
  loginRequired: "Please login to continue.",
  loadError:
    "Unable to load pregnancy information.",
  saveSuccess:
    "Your pregnancy and postpartum information has been saved.",
  saveError:
    "Unable to save your information.",
  pregnancyWeekPlaceholder: "Example: 12",
  postpartumWeekPlaceholder: "Example: 6",
  dueDatePlaceholder: "dd/mm/yyyy",
  wellbeingNotesPlaceholder:
    "Write about how you are feeling, your wellbeing, or anything you would like to remember...",
  postpartumLabel: "Postpartum",
  defaultWellbeingNote:
    "Feeling well and maintaining regular self-care.",
},

    mentalWellness: {
  title: "Mental Wellness",
  subtitle:
    "Reflect on your emotional wellbeing through simple self-assessment questionnaires.",

  important: "Important",
  disclaimer:
    "These questionnaires are for awareness and self-reflection only. They do not provide a medical diagnosis. If you are concerned about your wellbeing, please speak with a qualified healthcare professional.",

  depressionAwareness: "Depression Awareness",
  anxietyAwareness: "Anxiety Awareness",
  postpartumMoodAwareness: "Postpartum Mood Awareness",
  postpartumMood: "Postpartum Mood",

  questions9: "9 questions",
  questions7: "7 questions",
  questions10: "10 questions",

  phq9Description:
    "A PHQ-9 style questionnaire to help you reflect on your recent emotional wellbeing.",

  gad7Description:
    "A GAD-7 style questionnaire to help you reflect on anxiety-related experiences.",

  epdsDescription:
    "An EPDS-style questionnaire designed for postpartum emotional wellbeing awareness.",

  notAtAll: "Not at all",
  severalDays: "Several days",
  moreThanHalfDays: "More than half the days",
  nearlyEveryDay: "Nearly every day",

  completeAssessment: "Complete Assessment",
  savingAssessment: "Saving assessment...",

  awarenessResult: "Your Awareness Result",
  score: "Score",
  awarenessLevel: "Awareness Level",

  lowerAwareness:
    "Your responses are currently in a lower awareness range.",

  mildAwareness:
    "Your responses show some areas that may be worth monitoring.",

  moderateAwareness:
    "Your responses suggest that additional attention and support may be helpful.",

  professionalSupport:
    "Your responses indicate that speaking with a qualified healthcare professional may be helpful.",

  resultDisclaimer:
    "This result is an awareness indicator, not a diagnosis. Consider discussing persistent or concerning experiences with a qualified healthcare professional.",
  immediateSafety:
    "If you may act on thoughts of harming yourself or feel in immediate danger, contact local emergency services now or reach out to someone you trust and a qualified healthcare professional.",
  minimalAwarenessLevel: "Minimal awareness level",
  mildAwarenessLevel: "Mild awareness level",
  moderateAwarenessLevel: "Moderate awareness level",
  moderatelyHighAwarenessLevel: "Moderately high awareness level",
  highAwarenessLevel: "High awareness level",
  lowerAwarenessRange: "Lower awareness range",
  possibleConcernRange: "Possible concern range",
  higherAwarenessRange: "Higher awareness range",
  unknownInterpretation: "Unknown",

  assessmentHistory: "Assessment History",
  loadingHistory: "Loading history...",
  noAssessments: "No assessments yet",

  noAssessmentsDescription:
    "Your completed awareness assessments will appear here.",

  pleaseAnswerAll:
    "Please answer all questions before submitting.",

  loginAgain: "Please login again.",

  saveError:
    "Unable to save the assessment. Please try again.",

  assessmentNames: {
    PHQ9: "Depression Awareness",
    GAD7: "Anxiety Awareness",
    EPDS: "Postpartum Mood Awareness",
  },

  questions: {
    PHQ9: [
      "Little interest or pleasure in doing things",
      "Feeling down, depressed, or hopeless",
      "Trouble falling or staying asleep, or sleeping too much",
      "Feeling tired or having little energy",
      "Poor appetite or overeating",
      "Feeling bad about yourself",
      "Trouble concentrating on things",
      "Moving or speaking slowly, or being unusually restless",
      "Thoughts that you would be better off dead or hurting yourself",
    ],

    GAD7: [
      "Feeling nervous, anxious, or on edge",
      "Not being able to stop or control worrying",
      "Worrying too much about different things",
      "Trouble relaxing",
      "Being so restless that it is hard to sit still",
      "Becoming easily annoyed or irritable",
      "Feeling afraid as if something awful might happen",
    ],

    EPDS: [
      "I have been able to laugh and see the funny side of things",
      "I have looked forward with enjoyment to things",
      "I have blamed myself unnecessarily when things went wrong",
      "I have been anxious or worried for no good reason",
      "I have felt scared or panicky for no very good reason",
      "Things have been getting on top of me",
      "I have been so unhappy that I have had difficulty sleeping",
      "I have felt sad or miserable",
      "I have been so unhappy that I have been crying",
      "The thought of harming myself has occurred to me",
    ],
  },
},

    wellness: {
      loading: "Loading Wellness...",
      loadingDescription: "Preparing your wellness information.",
      brand: "SakhiAI Wellness",
      title: "Your Wellness",
      subtitle:
        "Understand your recent sleep, mood, activity and overall wellbeing.",
      currentWellness: "Current Wellness",
      sleep: "Sleep",
      hours: "hrs",
      latestSleep: "Latest recorded sleep",
      mood: "Mood",
      latestMood: "Latest mood rating",
      activity: "Activity",
      activityLow: "Low",
      activityModerate: "Moderate",
      activityHigh: "High",
      latestActivity: "Latest activity level",
      cycleDay: "Cycle Day",
      day: "Day",
      latestCycleDay: "Latest recorded cycle day",
      trends: "Wellness Trends",
      moodTrend: "Mood Trend",
      moodTrendDescription: "Your mood ratings over time.",
      sleepTrend: "Sleep Trend",
      sleepTrendDescription:
        "Your recorded sleep duration over time.",
      noHistory: "No wellness history available yet",
      noHistoryDescription:
        "Continue recording your health information to see your wellness trends.",
      personalizedInsights: "Personalized Wellness Insights",
      insightsDescription:
        "Insights based on your latest health information.",
      noInsights: "No personalized insights yet",
      noInsightsDescription:
        "Continue recording your health information to receive personalized insights.",
      insightsDisclaimer:
        "These insights are informational and are not a medical diagnosis. If you have concerning or persistent symptoms, consult a qualified healthcare professional.",
    },


    chat: {
      title: "Assistant",
      subtitle: "Your women's health companion",
      online: "Online",
      welcomeMessage: "Hello! 🌸 I'm SakhiAI. You can ask me about your sleep, mood, activity, menstrual cycle, or general wellness.",
      sessionExpired: "Your session has expired. Please log in again.",
      requestError: "Something went wrong while contacting SakhiAI.",
      responseFallback: "I'm sorry, I couldn't generate a response.",
      thinking: "SakhiAI is thinking...",
      suggestedSleep: "How is my sleep?",
      suggestedMood: "How is my mood?",
      suggestedCycle: "My cycle",
      suggestedActivity: "My activity",
      placeholder: "Type your message...",
      send: "Send",
      sendAriaLabel: "Send message",
      disclaimer: "SakhiAI provides informational wellness guidance and is not a substitute for professional medical advice.",
    },

    community: {
      title: "Community",
      heading: "Support Circle 🌸",
      subtitle: "A safe space to share experiences, encouragement, and everyday wellness journeys with other women.",
      safetyTitle: "Community Safety",
      safetyAnonymous: "Posts are shared anonymously with other users.",
      safetyRespect: "Be respectful and supportive.",
      safetyPrivacy: "Do not share passwords, phone numbers, or private information.",
      safetyMedical: "Do not use the community for medical diagnosis.",
      safetyReport: "Report content that feels unsafe, abusive, or inappropriate.",
      shareTitle: "Share with the community",
      shareDescription: "Your post will be displayed anonymously.",
      topic: "Topic",
      categoryGeneral: "General Support",
      categoryMenstrual: "Menstrual Health",
      categoryPregnancy: "Pregnancy",
      categoryPostpartum: "Postpartum",
      categoryMentalWellness: "Mental Wellness",
      shareQuestion: "What would you like to share?",
      sharePlaceholder: "Share your experience, thoughts, encouragement, or something you are going through...",
      loading: "Loading SakhiAI Community...",
      emptyTitle: "No conversations yet",
      emptyDescription: "Be the first to share something with the community.",
      conversationsTitle: "Community Conversations",
      conversationsDescription: "Experiences and encouragement from the community.",
      anonymousMember: "Anonymous Member",
      report: "Report",
      reportPrompt: "Why would you like to report this post?",
      reportSuccess: "Thank you. The post has been reported.",
      reportError: "Unable to report this post.",
      postNotFound: "Community post not found.",
      alreadyReported: "You have already reported this post.",
      emptyPostError: "Please write something before posting.",
      loadError: "Unable to load community posts.",
      createError: "Unable to create your post.",
      createSuccess: "Your post was shared anonymously.",
      sharing: "Sharing...",
      shareAnonymously: "Share Anonymously",
      disclaimer: "SakhiAI Community is intended for peer support and awareness. Information shared by community members is not medical advice or a diagnosis. For concerning or persistent symptoms, please consult a qualified healthcare professional.",
    },

    dietWorkout: {
      title: "Diet & Workout",
      brand: "SakhiAI Wellness",
      description:
        "Simple lifestyle guidance based on the health information you have already recorded.",
      loading: "Loading wellness guidance...",
      loadingDescription: "Preparing your personalized recommendations.",
      wellnessOnly: "Wellness guidance only:",
      wellnessDisclaimer:
        "These suggestions are for general wellbeing and are not personalized medical, dietary, or exercise prescriptions. If you are pregnant, postpartum, have a health condition, or have concerns about exercise or nutrition, consult an appropriate healthcare professional.",
      snapshotTitle: "Your Current Wellness Snapshot",
      snapshotDescription: "Based on your latest health tracking entry.",
      noHealthData: "No health tracking data yet",
      noHealthDataDescription:
        "Record your sleep, mood, activity, and cycle information to receive more relevant wellness guidance.",
      cycle: "Cycle",
      day: "Day",
      sleep: "Sleep",
      hours: "hours",
      mood: "Mood",
      activity: "Activity",
      activityLow: "Low",
      activityModerate: "Moderate",
      activityHigh: "High",
      nutritionTitle: "Nutrition & Food Guidance",
      nutritionDescription: "Simple everyday nutrition ideas.",
      dietLateCycleIron:
        "Include iron-rich foods such as leafy greens, lentils, beans, and fortified foods.",
      dietLateCycleBalanced:
        "Choose balanced meals containing protein, whole grains, vegetables, and fruits.",
      dietLateCycleHydration: "Stay hydrated throughout the day.",
      dietLowMoodRegularMeals:
        "Choose regular balanced meals instead of skipping meals.",
      dietLowMoodProtein:
        "Include protein-rich foods such as dal, beans, eggs, yogurt, or other suitable sources.",
      dietLowMoodProduce:
        "Include fruits, vegetables, and adequate fluids.",
      dietDefaultBalanced:
        "Aim for balanced meals containing vegetables, fruits, whole grains, and protein.",
      dietDefaultIronProtein:
        "Include iron-rich and protein-rich foods regularly.",
      dietDefaultHydration: "Drink enough water throughout the day.",
      hydrationTitle: "Hydration",
      hydrationDescription:
        "Keep water intake regular throughout the day.",
      hydrationGuidance:
        "Keep a water bottle nearby and drink regularly. Your hydration needs can vary depending on activity, weather, pregnancy status, and other individual factors.",
      movementTitle: "Movement & Workout",
      movementDescription:
        "Gentle activity ideas based on your current activity level.",
      workoutLowWalk: "Start with a gentle 15–20 minute walk.",
      workoutLowStretch:
        "Try light stretching or mobility exercises.",
      workoutLowGradual:
        "Increase activity gradually according to your comfort.",
      workoutHighBalance:
        "Balance active days with adequate recovery.",
      workoutHighStretch:
        "Include stretching and mobility exercises.",
      workoutHighRest:
        "Allow sufficient rest if you feel tired.",
      workoutDefaultActivity:
        "Maintain regular moderate physical activity.",
      workoutDefaultExamples:
        "Walking, stretching, yoga, or light strength exercises can support general wellbeing.",
      workoutDefaultRecovery:
        "Include rest and recovery between more active days.",
      restTitle: "Rest & Recovery",
      restDescription:
        "Recovery is an important part of everyday wellbeing.",
      sleepBelowTarget:
        "Your latest recorded sleep is below 7 hours. Consider creating a consistent bedtime routine and allowing enough time for rest.",
      sleepRoutine:
        "Continue maintaining a consistent sleep routine and allow your body enough time to recover.",
      recovery: "Recovery",
      recoveryGuidance:
        "Listen to your body. Balance movement with rest, especially when you feel tired or during periods of increased stress.",
      everydayIdeas: "Everyday Wellness Ideas",
      homeCookedMeals: "Home-cooked meals",
      homeCookedMealsDescription:
        "Choose balanced meals using familiar foods and varied ingredients.",
      gentleMovement: "Gentle movement",
      gentleMovementDescription:
        "Walking, stretching, yoga, or other comfortable activities can be part of a healthy routine.",
      community: "Community",
      communityDescription:
        "Staying connected with trusted family, friends, or supportive communities can support emotional wellbeing.",
      selfCare: "Self-care",
      selfCareDescription:
        "Make time for rest, relaxation, hobbies, and activities that help you feel comfortable.",
    },

    reports: {
      title: "Reports",
      loading: "Preparing your health report...",
      loadingDescription: "Collecting your recorded health information.",
      reportTitle: "Health Report",
      subtitle: "A summary of your recorded wellbeing information.",
      printSave: "Print / Save Report",
      patientInformation: "Patient Information",
      profileDescription: "Basic profile information associated with this report.",
      name: "Name",
      email: "Email",
      age: "Age",
      lifeStage: "Life Stage",
      averageMood: "Average Mood",
      averageSleep: "Average Sleep",
      activityRecords: "Activity Records",
      pmosAwareness: "PMOS Awareness",
      healthHistory: "Health Tracking History",
      historyDescription: "Your recorded wellbeing information in chronological order.",
      noHealthRecords: "No health records available",
      noHealthRecordsDescription: "Start recording your health information to build your report history.",
      date: "Date",
      cycle: "Cycle",
      mood: "Mood",
      sleep: "Sleep",
      activity: "Activity",
      day: "Day {value}",
      hoursAbbreviation: "h",
      currentAwarenessScore: "Current awareness score",
      noData: "No Data",
      pmosUnavailable: "Record health information to receive an awareness estimate.",
      aiHealthInsights: "AI Health Insights",
      noInsights: "No personalized insights are available yet.",
      generatedOn: "Report generated",
      includedPeriod: "Included period",
      allAvailableRecords: "All available records",
      privacyNotice: "Confidential health information. Share only with the patient's consent and authorized care team.",
      menstrualHistory: "Menstrual History",
      pregnancyHistory: "Pregnancy and Postpartum History",
      mentalWellnessHistory: "Mental Wellness Assessment History",
      noMenstrualRecords: "No menstrual records available.",
      noPregnancyRecords: "No pregnancy or postpartum records available.",
      noMentalAssessments: "No mental wellness assessments available.",
      periodStart: "Period start",
      periodEnd: "Period end",
      cycleLength: "Cycle length",
      symptoms: "Symptoms",
      flowLevel: "Flow level",
      pregnancyStatus: "Pregnancy status",
      pregnancyWeek: "Pregnancy week",
      dueDate: "Due date",
      postpartumStatus: "Postpartum status",
      postpartumWeek: "Postpartum week",
      postpartumMood: "Postpartum mood",
      wellbeingNotes: "Wellbeing notes",
      assessmentType: "Assessment",
      score: "Score",
      interpretation: "Interpretation",
      totalHealthRecords: "Total health records",
      disclaimer: "SakhiAI reports support health awareness, education, wellbeing tracking, and communication with healthcare professionals. They are not a medical diagnosis or a substitute for professional medical advice. For concerning or persistent symptoms, consult a qualified healthcare professional.",
    },

    consultation: {
      brand: "SakhiAI Healthcare",
      loading: "Loading consultation information...",
      title: "Doctor Consultation",
      subtitle: "Find a healthcare professional and request a consultation.",
      availableDoctors: "Available Doctors",
      noDoctors: "No doctors available.",
      hospital: "Hospital:",
      experience: "Experience:",
      years: "{count} years",
      requestConsultation: "Request Consultation",
      myRequests: "My Consultation Requests",
      myRequestsDescription: "Track your consultations and view notes shared by your doctor.",
      refresh: "Refresh",
      noRequests: "No consultation requests.",
      noRequestsDescription: "Your requests will appear here.",
      requested: "Requested:",
      pending: "Pending",
      accepted: "Accepted",
      completed: "Completed",
      cancelled: "Cancelled",
      cancel: "Cancel",
      doctorNotes: "Doctor's Notes",
      doctorNotesDescription: "These notes were shared by your doctor. Contact your healthcare professional if you need clarification.",
      reasonLabel: "Reason for consultation",
      reasonPlaceholder: "Describe why you would like a consultation...",
      sending: "Sending...",
      sendRequest: "Send Request",
      loginRequired: "Please log in again.",
      loadDoctorsError: "Unable to load doctors.",
      loadRequestsError: "Unable to load consultation requests.",
      loadInfoError: "Unable to load consultation information.",
      reasonRequired: "Please enter a reason for consultation.",
      requestSent: "Consultation request sent to {doctor}.",
      sendError: "Unable to send consultation request.",
      cancelSuccess: "Consultation request cancelled.",
      cancelError: "Unable to cancel request.",
      doctorNotFound: "The selected doctor could not be found.",
      consultationNotFound: "The consultation request could not be found.",
      requestNoLongerPending: "Only pending consultation requests can be cancelled.",
      doctorNumber: "Doctor #{id}",
    },

    notifications: {
      title: "Notifications",
      subtitle: "Stay updated with your health reminders.",
      unread: "Unread notifications",
      total: "total",
      loading: "Loading notifications...",
      noNotifications: "No notifications yet",
      emptyDescription: "Your health reminders will appear here.",
      new: "NEW",
      markAsRead: "Mark as read",
      delete: "Delete",
      loginRequired: "Please log in again.",
      sessionExpired: "Your session has expired. Please log in again.",
      loadError: "Unable to load notifications.",
      markReadError: "Unable to mark notification as read.",
      deleteError: "Unable to delete notification.",
      doctorNotesTitle: "New Doctor's Notes",
      doctorNotesMessage: "Your doctor, {doctor}, has added or updated notes for your consultation. Log in to SakhiAI and open your consultation page to view them.",
      doctorNotesMessageGeneric: "Your doctor has added or updated notes for your consultation. Log in to SakhiAI and open your consultation page to view them.",
      cycleReminderTitle: "🌸 Cycle Reminder",
      cycleReminderMessage: "Your menstrual cycle is being tracked. Continue recording your cycle data for better predictions.",
    },
  },

  Kannada: {
    common: {
      save: "ಉಳಿಸಿ",
      update: "ನವೀಕರಿಸಿ",
      create: "ರಚಿಸಿ",
      cancel: "ರದ್ದುಮಾಡಿ",
      delete: "ಅಳಿಸಿ",
      logout: "ಲಾಗ್‌ಔಟ್",
      loading: "ಲೋಡ್ ಆಗುತ್ತಿದೆ...",
      yes: "ಹೌದು",
      no: "ಇಲ್ಲ",
      back: "ಹಿಂದೆ",
      next: "ಮುಂದೆ",
      submit: "ಸಲ್ಲಿಸಿ",
      close: "ಮುಚ್ಚಿ",
      success: "ಯಶಸ್ಸು",
      error: "ದೋಷ",
    },

    auth: {
      selectLanguage: "ವೆಬ್‌ಸೈಟ್ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",
      loginTitle: "ಮರಳಿ ಸ್ವಾಗತ",
      loginSubtitle: "ನಿಮ್ಮ SakhiAI ಖಾತೆಗೆ ಲಾಗಿನ್ ಮಾಡಿ",
      oneLoginTitle: "ಎಲ್ಲರಿಗೂ ಒಂದೇ ಲಾಗಿನ್",
      oneLoginDescription: "ನಿಮ್ಮ ಖಾತೆಯ ಪ್ರಕಾರವನ್ನು SakhiAI ಗುರುತಿಸಿ ಸರಿಯಾದ ಪೋರ್ಟಲ್‌ಗೆ ಕರೆದೊಯ್ಯುತ್ತದೆ.",
      email: "ಇಮೇಲ್",
      emailPlaceholder: "ನಿಮ್ಮ ಇಮೇಲ್ ನಮೂದಿಸಿ",
      password: "ಪಾಸ್‌ವರ್ಡ್",
      passwordPlaceholder: "ನಿಮ್ಮ ಪಾಸ್‌ವರ್ಡ್ ನಮೂದಿಸಿ",
      login: "ಲಾಗಿನ್",
      loggingIn: "ಲಾಗಿನ್ ಆಗುತ್ತಿದೆ...",
      loginRequired: "ದಯವಿಟ್ಟು ನಿಮ್ಮ ಇಮೇಲ್ ಮತ್ತು ಪಾಸ್‌ವರ್ಡ್ ನಮೂದಿಸಿ.",
      loginMissingToken: "ಲಾಗಿನ್ ಪೂರ್ಣಗೊಳಿಸಲಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
      invalidCredentials: "ಇಮೇಲ್ ಅಥವಾ ಪಾಸ್‌ವರ್ಡ್ ತಪ್ಪಾಗಿದೆ.",
      accountConflict: "ಈ ಖಾತೆಯನ್ನು ಪರಿಶೀಲಿಸಲಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಬೆಂಬಲ ತಂಡವನ್ನು ಸಂಪರ್ಕಿಸಿ.",
      loginUnavailable: "ಈಗ ಲಾಗಿನ್ ಮಾಡಲು ಸಾಧ್ಯವಾಗುತ್ತಿಲ್ಲ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
      serviceUnavailable: "ಸೇವೆ ತಾತ್ಕಾಲಿಕವಾಗಿ ಲಭ್ಯವಿಲ್ಲ. ದಯವಿಟ್ಟು ಸ್ವಲ್ಪ ಸಮಯದ ನಂತರ ಪ್ರಯತ್ನಿಸಿ.",
      backendUnavailable: "ಸೇವೆಗೆ ಸಂಪರ್ಕಿಸಲು ಸಾಧ್ಯವಾಗುತ್ತಿಲ್ಲ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
      unknownRole: "ಈ ಖಾತೆಯ ಪ್ರಕಾರವನ್ನು ಗುರುತಿಸಲಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಬೆಂಬಲ ತಂಡವನ್ನು ಸಂಪರ್ಕಿಸಿ.",
      noAccount: "SakhiAI ಖಾತೆ ಇಲ್ಲವೇ?",
      createAccount: "ಖಾತೆ ರಚಿಸಿ",
      registerTitle: "SakhiAI ಗೆ ಸೇರಿ",
      registerDescription: "SakhiAI ಅನ್ನು ಹೇಗೆ ಬಳಸಲು ಬಯಸುತ್ತೀರಿ ಎಂಬುದನ್ನು ಆಯ್ಕೆಮಾಡಿ. ರೋಗಿ ಕ್ಷೇಮ ಖಾತೆ ಅಥವಾ ಆರೋಗ್ಯ ವೃತ್ತಿಪರ ಖಾತೆಯನ್ನು ರಚಿಸಿ.",
      patientAccount: "ರೋಗಿ ಖಾತೆ",
      patientDescription: "ಮಾಸಿಕ ಧರ್ಮದ ಆರೋಗ್ಯ, ಕ್ಷೇಮ, ಗರ್ಭಧಾರಣೆ, ಮನಸ್ಥಿತಿ ಮತ್ತು ಜೀವನಶೈಲಿಯನ್ನು ದಾಖಲಿಸಿ; ಆರೋಗ್ಯ ಅರಿವಿಗೆ ಬೆಂಬಲಕಾರಿ ಮಾಹಿತಿ ಪಡೆಯಿರಿ.",
      healthTracking: "ಆರೋಗ್ಯ ಮತ್ತು ಕ್ಷೇಮ ದಾಖಲಿಕೆ",
      cycleTracking: "ಮಾಸಿಕ ಧರ್ಮ ಮತ್ತು ಗರ್ಭಧಾರಣೆ ದಾಖಲಿಕೆ",
      emotionalSupport: "SakhiAI ಭಾವನಾತ್ಮಕ ಬೆಂಬಲ",
      healthInsights: "AI ಆರೋಗ್ಯ ಒಳನೋಟಗಳು",
      consultationRequests: "ವೈದ್ಯರ ಸಮಾಲೋಚನೆ ವಿನಂತಿಗಳು",
      registerPatient: "ರೋಗಿಯಾಗಿ ನೋಂದಾಯಿಸಿ",
      professionalAccount: "ಆರೋಗ್ಯ ವೃತ್ತಿಪರರು",
      professionalDescription: "SakhiAI ಮೂಲಕ ರೋಗಿಗಳ ಸಮಾಲೋಚನೆ ವಿನಂತಿಗಳನ್ನು ಸ್ವೀಕರಿಸಿ ನಿರ್ವಹಿಸಲು ವೃತ್ತಿಪರ ಖಾತೆ ರಚಿಸಿ.",
      professionalProfile: "ವೃತ್ತಿಪರ ಪ್ರೊಫೈಲ್",
      viewRequests: "ಸಮಾಲೋಚನೆ ವಿನಂತಿಗಳನ್ನು ನೋಡಿ",
      acceptDecline: "ವಿನಂತಿಗಳನ್ನು ಸ್ವೀಕರಿಸಿ ಅಥವಾ ನಿರಾಕರಿಸಿ",
      consultationNotes: "ಸಮಾಲೋಚನೆ ಟಿಪ್ಪಣಿಗಳನ್ನು ಸೇರಿಸಿ",
      consultationHistory: "ಸಮಾಲೋಚನೆ ಇತಿಹಾಸ ನಿರ್ವಹಣೆ",
      registerProfessional: "ಆರೋಗ್ಯ ವೃತ್ತಿಪರರಾಗಿ ನೋಂದಾಯಿಸಿ",
      alreadyHaveAccount: "ಈಗಾಗಲೇ SakhiAI ಖಾತೆ ಇದೆಯೇ?",
      loginToAccount: "ನಿಮ್ಮ ಖಾತೆಗೆ ಲಾಗಿನ್ ಮಾಡಿ",
      back: "ಹಿಂದೆ",
      patientRegisterTitle: "ರೋಗಿ ಖಾತೆ ರಚಿಸಿ",
      patientRegisterSubtitle: "ನಿಮ್ಮ SakhiAI ಕ್ಷೇಮ ಖಾತೆಯನ್ನು ರಚಿಸಿ",
      fullName: "ಪೂರ್ಣ ಹೆಸರು",
      fullNamePlaceholder: "ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರನ್ನು ನಮೂದಿಸಿ",
      age: "ವಯಸ್ಸು",
      agePlaceholder: "ನಿಮ್ಮ ವಯಸ್ಸನ್ನು ನಮೂದಿಸಿ",
      preferredLanguage: "ಆದ್ಯತೆಯ ಭಾಷೆ",
      languageEnglish: "ಇಂಗ್ಲಿಷ್",
      languageKannada: "ಕನ್ನಡ",
      languageHindi: "ಹಿಂದಿ",
      lifeStage: "ಜೀವನದ ಹಂತ",
      adult: "ವಯಸ್ಕ",
      adolescent: "ಹದಿಹರೆಯದವರು",
      pregnancy: "ಗರ್ಭಧಾರಣೆ",
      postpartum: "ಪ್ರಸವಾನಂತರ",
      perimenopause: "ಪೆರಿಮೆನೋಪಾಸ್",
      menopause: "ಮೆನೋಪಾಸ್",
      requiredFields: "ದಯವಿಟ್ಟು ಅಗತ್ಯವಿರುವ ಎಲ್ಲಾ ವಿವರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ.",
      registrationSuccess: "ನೋಂದಣಿ ಯಶಸ್ವಿಯಾಗಿದೆ.",
      registrationFailed: "ನೋಂದಣಿ ವಿಫಲವಾಗಿದೆ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
      registrationUnavailable: "ಸೇವೆಗೆ ಸಂಪರ್ಕಿಸಲು ಸಾಧ್ಯವಾಗುತ್ತಿಲ್ಲ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
      unableToRegister: "ಈಗ ನೋಂದಾಯಿಸಲು ಸಾಧ್ಯವಾಗುತ್ತಿಲ್ಲ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
      creatingAccount: "ಖಾತೆ ರಚಿಸಲಾಗುತ್ತಿದೆ...",
      alreadyHavePatientAccount: "ಈಗಾಗಲೇ ಖಾತೆ ಇದೆಯೇ?",
      doctorRegisterTitle: "ವೈದ್ಯರ ನೋಂದಣಿ",
      doctorRegisterSubtitle: "ರೋಗಿಗಳ ಸಮಾಲೋಚನೆ ವಿನಂತಿಗಳನ್ನು ನಿರ್ವಹಿಸಲು ವೃತ್ತಿಪರ ಖಾತೆ ರಚಿಸಿ.",
      specialization: "ವಿಶೇಷತೆ",
      hospitalClinic: "ಆಸ್ಪತ್ರೆ / ಕ್ಲಿನಿಕ್",
      hospitalPlaceholder: "ಆಸ್ಪತ್ರೆಯ ಹೆಸರು",
      experienceYears: "ಅನುಭವ (ವರ್ಷಗಳು)",
      phone: "ದೂರವಾಣಿ",
      phonePlaceholder: "ದೂರವಾಣಿ ಸಂಖ್ಯೆ",
      professionalBio: "ವೃತ್ತಿಪರ ಪರಿಚಯ",
      bioPlaceholder: "ಸಂಕ್ಷಿಪ್ತ ವೃತ್ತಿಪರ ವಿವರಣೆ...",
      doctorRegisterSuccess: "ವೈದ್ಯರ ನೋಂದಣಿ ಯಶಸ್ವಿಯಾಗಿದೆ. ಲಾಗಿನ್‌ಗೆ ಕರೆದೊಯ್ಯಲಾಗುತ್ತಿದೆ...",
      registerDoctor: "ವೈದ್ಯರಾಗಿ ನೋಂದಾಯಿಸಿ",
      doctorRegistrationFailed: "ಈಗ ನೋಂದಾಯಿಸಲು ಸಾಧ್ಯವಾಗುತ್ತಿಲ್ಲ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
      duplicateEmail: "ಈ ಇಮೇಲ್ ಈಗಾಗಲೇ ನೋಂದಾಯಿಸಲಾಗಿದೆ. ಲಾಗಿನ್ ಮಾಡಿ ಅಥವಾ ಬೇರೆ ಇಮೇಲ್ ಬಳಸಿ.",
    },

    doctorDashboard: {
      title: "ವೈದ್ಯರ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
      subtitle: "ರೋಗಿಗಳ ಸಮಾಲೋಚನೆ ವಿನಂತಿಗಳನ್ನು ಮತ್ತು ಅವುಗಳ ಸ್ಥಿತಿಯನ್ನು ನಿರ್ವಹಿಸಿ.",
      loading: "ಸಮಾಲೋಚನೆ ವಿನಂತಿಗಳನ್ನು ಲೋಡ್ ಮಾಡಲಾಗುತ್ತಿದೆ...",
      tryAgain: "ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ",
      pending: "ಬಾಕಿ",
      accepted: "ಸ್ವೀಕರಿಸಲಾಗಿದೆ",
      completed: "ಪೂರ್ಣಗೊಂಡಿದೆ",
      cancelled: "ರದ್ದುಗೊಳಿಸಲಾಗಿದೆ",
      awaitingResponse: "ಪ್ರತಿಕ್ರಿಯೆಗಾಗಿ ಕಾಯುತ್ತಿದೆ",
      activeConsultations: "ಸಕ್ರಿಯ ಸಮಾಲೋಚನೆಗಳು",
      finishedConsultations: "ಮುಗಿದ ಸಮಾಲೋಚನೆಗಳು",
      declinedRequests: "ನಿರಾಕರಿಸಿದ ವಿನಂತಿಗಳು",
      all: "ಎಲ್ಲಾ",
      consultationRequests: "ಸಮಾಲೋಚನೆ ವಿನಂತಿಗಳು",
      reportWorkspace: "ರೋಗಿ ವರದಿಗಳು ಮತ್ತು ಸಮಾಲೋಚನೆ ವಿವರಗಳು",
      consultationCountSingular: "ಸಮಾಲೋಚನೆ",
      consultationCount: "ಸಮಾಲೋಚನೆಗಳು",
      refresh: "ಮರುಲೋಡ್",
      refreshing: "ಮರುಲೋಡ್ ಆಗುತ್ತಿದೆ...",
      noConsultations: "ಸಮಾಲೋಚನೆ ವಿನಂತಿಗಳಿಲ್ಲ",
      noFilteredConsultations: "ಈ ಸ್ಥಿತಿಯಲ್ಲಿ ಸಮಾಲೋಚನೆಗಳಿಲ್ಲ.",
      requestsEmptyHelp: "ರೋಗಿಗಳ ಸಮಾಲೋಚನೆ ವಿನಂತಿಗಳು ಇಲ್ಲಿ ಕಾಣಿಸುತ್ತವೆ.",
      consultation: "ಸಮಾಲೋಚನೆ",
      patient: "ರೋಗಿ",
      unknownPatient: "ರೋಗಿಯ ಹೆಸರು ಲಭ್ಯವಿಲ್ಲ",
      patientId: "ರೋಗಿ ID",
      requestedOn: "ವಿನಂತಿಸಿದ ದಿನಾಂಕ",
      patientsReason: "ರೋಗಿಯ ಕಾರಣ",
      reasonUnavailable: "ಯಾವುದೇ ಕಾರಣ ನೀಡಲಾಗಿಲ್ಲ.",
      showFullReason: "ಪೂರ್ಣ ಕಾರಣ ಓದಿ",
      hideFullReason: "ಕಡಿಮೆ ತೋರಿಸಿ",
      viewDetails: "ವಿವರಗಳನ್ನು ನೋಡಿ",
      acceptRequest: "ವಿನಂತಿ ಸ್ವೀಕರಿಸಿ",
      declineRequest: "ವಿನಂತಿ ನಿರಾಕರಿಸಿ",
      markCompleted: "ಪೂರ್ಣಗೊಂಡಿದೆ ಎಂದು ಗುರುತಿಸಿ",
      accepting: "ಸ್ವೀಕರಿಸಲಾಗುತ್ತಿದೆ...",
      declining: "ನಿರಾಕರಿಸಲಾಗುತ್ತಿದೆ...",
      completing: "ಪೂರ್ಣಗೊಳಿಸಲಾಗುತ್ತಿದೆ...",
      consultationCompleted: "ಸಮಾಲೋಚನೆ ಪೂರ್ಣಗೊಂಡಿದೆ.",
      consultationDeclined: "ಈ ಸಮಾಲೋಚನೆ ವಿನಂತಿಯನ್ನು ನಿರಾಕರಿಸಲಾಗಿದೆ.",
      statusUpdated: "ಸಮಾಲೋಚನೆಯ ಸ್ಥಿತಿ ನವೀಕರಿಸಲಾಗಿದೆ.",
      statusUpdateError: "ಸ್ಥಿತಿಯನ್ನು ನವೀಕರಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
      detailsTitle: "ಸಮಾಲೋಚನೆಯ ವಿವರಗಳು",
      patientInformation: "ರೋಗಿಯ ಮಾಹಿತಿ",
      consultationInformation: "ಸಮಾಲೋಚನೆ ಮಾಹಿತಿ",
      doctorId: "ವೈದ್ಯರ ID",
      status: "ಸ್ಥಿತಿ",
      requestedDate: "ವಿನಂತಿಸಿದ ದಿನಾಂಕ",
      doctorNotes: "ವೈದ್ಯರ ಟಿಪ್ಪಣಿಗಳು",
      notesPlaceholder: "ಅವಲೋಕನಗಳು, ಸಲಹೆ, ಶಿಫಾರಸುಗಳು ಅಥವಾ ಮುಂದಿನ ಅನುಸರಣೆ ಸೂಚನೆಗಳನ್ನು ನಮೂದಿಸಿ...",
      saveNotes: "ಟಿಪ್ಪಣಿಗಳನ್ನು ಉಳಿಸಿ",
      saving: "ಉಳಿಸಲಾಗುತ್ತಿದೆ...",
      notesSaved: "ವೈದ್ಯರ ಟಿಪ್ಪಣಿಗಳನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಉಳಿಸಲಾಗಿದೆ.",
      notesSaveError: "ಟಿಪ್ಪಣಿಗಳನ್ನು ಉಳಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
      closeDetails: "ವಿವರಗಳನ್ನು ಮುಚ್ಚಿ",
      close: "ಮುಚ್ಚಿ",
      authError: "ದೃಢೀಕರಣ ವಿಫಲವಾಗಿದೆ. ದಯವಿಟ್ಟು ವೈದ್ಯರಾಗಿ ಲಾಗಿನ್ ಮಾಡಿ.",
      accessError: "ನಿಮಗೆ ವೈದ್ಯರ ಪ್ರವೇಶವಿಲ್ಲ.",
      loadError: "ಸಮಾಲೋಚನೆ ವಿನಂತಿಗಳನ್ನು ಲೋಡ್ ಮಾಡಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ.",
      popupsBlocked: "ರೋಗಿ ವರದಿಯನ್ನು ಮುದ್ರಿಸಲು ಅಥವಾ ಉಳಿಸಲು ಪಾಪ್-ಅಪ್‌ಗಳನ್ನು ಅನುಮತಿಸಿ.",
      preparingReport: "ರೋಗಿ ವರದಿ ಸಿದ್ಧಪಡಿಸಲಾಗುತ್ತಿದೆ...",
      downloadPatientReport: "ರೋಗಿ ವರದಿ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ",
    },

    landing: {
      selectLanguage: "ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",
      login: "ಲಾಗಿನ್",
      getStarted: "ಪ್ರಾರಂಭಿಸಿ",
      heroBadge: "AI ಆಧಾರಿತ ಮಹಿಳಾ ಕ್ಷೇಮ ವೇದಿಕೆ",
      heroTitle: "ನಿಮ್ಮ ಆರೋಗ್ಯದ ಪಯಣ,",
      heroHighlight: "ಕಾಳಜಿಯಿಂದ ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲಾಗಿದೆ.",
      heroDescription: "SakhiAI ಸಾಂಸ್ಕೃತಿಕವಾಗಿ ಸೂಕ್ಷ್ಮವಾದ, ವಿವರಿಸಬಹುದಾದ AI ಆಧಾರಿತ ಮಹಿಳೆಯರ ಜೀವನಚಕ್ರ ಆರೋಗ್ಯ ನಿರ್ವಹಣಾ ವ್ಯವಸ್ಥೆಯಾಗಿದ್ದು, ಆರೋಗ್ಯ ಅರಿವು, ಕ್ಷೇಮ ಟ್ರ್ಯಾಕಿಂಗ್, ಭಾವನಾತ್ಮಕ ಬೆಂಬಲ ಮತ್ತು ಆರೋಗ್ಯ ವೃತ್ತಿಪರರ ಸಂಪರ್ಕಕ್ಕೆ ಸಹಾಯ ಮಾಡುತ್ತದೆ.",
      startJourney: "ನಿಮ್ಮ ಪಯಣ ಆರಂಭಿಸಿ",
      doctorPortal: "ವೈದ್ಯರ ಪೋರ್ಟಲ್",
      learnMore: "ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ",
      awarenessNotice: "ಆರೋಗ್ಯ ಅರಿವು ಮತ್ತು ಕ್ಷೇಮ ಬೆಂಬಲಕ್ಕಾಗಿ ಮಾತ್ರ — ವೈದ್ಯಕೀಯ ನಿರ್ಣಯವಲ್ಲ.",
      journey: "ನಿಮ್ಮ ಕ್ಷೇಮದ ಪಯಣ",
      manyNeeds: "ಒಂದೇ ಸ್ಥಳ. ಹಲವು ಅಗತ್ಯಗಳು.",
      cycle: "ಚಕ್ರ",
      trackPatterns: "ಮಾದರಿಗಳನ್ನು ದಾಖಲಿಸಿ",
      wellness: "ಕ್ಷೇಮ",
      understandTrends: "ಪ್ರವೃತ್ತಿಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ",
      sakhiAi: "SakhiAI",
      emotionalSupport: "ಭಾವನಾತ್ಮಕ ಬೆಂಬಲ",
      doctors: "ವೈದ್ಯರು",
      connectSafely: "ಸುರಕ್ಷಿತವಾಗಿ ಸಂಪರ್ಕಿಸಿ",
      about: "SakhiAI ಬಗ್ಗೆ",
      lifeCycleTitle: "ಮಹಿಳೆಯರ ಜೀವನಚಕ್ರವನ್ನು ಗಮನದಲ್ಲಿಟ್ಟುಕೊಂಡು ರೂಪಿಸಲಾಗಿದೆ",
      aboutDescription: "SakhiAI ಆರೋಗ್ಯ ಟ್ರ್ಯಾಕಿಂಗ್, ಭಾವನಾತ್ಮಕ ಕ್ಷೇಮ, ಶೈಕ್ಷಣಿಕ ಅರಿವು, AI ಆಧಾರಿತ ಒಳನೋಟಗಳು ಮತ್ತು ಆರೋಗ್ಯ ವೃತ್ತಿಪರರ ಬೆಂಬಲವನ್ನು ಒಂದೇ ವೇದಿಕೆಯಲ್ಲಿ ಒದಗಿಸುತ್ತದೆ.",
      menstrualHealth: "ಮಾಸಿಕ ಧರ್ಮದ ಆರೋಗ್ಯ",
      menstrualDescription: "ಮಾಸಿಕ ಅವಧಿಗಳು, ಚಕ್ರದ ಮಾಹಿತಿ, ಲಕ್ಷಣಗಳು, ನೋವು, ಮನಸ್ಥಿತಿ ಮತ್ತು PMS ಮಾದರಿಗಳನ್ನು ದಾಖಲಿಸಿ.",
      pregnancyPostpartum: "ಗರ್ಭಧಾರಣೆ ಮತ್ತು ಪ್ರಸವೋತ್ತರ ಅವಧಿ",
      pregnancyDescription: "ಗರ್ಭಧಾರಣೆಯ ಕ್ಷೇಮ ಮಾಹಿತಿಯನ್ನು ದಾಖಲಿಸಿ ಮತ್ತು ಪ್ರಸವೋತ್ತರ ಭಾವನಾತ್ಮಕ ಕ್ಷೇಮವನ್ನು ಗಮನಿಸಿ.",
      mentalWellness: "ಮಾನಸಿಕ ಕ್ಷೇಮ",
      mentalDescription: "ಅರಿವು ಪ್ರಶ್ನಾವಳಿಗಳನ್ನು ಪೂರ್ಣಗೊಳಿಸಿ ಮತ್ತು ಕಾಲಕ್ರಮೇಣ ಕ್ಷೇಮದ ಪ್ರವೃತ್ತಿಗಳನ್ನು ಗಮನಿಸಿ.",
      generalWellness: "ಸಾಮಾನ್ಯ ಕ್ಷೇಮ",
      generalDescription: "ನಿದ್ರೆ, ಚಟುವಟಿಕೆ, ಮನಸ್ಥಿತಿ ಮತ್ತು ದೈನಂದಿನ ಕ್ಷೇಮ ಮಾಹಿತಿಯನ್ನು ದಾಖಲಿಸಿ.",
      twoExperiences: "ಒಂದೇ ವೇದಿಕೆ, ಎರಡು ಅನುಭವಗಳು",
      portalsTitle: "ರೋಗಿಗಳು ಮತ್ತು ಆರೋಗ್ಯ ವೃತ್ತಿಪರರಿಗಾಗಿ ರೂಪಿಸಲಾಗಿದೆ",
      portalsDescription: "SakhiAI ತಮ್ಮ ಕ್ಷೇಮವನ್ನು ನಿರ್ವಹಿಸುವ ಮಹಿಳೆಯರು ಮತ್ತು ಅವರಿಗೆ ಬೆಂಬಲ ನೀಡುವ ಆರೋಗ್ಯ ವೃತ್ತಿಪರರಿಗೆ ಪ್ರತ್ಯೇಕ ಅನುಭವವನ್ನು ಒದಗಿಸುತ್ತದೆ.",
      patientPortal: "ರೋಗಿಯ ಪೋರ್ಟಲ್",
      patientDescription: "ನಿಮ್ಮ ಮಹಿಳಾ ಆರೋಗ್ಯದ ಪಯಣವನ್ನು ದಾಖಲಿಸಲು, ಕ್ಷೇಮ ಮಾದರಿಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ಮತ್ತು ಬೆಂಬಲ ಸಂಪನ್ಮೂಲಗಳನ್ನು ಪಡೆಯಲು ವೈಯಕ್ತಿಕ ಸ್ಥಳ.",
      healthTracking: "ಆರೋಗ್ಯ ಮತ್ತು ಕ್ಷೇಮ ಟ್ರ್ಯಾಕಿಂಗ್",
      cycleTracking: "ಮಾಸಿಕ ಚಕ್ರದ ಟ್ರ್ಯಾಕಿಂಗ್",
      pmosAwareness: "PMOS ಅರಿವು",
      pregnancyWellbeing: "ಗರ್ಭಧಾರಣೆ ಮತ್ತು ಪ್ರಸವೋತ್ತರ ಕ್ಷೇಮ",
      mentalAssessments: "ಮಾನಸಿಕ ಕ್ಷೇಮ ಮೌಲ್ಯಮಾಪನಗಳು",
      companion: "AI ಆಧಾರಿತ SakhiAI ಸಹಚರಿ",
      explainableInsights: "ವಿವರಿಸಬಹುದಾದ ಕ್ಷೇಮ ಒಳನೋಟಗಳು",
      consultations: "ವೈದ್ಯರ ಸಮಾಲೋಚನೆಗಳು",
      reportsHistory: "ವರದಿಗಳು ಮತ್ತು ಆರೋಗ್ಯ ಇತಿಹಾಸ",
      createPatientAccount: "ರೋಗಿ ಖಾತೆ ರಚಿಸಿ",
      patientLogin: "ರೋಗಿ ಲಾಗಿನ್",
      doctorDescription: "ನೋಂದಾಯಿತ ಆರೋಗ್ಯ ವೃತ್ತಿಪರರು ಸಮಾಲೋಚನೆ ವಿನಂತಿಗಳು ಮತ್ತು ರೋಗಿಗಳ ಸಂವಹನವನ್ನು ನಿರ್ವಹಿಸಲು ಮೀಸಲಾದ ಕಾರ್ಯಸ್ಥಳ.",
      doctorRegistration: "ವೈದ್ಯರ ನೋಂದಣಿ",
      secureDoctorLogin: "ಸುರಕ್ಷಿತ ವೈದ್ಯರ ಲಾಗಿನ್",
      doctorDashboard: "ವೈದ್ಯರ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
      incomingRequests: "ಬರುವ ಸಮಾಲೋಚನೆ ವಿನಂತಿಗಳು",
      patientInformation: "ರೋಗಿಯ ಮಾಹಿತಿ",
      acceptDecline: "ವಿನಂತಿಗಳನ್ನು ಸ್ವೀಕರಿಸಿ ಅಥವಾ ನಿರಾಕರಿಸಿ",
      statusManagement: "ಸಮಾಲೋಚನೆ ಸ್ಥಿತಿ ನಿರ್ವಹಣೆ",
      doctorNotes: "ವೈದ್ಯರ ಟಿಪ್ಪಣಿಗಳು",
      consultationHistory: "ಸಮಾಲೋಚನೆ ಇತಿಹಾಸ",
      registerDoctor: "ವೈದ್ಯರಾಗಿ ನೋಂದಾಯಿಸಿ",
      doctorLogin: "ವೈದ್ಯರ ಲಾಗಿನ್",
      intelligentSupport: "ಬುದ್ಧಿವಂತ ಬೆಂಬಲ",
      aiTitle: "ವಿವರಿಸುವ, ಬೆಂಬಲಿಸುವ ಮತ್ತು ಮಾರ್ಗದರ್ಶನ ನೀಡುವ AI",
      aiDescription: "ಬಳಕೆದಾರರು ತಮ್ಮ ಕ್ಷೇಮದ ಮಾದರಿಗಳನ್ನು ಚೆನ್ನಾಗಿ ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು SakhiAI ಅರ್ಥವಾಗುವ ವಿವರಣೆಗಳೊಂದಿಗೆ AI ಆಧಾರಿತ ಅರಿವನ್ನು ಒದಗಿಸುತ್ತದೆ.",
      companionTitle: "SakhiAI ಸಹಚರಿ",
      companionDescription: "ಭಾವನಾತ್ಮಕ ಕ್ಷೇಮ ಮತ್ತು ಆರೋಗ್ಯ ಅರಿವಿಗಾಗಿ ಬೆಂಬಲದ ಸಂವಾದಾತ್ಮಕ ಸಹಚರಿ.",
      explainableAi: "ವಿವರಿಸಬಹುದಾದ AI",
      explainableDescription: "ಯಾವ ದಾಖಲಾದ ಅಂಶಗಳು ಅರಿವಿನ ಅಂಕಕ್ಕೆ ಹೇಗೆ ಕೊಡುಗೆ ನೀಡುತ್ತವೆ ಎಂಬುದನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ.",
      privacySafety: "ಗೌಪ್ಯತೆ ಮತ್ತು ಸುರಕ್ಷತೆ",
      privacyDescription: "ಜವಾಬ್ದಾರಿಯುತ ಆರೋಗ್ಯ ಅರಿವು, ಸುರಕ್ಷಿತ ಪ್ರವೇಶ ಮತ್ತು ಸ್ಪಷ್ಟ ಮಿತಿಗಳನ್ನು ಗಮನದಲ್ಲಿಟ್ಟುಕೊಂಡು ರೂಪಿಸಲಾಗಿದೆ.",
      healthcareConnection: "ಆರೋಗ್ಯ ಸೇವೆಯ ಸಂಪರ್ಕ",
      professionalSupport: "ವೃತ್ತಿಪರ ಬೆಂಬಲ ಬೇಕಾದಾಗ",
      connectionDescription: "ಸಮಾಲೋಚನೆ ವಿನಂತಿಗಳ ಮೂಲಕ ರೋಗಿಗಳು ಮತ್ತು ನೋಂದಾಯಿತ ಆರೋಗ್ಯ ವೃತ್ತಿಪರರ ನಡುವೆ SakhiAI ಸಂಯೋಜಿತ ಸಂಪರ್ಕವನ್ನು ಒದಗಿಸುತ್ತದೆ.",
      selectProfessional: "ರೋಗಿಯು ಆರೋಗ್ಯ ವೃತ್ತಿಪರರನ್ನು ಆಯ್ಕೆಮಾಡುತ್ತಾರೆ",
      sendRequest: "ರೋಗಿಯು ಸಮಾಲೋಚನೆ ವಿನಂತಿಯನ್ನು ಕಳುಹಿಸುತ್ತಾರೆ",
      doctorReviews: "ವೈದ್ಯರು ವಿನಂತಿಯನ್ನು ಪರಿಶೀಲಿಸಿ ಪ್ರತಿಕ್ರಿಯಿಸುತ್ತಾರೆ",
      accessibleHistory: "ಸಮಾಲೋಚನೆಯ ಸ್ಥಿತಿ ಮತ್ತು ಇತಿಹಾಸ ಲಭ್ಯವಾಗಿರುತ್ತದೆ",
      patientDoctor: "ರೋಗಿ ↔ ವೈದ್ಯರು",
      structuredCommunication: "ಸಂಯೋಜಿತ ಆರೋಗ್ಯ ಸಂವಹನ",
      patientRequest: "ರೋಗಿಯ ಸಮಾಲೋಚನೆ ವಿನಂತಿ",
      doctorReview: "ವೈದ್ಯರ ಪರಿಶೀಲನೆ",
      statusHistory: "ಸಮಾಲೋಚನೆ ಸ್ಥಿತಿ ಮತ್ತು ಇತಿಹಾಸ",
      healthDisclaimerTitle: "ಆರೋಗ್ಯ ಅರಿವು, ವೈದ್ಯಕೀಯ ನಿರ್ಣಯವಲ್ಲ",
      healthDisclaimer: "ಕ್ಷೇಮವನ್ನು ದಾಖಲಿಸಲು, ಆರೋಗ್ಯ ಮಾಹಿತಿಯನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು, ಬೆಂಬಲದ ಮಾರ್ಗದರ್ಶನ ಪಡೆಯಲು ಮತ್ತು ವೃತ್ತಿಪರ ಬೆಂಬಲ ಯಾವಾಗ ಸೂಕ್ತವೆಂದು ಗುರುತಿಸಲು SakhiAI ಸಹಾಯ ಮಾಡುತ್ತದೆ. ಇದು ಅರ್ಹ ಆರೋಗ್ಯ ವೃತ್ತಿಪರರಿಗೆ ಪರ್ಯಾಯವಲ್ಲ ಮತ್ತು ವೈದ್ಯಕೀಯ ನಿರ್ಣಯ ನೀಡುವುದಿಲ್ಲ.",
      beginJourney: "ನಿಮ್ಮ SakhiAI ಪಯಣ ಆರಂಭಿಸಿ",
      startDescription: "ನಿಮ್ಮ ಕ್ಷೇಮವನ್ನು ದಾಖಲಿಸಿ ಮತ್ತು ಆರೋಗ್ಯದ ಪಯಣವನ್ನು ಒಂದೇ ಸ್ಥಳದಲ್ಲಿ ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ.",
      joinDoctor: "ವೈದ್ಯರಾಗಿ ಸೇರಿ",
      brandTagline: "ಸಾಂಸ್ಕೃತಿಕವಾಗಿ ಸೂಕ್ಷ್ಮವಾದ, ವಿವರಿಸಬಹುದಾದ AI ಆಧಾರಿತ ಮಹಿಳೆಯರ ಜೀವನಚಕ್ರ ಆರೋಗ್ಯ ನಿರ್ವಹಣಾ ವ್ಯವಸ್ಥೆ",
      footerNotice: "ಅರಿವು ಮತ್ತು ಕ್ಷೇಮ ಬೆಂಬಲಕ್ಕಾಗಿ ಮಾತ್ರ.",
    },

    navigation: {
      patientTagline: "ಮಹಿಳಾ ಆರೋಗ್ಯ ಸಹಚರಿ",
      notifications: "ಅಧಿಸೂಚನೆಗಳು",
      healthTracking: "ಆರೋಗ್ಯ ಟ್ರ್ಯಾಕಿಂಗ್",
      doctorConsultation: "ವೈದ್ಯರ ಸಮಾಲೋಚನೆ",
      menstrual: "ಮಾಸಿಕ ಚಕ್ರ ಟ್ರ್ಯಾಕಿಂಗ್",
      mentalWellness: "ಮಾನಸಿಕ ಕ್ಷೇಮ",
      pmos: "PMOS ಅರಿವು",
      pregnancy: "ಗರ್ಭಧಾರಣೆ ಬೆಂಬಲ",
      aiAssistant: "AI ಸಹಾಯಕ",
      community: "ಸಮುದಾಯ",
      dietWorkout: "ಆಹಾರ ಮತ್ತು ವ್ಯಾಯಾಮ",
      reports: "ವರದಿಗಳು",
      profile: "ಪ್ರೊಫೈಲ್",
      settings: "ಸೆಟ್ಟಿಂಗ್‌ಗಳು",
      logout: "ಲಾಗ್‌ಔಟ್",
    },

    settings: {
      title: "ಸೆಟ್ಟಿಂಗ್‌ಗಳು",
      subtitle:
        "ನಿಮ್ಮ ಆದ್ಯತೆಗಳು, ಗೌಪ್ಯತೆ ಮತ್ತು ಖಾತೆ ಸೆಟ್ಟಿಂಗ್‌ಗಳನ್ನು ನಿರ್ವಹಿಸಿ.",
      preferences: "ಆದ್ಯತೆಗಳು",
      preferencesDescription:
        "SakhiAI ನಿಮಗಾಗಿ ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸಬೇಕು ಎಂಬುದನ್ನು ಹೊಂದಿಸಿ.",
      language: "ಭಾಷೆ",
      languageDescription:
        "ನಿಮ್ಮ ಆದ್ಯತೆಯ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
      notifications: "ಅಧಿಸೂಚನೆಗಳು",
      notificationsDescription:
        "ಪ್ರಮುಖ SakhiAI ಅಧಿಸೂಚನೆಗಳನ್ನು ಸ್ವೀಕರಿಸಿ.",
      reminders: "ಆರೋಗ್ಯ ಜ್ಞಾಪನೆಗಳು",
      remindersDescription:
        "ಆರೋಗ್ಯ ಟ್ರ್ಯಾಕಿಂಗ್ ಮತ್ತು ಕ್ಷೇಮ ಚಟುವಟಿಕೆಗಳಿಗಾಗಿ ಜ್ಞಾಪನೆಗಳನ್ನು ಸ್ವೀಕರಿಸಿ.",
      savePreferences: "ಆದ್ಯತೆಗಳನ್ನು ಉಳಿಸಿ",
      saved: "ಸೆಟ್ಟಿಂಗ್‌ಗಳನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಉಳಿಸಲಾಗಿದೆ.",
      saveError: "ಸೆಟ್ಟಿಂಗ್‌ಗಳನ್ನು ಉಳಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ.",
      privacySecurity: "ಗೌಪ್ಯತೆ ಮತ್ತು ಭದ್ರತೆ",
      privacyDescription:
        "ನಿಮ್ಮ ಮಾಹಿತಿಯನ್ನು ಹೇಗೆ ನಿರ್ವಹಿಸಲಾಗುತ್ತದೆ ಎಂಬುದನ್ನು ತಿಳಿಯಿರಿ.",
      healthDataPrivacy: "ಆರೋಗ್ಯ ಡೇಟಾ ಗೌಪ್ಯತೆ",
      healthDataPrivacyDescription:
        "ನಿಮ್ಮ ಆರೋಗ್ಯ ಮಾಹಿತಿಯನ್ನು ಹೇಗೆ ರಕ್ಷಿಸಲಾಗಿದೆ ಎಂಬುದನ್ನು ತಿಳಿಯಿರಿ.",
      aiDataUsage: "AI ಡೇಟಾ ಬಳಕೆ",
      aiDataUsageDescription:
        "ನಿಮ್ಮ ಮಾಹಿತಿಯು AI ವೈಶಿಷ್ಟ್ಯಗಳಿಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡುತ್ತದೆ ಎಂಬುದನ್ನು ತಿಳಿಯಿರಿ.",
      healthPrivacyDetails:
        "ನೀವು ಒದಗಿಸುವ ಆರೋಗ್ಯ ಮಾಹಿತಿಯನ್ನು ಆರೋಗ್ಯ ಟ್ರ್ಯಾಕಿಂಗ್, ಕ್ಷೇಮ ಒಳನೋಟಗಳು ಮತ್ತು ವೈಯಕ್ತಿಕ ಅರಿವು ವೈಶಿಷ್ಟ್ಯಗಳಿಗೆ SakhiAI ಬಳಸುತ್ತದೆ.",
      accessDetails:
        "ಅಧಿಕೃತ ವ್ಯವಸ್ಥೆಯ ಭಾಗಗಳು ಮಾತ್ರ ನಿಮ್ಮ ಮಾಹಿತಿಯನ್ನು ಪ್ರವೇಶಿಸಬೇಕು. ಸೂಕ್ತ ಅನುಮತಿಯಿಲ್ಲದೆ ಇತರ ಬಳಕೆದಾರರೊಂದಿಗೆ ಹಂಚಿಕೊಳ್ಳಬಾರದು.",
      aiUsageDetails:
        "ವೈಯಕ್ತಿಕ ಅರಿವು ಒಳನೋಟಗಳು ಮತ್ತು ಅಂದಾಜುಗಳನ್ನು ರಚಿಸಲು ವೇದಿಕೆಯಲ್ಲಿ ದಾಖಲಾದ ಮಾಹಿತಿಯನ್ನು SakhiAI ಬಳಸಬಹುದು.",
      aiDisclaimer:
        "AI ರಚಿಸಿದ ಮಾಹಿತಿಯು ಆರೋಗ್ಯ ಅರಿವು ಮತ್ತು ಕ್ಷೇಮ ಬೆಂಬಲಕ್ಕಾಗಿ ಮಾತ್ರ; ಇದನ್ನು ವೈದ್ಯಕೀಯ ನಿರ್ಣಯವೆಂದು ಪರಿಗಣಿಸಬಾರದು.",
      account: "ಖಾತೆ",
      accountDescription:
        "ನಿಮ್ಮ SakhiAI ಖಾತೆಯ ಪ್ರವೇಶವನ್ನು ನಿರ್ವಹಿಸಿ.",
      deleteAccount: "ಖಾತೆಯನ್ನು ಅಳಿಸಿ",
      deleteConfirmation:
        "ನಿಮ್ಮ ಖಾತೆಯನ್ನು ಅಳಿಸಲು ನೀವು ಖಚಿತವಾಗಿದ್ದೀರಾ? ಈ ಕ್ರಿಯೆಯನ್ನು ರದ್ದುಗೊಳಿಸಲಾಗುವುದಿಲ್ಲ.",
      deleteUnavailable:
        "ಖಾತೆ ಅಳಿಸುವಿಕೆ ಪ್ರಸ್ತುತ ಲಭ್ಯವಿಲ್ಲ.",
      logout: "ಲಾಗ್‌ಔಟ್",
      privacyTitle: "ನಿಮ್ಮ ಗೌಪ್ಯತೆ ಮುಖ್ಯ",
      privacyFooter:
        "SakhiAI ಆರೋಗ್ಯ ಅರಿವು ಮತ್ತು ಕ್ಷೇಮಕ್ಕೆ ಬೆಂಬಲ ನೀಡುತ್ತದೆ. ಇದು ವೃತ್ತಿಪರ ವೈದ್ಯಕೀಯ ಸಲಹೆಗೆ ಪರ್ಯಾಯವಲ್ಲ.",
      toggleNotifications: "ಅಧಿಸೂಚನೆಗಳನ್ನು ಬದಲಾಯಿಸಿ",
      toggleReminders: "ಆರೋಗ್ಯ ಜ್ಞಾಪನೆಗಳನ್ನು ಬದಲಾಯಿಸಿ",
    },

    profile: {
      title: "ನನ್ನ ಪ್ರೊಫೈಲ್",
      subtitle: "ನಿಮ್ಮ ವೈಯಕ್ತಿಕ ಮತ್ತು ಆರೋಗ್ಯ ಮಾಹಿತಿಯನ್ನು ನಿರ್ವಹಿಸಿ.",
      loading: "ನಿಮ್ಮ ಪ್ರೊಫೈಲ್ ಲೋಡ್ ಆಗುತ್ತಿದೆ...",
      loadingDescription: "ದಯವಿಟ್ಟು ನಿರೀಕ್ಷಿಸಿ.",
      loginRequired: "ನಿಮ್ಮ ಪ್ರೊಫೈಲ್ ನೋಡಲು ದಯವಿಟ್ಟು ಲಾಗಿನ್ ಮಾಡಿ.",
      loadError: "ನಿಮ್ಮ ಪ್ರೊಫೈಲ್ ಲೋಡ್ ಮಾಡಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ.",
      saveError: "ಪ್ರೊಫೈಲ್ ಉಳಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ.",
      backendUnavailable: "ಬ್ಯಾಕೆಂಡ್‌ಗೆ ಸಂಪರ್ಕಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ.",
      accountInformation: "ಖಾತೆ ಮಾಹಿತಿ",
      accountDescription:
        "ನಿಮ್ಮ SakhiAI ಖಾತೆಗೆ ಸಂಬಂಧಿಸಿದ ಮೂಲಭೂತ ಮಾಹಿತಿ.",
      fullName: "ಪೂರ್ಣ ಹೆಸರು",
      email: "ಇಮೇಲ್",
      age: "ವಯಸ್ಸು",
      lifeStage: "ಜೀವನ ಹಂತ",
      lifeStageAdult: "ವಯಸ್ಕರು",
      lifeStageAdolescent: "ಹದಿಹರೆಯದವರು",
      lifeStagePregnancy: "ಗರ್ಭಧಾರಣೆ",
      lifeStagePostpartum: "ಪ್ರಸವೋತ್ತರ ಅವಧಿ",
      lifeStagePerimenopause: "ರಜೋನಿವೃತ್ತಿ ಪೂರ್ವಾವಧಿ",
      lifeStageMenopause: "ರಜೋನಿವೃತ್ತಿ",
      healthProfile: "ಆರೋಗ್ಯ ಪ್ರೊಫೈಲ್",
      healthDescription:
        "ಈ ಮಾಹಿತಿಯು SakhiAI ಹೆಚ್ಚು ವೈಯಕ್ತಿಕಗೊಳಿಸಿದ ಮಾಹಿತಿಯನ್ನು ನೀಡಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ.",
      dateOfBirth: "ಹುಟ್ಟಿದ ದಿನಾಂಕ",
      height: "ಎತ್ತರ (ಸೆಂ.ಮೀ)",
      heightPlaceholder: "ಉದಾ: 165",
      weight: "ತೂಕ (ಕೆ.ಜಿ)",
      weightPlaceholder: "ಉದಾ: 60",
      bloodGroup: "ರಕ್ತದ ಗುಂಪು",
      selectBloodGroup: "ರಕ್ತದ ಗುಂಪನ್ನು ಆಯ್ಕೆಮಾಡಿ",
      medicalHistory: "ವೈದ್ಯಕೀಯ ಇತಿಹಾಸ",
      allergies: "ಅಲರ್ಜಿಗಳು",
      menstrualStatus: "ಮಾಸಿಕ ಸ್ಥಿತಿ",
      selectMenstrualStatus: "ಮಾಸಿಕ ಸ್ಥಿತಿಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",
      pregnancyStatus: "ಗರ್ಭಧಾರಣೆಯ ಸ್ಥಿತಿ",
      selectPregnancyStatus:
        "ಗರ್ಭಧಾರಣೆಯ ಸ್ಥಿತಿಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",
      dateOfBirthRequired: "ದಯವಿಟ್ಟು ನಿಮ್ಮ ಜನ್ಮ ದಿನಾಂಕವನ್ನು ನಮೂದಿಸಿ.",
      heightRequired: "ದಯವಿಟ್ಟು ಮಾನ್ಯವಾದ ಎತ್ತರವನ್ನು ನಮೂದಿಸಿ.",
      weightRequired: "ದಯವಿಟ್ಟು ಮಾನ್ಯವಾದ ತೂಕವನ್ನು ನಮೂದಿಸಿ.",
      bloodGroupRequired: "ದಯವಿಟ್ಟು ನಿಮ್ಮ ರಕ್ತದ ಗುಂಪನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
      menstrualStatusRequired: "ದಯವಿಟ್ಟು ನಿಮ್ಮ ಮಾಸಿಕ ಸ್ಥಿತಿಯನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
      pregnancyStatusRequired: "ದಯವಿಟ್ಟು ನಿಮ್ಮ ಗರ್ಭಧಾರಣೆಯ ಸ್ಥಿತಿಯನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
      medicalHistoryPlaceholder: "ಸಂಬಂಧಿತ ವೈದ್ಯಕೀಯ ಇತಿಹಾಸವನ್ನು ನಮೂದಿಸಿ...",
      allergiesPlaceholder: "ತಿಳಿದಿರುವ ಅಲರ್ಜಿಗಳನ್ನು ನಮೂದಿಸಿ...",
      regular: "ನಿಯಮಿತ",
      irregular: "ಅನಿಯಮಿತ",
      absent: "ಇಲ್ಲದಿರುವುದು",
      notApplicable: "ಅನ್ವಯಿಸುವುದಿಲ್ಲ",
      notPregnant: "ಗರ್ಭಿಣಿಯಲ್ಲ",
      pregnant: "ಗರ್ಭಿಣಿ",
      postpartum: "ಪ್ರಸವೋತ್ತರ ಅವಧಿ",
      preferNotToSay: "ಹೇಳಲು ಇಷ್ಟವಿಲ್ಲ",
      saving: "ಉಳಿಸಲಾಗುತ್ತಿದೆ...",
      createProfile: "ಪ್ರೊಫೈಲ್ ರಚಿಸಿ",
      updateProfile: "ಪ್ರೊಫೈಲ್ ನವೀಕರಿಸಿ",
      profileCreated: "ಪ್ರೊಫೈಲ್ ಯಶಸ್ವಿಯಾಗಿ ರಚಿಸಲಾಗಿದೆ!",
      profileUpdated: "ಪ್ರೊಫೈಲ್ ಯಶಸ್ವಿಯಾಗಿ ನವೀಕರಿಸಲಾಗಿದೆ!",
      privacyTitle: "ನಿಮ್ಮ ಆರೋಗ್ಯ ಮಾಹಿತಿ ಮಹತ್ವದ್ದಾಗಿದೆ",
      privacyDescription:
        "ನಿಮ್ಮ ಪ್ರೊಫೈಲ್ ಮಾಹಿತಿ SakhiAI ಆರೋಗ್ಯ ಒಳನೋಟಗಳು ಮತ್ತು ಅಂದಾಜುಗಳನ್ನು ವೈಯಕ್ತಿಕಗೊಳಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ. ವೈದ್ಯಕೀಯ ನಿರ್ಧಾರಗಳಿಗೆ ಅರ್ಹ ಆರೋಗ್ಯ ವೃತ್ತಿಪರರನ್ನು ಸಂಪರ್ಕಿಸಿ.",
    },

   dashboard: {
  title: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",

  welcome: "SakhiAI ಗೆ ಸ್ವಾಗತ",
  welcomeMessage:
    "ನಿಮ್ಮ ವೈಯಕ್ತಿಕಗೊಳಿಸಿದ ಮಹಿಳಾ ಆರೋಗ್ಯದ ಅವಲೋಕನ ಇಲ್ಲಿದೆ.",

  overview: "ನಿಮ್ಮ ಆರೋಗ್ಯದ ಅವಲೋಕನ",
  healthOverview: "ಆರೋಗ್ಯ ಅವಲೋಕನ",
  healthSummary: "ಆರೋಗ್ಯ ಸಾರಾಂಶ",
  healthInsights: "ಆರೋಗ್ಯ ಒಳನೋಟಗಳು",
  recentActivity: "ಇತ್ತೀಚಿನ ಚಟುವಟಿಕೆ",

  cycle: "ಚಕ್ರ",
  currentCycleDay: "ಪ್ರಸ್ತುತ ಚಕ್ರದ ದಿನ",
  day: "ದಿನ",

  pmosRisk: "PMOS ಅಪಾಯ",
  estimatedRisk: "ಅಂದಾಜು ಅಪಾಯ",

  mood: "ಮನಸ್ಥಿತಿ",
  latestRecordedMood: "ಇತ್ತೀಚಿನ ದಾಖಲಾದ ಮನಸ್ಥಿತಿ",

  lifestyle: "ಜೀವನಶೈಲಿ",
  latestActivityLevel: "ಇತ್ತೀಚಿನ ಚಟುವಟಿಕೆಯ ಮಟ್ಟ",

  wellness: "ಕ್ಷೇಮ",
  wellnessDescription:
    "ನಿಮ್ಮ ಇತ್ತೀಚಿನ ನಿದ್ರೆ, ಮನಸ್ಥಿತಿ, ಚಟುವಟಿಕೆ ಮತ್ತು ಕ್ಷೇಮದ ಮಾದರಿಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ.",

  latestSleep: "ಇತ್ತೀಚಿನ ನಿದ್ರೆ",
  averageSleep: "ಸರಾಸರಿ ನಿದ್ರೆ",
  latestMood: "ಇತ್ತೀಚಿನ ಮನಸ್ಥಿತಿ",
  averageMood: "ಸರಾಸರಿ ಮನಸ್ಥಿತಿ",

  sleepDuration: "ನಿದ್ರೆಯ ಅವಧಿ",
  hours: "ಗಂಟೆಗಳು",

  mostRecentRecording: "ಇತ್ತೀಚಿನ ದಾಖಲೆ",
  basedOnRecordedHistory: "ದಾಖಲಾದ ಇತಿಹಾಸದ ಆಧಾರದ ಮೇಲೆ",

  latestActivity: "ಇತ್ತೀಚಿನ ಚಟುವಟಿಕೆ",
  healthRecords: "ಆರೋಗ್ಯ ದಾಖಲೆಗಳು",
  mostRecentActivityLevel: "ಇತ್ತೀಚಿನ ಚಟುವಟಿಕೆಯ ಮಟ್ಟ",
  totalRecordedEntries: "ಒಟ್ಟು ದಾಖಲಾದ ನಮೂದುಗಳು",

  wellnessStatus: "ಕ್ಷೇಮ ಸ್ಥಿತಿ",

  healthTrends: "ಆರೋಗ್ಯದ ಪ್ರವೃತ್ತಿಗಳು",
  trackHealthChanges:
    "ಕಾಲಕ್ರಮೇಣ ನಿಮ್ಮ ಮನಸ್ಥಿತಿ ಮತ್ತು ನಿದ್ರೆಯಲ್ಲಿ ಆಗಿರುವ ಬದಲಾವಣೆಗಳನ್ನು ಗಮನಿಸಿ.",

  moodTrend: "ಮನಸ್ಥಿತಿ ಪ್ರವೃತ್ತಿ",
  sleepTrend: "ನಿದ್ರೆ ಪ್ರವೃತ್ತಿ",

  moodScale: "ಮನಸ್ಥಿತಿಯನ್ನು 1 ರಿಂದ 5 ರವರೆಗೆ ದಾಖಲಿಸಲಾಗುತ್ತದೆ.",
  sleepMeasured: "ನಿದ್ರೆಯ ಅವಧಿಯನ್ನು ಗಂಟೆಗಳಲ್ಲಿ ಅಳೆಯಲಾಗುತ್ತದೆ.",

  aiHealthInsights: "AI ಆರೋಗ್ಯ ಒಳನೋಟಗಳು",
  aiInsightsDescription:
    "ನಿಮ್ಮ ಆರೋಗ್ಯ ಮಾಹಿತಿಯ ಆಧಾರದ ಮೇಲೆ ವೈಯಕ್ತಿಕಗೊಳಿಸಿದ ಒಳನೋಟಗಳು.",

  noPersonalizedInsights:
    "ಇನ್ನೂ ವೈಯಕ್ತಿಕಗೊಳಿಸಿದ ಒಳನೋಟಗಳಿಲ್ಲ",

  contributingFactors: "ಕೊಡುಗೆ ನೀಡುವ ಅಂಶಗಳು",
  factorsInfluenceScore:
    "ಈ ದಾಖಲಾದ ಅಂಶಗಳು ಪ್ರಸ್ತುತ ಅರಿವಿನ ಅಂಕದ ಮೇಲೆ ಪ್ರಭಾವ ಬೀರುತ್ತವೆ.",

  recordedValue: "ದಾಖಲಾದ ಮೌಲ್ಯ",
  impact: "ಪ್ರಭಾವ",

  currentAwarenessScore: "ಪ್ರಸ್ತುತ ಅರಿವಿನ ಅಂಕ",
  whyScoreShown: "ಈ ಅಂಕವನ್ನು ಏಕೆ ತೋರಿಸಲಾಗಿದೆ?",

  pmosRiskAwareness: "PMOS ಅಪಾಯದ ಅರಿವು",

  pmosDescription:
    "ಈ ಅರಿವಿನ ಅಂಕವು ನಿಮ್ಮ ದಾಖಲಾದ ಕ್ಷೇಮ ಮಾಹಿತಿಯನ್ನು ಆಧರಿಸಿದೆ. ಪ್ರಸ್ತುತ ಅಂದಾಜಿಗೆ ಕಾರಣವಾಗುವ ಅಂಶಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ಇದು ಸಹಾಯ ಮಾಡುತ್ತದೆ.",

  noData: "ಯಾವುದೇ ಮಾಹಿತಿ ಇಲ್ಲ",

  yourProfile: "ನಿಮ್ಮ ಪ್ರೊಫೈಲ್",
  email: "ಇಮೇಲ್",
  age: "ವಯಸ್ಸು",
  lifeStage: "ಜೀವನ ಹಂತ",
  language: "ಭಾಷೆ",

  wellnessDisclaimer:
    "ಕ್ಷೇಮ ಮಾಹಿತಿಯನ್ನು ಸ್ವಯಂ ಅರಿವು ಮತ್ತು ಸಾಮಾನ್ಯ ಕ್ಷೇಮದ ಟ್ರ್ಯಾಕಿಂಗ್‌ಗಾಗಿ ನೀಡಲಾಗಿದೆ. ಇದು ವೈದ್ಯಕೀಯ ನಿರ್ಣಯವಲ್ಲ.",

  pmosDisclaimer:
    "PMOS ಅಪಾಯದ ಅರಿವು ಮಾಹಿತಿ ಆಧಾರಿತ ಕ್ಷೇಮ ವೈಶಿಷ್ಟ್ಯವಾಗಿದೆ ಮತ್ತು ಇದು ವೈದ್ಯಕೀಯ ನಿರ್ಣಯವಲ್ಲ. ಇದನ್ನು ವೃತ್ತಿಪರ ಆರೋಗ್ಯ ಸಲಹೆಗೆ ಪರ್ಯಾಯವಾಗಿ ಬಳಸಬಾರದು.",

  insightsDisclaimer:
    "ಈ ಒಳನೋಟಗಳು ಮಾಹಿತಿಗಾಗಿ ಮಾತ್ರ ಮತ್ತು ವೈದ್ಯಕೀಯ ನಿರ್ಣಯವಲ್ಲ. ಚಿಂತಾಜನಕ ಅಥವಾ ನಿರಂತರ ಲಕ್ಷಣಗಳಿದ್ದರೆ ಅರ್ಹ ಆರೋಗ್ಯ ವೃತ್ತಿಪರರನ್ನು ಸಂಪರ್ಕಿಸಿ.",
        cycleDayValue: "ದಿನ",
      hoursValue: "ಗಂಟೆಗಳು",
      estimatedRiskValue: "ಅಂದಾಜು ಅಪಾಯ",

      wellnessStart:
        "ನಿಮ್ಮ ಕ್ಷೇಮದ ಇತಿಹಾಸವನ್ನು ನಿರ್ಮಿಸಲು ನಿಮ್ಮ ಆರೋಗ್ಯ ಮಾಹಿತಿಯನ್ನು ದಾಖಲಿಸಲು ಪ್ರಾರಂಭಿಸಿ.",

      wellnessPositive:
        "ನಿಮ್ಮ ಇತ್ತೀಚಿನ ನಿದ್ರೆ ಮತ್ತು ಮನಸ್ಥಿತಿಯ ಮಾದರಿಗಳು ಉತ್ತಮವಾಗಿವೆ. ನಿರಂತರ ಕ್ಷೇಮ ಅಭ್ಯಾಸಗಳನ್ನು ಮುಂದುವರಿಸಿ.",

      wellnessLowSleep:
        "ನಿಮ್ಮ ಇತ್ತೀಚಿನ ನಿದ್ರೆಯ ಅವಧಿ ಆದರ್ಶಕ್ಕಿಂತ ಕಡಿಮೆಯಾಗಿದೆ. ನಿಯಮಿತ ನಿದ್ರೆಯ ದಿನಚರಿಯನ್ನು ಕಾಪಾಡಿಕೊಳ್ಳಲು ಮತ್ತು ಸಾಕಷ್ಟು ವಿಶ್ರಾಂತಿ ಪಡೆಯಲು ಪ್ರಯತ್ನಿಸಿ.",

      wellnessLowMood:
        "ನಿಮ್ಮ ಇತ್ತೀಚಿನ ಮನಸ್ಥಿತಿ ಮೌಲ್ಯಮಾಪನಗಳು ತುಲನಾತ್ಮಕವಾಗಿ ಕಡಿಮೆಯಾಗಿವೆ. ಸ್ವಯಂ ಆರೈಕೆ, ಸಾಮಾಜಿಕ ಬೆಂಬಲ ಮತ್ತು ನಿಮ್ಮ ಭಾವನೆಗಳನ್ನು ಗಮನಿಸುವುದನ್ನು ಪರಿಗಣಿಸಿ.",

      wellnessTracking:
        "ನಿಮ್ಮ ಕ್ಷೇಮ ಮಾಹಿತಿಯನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಲಾಗುತ್ತಿದೆ. ನಿಮ್ಮ ಆರೋಗ್ಯದ ಮಾದರಿಗಳನ್ನು ಚೆನ್ನಾಗಿ ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ದೈನಂದಿನ ಮಾಹಿತಿಯನ್ನು ದಾಖಲಿಸುವುದನ್ನು ಮುಂದುವರಿಸಿ.",

      noInsights:
        "ಇನ್ನೂ ವೈಯಕ್ತಿಕಗೊಳಿಸಿದ ಒಳನೋಟಗಳಿಲ್ಲ",

      continueRecording:
        "ವೈಯಕ್ತಿಕಗೊಳಿಸಿದ ಒಳನೋಟಗಳನ್ನು ಪಡೆಯಲು ನಿಮ್ಮ ಆರೋಗ್ಯ ಮಾಹಿತಿಯನ್ನು ದಾಖಲಿಸುವುದನ್ನು ಮುಂದುವರಿಸಿ.",

      noHealthHistory: "ಇನ್ನೂ ಯಾವುದೇ ಆರೋಗ್ಯ ಇತಿಹಾಸ ಲಭ್ಯವಿಲ್ಲ",
      noMoodChartData: "ಚಾರ್ಟ್ ಮಾಡಲು ಮನಸ್ಥಿತಿ ದಾಖಲೆಗಳು ಲಭ್ಯವಿಲ್ಲ.",
      noSleepChartData: "ಚಾರ್ಟ್ ಮಾಡಲು ನಿದ್ರೆ ದಾಖಲೆಗಳು ಲಭ್ಯವಿಲ್ಲ.",
      recordHealthInfo:
        "ಕೊಡುಗೆ ನೀಡುವ ಅಂಶಗಳನ್ನು ನೋಡಲು ನಿಮ್ಮ ಆರೋಗ್ಯ ಮಾಹಿತಿಯನ್ನು ದಾಖಲಿಸಿ.",

      low: "ಕಡಿಮೆ",
      moderate: "ಮಧ್ಯಮ",
      high: "ಹೆಚ್ಚು",

      activityLow: "ಕಡಿಮೆ",
      activityModerate: "ಮಧ್ಯಮ",
      activityHigh: "ಹೆಚ್ಚು",

    aiInsightSleepVeryLow: "ನಿಮ್ಮ ದಾಖಲಾದ ಸರಾಸರಿ ನಿದ್ರೆ {value} ಗಂಟೆಗಳು. ನಿಮ್ಮ ಇತ್ತೀಚಿನ ನಿದ್ರೆಯ ಮಾದರಿ ಅಗತ್ಯಕ್ಕಿಂತ ಕಡಿಮೆಯಾಗಿದೆ. ನಿಯಮಿತ ನಿದ್ರೆ ವೇಳಾಪಟ್ಟಿಯನ್ನು ಕಾಪಾಡಿಕೊಳ್ಳಲು ಮತ್ತು ಸಾಕಷ್ಟು ವಿಶ್ರಾಂತಿ ಪಡೆಯಲು ಪ್ರಯತ್ನಿಸಿ.",

    aiInsightSleepSlightlyLow: "ನಿಮ್ಮ ದಾಖಲಾದ ಸರಾಸರಿ ನಿದ್ರೆ {value} ಗಂಟೆಗಳು. ನಿಮ್ಮ ನಿದ್ರೆಯ ಅವಧಿ ನೀವು ಗುರಿಯಾಗಿಸಬಹುದಾದ ಮಟ್ಟಕ್ಕಿಂತ ಸ್ವಲ್ಪ ಕಡಿಮೆಯಾಗಿದೆ. ನಿಮ್ಮ ನಿದ್ರೆಯ ಮಾದರಿಯನ್ನು ಗಮನಿಸುವುದನ್ನು ಮುಂದುವರಿಸಿ.",

    aiInsightSleepPositive: "ನಿಮ್ಮ ದಾಖಲಾದ ಸರಾಸರಿ ನಿದ್ರೆ {value} ಗಂಟೆಗಳು. ನಿಮ್ಮ ಇತ್ತೀಚಿನ ನಿದ್ರೆಯ ಮಾದರಿ ಉತ್ತಮವಾಗಿ ಕಾಣುತ್ತದೆ. ನಿಯಮಿತ ನಿದ್ರೆ ಒಟ್ಟಾರೆ ಕ್ಷೇಮಕ್ಕೆ ಸಹಾಯ ಮಾಡಬಹುದು.",

    aiInsightMoodLow: "ನಿಮ್ಮ ದಾಖಲಾದ ಸರಾಸರಿ ಮನಸ್ಥಿತಿ 5ರಲ್ಲಿ {value} ಆಗಿದೆ. ನಿಮ್ಮ ಇತ್ತೀಚಿನ ಮನಸ್ಥಿತಿಯ ಅಂಕಗಳು ತುಸು ಕಡಿಮೆಯಾಗಿವೆ. ಸ್ವಯಂ ಆರೈಕೆ, ಬೆಂಬಲ ನೀಡುವ ಸಾಮಾಜಿಕ ಸಂಪರ್ಕ ಮತ್ತು ನಿಮ್ಮ ಮನಸ್ಥಿತಿಯನ್ನು ಗಮನಿಸುವುದನ್ನು ಮುಂದುವರಿಸುವುದನ್ನು ಪರಿಗಣಿಸಿ.",

    aiInsightMoodVariable: "ನಿಮ್ಮ ದಾಖಲಾದ ಸರಾಸರಿ ಮನಸ್ಥಿತಿ 5ರಲ್ಲಿ {value} ಆಗಿದೆ. ನಿಮ್ಮ ದಾಖಲಾದ ನಮೂದುಗಳಲ್ಲಿ ಮನಸ್ಥಿತಿಯಲ್ಲಿ ಬದಲಾವಣೆ ಕಂಡುಬಂದಿದೆ. ನಿಮ್ಮ ವೈಯಕ್ತಿಕ ಮಾದರಿಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ಮನಸ್ಥಿತಿಯನ್ನು ದಾಖಲಿಸುವುದನ್ನು ಮುಂದುವರಿಸಿ.",

    aiInsightMoodPositive: "ನಿಮ್ಮ ದಾಖಲಾದ ಸರಾಸರಿ ಮನಸ್ಥಿತಿ 5ರಲ್ಲಿ {value} ಆಗಿದೆ. ನಿಮ್ಮ ಇತ್ತೀಚಿನ ಮನಸ್ಥಿತಿಯ ಮಾದರಿ ಉತ್ತಮವಾಗಿ ಕಾಣುತ್ತದೆ.",

    aiInsightMoodVariation: "ನಿಮ್ಮ ದಾಖಲಾದ ಮನಸ್ಥಿತಿಯಲ್ಲಿ ಕಾಲಕ್ರಮೇಣ ಗಮನಾರ್ಹ ಬದಲಾವಣೆ ಕಂಡುಬಂದಿದೆ. ನಿದ್ರೆ ಮತ್ತು ಚಕ್ರದ ಮಾಹಿತಿಯ ಜೊತೆಗೆ ಮನಸ್ಥಿತಿಯನ್ನು ದಾಖಲಿಸುವುದರಿಂದ ನಿಮ್ಮ ವೈಯಕ್ತಿಕ ಮಾದರಿಗಳನ್ನು ಗುರುತಿಸಲು ಸಹಾಯವಾಗಬಹುದು.",

    aiInsightActivityLow: "ನಿಮ್ಮ ಇತ್ತೀಚಿನ ದಾಖಲಾದ ಚಟುವಟಿಕೆಯ ಮಟ್ಟ ಕಡಿಮೆಯಾಗಿದೆ. ನಿಮಗೆ ಆರಾಮದಾಯಕವಾಗಿದ್ದರೆ, ನಡೆಯುವುದು ಅಥವಾ ಸ್ಟ್ರೆಚಿಂಗ್‌ನಂತಹ ಸೌಮ್ಯ ಚಟುವಟಿಕೆಗಳು ಸಾಮಾನ್ಯ ಕ್ಷೇಮಕ್ಕೆ ಸಹಾಯ ಮಾಡಬಹುದು.",

    aiInsightActivityModerate: "ನಿಮ್ಮ ಇತ್ತೀಚಿನ ದಾಖಲಾದ ಚಟುವಟಿಕೆಯ ಮಟ್ಟ ಮಧ್ಯಮವಾಗಿದೆ. ನಿಯಮಿತ ಚಟುವಟಿಕೆಯನ್ನು ಕಾಪಾಡಿಕೊಳ್ಳುವುದು ಉತ್ತಮ ಕ್ಷೇಮದ ಅಭ್ಯಾಸವಾಗಬಹುದು.",

    aiInsightActivityHigh: "ನಿಮ್ಮ ಇತ್ತೀಚಿನ ದಾಖಲಾದ ಚಟುವಟಿಕೆಯ ಮಟ್ಟ ಹೆಚ್ಚಾಗಿದೆ. ಸಾಕಷ್ಟು ವಿಶ್ರಾಂತಿ ಮತ್ತು ಚೇತರಿಕೆಯೊಂದಿಗೆ ಚಟುವಟಿಕೆಯನ್ನು ಸಮತೋಲನಗೊಳಿಸಲು ಮರೆಯಬೇಡಿ.",

    aiInsightCycleMenstrual: "ನೀವು ಪ್ರಸ್ತುತ ಸುಮಾರು {value}ನೇ ಚಕ್ರದ ದಿನದಲ್ಲಿದ್ದೀರಿ. ಇದು ಸಾಮಾನ್ಯವಾಗಿ ಮಾಸಿಕದ ಹಂತದಲ್ಲಿರುತ್ತದೆ.",

    aiInsightCycleEarly: "ನೀವು ಪ್ರಸ್ತುತ ಸುಮಾರು {value}ನೇ ಚಕ್ರದ ದಿನದಲ್ಲಿದ್ದೀರಿ. ಮನಸ್ಥಿತಿ, ಶಕ್ತಿ ಮತ್ತು ಲಕ್ಷಣಗಳಲ್ಲಿ ಆಗುವ ಬದಲಾವಣೆಗಳನ್ನು ಗಮನಿಸುತ್ತಿರಿ.",

    aiInsightCycleMid: "ನೀವು ಪ್ರಸ್ತುತ ಸುಮಾರು {value}ನೇ ಚಕ್ರದ ದಿನದಲ್ಲಿದ್ದೀರಿ. ಮನಸ್ಥಿತಿ, ಶಕ್ತಿ, ನಿದ್ರೆ ಮತ್ತು ಇತರ ಲಕ್ಷಣಗಳಲ್ಲಿನ ಬದಲಾವಣೆಗಳನ್ನು ಗಮನಿಸುತ್ತಿರಿ.",

    aiInsightCycleLate: "ನೀವು ಪ್ರಸ್ತುತ ಸುಮಾರು {value}ನೇ ಚಕ್ರದ ದಿನದಲ್ಲಿದ್ದೀರಿ. ಮುಂದಿನ ಮಾಸಿಕ ಸಮೀಪಿಸುತ್ತಿರುವಾಗ ಮನಸ್ಥಿತಿ, ನಿದ್ರೆ, ಶಕ್ತಿ ಮತ್ತು ಲಕ್ಷಣಗಳಲ್ಲಿನ ಬದಲಾವಣೆಗಳಿಗೆ ಗಮನ ಕೊಡಿ.",

    aiInsightTracking: "ನೀವು {value} ಆರೋಗ್ಯ ನಮೂದುಗಳನ್ನು ದಾಖಲಿಸಿದ್ದೀರಿ. ನಿಮ್ಮ ವೈಯಕ್ತಿಕ ಕ್ಷೇಮದ ಮಾದರಿಗಳನ್ನು ಸ್ಪಷ್ಟವಾಗಿ ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ನಿಯಮಿತವಾಗಿ ದಾಖಲಿಸುವುದನ್ನು ಮುಂದುವರಿಸಿ.",

    aiInsightNoData: "ವೈಯಕ್ತಿಕಗೊಳಿಸಿದ ಆರೋಗ್ಯ ಒಳನೋಟಗಳನ್ನು ಪಡೆಯಲು ನಿಮ್ಮ ಆರೋಗ್ಯ ಮಾಹಿತಿಯನ್ನು ದಾಖಲಿಸಲು ಪ್ರಾರಂಭಿಸಿ.",

    aiInsightContinueTracking: "ಹೆಚ್ಚು ವೈಯಕ್ತಿಕಗೊಳಿಸಿದ ಕ್ಷೇಮ ಒಳನೋಟಗಳನ್ನು ಪಡೆಯಲು ನಿಮ್ಮ ಆರೋಗ್ಯ ಮಾಹಿತಿಯನ್ನು ದಾಖಲಿಸುವುದನ್ನು ಮುಂದುವರಿಸಿ.",

    dayLabel: "ದಿನ",

    currentEstimatedRisk: "ಪ್ರಸ್ತುತ ಅಂದಾಜು ಅಪಾಯ",

    latestRecordedMoodDescription: "ಇತ್ತೀಚಿನ ದಾಖಲಾದ ಮನಸ್ಥಿತಿ",
    latestActivityLevelDescription: "ಇತ್ತೀಚಿನ ಚಟುವಟಿಕೆಯ ಮಟ್ಟ",

    user: "ಬಳಕೆದಾರ",

    },

    tracking: {
      title: "ಆರೋಗ್ಯ ಟ್ರ್ಯಾಕಿಂಗ್",
      heading: "ನಿಮ್ಮ ಆರೋಗ್ಯವನ್ನು ದಾಖಲಿಸಿ",
      subtitle:
        "ನಿಮ್ಮ ದೈನಂದಿನ ಕ್ಷೇಮ ಮಾಹಿತಿಯನ್ನು ದಾಖಲಿಸಿ ಮತ್ತು ಆರೋಗ್ಯದ ಮಾದರಿಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ.",
      menstrualCycle: "ಮಾಸಿಕ ಚಕ್ರ",
      currentCycleInformation: "ಪ್ರಸ್ತುತ ಚಕ್ರದ ಮಾಹಿತಿ",
      currentCycleDay: "ಪ್ರಸ್ತುತ ಚಕ್ರದ ದಿನ",
      cycleDayPlaceholder: "ಉದಾಹರಣೆ: 12",
      mood: "ಮನಸ್ಥಿತಿ",
      howFeeling: "ಇಂದು ನೀವು ಹೇಗಿದ್ದೀರಿ?",
      moodLevel: "ಮನಸ್ಥಿತಿಯ ಮಟ್ಟ",
      selectMood: "ಮನಸ್ಥಿತಿಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",
      excellent: "ಅತ್ಯುತ್ತಮ",
      good: "ಚೆನ್ನಾಗಿದೆ",
      okay: "ಸಾಧಾರಣ",
      low: "ಕಡಿಮೆ",
      veryLow: "ತುಂಬಾ ಕಡಿಮೆ",
      sleep: "ನಿದ್ರೆ",
      sleepDurationDescription: "ನಿಮ್ಮ ನಿದ್ರೆಯ ಅವಧಿಯನ್ನು ದಾಖಲಿಸಿ",
      hoursOfSleep: "ನಿದ್ರೆಯ ಗಂಟೆಗಳು",
      sleepPlaceholder: "ಉದಾಹರಣೆ: 7.5",
      activity: "ಚಟುವಟಿಕೆ",
      physicalActivity: "ದೈಹಿಕ ಚಟುವಟಿಕೆ",
      recordActivityToday: "ಇಂದಿನ ಚಟುವಟಿಕೆಯನ್ನು ದಾಖಲಿಸಿ",
      activityLevel: "ಚಟುವಟಿಕೆಯ ಮಟ್ಟ",
      selectActivity: "ಚಟುವಟಿಕೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",
      activityLow: "ಕಡಿಮೆ",
      activityModerate: "ಮಧ್ಯಮ",
      activityHigh: "ಹೆಚ್ಚು",
      saveToday: "ಇಂದಿನ ಮಾಹಿತಿಯನ್ನು ಉಳಿಸಿ",
      saveSuccess: "ಇಂದಿನ ಆರೋಗ್ಯ ಮಾಹಿತಿ ಯಶಸ್ವಿಯಾಗಿ ಉಳಿಸಲಾಗಿದೆ!",
      loginRequired: "ದಯವಿಟ್ಟು ಮತ್ತೆ ಲಾಗಿನ್ ಮಾಡಿ.",
      saveError: "ಆರೋಗ್ಯ ಮಾಹಿತಿಯನ್ನು ಉಳಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ.",
      validationError:
        "ಚಕ್ರದ ದಿನ 1-45, ಮನಸ್ಥಿತಿ 1-5, ಮತ್ತು ನಿದ್ರೆ 0-24 ಗಂಟೆಗಳೊಳಗೆ 0.5 ಗಂಟೆಗಳ ಹಂತದಲ್ಲಿದೆ ಎಂದು ಪರಿಶೀಲಿಸಿ.",
      recentRecords: "ಇತ್ತೀಚಿನ ಆರೋಗ್ಯ ದಾಖಲೆಗಳು",
      noRecords: "ಇನ್ನೂ ಯಾವುದೇ ಆರೋಗ್ಯ ದಾಖಲೆಗಳಿಲ್ಲ.",
      date: "ದಿನಾಂಕ",
      cycleDay: "ಚಕ್ರದ ದಿನ",
      hours: "ಗಂಟೆಗಳು",
      saveTracking: "ಆರೋಗ್ಯ ದಾಖಲೆಯನ್ನು ಉಳಿಸಿ",
    },

    menstrual: {
  subtitle:
    "ನಿಮ್ಮ ಮಾಸಿಕ ಚಕ್ರವನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ ಮತ್ತು ನಿಮ್ಮ ಚಕ್ರದ ಮಾದರಿಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ.",

  selectFlow: "ರಕ್ತಸ್ರಾವದ ಪ್ರಮಾಣವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
  light: "ಕಡಿಮೆ",
  medium: "ಮಧ್ಯಮ",
  heavy: "ಹೆಚ್ಚು",

  saveCycle: "ಚಕ್ರವನ್ನು ಉಳಿಸಿ",
  savingCycle: "ಉಳಿಸಲಾಗುತ್ತಿದೆ...",
  deleteConfirmation: "ಈ ಚಕ್ರವನ್ನು ಅಳಿಸಲು ನೀವು ಖಚಿತವಾಗಿದ್ದೀರಾ?",

  aiRequirement:
    "AIಗೆ ಕನಿಷ್ಠ 7 ಕ್ರಮಬದ್ಧ ದೈನಂದಿನ ಆರೋಗ್ಯ ದಾಖಲೆಗಳ ಅಗತ್ಯವಿದೆ.",
  minimumDaysError:
    "ಆರೋಗ್ಯ ಟ್ರ್ಯಾಕಿಂಗ್‌ಗೆ ಕನಿಷ್ಠ 7 ದಿನಗಳ ದಾಖಲೆ ಅಗತ್ಯವಿದೆ. ಪ್ರಸ್ತುತ ದಾಖಲಾದ ದಿನಗಳು: {count}.",

  confidenceDescription:
    "ವಿಶ್ವಾಸಾರ್ಹತೆ ಆಯ್ಕೆಮಾಡಿದ ಹಂತಕ್ಕೆ ಮಾದರಿಯ ಅಂದಾಜು ಸಂಭವನೀಯತೆಯನ್ನು ಸೂಚಿಸುತ್ತದೆ.",

  featuresImputed: "ಪೂರಕವಾಗಿ ತುಂಬಿದ ವೈಶಿಷ್ಟ್ಯಗಳು",

  personalizedEstimates:
    "ನಿಮ್ಮ ದಾಖಲಿಸಿದ ಚಕ್ರಗಳ ಆಧಾರದ ಮೇಲೆ ವೈಯಕ್ತಿಕಗೊಳಿಸಿದ ಅಂದಾಜುಗಳು.",

  days: "ದಿನಗಳು",
  insufficientData: "ಸಾಕಷ್ಟು ಮಾಹಿತಿ ಇಲ್ಲ",
  noData: "ಮಾಹಿತಿ ಇಲ್ಲ",
  regular: "ನಿಯಮಿತ",
  slightlyIrregular: "ಸ್ವಲ್ಪ ಅನಿಯಮಿತ",
  irregular: "ಅನಿಯಮಿತ",
  

  currentCycle: "ಪ್ರಸ್ತುತ ಚಕ್ರ",
  currentEstimatedCycleDay: "ಪ್ರಸ್ತುತ ಅಂದಾಜು ಚಕ್ರದ ದಿನ",
  cramps: "ಹೊಟ್ಟೆ ನೋವು",
  averageCycle: "ಸರಾಸರಿ ಚಕ್ರ",
  basedOnRecordedCycles: "ದಾಖಲಿಸಿದ ಚಕ್ರಗಳ ಆಧಾರದ ಮೇಲೆ",

  averagePeriod: "ಸರಾಸರಿ ಮಾಸಿಕ ಅವಧಿ",
  averageBleedingDuration: "ಸರಾಸರಿ ರಕ್ತಸ್ರಾವದ ಅವಧಿ",

  cyclePattern: "ಚಕ್ರದ ಮಾದರಿ",
  basedOnAvailableHistory: "ಲಭ್ಯವಿರುವ ಇತಿಹಾಸದ ಆಧಾರದ ಮೇಲೆ",

  estimatedFromCycleHistory:
    "ನಿಮ್ಮ ಚಕ್ರದ ಇತಿಹಾಸದಿಂದ ಅಂದಾಜಿಸಲಾಗಿದೆ",

  fertileWindow: "ಅಂದಾಜು ಫಲವತ್ತಾದ ಅವಧಿ",
  approximateBasedOnCycleLength:
    "ಚಕ್ರದ ಅವಧಿಯ ಆಧಾರದ ಮೇಲಿನ ಅಂದಾಜು",

  estimateDisclaimer:
    "ಈ ಚಕ್ರದ ದಿನಾಂಕಗಳು ನೀವು ನೀಡಿದ ಮಾಹಿತಿಯ ಆಧಾರದ ಮೇಲಿನ ಅಂದಾಜುಗಳಾಗಿವೆ. ಇವು ವೈದ್ಯಕೀಯ ರೋಗನಿರ್ಣಯವಲ್ಲ ಅಥವಾ ವಿಶ್ವಾಸಾರ್ಹ ಗರ್ಭನಿರೋಧಕ ವಿಧಾನವಲ್ಲ. ಚಕ್ರದ ಸಮಯವು ತಿಂಗಳಿಂದ ತಿಂಗಳಿಗೆ ಬದಲಾಗಬಹುದು.",

  noCycleRecords: "ಇನ್ನೂ ಯಾವುದೇ ಚಕ್ರದ ದಾಖಲೆಗಳಿಲ್ಲ.",
  addFirstCycle: "ಮೇಲಿನಿಂದ ನಿಮ್ಮ ಮೊದಲ ಚಕ್ರವನ್ನು ಸೇರಿಸಿ.",

  start: "ಪ್ರಾರಂಭ",
  end: "ಅಂತ್ಯ",
  day: "ದಿನ",
  action: "ಕ್ರಿಯೆ",
  features: "ವೈಶಿಷ್ಟ್ಯಗಳು",

  title: "ಮಾಸಿಕ ಚಕ್ರ ಟ್ರ್ಯಾಕಿಂಗ್",
  addCycle: "ಮಾಸಿಕ ಚಕ್ರವನ್ನು ಸೇರಿಸಿ",

  aiPrediction: "AI ಮಾಸಿಕ ಚಕ್ರ ಹಂತದ ಮುನ್ಸೂಚನೆ",
  
  researchNote:
  "ಈ ಸಂಶೋಧನಾ LSTM ಮಾದರಿಯನ್ನು ಮಾಸಿಕ, ಹಾರ್ಮೋನ್, ಧರಿಸಬಹುದಾದ ಸಾಧನ ಮತ್ತು ಸ್ವಯಂ ವರದಿ ವೈಶಿಷ್ಟ್ಯಗಳನ್ನು ಒಳಗೊಂಡ mcPHASES ಡೇಟಾವನ್ನು ಬಳಸಿ ತರಬೇತಿ ನೀಡಲಾಗಿದೆ. SakhiAI ನಲ್ಲಿ ಸಂಗ್ರಹಿಸದ ವೈಶಿಷ್ಟ್ಯಗಳನ್ನು ತರಬೇತಿ ಡೇಟಾದ ಮಧ್ಯಕ ಮೌಲ್ಯಗಳಿಂದ ತುಂಬಲಾಗುತ್ತದೆ.",
      
  aiDescription:
    "ನಿಮ್ಮ ಇತ್ತೀಚಿನ ಆರೋಗ್ಯ ದಾಖಲೆಗಳನ್ನು ವಿಶ್ಲೇಷಿಸಿ ಪ್ರಸ್ತುತ ಮಾಸಿಕ ಚಕ್ರದ ಹಂತವನ್ನು ಅಂದಾಜಿಸಲು AI ಮಾದರಿಯನ್ನು ಬಳಸಲಾಗುತ್ತದೆ.",

  availableDays: "ಲಭ್ಯವಿರುವ ಆರೋಗ್ಯ ದಾಖಲೆಯ ದಿನಗಳು",
  confidence: "ವಿಶ್ವಾಸಾರ್ಹತೆ",

  continueAddingRecords:
    "ಆರೋಗ್ಯ ದಾಖಲೆಗಳನ್ನು ಸೇರಿಸುವುದನ್ನು ಮುಂದುವರಿಸಿ",

  cycleHistory: "ಚಕ್ರದ ಇತಿಹಾಸ",

  cycleHistoryDescription:
    "ನೀವು ಹಿಂದೆ ದಾಖಲಿಸಿದ ಮಾಸಿಕ ಚಕ್ರಗಳು ಇಲ್ಲಿ ಕಾಣಿಸುತ್ತವೆ.",

  cycleInsights: "ಚಕ್ರದ ಒಳನೋಟಗಳು",
  cycleLength: "ಚಕ್ರದ ಅವಧಿ",

  deleteCycle: "ಚಕ್ರವನ್ನು ಅಳಿಸಿ",
  featuresProvided: "ಒದಗಿಸಿದ ವೈಶಿಷ್ಟ್ಯಗಳು",

  fertility: "ಫಲವತ್ತತೆ",
  follicular: "ಫಾಲಿಕ್ಯುಲರ್",

  historyLoadError:
    "ಚಕ್ರದ ಇತಿಹಾಸವನ್ನು ಲೋಡ್ ಮಾಡಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ.",

  loadingCycleHistory:
    "ಚಕ್ರದ ಇತಿಹಾಸವನ್ನು ಲೋಡ್ ಮಾಡಲಾಗುತ್ತಿದೆ...",

  loginRequired:
    "ಮಾಸಿಕ ಚಕ್ರ ಟ್ರ್ಯಾಕಿಂಗ್ ಬಳಸಲು ದಯವಿಟ್ಟು ಲಾಗಿನ್ ಮಾಡಿ.",

  luteal: "ಲ್ಯೂಟಿಯಲ್",
  menstrual: "ಮಾಸಿಕ",

  nextPeriod: "ಮುಂದಿನ ಮಾಸಿಕ",

  notEnoughData:
    "AI ಮುನ್ಸೂಚನೆಗೆ ಸಾಕಷ್ಟು ಮಾಹಿತಿ ಇಲ್ಲ.",

  periodEnd: "ಮಾಸಿಕ ಅಂತ್ಯ",
  periodStart: "ಮಾಸಿಕ ಪ್ರಾರಂಭ",
  cycleLengthPlaceholder: "ಉದಾ: 28",
  symptomsPlaceholder: "ಉದಾ: ಹೊಟ್ಟೆ ನೋವು, ತಲೆನೋವು, ದಣಿವು...",

  periodStartRequired:
    "ಮಾಸಿಕ ಪ್ರಾರಂಭ ದಿನಾಂಕ ಅಗತ್ಯವಿದೆ.",

  phaseProbabilities: "ಚಕ್ರದ ಹಂತಗಳ ಸಂಭವನೀಯತೆ",
  predictedPhase: "ಮುನ್ಸೂಚಿಸಲಾದ ಹಂತ",

  predicting: "ಮುನ್ಸೂಚನೆ ನೀಡಲಾಗುತ್ತಿದೆ...",
  predictPhase: "ಮಾಸಿಕ ಚಕ್ರದ ಹಂತವನ್ನು ಊಹಿಸಿ",

  researchModelInfo:
    "ಮಾಸಿಕ ಚಕ್ರದ ಮಾಹಿತಿಯನ್ನು ಆಧರಿಸಿದ ಸಂಶೋಧನಾ ಮಾದರಿ.",

  saveError:
    "ಚಕ್ರವನ್ನು ಉಳಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ.",

  sequence: "ಕ್ರಮದ ಉದ್ದ",
  sequenceLength: "ಕ್ರಮದ ಉದ್ದ",

  symptoms: "ಲಕ್ಷಣಗಳು",
  flowLevel: "ರಕ್ತಸ್ರಾವದ ಪ್ರಮಾಣ",

aiDisclaimer:
  "ಈ AI ಮುನ್ಸೂಚನೆಯು ಮಾಹಿತಿ ಮತ್ತು ಕ್ಷೇಮ ಬೆಂಬಲಕ್ಕಾಗಿ ಮಾತ್ರ. ಇದು ವೈದ್ಯಕೀಯ ರೋಗನಿರ್ಣಯವಲ್ಲ ಮತ್ತು ವೃತ್ತಿಪರ ವೈದ್ಯಕೀಯ ಸಲಹೆಗೆ ಪರ್ಯಾಯವಾಗಿಲ್ಲ.",

  healthTrackingLoadError:
    "ಆರೋಗ್ಯ ದಾಖಲೆಗಳನ್ನು ಲೋಡ್ ಮಾಡಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ.",

  deleteError:
    "ಚಕ್ರವನ್ನು ಅಳಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ.",

  predictionError:
    "ಮಾಸಿಕ ಚಕ್ರದ ಹಂತದ ಮುನ್ಸೂಚನೆಯನ್ನು ರಚಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ.",
},

    pmos: {
      title: "PMOS ಅರಿವು",
      pageTitle: "PMOS ಅಪಾಯದ ಅರಿವು",
      subtitle: "ನಿಮ್ಮ ಪ್ರಸ್ತುತ ಕ್ಷೇಮ ಅರಿವಿನ ಅಂಕ ಮತ್ತು ಅದಕ್ಕೆ ಕಾರಣವಾಗುವ ಅಂಶಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ.",
      loading: "PMOS ಅರಿವು ಲೋಡ್ ಆಗುತ್ತಿದೆ...",
      loadingDescription: "ನಿಮ್ಮ ದಾಖಲಾದ ಕ್ಷೇಮ ಮಾಹಿತಿಯನ್ನು ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ.",
      loginRequired: "ಮುಂದುವರಿಸಲು ದಯವಿಟ್ಟು ಲಾಗಿನ್ ಮಾಡಿ.",
      loadError: "PMOS ಮಾಹಿತಿಯನ್ನು ಲೋಡ್ ಮಾಡಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ.",
      currentScore: "ಪ್ರಸ್ತುತ ಅರಿವಿನ ಅಂಕ",
      whatThisMeans: "ಇದರ ಅರ್ಥವೇನು",
      meaningHigh: "ದಾಖಲಾದ ಹಲವು ಕ್ಷೇಮ ಅಂಶಗಳು ಹೆಚ್ಚಿನ ಅರಿವಿನ ಅಂಕಕ್ಕೆ ಕಾರಣವಾಗಿವೆ. ನಿಮ್ಮ ಇತ್ತೀಚಿನ ಆರೋಗ್ಯ ಮಾಹಿತಿಯನ್ನು ಪರಿಶೀಲಿಸಿ; ಕಾಳಜಿ ಇದ್ದರೆ ಆರೋಗ್ಯ ವೃತ್ತಿಪರರ ಮಾರ್ಗದರ್ಶನ ಪಡೆಯಿರಿ.",
      meaningModerate: "ದಾಖಲಾದ ಕೆಲವು ಕ್ಷೇಮ ಅಂಶಗಳು ಪ್ರಸ್ತುತ ಅರಿವಿನ ಅಂಕಕ್ಕೆ ಕಾರಣವಾಗಿವೆ. ನಿಮ್ಮ ಕ್ಷೇಮವನ್ನು ನಿಯಮಿತವಾಗಿ ದಾಖಲಿಸುವುದನ್ನು ಮುಂದುವರಿಸಿ.",
      meaningLow: "ಪ್ರಸ್ತುತ ದಾಖಲಾದ ಕ್ಷೇಮ ಅಂಶಗಳಿಂದ ಅರಿವಿನ ಅಂಕ ಕಡಿಮೆಯಾಗಿದೆ. ನಿಮ್ಮ ಕ್ಷೇಮವನ್ನು ಗಮನಿಸುವುದನ್ನು ಮುಂದುವರಿಸಿ.",
      meaningNoData: "ಅರಿವಿನ ಅಂಕ ಪಡೆಯಲು ನಿಮ್ಮ ಕ್ಷೇಮ ಮಾಹಿತಿಯನ್ನು ದಾಖಲಿಸಿ.",
      scoreFallback: "ನಿಮ್ಮ ಇತ್ತೀಚಿನ ದಾಖಲಾದ ಕ್ಷೇಮ ಮಾಹಿತಿಯಿಂದ ಅಂಕವನ್ನು ಲೆಕ್ಕಿಸಲಾಗಿದೆ.",
      noHealthDataMessage: "ದಯವಿಟ್ಟು ಮೊದಲು ನಿಮ್ಮ ಆರೋಗ್ಯ ಮಾಹಿತಿಯನ್ನು ದಾಖಲಿಸಿ.",
      informationalMessage: "ಇದು ಮಾಹಿತಿ ಉದ್ದೇಶದ ಕ್ಷೇಮ ಅಂದಾಜು ಮಾತ್ರ; ವೈದ್ಯಕೀಯ ರೋಗನಿರ್ಣಯವಲ್ಲ.",
      historyNoHealthData: "ಅರಿವಿನ ಅಂಕವನ್ನು ಲೆಕ್ಕಿಸಲು ಸಾಕಷ್ಟು ದಾಖಲಾದ ಕ್ಷೇಮ ಮಾಹಿತಿ ಇಲ್ಲ.",
      historyNoFactorsExplanation: "ಪ್ರಸ್ತುತ ದಾಖಲಾದ ಯಾವುದೇ ಕ್ಷೇಮ ಅಂಶಗಳು ಅರಿವಿನ ಅಂಕಕ್ಕೆ ಅಂಕಗಳನ್ನು ಸೇರಿಸಲಿಲ್ಲ.",
      historyFactorsExplanation: "ಪ್ರಸ್ತುತ ಅರಿವಿನ ಅಂಕವು ನಿಮ್ಮ ಇತ್ತೀಚಿನ ದಾಖಲಾದ ಕ್ಷೇಮ ಮಾಹಿತಿಯನ್ನು ಆಧರಿಸಿದೆ. ಈ ಅಂಕಕ್ಕೆ ಕೊಡುಗೆ ನೀಡುವ ಅಂಶಗಳು: {factors}. ಪ್ರತಿ ಅಂಶವು ಪ್ರಸ್ತುತ ಪಾರದರ್ಶಕ ನಿಯಮಗಳ ಪೂರ್ವನಿರ್ಧರಿತ ಕೊಡುಗೆಯಂತೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ.",
      dayValue: "ದಿನ {value}",
      hoursValue: "{value} ಗಂಟೆಗಳು",
      riskLevel: "ಅಪಾಯದ ಮಟ್ಟ",
      riskScore: "ಅಪಾಯದ ಅಂಕ",
      low: "ಕಡಿಮೆ",
      moderate: "ಮಧ್ಯಮ",
      high: "ಹೆಚ್ಚು",
      noData: "ಯಾವುದೇ ಮಾಹಿತಿ ಇಲ್ಲ",
      contributingFactors: "ಕೊಡುಗೆ ನೀಡುವ ಅಂಶಗಳು",
      factorsDescription: "ದಾಖಲಾದ ಯಾವ ಕ್ಷೇಮ ಮಾಹಿತಿಯು ಪ್ರಸ್ತುತ ಅರಿವಿನ ಅಂಕದ ಮೇಲೆ ಪ್ರಭಾವ ಬೀರುತ್ತದೆ ಎಂಬುದನ್ನು ಈ ಅಂಶಗಳು ವಿವರಿಸುತ್ತವೆ.",
      recordedValue: "ದಾಖಲಾದ ಮೌಲ್ಯ:",
      impactLabel: "{level} ಪ್ರಭಾವ",
      noFactors: "ಕೊಡುಗೆ ನೀಡುವ ಅಂಶಗಳು ಲಭ್ಯವಿಲ್ಲ",
      noFactorsDescription: "ವಿವರವಾದ ವಿವರಣೆ ಪಡೆಯಲು ಇನ್ನಷ್ಟು ಕ್ಷೇಮ ಮಾಹಿತಿಯನ್ನು ದಾಖಲಿಸಿ.",
      explainabilityTitle: "ಅರಿವಿನ ಅಂಕವನ್ನು ಹೇಗೆ ರಚಿಸಲಾಗುತ್ತದೆ",
      explainabilityDescription: "SakhiAI ಪ್ರಸ್ತುತ ನಿಮ್ಮ ದಾಖಲಾದ ಮಾಹಿತಿಯ ಆಧಾರದ ಮೇಲೆ ಸ್ಪಷ್ಟ ಕ್ಷೇಮ ನಿಯಮಗಳನ್ನು ಬಳಸುತ್ತದೆ. ಪ್ರತಿ ಅಂಶವು ಪೂರ್ವನಿರ್ಧರಿತ ಕೊಡುಗೆಯಂತೆ ಅರಿವಿನ ಅಂಕವನ್ನು ಹೆಚ್ಚಿಸುತ್ತದೆ.",
      factorMood: "ಮನಸ್ಥಿತಿ",
      factorSleep: "ನಿದ್ರೆ",
      factorActivity: "ಚಟುವಟಿಕೆ",
      factorCycle: "ಚಕ್ರ",
      moodLowExplanation: "ನಿಮ್ಮ ದಾಖಲಾದ ಮನಸ್ಥಿತಿಯ ಅಂಕ ಕಡಿಮೆಯಾಗಿದ್ದು, ಪ್ರಸ್ತುತ ಅರಿವಿನ ಅಂಕಕ್ಕೆ ಹೆಚ್ಚು ಕೊಡುಗೆ ನೀಡುತ್ತದೆ.",
      moodModerateExplanation: "ನಿಮ್ಮ ದಾಖಲಾದ ಮನಸ್ಥಿತಿಯು ಆಯ್ದ ಮಾಪಕದ ಮಧ್ಯಮ ಮಟ್ಟದಲ್ಲಿದ್ದು, ಪ್ರಸ್ತುತ ಅರಿವಿನ ಅಂಕಕ್ಕೆ ಮಧ್ಯಮ ಕೊಡುಗೆ ನೀಡುತ್ತದೆ.",
      sleepVeryLowExplanation: "ನಿಮ್ಮ ದಾಖಲಾದ ನಿದ್ರೆ 6 ಗಂಟೆಗಳಿಗಿಂತ ಕಡಿಮೆಯಿದ್ದು, ಪ್ರಸ್ತುತ ಅರಿವಿನ ಅಂಕಕ್ಕೆ ಹೆಚ್ಚಿನ ಕೊಡುಗೆ ನೀಡುತ್ತದೆ.",
      sleepLowExplanation: "ನಿಮ್ಮ ದಾಖಲಾದ ನಿದ್ರೆ 7 ಗಂಟೆಗಳಿಗಿಂತ ಕಡಿಮೆಯಿದ್ದು, ಪ್ರಸ್ತುತ ಅರಿವಿನ ಅಂಕಕ್ಕೆ ಮಧ್ಯಮ ಕೊಡುಗೆ ನೀಡುತ್ತದೆ.",
      activityLowExplanation: "ನಿಮ್ಮ ದಾಖಲಾದ ಚಟುವಟಿಕೆಯ ಮಟ್ಟ ಕಡಿಮೆಯಿದ್ದು, ಅರಿವಿನ ಅಂಕಕ್ಕೆ ಕೊಡುಗೆ ನೀಡುತ್ತದೆ.",
      cycleLaterExplanation: "ದಾಖಲಾದ ಚಕ್ರದ ದಿನ 21 ಅಥವಾ ಅದಕ್ಕಿಂತ ಹೆಚ್ಚಿದ್ದು, ಪ್ರಸ್ತುತ ಅರಿವಿನ ಅಂಕಕ್ಕೆ ಕೊಡುಗೆ ನೀಡುತ್ತದೆ.",
      historyTitle: "ಮೌಲ್ಯಮಾಪನ ಇತಿಹಾಸ",
      historyDescription: "ಹಿಂದಿನ PMOS ಅರಿವು ಮೌಲ್ಯಮಾಪನಗಳನ್ನು ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಕಾಲಕ್ರಮೇಣ ಅಂಕದ ಬದಲಾವಣೆಯನ್ನು ಗಮನಿಸಿ.",
      date: "ದಿನಾಂಕ",
      score: "ಅಂಕ",
      awarenessLevel: "ಅರಿವಿನ ಮಟ್ಟ",
      explanation: "ವಿವರಣೆ",
      noHistory: "ಹಿಂದಿನ ಮೌಲ್ಯಮಾಪನಗಳಿಲ್ಲ",
      noHistoryDescription: "ಹೊಸ PMOS ಅರಿವು ಮೌಲ್ಯಮಾಪನವನ್ನು ಉಳಿಸಿದರೆ ಅದು ಇಲ್ಲಿ ದಾಖಲಾಗುತ್ತದೆ.",
      saveAssessment: "ಮೌಲ್ಯಮಾಪನವನ್ನು ಇತಿಹಾಸದಲ್ಲಿ ಉಳಿಸಿ",
      savingAssessment: "ಮೌಲ್ಯಮಾಪನವನ್ನು ಉಳಿಸಲಾಗುತ್ತಿದೆ...",
      assessmentSaved: "ಮೌಲ್ಯಮಾಪನವನ್ನು ನಿಮ್ಮ ಇತಿಹಾಸದಲ್ಲಿ ಉಳಿಸಲಾಗಿದೆ.",
      assessmentSaveError: "ಈ ಮೌಲ್ಯಮಾಪನವನ್ನು ಉಳಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
      historyRefreshError: "ಮೌಲ್ಯಮಾಪನ ಉಳಿಸಲಾಗಿದೆ, ಆದರೆ ಇತಿಹಾಸವನ್ನು ನವೀಕರಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ.",
      disclaimer: "PMOS ಅರಿವು ಮಾಹಿತಿ ಶಿಕ್ಷಣ ಮತ್ತು ಸಾಮಾನ್ಯ ಕ್ಷೇಮಕ್ಕಾಗಿ ಮಾತ್ರ. ಇದು ವೈದ್ಯಕೀಯ ರೋಗನಿರ್ಣಯವಲ್ಲ. ವೈದ್ಯಕೀಯ ಕಾಳಜಿಗಳಿಗಾಗಿ ಅರ್ಹ ಆರೋಗ್ಯ ವೃತ್ತಿಪರರನ್ನು ಸಂಪರ್ಕಿಸಿ.",
    },

    pregnancy: {
  title: "ಗರ್ಭಧಾರಣೆ ಬೆಂಬಲ",
  description:
    "ನಿಮ್ಮ ಗರ್ಭಧಾರಣೆ ಮತ್ತು ಪ್ರಸವೋತ್ತರ ಕ್ಷೇಮದ ಮಾಹಿತಿಯನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ.",
  currentStatus: "ಪ್ರಸ್ತುತ ಸ್ಥಿತಿ",
  pregnancy: "ಗರ್ಭಧಾರಣೆಯ ಸ್ಥಿತಿ",
  pregnancyWeek: "ಗರ್ಭಧಾರಣೆಯ ವಾರ",
  dueDate: "ಅಂದಾಜು ಪ್ರಸವ ದಿನಾಂಕ",
  postpartum: "ಪ್ರಸವೋತ್ತರ",
  postpartumWellbeing: "ಪ್ರಸವೋತ್ತರ ಕ್ಷೇಮ",
  postpartumStatus: "ಪ್ರಸವೋತ್ತರ ಸ್ಥಿತಿ",
  postpartumWeek: "ಪ್ರಸವೋತ್ತರ ವಾರ",
  postpartumMood: "ಪ್ರಸವೋತ್ತರ ಮನಸ್ಥಿತಿ",
  wellbeingNotes: "ಕ್ಷೇಮದ ಟಿಪ್ಪಣಿಗಳು",
  saveInformation: "ಮಾಹಿತಿಯನ್ನು ಉಳಿಸಿ",
  saving: "ಉಳಿಸಲಾಗುತ್ತಿದೆ...",
  updateMessage:
    "ನಿಮ್ಮ ಕ್ಷೇಮದ ದಾಖಲೆಯನ್ನು ಪ್ರಸ್ತುತವಾಗಿಡಲು ಬೇಕಾದಾಗ ನಿಮ್ಮ ಮಾಹಿತಿಯನ್ನು ನವೀಕರಿಸಿ.",
  selectMood: "ಮನಸ್ಥಿತಿಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",
  veryLow: "ತುಂಬಾ ಕಡಿಮೆ",
  lowMood: "ಕಡಿಮೆ",
  neutral: "ತಟಸ್ಥ",
  good: "ಉತ್ತಮ",
  veryGood: "ತುಂಬಾ ಉತ್ತಮ",
  notPregnant: "ಗರ್ಭಿಣಿಯಲ್ಲ",
  pregnant: "ಗರ್ಭಿಣಿ",
  postpartumStatusValue: "ಪ್ರಸವೋತ್ತರ",
  notPostpartum: "ಪ್ರಸವೋತ್ತರ ಅಲ್ಲ",
  week: "ವಾರ",
  noRecords: "ಇನ್ನೂ ಯಾವುದೇ ಗರ್ಭಧಾರಣೆಯ ದಾಖಲೆಗಳಿಲ್ಲ",
  noRecordsDescription:
    "ನಿಮ್ಮ ಉಳಿಸಿದ ಗರ್ಭಧಾರಣೆ ಮತ್ತು ಪ್ರಸವೋತ್ತರ ಕ್ಷೇಮದ ದಾಖಲೆಗಳು ಇಲ್ಲಿ ಕಾಣಿಸುತ್ತವೆ.",
  historyTitle: "ಗರ್ಭಧಾರಣೆ ಮತ್ತು ಪ್ರಸವೋತ್ತರ ಇತಿಹಾಸ",
  historyDescription:
    "ನಿಮ್ಮ ಖಾತೆಯಲ್ಲಿ ಉಳಿಸಲಾದ ಹಿಂದಿನ ಕ್ಷೇಮದ ದಾಖಲೆಗಳು.",
  wellbeingGuidance: "ಕ್ಷೇಮ ಮಾರ್ಗದರ್ಶನ",
  gentleSelfCare: "ಸೌಮ್ಯ ಸ್ವಯಂ ಆರೈಕೆ",
  gentleSelfCareDescription:
    "ವಿಶ್ರಾಂತಿ, ನೀರಿನ ಸೇವನೆ, ಭಾವನಾತ್ಮಕ ಕ್ಷೇಮ ಮತ್ತು ನಿಮಗೆ ಬೆಂಬಲ ನೀಡುವ ದೈನಂದಿನ ಅಭ್ಯಾಸಗಳನ್ನು ಗಮನದಲ್ಲಿಡಿ.",
  stayConnected: "ಸಂಪರ್ಕದಲ್ಲಿರಿ",
  stayConnectedDescription:
    "ನಿರಂತರ ದೈಹಿಕ ಅಥವಾ ಭಾವನಾತ್ಮಕ ಬದಲಾವಣೆಗಳ ಬಗ್ಗೆ ನಿಮಗೆ ಚಿಂತೆ ಇದ್ದರೆ, ಅರ್ಹ ಆರೋಗ್ಯ ವೃತ್ತಿಪರರೊಂದಿಗೆ ಮಾತನಾಡುವುದನ್ನು ಪರಿಗಣಿಸಿ.",
  disclaimer:
    "ಈ ಮಾಡ್ಯೂಲ್ ಕ್ಷೇಮದ ಟ್ರ್ಯಾಕಿಂಗ್ ಮತ್ತು ಶೈಕ್ಷಣಿಕ ಬೆಂಬಲಕ್ಕಾಗಿ ಮಾತ್ರ. ಇದು ವೈದ್ಯಕೀಯ ನಿರ್ಣಯ, ಚಿಕಿತ್ಸೆ ಅಥವಾ ತುರ್ತು ವೈದ್ಯಕೀಯ ಸಲಹೆಯನ್ನು ನೀಡುವುದಿಲ್ಲ. ವೈದ್ಯಕೀಯ ಸಮಸ್ಯೆಗಳಿಗಾಗಿ ಅರ್ಹ ಆರೋಗ್ಯ ವೃತ್ತಿಪರರನ್ನು ಸಂಪರ್ಕಿಸಿ.",
  loading: "ಗರ್ಭಧಾರಣೆಯ ಕ್ಷೇಮ ಮಾಹಿತಿಯನ್ನು ಲೋಡ್ ಮಾಡಲಾಗುತ್ತಿದೆ...",
  loadingDescription:
    "ನಿಮ್ಮ ವೈಯಕ್ತಿಕಗೊಳಿಸಿದ ಮಾಹಿತಿಯನ್ನು ಸಿದ್ಧಪಡಿಸಲಾಗುತ್ತಿದೆ.",
  loginRequired: "ಮುಂದುವರಿಸಲು ದಯವಿಟ್ಟು ಲಾಗಿನ್ ಮಾಡಿ.",
  loadError:
    "ಗರ್ಭಧಾರಣೆಯ ಮಾಹಿತಿಯನ್ನು ಲೋಡ್ ಮಾಡಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ.",
  saveSuccess:
    "ನಿಮ್ಮ ಗರ್ಭಧಾರಣೆ ಮತ್ತು ಪ್ರಸವೋತ್ತರ ಮಾಹಿತಿಯನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಉಳಿಸಲಾಗಿದೆ.",
  saveError:
    "ನಿಮ್ಮ ಮಾಹಿತಿಯನ್ನು ಉಳಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ.",
  pregnancyWeekPlaceholder: "ಉದಾಹರಣೆ: 12",
  postpartumWeekPlaceholder: "ಉದಾಹರಣೆ: 6",
  dueDatePlaceholder: "ದಿನ/ತಿಂಗಳು/ವರ್ಷ",
  wellbeingNotesPlaceholder:
    "ನಿಮಗೆ ಹೇಗನಿಸುತ್ತಿದೆ, ನಿಮ್ಮ ಕ್ಷೇಮ ಅಥವಾ ನೆನಪಿಟ್ಟುಕೊಳ್ಳಲು ಬಯಸುವ ಯಾವುದನ್ನಾದರೂ ಬರೆಯಿರಿ...",
  postpartumLabel: "ಪ್ರಸವೋತ್ತರ",
  defaultWellbeingNote:
    "ಚೆನ್ನಾಗಿದ್ದೇನೆ ಮತ್ತು ನಿಯಮಿತ ಸ್ವಯಂ ಆರೈಕೆಯನ್ನು ಮಾಡುತ್ತಿದ್ದೇನೆ.",
},

    mentalWellness: {
  title: "ಮಾನಸಿಕ ಕ್ಷೇಮ",
  subtitle:
    "ಸರಳ ಸ್ವಯಂ ಮೌಲ್ಯಮಾಪನ ಪ್ರಶ್ನಾವಳಿಗಳ ಮೂಲಕ ನಿಮ್ಮ ಭಾವನಾತ್ಮಕ ಕ್ಷೇಮವನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ.",

  important: "ಮುಖ್ಯ",
  disclaimer:
    "ಈ ಪ್ರಶ್ನಾವಳಿಗಳು ಅರಿವು ಮತ್ತು ಸ್ವಯಂ-ಚಿಂತನೆಗಾಗಿ ಮಾತ್ರ. ಇವು ವೈದ್ಯಕೀಯ ನಿರ್ಣಯವನ್ನು ನೀಡುವುದಿಲ್ಲ. ನಿಮ್ಮ ಕ್ಷೇಮದ ಬಗ್ಗೆ ನಿಮಗೆ ಕಾಳಜಿ ಇದ್ದರೆ, ಅರ್ಹ ಆರೋಗ್ಯ ವೃತ್ತಿಪರರೊಂದಿಗೆ ಮಾತನಾಡಿ.",

  depressionAwareness: "ಖಿನ್ನತೆ ಅರಿವು",
  anxietyAwareness: "ಆತಂಕ ಅರಿವು",
  postpartumMoodAwareness: "ಪ್ರಸವೋತ್ತರ ಮನಸ್ಥಿತಿ ಅರಿವು",
  postpartumMood: "ಪ್ರಸವೋತ್ತರ ಮನಸ್ಥಿತಿ",

  questions9: "9 ಪ್ರಶ್ನೆಗಳು",
  questions7: "7 ಪ್ರಶ್ನೆಗಳು",
  questions10: "10 ಪ್ರಶ್ನೆಗಳು",

  phq9Description:
    "ನಿಮ್ಮ ಇತ್ತೀಚಿನ ಭಾವನಾತ್ಮಕ ಕ್ಷೇಮದ ಬಗ್ಗೆ ಚಿಂತಿಸಲು ಸಹಾಯ ಮಾಡುವ PHQ-9 ಶೈಲಿಯ ಪ್ರಶ್ನಾವಳಿ.",

  gad7Description:
    "ಆತಂಕಕ್ಕೆ ಸಂಬಂಧಿಸಿದ ಅನುಭವಗಳ ಬಗ್ಗೆ ಚಿಂತಿಸಲು ಸಹಾಯ ಮಾಡುವ GAD-7 ಶೈಲಿಯ ಪ್ರಶ್ನಾವಳಿ.",

  epdsDescription:
    "ಪ್ರಸವೋತ್ತರ ಭಾವನಾತ್ಮಕ ಕ್ಷೇಮದ ಅರಿವಿಗಾಗಿ ವಿನ್ಯಾಸಗೊಳಿಸಲಾದ EPDS ಶೈಲಿಯ ಪ್ರಶ್ನಾವಳಿ.",

  notAtAll: "ಎಂದಿಗೂ ಇಲ್ಲ",
  severalDays: "ಕೆಲವು ದಿನಗಳು",
  moreThanHalfDays: "ಅರ್ಧಕ್ಕಿಂತ ಹೆಚ್ಚು ದಿನಗಳು",
  nearlyEveryDay: "ಬಹುತೇಕ ಪ್ರತಿದಿನ",

  completeAssessment: "ಮೌಲ್ಯಮಾಪನ ಪೂರ್ಣಗೊಳಿಸಿ",
  savingAssessment: "ಮೌಲ್ಯಮಾಪನವನ್ನು ಉಳಿಸಲಾಗುತ್ತಿದೆ...",

  awarenessResult: "ನಿಮ್ಮ ಅರಿವಿನ ಫಲಿತಾಂಶ",
  score: "ಅಂಕ",
  awarenessLevel: "ಅರಿವಿನ ಮಟ್ಟ",

  lowerAwareness:
    "ನಿಮ್ಮ ಉತ್ತರಗಳು ಪ್ರಸ್ತುತ ಕಡಿಮೆ ಅರಿವಿನ ಮಟ್ಟದಲ್ಲಿವೆ.",

  mildAwareness:
    "ನಿಮ್ಮ ಉತ್ತರಗಳಲ್ಲಿ ಗಮನಿಸಬೇಕಾದ ಕೆಲವು ಅಂಶಗಳು ಕಂಡುಬರುತ್ತವೆ.",

  moderateAwareness:
    "ನಿಮ್ಮ ಉತ್ತರಗಳು ಹೆಚ್ಚಿನ ಗಮನ ಮತ್ತು ಬೆಂಬಲವು ಸಹಾಯಕವಾಗಬಹುದು ಎಂದು ಸೂಚಿಸುತ್ತವೆ.",

  professionalSupport:
    "ಅರ್ಹ ಆರೋಗ್ಯ ವೃತ್ತಿಪರರೊಂದಿಗೆ ಮಾತನಾಡುವುದು ಸಹಾಯಕವಾಗಬಹುದು ಎಂದು ನಿಮ್ಮ ಉತ್ತರಗಳು ಸೂಚಿಸುತ್ತವೆ.",

  resultDisclaimer:
    "ಈ ಫಲಿತಾಂಶವು ಅರಿವಿಗಾಗಿ ಮಾತ್ರ, ವೈದ್ಯಕೀಯ ನಿರ್ಣಯವಲ್ಲ. ನಿರಂತರ ಅಥವಾ ಚಿಂತಾಜನಕ ಅನುಭವಗಳ ಬಗ್ಗೆ ಅರ್ಹ ಆರೋಗ್ಯ ವೃತ್ತಿಪರರೊಂದಿಗೆ ಚರ್ಚಿಸುವುದನ್ನು ಪರಿಗಣಿಸಿ.",
  immediateSafety:
    "ನಿಮಗೆ ಸ್ವತಃ ಹಾನಿ ಮಾಡಿಕೊಳ್ಳುವ ಆಲೋಚನೆಗಳಂತೆ ನಡೆದುಕೊಳ್ಳುವ ಸಾಧ್ಯತೆಯಿದ್ದರೆ ಅಥವಾ ತಕ್ಷಣದ ಅಪಾಯದಲ್ಲಿದ್ದರೆ, ಈಗಲೇ ಸ್ಥಳೀಯ ತುರ್ತು ಸೇವೆಗಳನ್ನು ಸಂಪರ್ಕಿಸಿ ಅಥವಾ ನೀವು ನಂಬುವ ವ್ಯಕ್ತಿ ಮತ್ತು ಅರ್ಹ ಆರೋಗ್ಯ ವೃತ್ತಿಪರರನ್ನು ಸಂಪರ್ಕಿಸಿ.",
  minimalAwarenessLevel: "ಕನಿಷ್ಠ ಅರಿವಿನ ಮಟ್ಟ",
  mildAwarenessLevel: "ಸೌಮ್ಯ ಅರಿವಿನ ಮಟ್ಟ",
  moderateAwarenessLevel: "ಮಧ್ಯಮ ಅರಿವಿನ ಮಟ್ಟ",
  moderatelyHighAwarenessLevel: "ಮಧ್ಯಮಕ್ಕಿಂತ ಹೆಚ್ಚಿನ ಅರಿವಿನ ಮಟ್ಟ",
  highAwarenessLevel: "ಹೆಚ್ಚಿನ ಅರಿವಿನ ಮಟ್ಟ",
  lowerAwarenessRange: "ಕಡಿಮೆ ಅರಿವಿನ ವ್ಯಾಪ್ತಿ",
  possibleConcernRange: "ಕಾಳಜಿಯ ಸಾಧ್ಯತೆಯಿರುವ ವ್ಯಾಪ್ತಿ",
  higherAwarenessRange: "ಹೆಚ್ಚಿನ ಅರಿವಿನ ವ್ಯಾಪ್ತಿ",
  unknownInterpretation: "ತಿಳಿದಿಲ್ಲ",

  assessmentHistory: "ಮೌಲ್ಯಮಾಪನ ಇತಿಹಾಸ",
  loadingHistory: "ಇತಿಹಾಸವನ್ನು ಲೋಡ್ ಮಾಡಲಾಗುತ್ತಿದೆ...",
  noAssessments: "ಇನ್ನೂ ಯಾವುದೇ ಮೌಲ್ಯಮಾಪನಗಳಿಲ್ಲ",

  noAssessmentsDescription:
    "ನೀವು ಪೂರ್ಣಗೊಳಿಸಿದ ಅರಿವಿನ ಮೌಲ್ಯಮಾಪನಗಳು ಇಲ್ಲಿ ಕಾಣಿಸುತ್ತವೆ.",

  pleaseAnswerAll:
    "ಸಲ್ಲಿಸುವ ಮೊದಲು ಎಲ್ಲಾ ಪ್ರಶ್ನೆಗಳಿಗೆ ಉತ್ತರಿಸಿ.",

  loginAgain: "ದಯವಿಟ್ಟು ಮತ್ತೆ ಲಾಗಿನ್ ಮಾಡಿ.",

  saveError:
    "ಮೌಲ್ಯಮಾಪನವನ್ನು ಉಳಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",

  assessmentNames: {
    PHQ9: "ಖಿನ್ನತೆ ಅರಿವು",
    GAD7: "ಆತಂಕ ಅರಿವು",
    EPDS: "ಪ್ರಸವೋತ್ತರ ಮನಸ್ಥಿತಿ ಅರಿವು",
  },

  questions: {
    PHQ9: [
      "ವಿಷಯಗಳಲ್ಲಿ ಆಸಕ್ತಿ ಅಥವಾ ಸಂತೋಷ ಕಡಿಮೆಯಾಗಿರುವುದು",
      "ಖಿನ್ನತೆ, ದುಃಖ ಅಥವಾ ನಿರಾಶೆ ಅನುಭವಿಸುವುದು",
      "ನಿದ್ರೆ ಬರಲು ಅಥವಾ ನಿದ್ರೆಯಲ್ಲಿ ಇರಲು ತೊಂದರೆ, ಅಥವಾ ಹೆಚ್ಚು ನಿದ್ರೆ ಮಾಡುವುದು",
      "ದಣಿವು ಅಥವಾ ಕಡಿಮೆ ಶಕ್ತಿ ಅನುಭವಿಸುವುದು",
      "ಹಸಿವು ಕಡಿಮೆಯಾಗುವುದು ಅಥವಾ ಹೆಚ್ಚು ತಿನ್ನುವುದು",
      "ನಿಮ್ಮ ಬಗ್ಗೆ ಕೆಟ್ಟ ಭಾವನೆ ಹೊಂದುವುದು",
      "ವಿಷಯಗಳ ಮೇಲೆ ಗಮನ ಕೇಂದ್ರೀಕರಿಸಲು ತೊಂದರೆ",
      "ನಿಧಾನವಾಗಿ ಚಲಿಸುವುದು ಅಥವಾ ಮಾತನಾಡುವುದು, ಅಥವಾ ಅಸಾಮಾನ್ಯವಾಗಿ ಚಂಚಲವಾಗಿರುವುದು",
      "ನೀವು ಸತ್ತರೆ ಅಥವಾ ನಿಮಗೆ ಹಾನಿ ಮಾಡಿಕೊಂಡರೆ ಉತ್ತಮವಾಗಿರುತ್ತದೆ ಎಂಬ ಆಲೋಚನೆಗಳು",
    ],

    GAD7: [
      "ನರ್ವಸ್, ಆತಂಕ ಅಥವಾ ಅಶಾಂತಿಯನ್ನು ಅನುಭವಿಸುವುದು",
      "ಚಿಂತಿಸುವುದನ್ನು ನಿಲ್ಲಿಸಲು ಅಥವಾ ನಿಯಂತ್ರಿಸಲು ಸಾಧ್ಯವಾಗದಿರುವುದು",
      "ವಿವಿಧ ವಿಷಯಗಳ ಬಗ್ಗೆ ಹೆಚ್ಚು ಚಿಂತಿಸುವುದು",
      "ವಿಶ್ರಾಂತಿ ಪಡೆಯಲು ತೊಂದರೆ",
      "ಸ್ಥಿರವಾಗಿ ಕುಳಿತುಕೊಳ್ಳಲು ಕಷ್ಟವಾಗುವಷ್ಟು ಚಂಚಲವಾಗಿರುವುದು",
      "ಸುಲಭವಾಗಿ ಕಿರಿಕಿರಿ ಅಥವಾ ಕೋಪಗೊಳ್ಳುವುದು",
      "ಏನಾದರೂ ಭಯಾನಕ ಸಂಭವಿಸಬಹುದು ಎಂಬ ಭಯ ಅನುಭವಿಸುವುದು",
    ],

    EPDS: [
      "ನಾನು ನಗಲು ಮತ್ತು ವಿಷಯಗಳ ಹಾಸ್ಯಭಾಗವನ್ನು ನೋಡಲು ಸಾಧ್ಯವಾಗಿದೆ",
      "ನಾನು ವಿಷಯಗಳನ್ನು ಸಂತೋಷದಿಂದ ಎದುರು ನೋಡಿದ್ದೇನೆ",
      "ವಿಷಯಗಳು ತಪ್ಪಾದಾಗ ಅನಗತ್ಯವಾಗಿ ನನ್ನನ್ನೇ ದೂಷಿಸಿಕೊಂಡಿದ್ದೇನೆ",
      "ಯಾವುದೇ ಸ್ಪಷ್ಟ ಕಾರಣವಿಲ್ಲದೆ ಆತಂಕ ಅಥವಾ ಚಿಂತೆ ಅನುಭವಿಸಿದ್ದೇನೆ",
      "ಯಾವುದೇ ಸ್ಪಷ್ಟ ಕಾರಣವಿಲ್ಲದೆ ಭಯ ಅಥವಾ ಗಾಬರಿ ಅನುಭವಿಸಿದ್ದೇನೆ",
      "ವಿಷಯಗಳು ನನ್ನ ನಿಯಂತ್ರಣಕ್ಕೆ ಮೀರಿದಂತೆ ಅನಿಸಿವೆ",
      "ನಾನು ತುಂಬಾ ದುಃಖಿತಳಾಗಿ ನಿದ್ರೆ ಮಾಡಲು ತೊಂದರೆ ಅನುಭವಿಸಿದ್ದೇನೆ",
      "ನಾನು ದುಃಖಿತಳಾಗಿದ್ದೇನೆ ಅಥವಾ ದುಃಖದಿಂದ ಇದ್ದೇನೆ",
      "ನಾನು ತುಂಬಾ ದುಃಖಿತಳಾಗಿ ಅಳುತ್ತಿದ್ದೇನೆ",
      "ನನಗೆ ಸ್ವತಃ ಹಾನಿ ಮಾಡಿಕೊಳ್ಳುವ ಆಲೋಚನೆ ಬಂದಿದೆ",
    ],
  },
},

    wellness: {
      loading: "ಕ್ಷೇಮ ಮಾಹಿತಿಯನ್ನು ಲೋಡ್ ಮಾಡಲಾಗುತ್ತಿದೆ...",
      loadingDescription:
        "ನಿಮ್ಮ ಕ್ಷೇಮ ಮಾಹಿತಿಯನ್ನು ಸಿದ್ಧಪಡಿಸಲಾಗುತ್ತಿದೆ.",
      brand: "SakhiAI ಕ್ಷೇಮ",
      title: "ನಿಮ್ಮ ಕ್ಷೇಮ",
      subtitle:
        "ನಿಮ್ಮ ಇತ್ತೀಚಿನ ನಿದ್ರೆ, ಮನಸ್ಥಿತಿ, ಚಟುವಟಿಕೆ ಮತ್ತು ಒಟ್ಟಾರೆ ಕ್ಷೇಮವನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ.",
      currentWellness: "ಪ್ರಸ್ತುತ ಕ್ಷೇಮ",
      sleep: "ನಿದ್ರೆ",
      hours: "ಗಂ.",
      latestSleep: "ಇತ್ತೀಚಿನ ದಾಖಲಾದ ನಿದ್ರೆ",
      mood: "ಮನಸ್ಥಿತಿ",
      latestMood: "ಇತ್ತೀಚಿನ ಮನಸ್ಥಿತಿ ಮೌಲ್ಯಮಾಪನ",
      activity: "ಚಟುವಟಿಕೆ",
      activityLow: "ಕಡಿಮೆ",
      activityModerate: "ಮಧ್ಯಮ",
      activityHigh: "ಹೆಚ್ಚು",
      latestActivity: "ಇತ್ತೀಚಿನ ಚಟುವಟಿಕೆಯ ಮಟ್ಟ",
      cycleDay: "ಚಕ್ರದ ದಿನ",
      day: "ದಿನ",
      latestCycleDay: "ಇತ್ತೀಚಿನ ದಾಖಲಾದ ಚಕ್ರದ ದಿನ",
      trends: "ಕ್ಷೇಮದ ಪ್ರವೃತ್ತಿಗಳು",
      moodTrend: "ಮನಸ್ಥಿತಿಯ ಪ್ರವೃತ್ತಿ",
      moodTrendDescription:
        "ಕಾಲಕ್ರಮೇಣ ನಿಮ್ಮ ಮನಸ್ಥಿತಿಯ ಮೌಲ್ಯಮಾಪನಗಳು.",
      sleepTrend: "ನಿದ್ರೆಯ ಪ್ರವೃತ್ತಿ",
      sleepTrendDescription:
        "ಕಾಲಕ್ರಮೇಣ ದಾಖಲಾದ ನಿಮ್ಮ ನಿದ್ರೆಯ ಅವಧಿ.",
      noHistory: "ಇನ್ನೂ ಕ್ಷೇಮದ ಇತಿಹಾಸ ಲಭ್ಯವಿಲ್ಲ",
      noHistoryDescription:
        "ಕ್ಷೇಮದ ಪ್ರವೃತ್ತಿಗಳನ್ನು ನೋಡಲು ನಿಮ್ಮ ಆರೋಗ್ಯ ಮಾಹಿತಿಯನ್ನು ದಾಖಲಿಸುವುದನ್ನು ಮುಂದುವರಿಸಿ.",
      personalizedInsights: "ವೈಯಕ್ತಿಕಗೊಳಿಸಿದ ಕ್ಷೇಮ ಒಳನೋಟಗಳು",
      insightsDescription:
        "ನಿಮ್ಮ ಇತ್ತೀಚಿನ ಆರೋಗ್ಯ ಮಾಹಿತಿಯ ಆಧಾರದ ಮೇಲಿನ ಒಳನೋಟಗಳು.",
      noInsights: "ಇನ್ನೂ ವೈಯಕ್ತಿಕಗೊಳಿಸಿದ ಒಳನೋಟಗಳಿಲ್ಲ",
      noInsightsDescription:
        "ವೈಯಕ್ತಿಕಗೊಳಿಸಿದ ಒಳನೋಟಗಳನ್ನು ಪಡೆಯಲು ನಿಮ್ಮ ಆರೋಗ್ಯ ಮಾಹಿತಿಯನ್ನು ದಾಖಲಿಸುವುದನ್ನು ಮುಂದುವರಿಸಿ.",
      insightsDisclaimer:
        "ಈ ಒಳನೋಟಗಳು ಮಾಹಿತಿಗಾಗಿ ಮಾತ್ರ; ಇವು ವೈದ್ಯಕೀಯ ನಿರ್ಣಯವಲ್ಲ. ಚಿಂತಾಜನಕ ಅಥವಾ ನಿರಂತರ ಲಕ್ಷಣಗಳಿದ್ದರೆ ಅರ್ಹ ಆರೋಗ್ಯ ವೃತ್ತಿಪರರನ್ನು ಸಂಪರ್ಕಿಸಿ.",
    },

    chat: {
      title: "ಸಹಾಯಕ",
      subtitle: "ನಿಮ್ಮ ಮಹಿಳಾ ಆರೋಗ್ಯ ಸಹಚರಿ",
      online: "ಆನ್‌ಲೈನ್",
      welcomeMessage: "ನಮಸ್ಕಾರ! 🌸 ನಾನು SakhiAI. ನಿಮ್ಮ ನಿದ್ರೆ, ಮನಸ್ಥಿತಿ, ಚಟುವಟಿಕೆ, ಮಾಸಿಕ ಚಕ್ರ ಅಥವಾ ಸಾಮಾನ್ಯ ಕ್ಷೇಮದ ಬಗ್ಗೆ ಕೇಳಬಹುದು.",
      sessionExpired: "ನಿಮ್ಮ ಸೆಷನ್ ಅವಧಿ ಮುಗಿದಿದೆ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಲಾಗಿನ್ ಮಾಡಿ.",
      requestError: "SakhiAIಯನ್ನು ಸಂಪರ್ಕಿಸುವಾಗ ಸಮಸ್ಯೆ ಉಂಟಾಗಿದೆ.",
      responseFallback: "ಕ್ಷಮಿಸಿ, ಪ್ರತಿಕ್ರಿಯೆಯನ್ನು ರಚಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ.",
      thinking: "SakhiAI ಯೋಚಿಸುತ್ತಿದೆ...",
      suggestedSleep: "ನನ್ನ ನಿದ್ರೆ ಹೇಗಿದೆ?",
      suggestedMood: "ನನ್ನ ಮನಸ್ಥಿತಿ ಹೇಗಿದೆ?",
      suggestedCycle: "ನನ್ನ ಚಕ್ರ",
      suggestedActivity: "ನನ್ನ ಚಟುವಟಿಕೆ",
      placeholder: "ನಿಮ್ಮ ಸಂದೇಶವನ್ನು ನಮೂದಿಸಿ...",
      send: "ಕಳುಹಿಸಿ",
      sendAriaLabel: "ಸಂದೇಶ ಕಳುಹಿಸಿ",
      disclaimer: "SakhiAI ಮಾಹಿತಿ ಉದ್ದೇಶದ ಕ್ಷೇಮ ಮಾರ್ಗದರ್ಶನ ನೀಡುತ್ತದೆ; ಇದು ವೃತ್ತಿಪರ ವೈದ್ಯಕೀಯ ಸಲಹೆಗೆ ಪರ್ಯಾಯವಲ್ಲ.",
    },

    community: {
      title: "ಸಮುದಾಯ",
      heading: "ಬೆಂಬಲ ವಲಯ 🌸",
      subtitle: "ಇತರ ಮಹಿಳೆಯರೊಂದಿಗೆ ಅನುಭವ, ಪ್ರೋತ್ಸಾಹ ಮತ್ತು ದೈನಂದಿನ ಕ್ಷೇಮದ ಪ್ರಯಾಣವನ್ನು ಹಂಚಿಕೊಳ್ಳಲು ಸುರಕ್ಷಿತ ಸ್ಥಳ.",
      safetyTitle: "ಸಮುದಾಯದ ಸುರಕ್ಷತೆ",
      safetyAnonymous: "ಪೋಸ್ಟ್‌ಗಳನ್ನು ಇತರ ಬಳಕೆದಾರರೊಂದಿಗೆ ಅನಾಮಧೇಯವಾಗಿ ಹಂಚಿಕೊಳ್ಳಲಾಗುತ್ತದೆ.",
      safetyRespect: "ಗೌರವದಿಂದ ಮತ್ತು ಬೆಂಬಲದೊಂದಿಗೆ ವರ್ತಿಸಿ.",
      safetyPrivacy: "ಪಾಸ್‌ವರ್ಡ್‌ಗಳು, ಫೋನ್ ಸಂಖ್ಯೆಗಳು ಅಥವಾ ಖಾಸಗಿ ಮಾಹಿತಿಯನ್ನು ಹಂಚಿಕೊಳ್ಳಬೇಡಿ.",
      safetyMedical: "ವೈದ್ಯಕೀಯ ರೋಗನಿರ್ಣಯಕ್ಕಾಗಿ ಸಮುದಾಯವನ್ನು ಬಳಸಬೇಡಿ.",
      safetyReport: "ಅಸುರಕ್ಷಿತ, ನಿಂದನಾತ್ಮಕ ಅಥವಾ ಸೂಕ್ತವಲ್ಲದ ವಿಷಯವನ್ನು ವರದಿ ಮಾಡಿ.",
      shareTitle: "ಸಮುದಾಯದೊಂದಿಗೆ ಹಂಚಿಕೊಳ್ಳಿ",
      shareDescription: "ನಿಮ್ಮ ಪೋಸ್ಟ್ ಅನಾಮಧೇಯವಾಗಿ ತೋರಿಸಲಾಗುತ್ತದೆ.",
      topic: "ವಿಷಯ",
      categoryGeneral: "ಸಾಮಾನ್ಯ ಬೆಂಬಲ",
      categoryMenstrual: "ಮಾಸಿಕ ಆರೋಗ್ಯ",
      categoryPregnancy: "ಗರ್ಭಧಾರಣೆ",
      categoryPostpartum: "ಪ್ರಸವೋತ್ತರ ಅವಧಿ",
      categoryMentalWellness: "ಮಾನಸಿಕ ಕ್ಷೇಮ",
      shareQuestion: "ನೀವು ಏನನ್ನು ಹಂಚಿಕೊಳ್ಳಲು ಬಯಸುತ್ತೀರಿ?",
      sharePlaceholder: "ನಿಮ್ಮ ಅನುಭವ, ಆಲೋಚನೆ, ಪ್ರೋತ್ಸಾಹ ಅಥವಾ ನೀವು ಎದುರಿಸುತ್ತಿರುವುದನ್ನು ಹಂಚಿಕೊಳ್ಳಿ...",
      loading: "SakhiAI ಸಮುದಾಯ ಲೋಡ್ ಆಗುತ್ತಿದೆ...",
      emptyTitle: "ಇನ್ನೂ ಯಾವುದೇ ಸಂಭಾಷಣೆಗಳಿಲ್ಲ",
      emptyDescription: "ಸಮುದಾಯದಲ್ಲಿ ಏನನ್ನಾದರೂ ಹಂಚಿಕೊಳ್ಳುವ ಮೊದಲ ವ್ಯಕ್ತಿಯಾಗಿ.",
      conversationsTitle: "ಸಮುದಾಯದ ಸಂಭಾಷಣೆಗಳು",
      conversationsDescription: "ಸಮುದಾಯದ ಅನುಭವಗಳು ಮತ್ತು ಪ್ರೋತ್ಸಾಹ.",
      anonymousMember: "ಅನಾಮಧೇಯ ಸದಸ್ಯರು",
      report: "ವರದಿ ಮಾಡಿ",
      reportPrompt: "ಈ ಪೋಸ್ಟ್ ಅನ್ನು ಏಕೆ ವರದಿ ಮಾಡಲು ಬಯಸುತ್ತೀರಿ?",
      reportSuccess: "ಧನ್ಯವಾದಗಳು. ಪೋಸ್ಟ್ ಅನ್ನು ವರದಿ ಮಾಡಲಾಗಿದೆ.",
      reportError: "ಈ ಪೋಸ್ಟ್ ಅನ್ನು ವರದಿ ಮಾಡಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ.",
      postNotFound: "ಸಮುದಾಯದ ಪೋಸ್ಟ್ ಕಂಡುಬಂದಿಲ್ಲ.",
      alreadyReported: "ನೀವು ಈ ಪೋಸ್ಟ್ ಅನ್ನು ಈಗಾಗಲೇ ವರದಿ ಮಾಡಿದ್ದೀರಿ.",
      emptyPostError: "ಪೋಸ್ಟ್ ಮಾಡುವ ಮೊದಲು ದಯವಿಟ್ಟು ಏನನ್ನಾದರೂ ಬರೆಯಿರಿ.",
      loadError: "ಸಮುದಾಯದ ಪೋಸ್ಟ್‌ಗಳನ್ನು ಲೋಡ್ ಮಾಡಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ.",
      createError: "ನಿಮ್ಮ ಪೋಸ್ಟ್ ಅನ್ನು ರಚಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ.",
      createSuccess: "ನಿಮ್ಮ ಪೋಸ್ಟ್ ಅನ್ನು ಅನಾಮಧೇಯವಾಗಿ ಹಂಚಿಕೊಳ್ಳಲಾಗಿದೆ.",
      sharing: "ಹಂಚಿಕೊಳ್ಳಲಾಗುತ್ತಿದೆ...",
      shareAnonymously: "ಅನಾಮಧೇಯವಾಗಿ ಹಂಚಿಕೊಳ್ಳಿ",
      disclaimer: "SakhiAI ಸಮುದಾಯವು ಪರಸ್ಪರ ಬೆಂಬಲ ಮತ್ತು ಅರಿವಿಗಾಗಿ. ಸಮುದಾಯದ ಸದಸ್ಯರು ಹಂಚಿಕೊಳ್ಳುವ ಮಾಹಿತಿ ವೈದ್ಯಕೀಯ ಸಲಹೆ ಅಥವಾ ರೋಗನಿರ್ಣಯವಲ್ಲ. ಆತಂಕಕಾರಿ ಅಥವಾ ನಿರಂತರ ಲಕ್ಷಣಗಳಿದ್ದರೆ ಅರ್ಹ ಆರೋಗ್ಯ ವೃತ್ತಿಪರರನ್ನು ಸಂಪರ್ಕಿಸಿ.",
    },

    dietWorkout: {
      title: "ಆಹಾರ ಮತ್ತು ವ್ಯಾಯಾಮ",
      brand: "SakhiAI ಕ್ಷೇಮ",
      description:
        "ನೀವು ಈಗಾಗಲೇ ದಾಖಲಿಸಿರುವ ಆರೋಗ್ಯ ಮಾಹಿತಿಯ ಆಧಾರದ ಮೇಲೆ ಸರಳ ಜೀವನಶೈಲಿ ಮಾರ್ಗದರ್ಶನ.",
      loading: "ಕ್ಷೇಮ ಮಾರ್ಗದರ್ಶನವನ್ನು ಲೋಡ್ ಮಾಡಲಾಗುತ್ತಿದೆ...",
      loadingDescription:
        "ನಿಮಗಾಗಿ ವೈಯಕ್ತಿಕ ಶಿಫಾರಸುಗಳನ್ನು ಸಿದ್ಧಪಡಿಸಲಾಗುತ್ತಿದೆ.",
      wellnessOnly: "ಕ್ಷೇಮ ಮಾರ್ಗದರ್ಶನ ಮಾತ್ರ:",
      wellnessDisclaimer:
        "ಈ ಸಲಹೆಗಳು ಸಾಮಾನ್ಯ ಕ್ಷೇಮಕ್ಕಾಗಿ ಮಾತ್ರ; ಇವು ವೈಯಕ್ತಿಕ ವೈದ್ಯಕೀಯ, ಆಹಾರ ಅಥವಾ ವ್ಯಾಯಾಮದ ಸೂಚನೆಗಳಲ್ಲ. ನೀವು ಗರ್ಭಿಣಿಯಾಗಿದ್ದರೆ, ಪ್ರಸವೋತ್ತರ ಅವಧಿಯಲ್ಲಿದ್ದರೆ, ಆರೋಗ್ಯ ಸಮಸ್ಯೆಯಿದ್ದರೆ ಅಥವಾ ವ್ಯಾಯಾಮ/ಆಹಾರದ ಬಗ್ಗೆ ಕಾಳಜಿಯಿದ್ದರೆ, ಸೂಕ್ತ ಆರೋಗ್ಯ ವೃತ್ತಿಪರರನ್ನು ಸಂಪರ್ಕಿಸಿ.",
      snapshotTitle: "ನಿಮ್ಮ ಪ್ರಸ್ತುತ ಕ್ಷೇಮದ ನೋಟ",
      snapshotDescription:
        "ನೀವು ಇತ್ತೀಚೆಗೆ ದಾಖಲಿಸಿದ ಆರೋಗ್ಯ ಮಾಹಿತಿಯ ಆಧಾರದ ಮೇಲೆ.",
      noHealthData: "ಇನ್ನೂ ಆರೋಗ್ಯ ಟ್ರ್ಯಾಕಿಂಗ್ ಮಾಹಿತಿ ಇಲ್ಲ",
      noHealthDataDescription:
        "ಹೆಚ್ಚು ಸೂಕ್ತವಾದ ಕ್ಷೇಮ ಮಾರ್ಗದರ್ಶನಕ್ಕಾಗಿ ನಿಮ್ಮ ನಿದ್ರೆ, ಮನಸ್ಥಿತಿ, ಚಟುವಟಿಕೆ ಮತ್ತು ಚಕ್ರದ ಮಾಹಿತಿಯನ್ನು ದಾಖಲಿಸಿ.",
      cycle: "ಚಕ್ರ",
      day: "ದಿನ",
      sleep: "ನಿದ್ರೆ",
      hours: "ಗಂಟೆಗಳು",
      mood: "ಮನಸ್ಥಿತಿ",
      activity: "ಚಟುವಟಿಕೆ",
      activityLow: "ಕಡಿಮೆ",
      activityModerate: "ಮಧ್ಯಮ",
      activityHigh: "ಹೆಚ್ಚು",
      nutritionTitle: "ಪೋಷಣೆ ಮತ್ತು ಆಹಾರ ಮಾರ್ಗದರ್ಶನ",
      nutritionDescription: "ದೈನಂದಿನ ಪೋಷಣೆಗೆ ಸರಳ ಸಲಹೆಗಳು.",
      dietLateCycleIron:
        "ಸೊಪ್ಪು, ಮಸೂರ, ಬೀನ್ಸ್ ಮತ್ತು ಪೋಷಕಾಂಶ ಸೇರಿಸಿದ ಆಹಾರಗಳಂತಹ ಕಬ್ಬಿಣಾಂಶ ಹೆಚ್ಚಿರುವ ಆಹಾರಗಳನ್ನು ಸೇರಿಸಿ.",
      dietLateCycleBalanced:
        "ಪ್ರೋಟೀನ್, ಸಂಪೂರ್ಣ ಧಾನ್ಯಗಳು, ತರಕಾರಿಗಳು ಮತ್ತು ಹಣ್ಣುಗಳಿರುವ ಸಮತೋಲಿತ ಊಟವನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
      dietLateCycleHydration:
        "ದಿನವಿಡೀ ಸಾಕಷ್ಟು ದ್ರವಗಳನ್ನು ಸೇವಿಸಿ.",
      dietLowMoodRegularMeals:
        "ಊಟವನ್ನು ಬಿಡುವ ಬದಲು ನಿಯಮಿತವಾಗಿ ಸಮತೋಲಿತ ಆಹಾರ ಸೇವಿಸಿ.",
      dietLowMoodProtein:
        "ಬೇಳೆ, ಬೀನ್ಸ್, ಮೊಟ್ಟೆ, ಮೊಸರು ಅಥವಾ ನಿಮಗೆ ಸೂಕ್ತವಾದ ಇತರ ಪ್ರೋಟೀನ್‌ಯುಕ್ತ ಆಹಾರಗಳನ್ನು ಸೇರಿಸಿ.",
      dietLowMoodProduce:
        "ಹಣ್ಣುಗಳು, ತರಕಾರಿಗಳು ಮತ್ತು ಸಾಕಷ್ಟು ದ್ರವಗಳನ್ನು ಸೇರಿಸಿ.",
      dietDefaultBalanced:
        "ತರಕಾರಿಗಳು, ಹಣ್ಣುಗಳು, ಸಂಪೂರ್ಣ ಧಾನ್ಯಗಳು ಮತ್ತು ಪ್ರೋಟೀನ್ ಒಳಗೊಂಡ ಸಮತೋಲಿತ ಊಟವನ್ನು ಗುರಿಯಾಗಿಡಿ.",
      dietDefaultIronProtein:
        "ಕಬ್ಬಿಣಾಂಶ ಮತ್ತು ಪ್ರೋಟೀನ್ ಹೆಚ್ಚಿರುವ ಆಹಾರಗಳನ್ನು ನಿಯಮಿತವಾಗಿ ಸೇರಿಸಿ.",
      dietDefaultHydration:
        "ದಿನವಿಡೀ ಸಾಕಷ್ಟು ನೀರು ಕುಡಿಯಿರಿ.",
      hydrationTitle: "ದ್ರವ ಸೇವನೆ",
      hydrationDescription:
        "ದಿನವಿಡೀ ನಿಯಮಿತವಾಗಿ ನೀರು ಕುಡಿಯಿರಿ.",
      hydrationGuidance:
        "ನೀರಿನ ಬಾಟಲಿಯನ್ನು ಹತ್ತಿರದಲ್ಲಿರಿಸಿ ಮತ್ತು ನಿಯಮಿತವಾಗಿ ನೀರು ಕುಡಿಯಿರಿ. ಚಟುವಟಿಕೆ, ಹವಾಮಾನ, ಗರ್ಭಧಾರಣೆಯ ಸ್ಥಿತಿ ಮತ್ತು ಇತರ ವೈಯಕ್ತಿಕ ಅಂಶಗಳ ಪ್ರಕಾರ ನಿಮ್ಮ ದ್ರವದ ಅಗತ್ಯ ಬದಲಾಗಬಹುದು.",
      movementTitle: "ಚಲನೆ ಮತ್ತು ವ್ಯಾಯಾಮ",
      movementDescription:
        "ನಿಮ್ಮ ಪ್ರಸ್ತುತ ಚಟುವಟಿಕೆಯ ಮಟ್ಟಕ್ಕೆ ತಕ್ಕ ಸೌಮ್ಯ ಚಟುವಟಿಕೆಗಳ ಸಲಹೆಗಳು.",
      workoutLowWalk:
        "15–20 ನಿಮಿಷಗಳ ಸೌಮ್ಯ ನಡಿಗೆಯಿಂದ ಪ್ರಾರಂಭಿಸಿ.",
      workoutLowStretch:
        "ಲಘು ಸ್ಟ್ರೆಚಿಂಗ್ ಅಥವಾ ಚಲನೆ ಸುಧಾರಿಸುವ ವ್ಯಾಯಾಮಗಳನ್ನು ಪ್ರಯತ್ನಿಸಿ.",
      workoutLowGradual:
        "ನಿಮಗೆ ಆರಾಮವಾಗುವಂತೆ ಚಟುವಟಿಕೆಯನ್ನು ಕ್ರಮೇಣ ಹೆಚ್ಚಿಸಿ.",
      workoutHighBalance:
        "ಚಟುವಟಿಕೆಯ ದಿನಗಳ ನಡುವೆ ಸಾಕಷ್ಟು ಚೇತರಿಕೆಗೆ ಅವಕಾಶ ನೀಡಿ.",
      workoutHighStretch:
        "ಸ್ಟ್ರೆಚಿಂಗ್ ಮತ್ತು ಚಲನೆ ಸುಧಾರಿಸುವ ವ್ಯಾಯಾಮಗಳನ್ನು ಸೇರಿಸಿ.",
      workoutHighRest:
        "ದಣಿವಾದರೆ ಸಾಕಷ್ಟು ವಿಶ್ರಾಂತಿ ಪಡೆಯಿರಿ.",
      workoutDefaultActivity:
        "ನಿಯಮಿತ ಮಧ್ಯಮ ದೈಹಿಕ ಚಟುವಟಿಕೆಯನ್ನು ಮುಂದುವರಿಸಿ.",
      workoutDefaultExamples:
        "ನಡಿಗೆ, ಸ್ಟ್ರೆಚಿಂಗ್, ಯೋಗ ಅಥವಾ ಲಘು ಶಕ್ತಿ ವ್ಯಾಯಾಮಗಳು ಸಾಮಾನ್ಯ ಕ್ಷೇಮಕ್ಕೆ ಸಹಾಯ ಮಾಡಬಹುದು.",
      workoutDefaultRecovery:
        "ಹೆಚ್ಚು ಚಟುವಟಿಕೆಯ ದಿನಗಳ ನಡುವೆ ವಿಶ್ರಾಂತಿ ಮತ್ತು ಚೇತರಿಕೆಗೆ ಸಮಯ ನೀಡಿ.",
      restTitle: "ವಿಶ್ರಾಂತಿ ಮತ್ತು ಚೇತರಿಕೆ",
      restDescription:
        "ದೈನಂದಿನ ಕ್ಷೇಮದಲ್ಲಿ ಚೇತರಿಕೆಯೂ ಪ್ರಮುಖ ಭಾಗವಾಗಿದೆ.",
      sleepBelowTarget:
        "ನಿಮ್ಮ ಇತ್ತೀಚಿನ ನಿದ್ರೆ 7 ಗಂಟೆಗಳಿಗಿಂತ ಕಡಿಮೆಯಾಗಿದೆ. ನಿಯಮಿತ ಮಲಗುವ ಸಮಯವನ್ನು ರೂಪಿಸಿ, ಸಾಕಷ್ಟು ವಿಶ್ರಾಂತಿಗೆ ಸಮಯ ನೀಡುವುದನ್ನು ಪರಿಗಣಿಸಿ.",
      sleepRoutine:
        "ನಿಯಮಿತ ನಿದ್ರೆಯ ದಿನಚರಿಯನ್ನು ಮುಂದುವರಿಸಿ ಮತ್ತು ನಿಮ್ಮ ದೇಹಕ್ಕೆ ಚೇತರಿಸಿಕೊಳ್ಳಲು ಸಾಕಷ್ಟು ಸಮಯ ನೀಡಿ.",
      recovery: "ಚೇತರಿಕೆ",
      recoveryGuidance:
        "ನಿಮ್ಮ ದೇಹದ ಮಾತನ್ನು ಆಲಿಸಿ. ವಿಶೇಷವಾಗಿ ದಣಿದಾಗ ಅಥವಾ ಒತ್ತಡ ಹೆಚ್ಚಿರುವಾಗ, ಚಲನೆಯನ್ನು ವಿಶ್ರಾಂತಿಯೊಂದಿಗೆ ಸಮತೋಲನಗೊಳಿಸಿ.",
      everydayIdeas: "ದೈನಂದಿನ ಕ್ಷೇಮದ ಸಲಹೆಗಳು",
      homeCookedMeals: "ಮನೆಯ ಅಡುಗೆ",
      homeCookedMealsDescription:
        "ಪರಿಚಿತ ಆಹಾರಗಳು ಮತ್ತು ವೈವಿಧ್ಯಮಯ ಪದಾರ್ಥಗಳನ್ನು ಬಳಸಿ ಸಮತೋಲಿತ ಊಟವನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
      gentleMovement: "ಸೌಮ್ಯ ಚಲನೆ",
      gentleMovementDescription:
        "ನಡಿಗೆ, ಸ್ಟ್ರೆಚಿಂಗ್, ಯೋಗ ಅಥವಾ ನಿಮಗೆ ಆರಾಮವಾಗುವ ಇತರ ಚಟುವಟಿಕೆಗಳು ಆರೋಗ್ಯಕರ ದಿನಚರಿಯ ಭಾಗವಾಗಬಹುದು.",
      community: "ಸಮುದಾಯ",
      communityDescription:
        "ನಂಬಿಕೆಯ ಕುಟುಂಬದವರು, ಸ್ನೇಹಿತರು ಅಥವಾ ಬೆಂಬಲದ ಸಮುದಾಯಗಳೊಂದಿಗೆ ಸಂಪರ್ಕದಲ್ಲಿರುವುದು ಭಾವನಾತ್ಮಕ ಕ್ಷೇಮಕ್ಕೆ ಸಹಾಯ ಮಾಡಬಹುದು.",
      selfCare: "ಸ್ವಯಂ ಆರೈಕೆ",
      selfCareDescription:
        "ವಿಶ್ರಾಂತಿ, ಮನಶ್ಶಾಂತಿ, ಹವ್ಯಾಸಗಳು ಮತ್ತು ನಿಮಗೆ ಆರಾಮ ನೀಡುವ ಚಟುವಟಿಕೆಗಳಿಗೆ ಸಮಯ ಮೀಸಲಿಡಿ.",
    },

    reports: {
      title: "ವರದಿಗಳು",
      loading: "ನಿಮ್ಮ ಆರೋಗ್ಯ ವರದಿಯನ್ನು ಸಿದ್ಧಪಡಿಸಲಾಗುತ್ತಿದೆ...",
      loadingDescription: "ನಿಮ್ಮ ದಾಖಲಾದ ಆರೋಗ್ಯ ಮಾಹಿತಿಯನ್ನು ಸಂಗ್ರಹಿಸಲಾಗುತ್ತಿದೆ.",
      reportTitle: "ಆರೋಗ್ಯ ವರದಿ",
      subtitle: "ನಿಮ್ಮ ದಾಖಲಾದ ಕ್ಷೇಮ ಮಾಹಿತಿಯ ಸಾರಾಂಶ.",
      printSave: "ವರದಿಯನ್ನು ಮುದ್ರಿಸಿ / ಉಳಿಸಿ",
      patientInformation: "ರೋಗಿಯ ಮಾಹಿತಿ",
      profileDescription: "ಈ ವರದಿಗೆ ಸಂಬಂಧಿಸಿದ ಮೂಲ ಪ್ರೊಫೈಲ್ ಮಾಹಿತಿ.",
      name: "ಹೆಸರು",
      email: "ಇಮೇಲ್",
      age: "ವಯಸ್ಸು",
      lifeStage: "ಜೀವನ ಹಂತ",
      averageMood: "ಸರಾಸರಿ ಮನಸ್ಥಿತಿ",
      averageSleep: "ಸರಾಸರಿ ನಿದ್ರೆ",
      activityRecords: "ಚಟುವಟಿಕೆ ದಾಖಲೆಗಳು",
      pmosAwareness: "PMOS ಅರಿವು",
      healthHistory: "ಆರೋಗ್ಯ ಟ್ರ್ಯಾಕಿಂಗ್ ಇತಿಹಾಸ",
      historyDescription: "ಕಾಲಕ್ರಮದಲ್ಲಿ ನಿಮ್ಮ ದಾಖಲಾದ ಕ್ಷೇಮ ಮಾಹಿತಿ.",
      noHealthRecords: "ಆರೋಗ್ಯ ದಾಖಲೆಗಳು ಲಭ್ಯವಿಲ್ಲ",
      noHealthRecordsDescription: "ವರದಿ ಇತಿಹಾಸ ನಿರ್ಮಿಸಲು ನಿಮ್ಮ ಆರೋಗ್ಯ ಮಾಹಿತಿಯನ್ನು ದಾಖಲಿಸಲು ಪ್ರಾರಂಭಿಸಿ.",
      date: "ದಿನಾಂಕ",
      cycle: "ಚಕ್ರ",
      mood: "ಮನಸ್ಥಿತಿ",
      sleep: "ನಿದ್ರೆ",
      activity: "ಚಟುವಟಿಕೆ",
      day: "ದಿನ {value}",
      hoursAbbreviation: "ಗಂ.",
      currentAwarenessScore: "ಪ್ರಸ್ತುತ ಅರಿವಿನ ಅಂಕ",
      noData: "ಯಾವುದೇ ಮಾಹಿತಿ ಇಲ್ಲ",
      pmosUnavailable: "ಅರಿವಿನ ಅಂದಾಜು ಪಡೆಯಲು ಆರೋಗ್ಯ ಮಾಹಿತಿಯನ್ನು ದಾಖಲಿಸಿ.",
      aiHealthInsights: "AI ಆರೋಗ್ಯ ಒಳನೋಟಗಳು",
      noInsights: "ಇನ್ನೂ ವೈಯಕ್ತಿಕಗೊಳಿಸಿದ ಒಳನೋಟಗಳು ಲಭ್ಯವಿಲ್ಲ.",
      generatedOn: "ವರದಿ ರಚಿಸಿದ ದಿನಾಂಕ",
      includedPeriod: "ಒಳಗೊಂಡಿರುವ ಅವಧಿ",
      allAvailableRecords: "ಲಭ್ಯವಿರುವ ಎಲ್ಲಾ ದಾಖಲೆಗಳು",
      privacyNotice: "ಗೌಪ್ಯ ಆರೋಗ್ಯ ಮಾಹಿತಿ. ರೋಗಿಯ ಒಪ್ಪಿಗೆ ಮತ್ತು ಅಧಿಕೃತ ಆರೈಕೆ ತಂಡದೊಂದಿಗೆ ಮಾತ್ರ ಹಂಚಿಕೊಳ್ಳಿ.",
      menstrualHistory: "ಮಾಸಿಕ ಇತಿಹಾಸ",
      pregnancyHistory: "ಗರ್ಭಧಾರಣೆ ಮತ್ತು ಪ್ರಸವೋತ್ತರ ಇತಿಹಾಸ",
      mentalWellnessHistory: "ಮಾನಸಿಕ ಕ್ಷೇಮ ಮೌಲ್ಯಮಾಪನ ಇತಿಹಾಸ",
      noMenstrualRecords: "ಮಾಸಿಕ ದಾಖಲೆಗಳು ಲಭ್ಯವಿಲ್ಲ.",
      noPregnancyRecords: "ಗರ್ಭಧಾರಣೆ ಅಥವಾ ಪ್ರಸವೋತ್ತರ ದಾಖಲೆಗಳು ಲಭ್ಯವಿಲ್ಲ.",
      noMentalAssessments: "ಮಾನಸಿಕ ಕ್ಷೇಮ ಮೌಲ್ಯಮಾಪನಗಳು ಲಭ್ಯವಿಲ್ಲ.",
      periodStart: "ಮಾಸಿಕ ಆರಂಭ",
      periodEnd: "ಮಾಸಿಕ ಅಂತ್ಯ",
      cycleLength: "ಚಕ್ರದ ಅವಧಿ",
      symptoms: "ಲಕ್ಷಣಗಳು",
      flowLevel: "ರಕ್ತಸ್ರಾವದ ಮಟ್ಟ",
      pregnancyStatus: "ಗರ್ಭಧಾರಣೆಯ ಸ್ಥಿತಿ",
      pregnancyWeek: "ಗರ್ಭಧಾರಣೆಯ ವಾರ",
      dueDate: "ನಿರೀಕ್ಷಿತ ಹೆರಿಗೆ ದಿನಾಂಕ",
      postpartumStatus: "ಪ್ರಸವೋತ್ತರ ಸ್ಥಿತಿ",
      postpartumWeek: "ಪ್ರಸವೋತ್ತರ ವಾರ",
      postpartumMood: "ಪ್ರಸವೋತ್ತರ ಮನಸ್ಥಿತಿ",
      wellbeingNotes: "ಕ್ಷೇಮದ ಟಿಪ್ಪಣಿಗಳು",
      assessmentType: "ಮೌಲ್ಯಮಾಪನ",
      score: "ಅಂಕ",
      interpretation: "ವ್ಯಾಖ್ಯಾನ",
      totalHealthRecords: "ಒಟ್ಟು ಆರೋಗ್ಯ ದಾಖಲೆಗಳು",
      disclaimer: "SakhiAI ವರದಿಗಳು ಆರೋಗ್ಯ ಅರಿವು, ಶಿಕ್ಷಣ, ಕ್ಷೇಮ ಟ್ರ್ಯಾಕಿಂಗ್ ಮತ್ತು ಆರೋಗ್ಯ ವೃತ್ತಿಪರರೊಂದಿಗೆ ಸಂವಹನಕ್ಕೆ ಸಹಾಯ ಮಾಡುತ್ತವೆ. ಅವು ವೈದ್ಯಕೀಯ ರೋಗನಿರ್ಣಯ ಅಥವಾ ವೃತ್ತಿಪರ ವೈದ್ಯಕೀಯ ಸಲಹೆಗೆ ಪರ್ಯಾಯವಲ್ಲ. ಆತಂಕಕಾರಿ ಅಥವಾ ನಿರಂತರ ಲಕ್ಷಣಗಳಿದ್ದರೆ ಅರ್ಹ ಆರೋಗ್ಯ ವೃತ್ತಿಪರರನ್ನು ಸಂಪರ್ಕಿಸಿ.",
    },

    consultation: {
      brand: "SakhiAI ಆರೋಗ್ಯ ಸೇವೆ",
      loading: "ಸಮಾಲೋಚನೆ ಮಾಹಿತಿ ಲೋಡ್ ಆಗುತ್ತಿದೆ...",
      title: "ವೈದ್ಯರ ಸಮಾಲೋಚನೆ",
      subtitle: "ಆರೋಗ್ಯ ವೃತ್ತಿಪರರನ್ನು ಹುಡುಕಿ ಮತ್ತು ಸಮಾಲೋಚನೆಗೆ ವಿನಂತಿಸಿ.",
      availableDoctors: "ಲಭ್ಯವಿರುವ ವೈದ್ಯರು",
      noDoctors: "ಯಾವುದೇ ವೈದ್ಯರು ಲಭ್ಯವಿಲ್ಲ.",
      hospital: "ಆಸ್ಪತ್ರೆ:",
      experience: "ಅನುಭವ:",
      years: "{count} ವರ್ಷ",
      requestConsultation: "ಸಮಾಲೋಚನೆಗೆ ವಿನಂತಿಸಿ",
      myRequests: "ನನ್ನ ಸಮಾಲೋಚನೆ ವಿನಂತಿಗಳು",
      myRequestsDescription: "ನಿಮ್ಮ ಸಮಾಲೋಚನೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ ಮತ್ತು ವೈದ್ಯರು ಹಂಚಿಕೊಂಡ ಟಿಪ್ಪಣಿಗಳನ್ನು ನೋಡಿ.",
      refresh: "ಮರುಲೋಡ್ ಮಾಡಿ",
      noRequests: "ಯಾವುದೇ ಸಮಾಲೋಚನೆ ವಿನಂತಿಗಳಿಲ್ಲ.",
      noRequestsDescription: "ನಿಮ್ಮ ವಿನಂತಿಗಳು ಇಲ್ಲಿ ಕಾಣಿಸುತ್ತವೆ.",
      requested: "ವಿನಂತಿಸಿದ ದಿನಾಂಕ:",
      pending: "ಬಾಕಿಯಿದೆ",
      accepted: "ಸ್ವೀಕರಿಸಲಾಗಿದೆ",
      completed: "ಪೂರ್ಣಗೊಂಡಿದೆ",
      cancelled: "ರದ್ದುಗೊಂಡಿದೆ",
      cancel: "ರದ್ದುಮಾಡಿ",
      doctorNotes: "ವೈದ್ಯರ ಟಿಪ್ಪಣಿಗಳು",
      doctorNotesDescription: "ಈ ಟಿಪ್ಪಣಿಗಳನ್ನು ನಿಮ್ಮ ವೈದ್ಯರು ಹಂಚಿಕೊಂಡಿದ್ದಾರೆ. ಸ್ಪಷ್ಟೀಕರಣ ಬೇಕಿದ್ದರೆ ಆರೋಗ್ಯ ವೃತ್ತಿಪರರನ್ನು ಸಂಪರ್ಕಿಸಿ.",
      reasonLabel: "ಸಮಾಲೋಚನೆಯ ಕಾರಣ",
      reasonPlaceholder: "ನೀವು ಸಮಾಲೋಚನೆ ಏಕೆ ಬಯಸುತ್ತೀರಿ ಎಂಬುದನ್ನು ವಿವರಿಸಿ...",
      sending: "ಕಳುಹಿಸಲಾಗುತ್ತಿದೆ...",
      sendRequest: "ವಿನಂತಿ ಕಳುಹಿಸಿ",
      loginRequired: "ದಯವಿಟ್ಟು ಮತ್ತೆ ಲಾಗಿನ್ ಮಾಡಿ.",
      loadDoctorsError: "ವೈದ್ಯರನ್ನು ಲೋಡ್ ಮಾಡಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ.",
      loadRequestsError: "ಸಮಾಲೋಚನೆ ವಿನಂತಿಗಳನ್ನು ಲೋಡ್ ಮಾಡಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ.",
      loadInfoError: "ಸಮಾಲೋಚನೆ ಮಾಹಿತಿಯನ್ನು ಲೋಡ್ ಮಾಡಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ.",
      reasonRequired: "ದಯವಿಟ್ಟು ಸಮಾಲೋಚನೆಯ ಕಾರಣವನ್ನು ನಮೂದಿಸಿ.",
      requestSent: "ಸಮಾಲೋಚನೆ ವಿನಂತಿಯನ್ನು {doctor} ಅವರಿಗೆ ಕಳುಹಿಸಲಾಗಿದೆ.",
      sendError: "ಸಮಾಲೋಚನೆ ವಿನಂತಿಯನ್ನು ಕಳುಹಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ.",
      cancelSuccess: "ಸಮಾಲೋಚನೆ ವಿನಂತಿಯನ್ನು ರದ್ದುಗೊಳಿಸಲಾಗಿದೆ.",
      cancelError: "ವಿನಂತಿಯನ್ನು ರದ್ದುಗೊಳಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ.",
      doctorNotFound: "ಆಯ್ಕೆಮಾಡಿದ ವೈದ್ಯರು ಕಂಡುಬಂದಿಲ್ಲ.",
      consultationNotFound: "ಸಮಾಲೋಚನೆ ವಿನಂತಿ ಕಂಡುಬಂದಿಲ್ಲ.",
      requestNoLongerPending: "ಬಾಕಿಯಿರುವ ಸಮಾಲೋಚನೆ ವಿನಂತಿಗಳನ್ನು ಮಾತ್ರ ರದ್ದುಗೊಳಿಸಬಹುದು.",
      doctorNumber: "ವೈದ್ಯರು #{id}",
    },

    notifications: {
      title: "ಅಧಿಸೂಚನೆಗಳು",
      subtitle: "ನಿಮ್ಮ ಆರೋಗ್ಯ ಜ್ಞಾಪನೆಗಳ ಕುರಿತು ಮಾಹಿತಿಯನ್ನು ಪಡೆಯಿರಿ.",
      unread: "ಓದದ ಅಧಿಸೂಚನೆಗಳು",
      total: "ಒಟ್ಟು",
      loading: "ಅಧಿಸೂಚನೆಗಳು ಲೋಡ್ ಆಗುತ್ತಿವೆ...",
      noNotifications: "ಇನ್ನೂ ಯಾವುದೇ ಅಧಿಸೂಚನೆಗಳಿಲ್ಲ",
      emptyDescription: "ನಿಮ್ಮ ಆರೋಗ್ಯ ಜ್ಞಾಪನೆಗಳು ಇಲ್ಲಿ ಕಾಣಿಸುತ್ತವೆ.",
      new: "ಹೊಸದು",
      markAsRead: "ಓದಲಾಗಿದೆ ಎಂದು ಗುರುತಿಸಿ",
      delete: "ಅಳಿಸಿ",
      loginRequired: "ದಯವಿಟ್ಟು ಮತ್ತೆ ಲಾಗಿನ್ ಮಾಡಿ.",
      sessionExpired: "ನಿಮ್ಮ ಸೆಷನ್ ಅವಧಿ ಮುಗಿದಿದೆ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಲಾಗಿನ್ ಮಾಡಿ.",
      loadError: "ಅಧಿಸೂಚನೆಗಳನ್ನು ಲೋಡ್ ಮಾಡಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ.",
      markReadError: "ಅಧಿಸೂಚನೆಯನ್ನು ಓದಲಾಗಿದೆ ಎಂದು ಗುರುತಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ.",
      deleteError: "ಅಧಿಸೂಚನೆಯನ್ನು ಅಳಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ.",
      doctorNotesTitle: "ವೈದ್ಯರ ಹೊಸ ಟಿಪ್ಪಣಿಗಳು",
      doctorNotesMessage: "ನಿಮ್ಮ ವೈದ್ಯರಾದ {doctor} ಅವರು ನಿಮ್ಮ ಸಮಾಲೋಚನೆಗಾಗಿ ಟಿಪ್ಪಣಿಗಳನ್ನು ಸೇರಿಸಿದ್ದಾರೆ ಅಥವಾ ನವೀಕರಿಸಿದ್ದಾರೆ. ಅವುಗಳನ್ನು ನೋಡಲು SakhiAIಗೆ ಲಾಗಿನ್ ಮಾಡಿ ಮತ್ತು ಸಮಾಲೋಚನೆ ಪುಟ ತೆರೆಯಿರಿ.",
      doctorNotesMessageGeneric: "ನಿಮ್ಮ ವೈದ್ಯರು ನಿಮ್ಮ ಸಮಾಲೋಚನೆಗಾಗಿ ಟಿಪ್ಪಣಿಗಳನ್ನು ಸೇರಿಸಿದ್ದಾರೆ ಅಥವಾ ನವೀಕರಿಸಿದ್ದಾರೆ. ಅವುಗಳನ್ನು ನೋಡಲು SakhiAIಗೆ ಲಾಗಿನ್ ಮಾಡಿ ಮತ್ತು ಸಮಾಲೋಚನೆ ಪುಟ ತೆರೆಯಿರಿ.",
      cycleReminderTitle: "🌸 ಚಕ್ರದ ಜ್ಞಾಪನೆ",
      cycleReminderMessage: "ನಿಮ್ಮ ಮಾಸಿಕ ಚಕ್ರವನ್ನು ದಾಖಲಿಸಲಾಗುತ್ತಿದೆ. ಉತ್ತಮ ಅಂದಾಜುಗಳಿಗಾಗಿ ನಿಮ್ಮ ಚಕ್ರದ ಮಾಹಿತಿಯನ್ನು ದಾಖಲಿಸುವುದನ್ನು ಮುಂದುವರಿಸಿ.",
    },
  },

  Hindi: {
    common: {
      save: "सहेजें",
      update: "अपडेट करें",
      create: "बनाएं",
      cancel: "रद्द करें",
      delete: "हटाएं",
      logout: "लॉगआउट",
      loading: "लोड हो रहा है...",
      yes: "हाँ",
      no: "नहीं",
      back: "पीछे",
      next: "आगे",
      submit: "जमा करें",
      close: "बंद करें",
      success: "सफलता",
      error: "त्रुटि",
    },

    auth: {
      selectLanguage: "वेबसाइट की भाषा चुनें",
      loginTitle: "वापसी पर स्वागत है",
      loginSubtitle: "अपने SakhiAI खाते में लॉग इन करें",
      oneLoginTitle: "सभी के लिए एक लॉगिन",
      oneLoginDescription: "SakhiAI आपके खाते का प्रकार पहचानकर आपको सही पोर्टल पर ले जाएगा।",
      email: "ईमेल",
      emailPlaceholder: "अपना ईमेल दर्ज करें",
      password: "पासवर्ड",
      passwordPlaceholder: "अपना पासवर्ड दर्ज करें",
      login: "लॉग इन",
      loggingIn: "लॉग इन हो रहा है...",
      loginRequired: "कृपया अपना ईमेल और पासवर्ड दर्ज करें।",
      loginMissingToken: "लॉग इन पूरा नहीं हो सका। कृपया फिर से कोशिश करें।",
      invalidCredentials: "ईमेल या पासवर्ड सही नहीं है।",
      accountConflict: "इस खाते की पुष्टि नहीं हो सकी। कृपया सहायता टीम से संपर्क करें।",
      loginUnavailable: "अभी लॉग इन नहीं हो पा रहा है। कृपया फिर से कोशिश करें।",
      serviceUnavailable: "सेवा अस्थायी रूप से उपलब्ध नहीं है। कृपया बाद में कोशिश करें।",
      backendUnavailable: "सेवा से संपर्क नहीं हो पा रहा है। कृपया फिर से कोशिश करें।",
      unknownRole: "खाते का प्रकार पहचाना नहीं जा सका। कृपया सहायता टीम से संपर्क करें।",
      noAccount: "SakhiAI खाता नहीं है?",
      createAccount: "खाता बनाएँ",
      registerTitle: "SakhiAI से जुड़ें",
      registerDescription: "चुनें कि आप SakhiAI का उपयोग कैसे करना चाहते हैं। रोगी वेलनेस या स्वास्थ्य पेशेवर खाता बनाएँ।",
      patientAccount: "रोगी खाता",
      patientDescription: "मासिक धर्म स्वास्थ्य, वेलनेस, गर्भावस्था, मनोदशा और जीवनशैली ट्रैक करें तथा स्वास्थ्य-जागरूकता संबंधी सहायक जानकारी पाएँ।",
      healthTracking: "स्वास्थ्य और वेलनेस ट्रैकिंग",
      cycleTracking: "मासिक धर्म और गर्भावस्था ट्रैकिंग",
      emotionalSupport: "SakhiAI भावनात्मक सहयोग",
      healthInsights: "AI स्वास्थ्य जानकारी",
      consultationRequests: "डॉक्टर से परामर्श अनुरोध",
      registerPatient: "रोगी के रूप में पंजीकरण करें",
      professionalAccount: "स्वास्थ्य पेशेवर",
      professionalDescription: "SakhiAI के माध्यम से रोगियों के परामर्श अनुरोध प्राप्त और प्रबंधित करने के लिए पेशेवर खाता बनाएँ।",
      professionalProfile: "पेशेवर प्रोफ़ाइल",
      viewRequests: "परामर्श अनुरोध देखें",
      acceptDecline: "अनुरोध स्वीकार या अस्वीकार करें",
      consultationNotes: "परामर्श नोट जोड़ें",
      consultationHistory: "परामर्श इतिहास प्रबंधित करें",
      registerProfessional: "स्वास्थ्य पेशेवर के रूप में पंजीकरण करें",
      alreadyHaveAccount: "क्या आपके पास पहले से SakhiAI खाता है?",
      loginToAccount: "अपने खाते में लॉग इन करें",
      back: "वापस",
      patientRegisterTitle: "रोगी खाता बनाएँ",
      patientRegisterSubtitle: "अपना SakhiAI वेलनेस खाता बनाएँ",
      fullName: "पूरा नाम",
      fullNamePlaceholder: "अपना पूरा नाम दर्ज करें",
      age: "आयु",
      agePlaceholder: "अपनी आयु दर्ज करें",
      preferredLanguage: "पसंदीदा भाषा",
      languageEnglish: "अंग्रेज़ी",
      languageKannada: "कन्नड़",
      languageHindi: "हिंदी",
      lifeStage: "जीवन का चरण",
      adult: "वयस्क",
      adolescent: "किशोर",
      pregnancy: "गर्भावस्था",
      postpartum: "प्रसवोत्तर",
      perimenopause: "पेरिमेनोपॉज़",
      menopause: "मेनोपॉज़",
      requiredFields: "कृपया सभी आवश्यक फ़ील्ड भरें।",
      registrationSuccess: "पंजीकरण सफल रहा।",
      registrationFailed: "पंजीकरण विफल हुआ। कृपया फिर से कोशिश करें।",
      registrationUnavailable: "सेवा से संपर्क नहीं हो पा रहा है। कृपया फिर से कोशिश करें।",
      unableToRegister: "अभी पंजीकरण नहीं हो पा रहा है। कृपया फिर से कोशिश करें।",
      creatingAccount: "खाता बनाया जा रहा है...",
      alreadyHavePatientAccount: "क्या आपके पास पहले से खाता है?",
      doctorRegisterTitle: "डॉक्टर पंजीकरण",
      doctorRegisterSubtitle: "रोगियों के परामर्श अनुरोध प्रबंधित करने के लिए पेशेवर खाता बनाएँ।",
      specialization: "विशेषज्ञता",
      hospitalClinic: "अस्पताल / क्लिनिक",
      hospitalPlaceholder: "अस्पताल का नाम",
      experienceYears: "अनुभव (वर्ष)",
      phone: "फ़ोन",
      phonePlaceholder: "फ़ोन नंबर",
      professionalBio: "पेशेवर परिचय",
      bioPlaceholder: "संक्षिप्त पेशेवर विवरण...",
      doctorRegisterSuccess: "डॉक्टर पंजीकरण सफल रहा। लॉग इन पर भेजा जा रहा है...",
      registerDoctor: "डॉक्टर के रूप में पंजीकरण करें",
      doctorRegistrationFailed: "अभी पंजीकरण नहीं हो पा रहा है। कृपया फिर से कोशिश करें।",
      duplicateEmail: "यह ईमेल पहले से पंजीकृत है। लॉग इन करें या दूसरा ईमेल इस्तेमाल करें।",
    },

    doctorDashboard: {
      title: "डॉक्टर डैशबोर्ड",
      subtitle: "रोगियों के परामर्श अनुरोध और उनकी स्थिति प्रबंधित करें।",
      loading: "परामर्श अनुरोध लोड हो रहे हैं...",
      tryAgain: "फिर से कोशिश करें",
      pending: "लंबित",
      accepted: "स्वीकृत",
      completed: "पूरा हुआ",
      cancelled: "रद्द",
      awaitingResponse: "उत्तर की प्रतीक्षा",
      activeConsultations: "सक्रिय परामर्श",
      finishedConsultations: "पूरे हुए परामर्श",
      declinedRequests: "अस्वीकृत अनुरोध",
      all: "सभी",
      consultationRequests: "परामर्श अनुरोध",
      reportWorkspace: "रोगी रिपोर्ट और परामर्श विवरण",
      consultationCountSingular: "परामर्श",
      consultationCount: "परामर्श",
      refresh: "रीफ़्रेश",
      refreshing: "रीफ़्रेश हो रहा है...",
      noConsultations: "कोई परामर्श अनुरोध नहीं",
      noFilteredConsultations: "इस स्थिति में कोई परामर्श नहीं है।",
      requestsEmptyHelp: "रोगियों के परामर्श अनुरोध यहाँ दिखाई देंगे।",
      consultation: "परामर्श",
      patient: "रोगी",
      unknownPatient: "रोगी का नाम उपलब्ध नहीं",
      patientId: "रोगी ID",
      requestedOn: "अनुरोध की तारीख",
      patientsReason: "रोगी का कारण",
      reasonUnavailable: "कोई कारण नहीं दिया गया।",
      showFullReason: "पूरा कारण पढ़ें",
      hideFullReason: "कम दिखाएँ",
      viewDetails: "विवरण देखें",
      acceptRequest: "अनुरोध स्वीकार करें",
      declineRequest: "अनुरोध अस्वीकार करें",
      markCompleted: "पूरा हुआ चिह्नित करें",
      accepting: "स्वीकार हो रहा है...",
      declining: "अस्वीकार हो रहा है...",
      completing: "पूरा किया जा रहा है...",
      consultationCompleted: "परामर्श पूरा हुआ।",
      consultationDeclined: "यह परामर्श अनुरोध अस्वीकार किया गया।",
      statusUpdated: "परामर्श की स्थिति अपडेट हुई।",
      statusUpdateError: "स्थिति अपडेट नहीं हो सकी। कृपया फिर से कोशिश करें।",
      detailsTitle: "परामर्श विवरण",
      patientInformation: "रोगी की जानकारी",
      consultationInformation: "परामर्श की जानकारी",
      doctorId: "डॉक्टर ID",
      status: "स्थिति",
      requestedDate: "अनुरोध की तारीख",
      doctorNotes: "डॉक्टर के नोट",
      notesPlaceholder: "अवलोकन, सलाह, सुझाव या फ़ॉलो-अप निर्देश दर्ज करें...",
      saveNotes: "नोट सहेजें",
      saving: "सहेजा जा रहा है...",
      notesSaved: "डॉक्टर के नोट सफलतापूर्वक सहेजे गए।",
      notesSaveError: "डॉक्टर के नोट सहेजे नहीं जा सके। फिर से कोशिश करें।",
      closeDetails: "विवरण बंद करें",
      close: "बंद करें",
      authError: "प्रमाणीकरण विफल हुआ। कृपया डॉक्टर के रूप में लॉग इन करें।",
      accessError: "आपके पास डॉक्टर की पहुँच नहीं है।",
      loadError: "परामर्श अनुरोध लोड नहीं हो सके।",
      popupsBlocked: "रोगी रिपोर्ट प्रिंट या सहेजने के लिए पॉप-अप की अनुमति दें।",
      preparingReport: "रोगी रिपोर्ट तैयार हो रही है...",
      downloadPatientReport: "रोगी रिपोर्ट डाउनलोड करें",
    },

    landing: {
      selectLanguage: "भाषा चुनें",
      login: "लॉग इन",
      getStarted: "शुरू करें",
      heroBadge: "AI-संचालित महिला स्वास्थ्य और वेलनेस मंच",
      heroTitle: "आपकी स्वास्थ्य यात्रा,",
      heroHighlight: "देखभाल के साथ समझी गई।",
      heroDescription: "SakhiAI महिलाओं के जीवन-चक्र के स्वास्थ्य प्रबंधन के लिए सांस्कृतिक रूप से संवेदनशील और समझाने योग्य AI-आधारित प्रणाली है। यह स्वास्थ्य जागरूकता, वेलनेस ट्रैकिंग, भावनात्मक सहयोग और स्वास्थ्य पेशेवरों से जुड़ने में सहायता करती है।",
      startJourney: "अपनी यात्रा शुरू करें",
      doctorPortal: "डॉक्टर पोर्टल",
      learnMore: "और जानें",
      awarenessNotice: "स्वास्थ्य जागरूकता और वेलनेस सहयोग के लिए — चिकित्सीय निदान नहीं।",
      journey: "आपकी वेलनेस यात्रा",
      manyNeeds: "एक जगह। कई ज़रूरतें।",
      cycle: "चक्र",
      trackPatterns: "पैटर्न दर्ज करें",
      wellness: "वेलनेस",
      understandTrends: "रुझानों को समझें",
      sakhiAi: "SakhiAI",
      emotionalSupport: "भावनात्मक सहयोग",
      doctors: "डॉक्टर",
      connectSafely: "सुरक्षित रूप से जुड़ें",
      about: "SakhiAI के बारे में",
      lifeCycleTitle: "महिलाओं के जीवन-चक्र को ध्यान में रखकर बनाया गया",
      aboutDescription: "SakhiAI स्वास्थ्य ट्रैकिंग, भावनात्मक वेलनेस, शैक्षिक जागरूकता, AI-आधारित जानकारी और स्वास्थ्य पेशेवरों का सहयोग एक ही मंच पर उपलब्ध कराता है।",
      menstrualHealth: "मासिक धर्म स्वास्थ्य",
      menstrualDescription: "मासिक धर्म, चक्र की जानकारी, लक्षण, दर्द, मनोदशा और PMS पैटर्न दर्ज करें।",
      pregnancyPostpartum: "गर्भावस्था और प्रसवोत्तर",
      pregnancyDescription: "गर्भावस्था के वेलनेस विवरण दर्ज करें और प्रसवोत्तर भावनात्मक स्वास्थ्य पर नज़र रखें।",
      mentalWellness: "मानसिक वेलनेस",
      mentalDescription: "जागरूकता प्रश्नावलियां पूरी करें और समय के साथ वेलनेस के रुझान देखें।",
      generalWellness: "सामान्य वेलनेस",
      generalDescription: "नींद, गतिविधि, मनोदशा और रोज़मर्रा की वेलनेस जानकारी दर्ज करें।",
      twoExperiences: "एक मंच, दो अनुभव",
      portalsTitle: "मरीज़ों और स्वास्थ्य पेशेवरों—दोनों के लिए",
      portalsDescription: "SakhiAI अपनी वेलनेस संभालने वाली महिलाओं और उनका सहयोग करने वाले स्वास्थ्य पेशेवरों के लिए अलग अनुभव देता है।",
      patientPortal: "मरीज़ पोर्टल",
      patientDescription: "अपनी महिला स्वास्थ्य यात्रा दर्ज करने, वेलनेस पैटर्न समझने और सहायक संसाधन पाने के लिए निजी स्थान।",
      healthTracking: "स्वास्थ्य और वेलनेस ट्रैकिंग",
      cycleTracking: "मासिक चक्र ट्रैकिंग",
      pmosAwareness: "PMOS जागरूकता",
      pregnancyWellbeing: "गर्भावस्था और प्रसवोत्तर वेलनेस",
      mentalAssessments: "मानसिक वेलनेस आकलन",
      companion: "AI-संचालित SakhiAI साथी",
      explainableInsights: "समझाने योग्य वेलनेस जानकारी",
      consultations: "डॉक्टर परामर्श",
      reportsHistory: "रिपोर्ट और स्वास्थ्य इतिहास",
      createPatientAccount: "मरीज़ खाता बनाएं",
      patientLogin: "मरीज़ लॉग इन",
      doctorDescription: "पंजीकृत स्वास्थ्य पेशेवरों के लिए परामर्श अनुरोध और मरीज़ों के साथ बातचीत संभालने का समर्पित कार्यस्थल।",
      doctorRegistration: "डॉक्टर पंजीकरण",
      secureDoctorLogin: "सुरक्षित डॉक्टर लॉग इन",
      doctorDashboard: "डॉक्टर डैशबोर्ड",
      incomingRequests: "आने वाले परामर्श अनुरोध",
      patientInformation: "मरीज़ की जानकारी",
      acceptDecline: "अनुरोध स्वीकार या अस्वीकार करें",
      statusManagement: "परामर्श स्थिति प्रबंधन",
      doctorNotes: "डॉक्टर के नोट्स",
      consultationHistory: "परामर्श इतिहास",
      registerDoctor: "डॉक्टर के रूप में पंजीकरण करें",
      doctorLogin: "डॉक्टर लॉग इन",
      intelligentSupport: "बुद्धिमान सहयोग",
      aiTitle: "समझाने, सहयोग करने और मार्गदर्शन देने वाला AI",
      aiDescription: "SakhiAI, समझने योग्य स्पष्टीकरणों के साथ AI-आधारित जागरूकता देता है, ताकि लोग अपने वेलनेस पैटर्न बेहतर समझ सकें।",
      companionTitle: "SakhiAI साथी",
      companionDescription: "भावनात्मक वेलनेस और स्वास्थ्य जागरूकता के लिए सहयोगी संवाद साथी।",
      explainableAi: "समझाने योग्य AI",
      explainableDescription: "जानें कि दर्ज किए गए कौन-से कारक जागरूकता स्कोर में योगदान देते हैं और क्यों।",
      privacySafety: "गोपनीयता और सुरक्षा",
      privacyDescription: "ज़िम्मेदार स्वास्थ्य जागरूकता, सुरक्षित पहुँच और स्पष्ट सीमाओं को ध्यान में रखकर बनाया गया।",
      healthcareConnection: "स्वास्थ्य सेवा से जुड़ाव",
      professionalSupport: "जब आपको पेशेवर सहयोग की ज़रूरत हो",
      connectionDescription: "SakhiAI परामर्श अनुरोधों के माध्यम से मरीज़ों और पंजीकृत स्वास्थ्य पेशेवरों के बीच सुव्यवस्थित संपर्क उपलब्ध कराता है।",
      selectProfessional: "मरीज़ स्वास्थ्य पेशेवर चुनता है",
      sendRequest: "मरीज़ परामर्श अनुरोध भेजता है",
      doctorReviews: "डॉक्टर अनुरोध की समीक्षा कर जवाब देता है",
      accessibleHistory: "परामर्श स्थिति और इतिहास उपलब्ध रहते हैं",
      patientDoctor: "मरीज़ ↔ डॉक्टर",
      structuredCommunication: "सुव्यवस्थित स्वास्थ्य संवाद",
      patientRequest: "मरीज़ का परामर्श अनुरोध",
      doctorReview: "डॉक्टर की समीक्षा",
      statusHistory: "परामर्श स्थिति और इतिहास",
      healthDisclaimerTitle: "स्वास्थ्य जागरूकता, चिकित्सीय निदान नहीं",
      healthDisclaimer: "SakhiAI वेलनेस दर्ज करने, स्वास्थ्य-संबंधी जानकारी समझने, सहायक मार्गदर्शन पाने और यह पहचानने में मदद करता है कि पेशेवर सहयोग कब उचित हो सकता है। यह योग्य स्वास्थ्य पेशेवर का विकल्प नहीं है और चिकित्सीय निदान नहीं देता।",
      beginJourney: "अपनी SakhiAI यात्रा शुरू करें",
      startDescription: "अपनी वेलनेस दर्ज करें और अपनी स्वास्थ्य यात्रा को एक ही जगह समझें।",
      joinDoctor: "डॉक्टर के रूप में जुड़ें",
      brandTagline: "सांस्कृतिक रूप से संवेदनशील, समझाने योग्य AI-आधारित महिला जीवन-चक्र स्वास्थ्य प्रबंधन प्रणाली",
      footerNotice: "केवल जागरूकता और वेलनेस सहयोग के लिए।",
    },

    navigation: {
      patientTagline: "महिला स्वास्थ्य साथी",
      notifications: "सूचनाएं",
      healthTracking: "स्वास्थ्य ट्रैकिंग",
      doctorConsultation: "डॉक्टर से परामर्श",
      menstrual: "मासिक धर्म ट्रैकिंग",
      mentalWellness: "मानसिक स्वास्थ्य",
      pmos: "PMOS जागरूकता",
      pregnancy: "गर्भावस्था सहायता",
      aiAssistant: "AI सहायक",
      community: "समुदाय",
      dietWorkout: "आहार और व्यायाम",
      reports: "रिपोर्ट",
      profile: "प्रोफ़ाइल",
      settings: "सेटिंग्स",
      logout: "लॉगआउट",
    },

    settings: {
      title: "सेटिंग्स",
      subtitle:
        "अपनी प्राथमिकताओं, गोपनीयता और खाता सेटिंग्स को प्रबंधित करें।",
      preferences: "प्राथमिकताएं",
      preferencesDescription:
        "SakhiAI आपके लिए कैसे काम करे इसे अनुकूलित करें।",
      language: "भाषा",
      languageDescription:
        "अपनी पसंदीदा भाषा चुनें।",
      notifications: "सूचनाएं",
      notificationsDescription:
        "महत्वपूर्ण SakhiAI सूचनाएं प्राप्त करें।",
      reminders: "स्वास्थ्य अनुस्मारक",
      remindersDescription:
        "स्वास्थ्य ट्रैकिंग और वेलनेस गतिविधियों के लिए अनुस्मारक प्राप्त करें।",
      savePreferences: "प्राथमिकताएं सहेजें",
      saved: "सेटिंग्स सफलतापूर्वक सहेजी गईं।",
      saveError: "सेटिंग्स सहेजी नहीं जा सकीं।",
      privacySecurity: "गोपनीयता और सुरक्षा",
      privacyDescription:
        "समझें कि आपकी जानकारी कैसे संभाली जाती है।",
      healthDataPrivacy: "स्वास्थ्य डेटा गोपनीयता",
      healthDataPrivacyDescription:
        "जानें कि आपकी स्वास्थ्य जानकारी कैसे सुरक्षित रखी जाती है।",
      aiDataUsage: "AI डेटा उपयोग",
      aiDataUsageDescription:
        "समझें कि आपकी जानकारी AI सुविधाओं में कैसे सहायता करती है।",
      healthPrivacyDetails:
        "SakhiAI आपके द्वारा दी गई स्वास्थ्य जानकारी का उपयोग स्वास्थ्य ट्रैकिंग, वेलनेस जानकारी और व्यक्तिगत जागरूकता सुविधाओं में सहायता के लिए करता है।",
      accessDetails:
        "आपकी जानकारी तक केवल अधिकृत सिस्टम घटकों की पहुँच होनी चाहिए। उचित अनुमति के बिना इसे अन्य उपयोगकर्ताओं के साथ साझा नहीं किया जाना चाहिए।",
      aiUsageDetails:
        "व्यक्तिगत जागरूकता जानकारी और अनुमान बनाने के लिए SakhiAI मंच पर दर्ज जानकारी का उपयोग कर सकता है।",
      aiDisclaimer:
        "AI से बनी जानकारी स्वास्थ्य जागरूकता और वेलनेस सहयोग के लिए है; इसे चिकित्सीय निदान न समझें।",
      account: "खाता",
      accountDescription:
        "अपने SakhiAI खाते की पहुंच प्रबंधित करें।",
      deleteAccount: "खाता हटाएं",
      deleteConfirmation:
        "क्या आप वाकई अपना खाता हटाना चाहते हैं? यह कार्रवाई वापस नहीं की जा सकती।",
      deleteUnavailable:
        "खाता हटाने की सुविधा अभी उपलब्ध नहीं है।",
      logout: "लॉग आउट",
      privacyTitle: "आपकी गोपनीयता महत्वपूर्ण है",
      privacyFooter:
        "SakhiAI स्वास्थ्य जागरूकता और वेलनेस में सहायता करता है। यह पेशेवर चिकित्सा सलाह का विकल्प नहीं है।",
      toggleNotifications: "सूचनाएं चालू या बंद करें",
      toggleReminders: "स्वास्थ्य अनुस्मारक चालू या बंद करें",
    },

    profile: {
      title: "मेरी प्रोफ़ाइल",
      subtitle: "अपनी व्यक्तिगत और स्वास्थ्य जानकारी प्रबंधित करें।",
      loading: "आपकी प्रोफ़ाइल लोड हो रही है...",
      loadingDescription: "कृपया प्रतीक्षा करें।",
      loginRequired: "अपनी प्रोफ़ाइल देखने के लिए लॉग इन करें।",
      loadError: "आपकी प्रोफ़ाइल लोड नहीं हो सकी।",
      saveError: "प्रोफ़ाइल सहेजी नहीं जा सकी।",
      backendUnavailable: "बैकएंड से कनेक्ट नहीं हो सका।",
      accountInformation: "खाता जानकारी",
      accountDescription:
        "आपके SakhiAI खाते से जुड़ी मूलभूत जानकारी।",
      fullName: "पूरा नाम",
      email: "ईमेल",
      age: "आयु",
      lifeStage: "जीवन चरण",
      lifeStageAdult: "वयस्क",
      lifeStageAdolescent: "किशोरावस्था",
      lifeStagePregnancy: "गर्भावस्था",
      lifeStagePostpartum: "प्रसवोत्तर",
      lifeStagePerimenopause: "रजोनिवृत्ति से पहले का चरण",
      lifeStageMenopause: "रजोनिवृत्ति",
      healthProfile: "स्वास्थ्य प्रोफ़ाइल",
      healthDescription:
        "यह जानकारी SakhiAI को अधिक व्यक्तिगत जानकारी प्रदान करने में मदद करती है।",
      dateOfBirth: "जन्म तिथि",
      height: "ऊंचाई (सेमी)",
      heightPlaceholder: "जैसे: 165",
      weight: "वजन (किग्रा)",
      weightPlaceholder: "जैसे: 60",
      bloodGroup: "रक्त समूह",
      selectBloodGroup: "रक्त समूह चुनें",
      medicalHistory: "चिकित्सा इतिहास",
      allergies: "एलर्जी",
      menstrualStatus: "मासिक धर्म स्थिति",
      selectMenstrualStatus: "मासिक धर्म स्थिति चुनें",
      pregnancyStatus: "गर्भावस्था स्थिति",
      selectPregnancyStatus:
        "गर्भावस्था स्थिति चुनें",
      dateOfBirthRequired: "कृपया अपनी जन्म तिथि दर्ज करें।",
      heightRequired: "कृपया मान्य ऊंचाई दर्ज करें।",
      weightRequired: "कृपया मान्य वजन दर्ज करें।",
      bloodGroupRequired: "कृपया अपना रक्त समूह चुनें।",
      menstrualStatusRequired: "कृपया अपनी मासिक धर्म स्थिति चुनें।",
      pregnancyStatusRequired: "कृपया अपनी गर्भावस्था स्थिति चुनें।",
      medicalHistoryPlaceholder: "प्रासंगिक चिकित्सा इतिहास दर्ज करें...",
      allergiesPlaceholder: "ज्ञात एलर्जी दर्ज करें...",
      regular: "नियमित",
      irregular: "अनियमित",
      absent: "अनुपस्थित",
      notApplicable: "लागू नहीं",
      notPregnant: "गर्भवती नहीं",
      pregnant: "गर्भवती",
      postpartum: "प्रसवोत्तर",
      preferNotToSay: "बताना पसंद नहीं",
      saving: "सहेजा जा रहा है...",
      createProfile: "प्रोफ़ाइल बनाएं",
      updateProfile: "प्रोफ़ाइल अपडेट करें",
      profileCreated: "प्रोफ़ाइल सफलतापूर्वक बनाई गई!",
      profileUpdated: "प्रोफ़ाइल सफलतापूर्वक अपडेट की गई!",
      privacyTitle: "आपकी स्वास्थ्य जानकारी महत्वपूर्ण है",
      privacyDescription:
        "आपकी प्रोफ़ाइल जानकारी SakhiAI के स्वास्थ्य सुझावों और अनुमानों को व्यक्तिगत बनाने में मदद करती है। चिकित्सा निर्णयों के लिए योग्य स्वास्थ्य पेशेवर से सलाह लें।",
    },

dashboard: {
  title: "डैशबोर्ड",

  welcome: "SakhiAI में आपका स्वागत है",
  welcomeMessage:
    "यह आपका व्यक्तिगत महिला स्वास्थ्य अवलोकन है।",

  overview: "आपके स्वास्थ्य का अवलोकन",
  healthOverview: "स्वास्थ्य अवलोकन",
  healthSummary: "स्वास्थ्य सारांश",
  healthInsights: "स्वास्थ्य जानकारी",
  recentActivity: "हाल की गतिविधि",

  cycle: "चक्र",
  currentCycleDay: "वर्तमान चक्र का दिन",
  day: "दिन",

  pmosRisk: "PMOS जोखिम",
  estimatedRisk: "अनुमानित जोखिम",

  mood: "मूड",
  latestRecordedMood: "हाल का रिकॉर्ड किया गया मूड",

  lifestyle: "जीवनशैली",
  latestActivityLevel: "हाल का गतिविधि स्तर",

  wellness: "वेलनेस",
  wellnessDescription:
    "अपनी हाल की नींद, मूड, गतिविधि और वेलनेस पैटर्न को समझें।",

  latestSleep: "हाल की नींद",
  averageSleep: "औसत नींद",
  latestMood: "हाल का मूड",
  averageMood: "औसत मूड",

  sleepDuration: "नींद की अवधि",
  hours: "घंटे",

  mostRecentRecording: "सबसे हाल की रिकॉर्डिंग",
  basedOnRecordedHistory:
    "रिकॉर्ड किए गए इतिहास के आधार पर",

  latestActivity: "हाल की गतिविधि",
  healthRecords: "स्वास्थ्य रिकॉर्ड",
  mostRecentActivityLevel:
    "सबसे हाल का गतिविधि स्तर",
  totalRecordedEntries:
    "कुल रिकॉर्ड की गई प्रविष्टियां",

  wellnessStatus: "वेलनेस स्थिति",

  healthTrends: "स्वास्थ्य रुझान",
  trackHealthChanges:
    "समय के साथ अपने मूड और नींद में हुए बदलावों को देखें।",

  moodTrend: "मूड रुझान",
  sleepTrend: "नींद रुझान",

  moodScale:
    "मूड को 1 से 5 के पैमाने पर रिकॉर्ड किया जाता है।",

  sleepMeasured:
    "नींद की अवधि घंटों में मापी जाती है।",

  aiHealthInsights: "AI स्वास्थ्य जानकारी",
  aiInsightsDescription:
    "आपकी स्वास्थ्य जानकारी के आधार पर व्यक्तिगत जानकारी।",

  noPersonalizedInsights:
    "अभी कोई व्यक्तिगत जानकारी उपलब्ध नहीं है",

  contributingFactors:
    "योगदान करने वाले कारक",

  factorsInfluenceScore:
    "ये रिकॉर्ड किए गए कारक वर्तमान जागरूकता स्कोर को प्रभावित करते हैं।",

  recordedValue: "रिकॉर्ड किया गया मान",
  impact: "प्रभाव",

  currentAwarenessScore:
    "वर्तमान जागरूकता स्कोर",

  whyScoreShown:
    "यह स्कोर क्यों दिखाया गया है?",

  pmosRiskAwareness:
    "PMOS जोखिम जागरूकता",

  pmosDescription:
    "यह जागरूकता स्कोर आपकी रिकॉर्ड की गई वेलनेस जानकारी पर आधारित है। यह आपको वर्तमान अनुमान में योगदान देने वाले कारकों को समझने में मदद करता है।",

  noData: "कोई डेटा नहीं",

  yourProfile: "आपकी प्रोफ़ाइल",
  email: "ईमेल",
  age: "आयु",
  lifeStage: "जीवन चरण",
  language: "भाषा",

  wellnessDisclaimer:
    "वेलनेस जानकारी आत्म-जागरूकता और सामान्य स्वास्थ्य ट्रैकिंग के लिए है। यह कोई चिकित्सा निदान नहीं है।",

  pmosDisclaimer:
    "PMOS जोखिम जागरूकता एक सूचनात्मक वेलनेस सुविधा है और यह कोई चिकित्सा निदान नहीं है। इसे पेशेवर स्वास्थ्य सलाह के विकल्प के रूप में इस्तेमाल नहीं किया जाना चाहिए।",

  insightsDisclaimer:
    "ये जानकारी केवल जागरूकता के लिए है और चिकित्सा निदान नहीं है। चिंताजनक या लगातार लक्षण होने पर योग्य स्वास्थ्य पेशेवर से परामर्श करें।",
        cycleDayValue: "दिन",
      hoursValue: "घंटे",
      estimatedRiskValue: "अनुमानित जोखिम",

      wellnessStart:
        "अपना वेलनेस इतिहास बनाने के लिए अपनी स्वास्थ्य जानकारी रिकॉर्ड करना शुरू करें।",

      wellnessPositive:
        "आपकी हाल की नींद और मूड के पैटर्न सकारात्मक दिख रहे हैं। स्वस्थ आदतों को लगातार बनाए रखें।",

      wellnessLowSleep:
        "आपकी हाल की नींद की अवधि आदर्श से कम है। नियमित नींद की दिनचर्या बनाए रखने और पर्याप्त आराम करने का प्रयास करें।",

      wellnessLowMood:
        "आपके हाल के मूड रेटिंग अपेक्षाकृत कम हैं। स्वयं की देखभाल, सामाजिक सहयोग और अपनी भावनाओं पर ध्यान देने पर विचार करें।",

      wellnessTracking:
        "आपकी वेलनेस जानकारी ट्रैक की जा रही है। अपने स्वास्थ्य पैटर्न को बेहतर समझने के लिए दैनिक जानकारी रिकॉर्ड करना जारी रखें।",

      noInsights:
        "अभी कोई व्यक्तिगत जानकारी उपलब्ध नहीं है",

      continueRecording:
        "व्यक्तिगत जानकारी प्राप्त करने के लिए अपनी स्वास्थ्य जानकारी रिकॉर्ड करना जारी रखें।",

      noHealthHistory: "अभी कोई स्वास्थ्य इतिहास उपलब्ध नहीं है",
      noMoodChartData: "चार्ट के लिए मनोदशा की जानकारी उपलब्ध नहीं है।",
      noSleepChartData: "चार्ट के लिए नींद की जानकारी उपलब्ध नहीं है।",
      recordHealthInfo:
        "योगदान करने वाले कारकों को देखने के लिए अपनी स्वास्थ्य जानकारी रिकॉर्ड करें।",

      low: "कम",
      moderate: "मध्यम",
      high: "उच्च",

      activityLow: "कम",
      activityModerate: "मध्यम",
      activityHigh: "उच्च",
      
      aiInsightSleepVeryLow: "आपकी दर्ज की गई औसत नींद {value} घंटे है। आपकी हाल की नींद का पैटर्न आदर्श से कम दिखाई देता है। नियमित नींद का समय बनाए रखने और पर्याप्त आराम करने का प्रयास करें।",

      aiInsightSleepSlightlyLow: "आपकी दर्ज की गई औसत नींद {value} घंटे है। आपकी नींद की अवधि आपके लक्षित स्तर से थोड़ी कम है। अपनी नींद के पैटर्न पर नज़र रखना जारी रखें।",

      aiInsightSleepPositive: "आपकी दर्ज की गई औसत नींद {value} घंटे है। आपकी हाल की नींद का पैटर्न अच्छा दिखाई देता है। नियमित नींद समग्र स्वास्थ्य और कल्याण में सहायता कर सकती है।",

      aiInsightMoodLow: "आपका दर्ज किया गया औसत मूड 5 में से {value} है। आपके हाल के मूड स्कोर अपेक्षाकृत कम रहे हैं। आत्म-देखभाल, सहायक सामाजिक संपर्क और अपने मूड पर नज़र रखना जारी रखने पर विचार करें।",

      aiInsightMoodVariable: "आपका दर्ज किया गया औसत मूड 5 में से {value} है। आपके रिकॉर्ड किए गए डेटा में मूड में बदलाव दिखाई दिया है। अपने व्यक्तिगत पैटर्न को समझने के लिए मूड को रिकॉर्ड करना जारी रखें।",

      aiInsightMoodPositive: "आपका दर्ज किया गया औसत मूड 5 में से {value} है। आपका हाल का मूड पैटर्न सकारात्मक दिखाई देता है।",

      aiInsightMoodVariation: "आपके दर्ज किए गए मूड में समय के साथ उल्लेखनीय बदलाव दिखाई दिए हैं। नींद और चक्र की जानकारी के साथ मूड को ट्रैक करने से आपके व्यक्तिगत पैटर्न को पहचानने में मदद मिल सकती है।",

      aiInsightActivityLow: "आपका हाल का दर्ज किया गया गतिविधि स्तर कम है। यदि आप सहज महसूस करें, तो चलना या हल्की स्ट्रेचिंग जैसी गतिविधियां सामान्य स्वास्थ्य और कल्याण में सहायता कर सकती हैं।",

      aiInsightActivityModerate: "आपका हाल का दर्ज किया गया गतिविधि स्तर मध्यम है। नियमित गतिविधि बनाए रखना एक अच्छा स्वास्थ्य और कल्याण अभ्यास हो सकता है।",

      aiInsightActivityHigh: "आपका हाल का दर्ज किया गया गतिविधि स्तर अधिक है। पर्याप्त आराम और रिकवरी के साथ अपनी गतिविधि को संतुलित करना याद रखें।",

      aiInsightCycleMenstrual: "आप वर्तमान में लगभग चक्र के {value}वें दिन पर हैं। यह सामान्यतः मासिक धर्म चरण के अंतर्गत आता है।",

      aiInsightCycleEarly: "आप वर्तमान में लगभग चक्र के {value}वें दिन पर हैं। मूड, ऊर्जा और लक्षणों में होने वाले बदलावों पर ध्यान देते रहें।",

      aiInsightCycleMid: "आप वर्तमान में लगभग चक्र के {value}वें दिन पर हैं। मूड, ऊर्जा, नींद और अन्य लक्षणों में होने वाले बदलावों पर नज़र रखें।",

      aiInsightCycleLate: "आप वर्तमान में लगभग चक्र के {value}वें दिन पर हैं। अगली माहवारी के करीब आने पर मूड, नींद, ऊर्जा और लक्षणों में होने वाले बदलावों पर ध्यान दें।",

      aiInsightTracking: "आपने {value} स्वास्थ्य प्रविष्टियां रिकॉर्ड की हैं। अपने व्यक्तिगत स्वास्थ्य और कल्याण के पैटर्न को बेहतर समझने के लिए नियमित रूप से ट्रैक करना जारी रखें।",

      aiInsightNoData: "व्यक्तिगत स्वास्थ्य जानकारी प्राप्त करने के लिए अपनी स्वास्थ्य जानकारी रिकॉर्ड करना शुरू करें।",

      aiInsightContinueTracking: "अधिक व्यक्तिगत स्वास्थ्य और कल्याण जानकारी प्राप्त करने के लिए अपनी स्वास्थ्य जानकारी रिकॉर्ड करना जारी रखें।",

      dayLabel: "दिन",

      currentEstimatedRisk: "वर्तमान अनुमानित जोखिम",

      latestRecordedMoodDescription: "हाल का रिकॉर्ड किया गया मूड",
      latestActivityLevelDescription: "हाल का गतिविधि स्तर",

      user: "उपयोगकर्ता",

    },

    tracking: {
      title: "स्वास्थ्य ट्रैकिंग",
      heading: "अपने स्वास्थ्य को ट्रैक करें",
      subtitle:
        "अपनी दैनिक स्वास्थ्य जानकारी दर्ज करें और स्वास्थ्य के पैटर्न समझें।",
      menstrualCycle: "मासिक धर्म चक्र",
      currentCycleInformation: "वर्तमान चक्र की जानकारी",
      currentCycleDay: "वर्तमान चक्र का दिन",
      cycleDayPlaceholder: "उदाहरण: 12",
      mood: "मूड",
      howFeeling: "आज आप कैसा महसूस कर रही हैं?",
      moodLevel: "मूड का स्तर",
      selectMood: "मूड चुनें",
      excellent: "बहुत अच्छा",
      good: "अच्छा",
      okay: "ठीक",
      low: "कम",
      veryLow: "बहुत कम",
      sleep: "नींद",
      sleepDurationDescription: "अपनी नींद की अवधि दर्ज करें",
      hoursOfSleep: "नींद के घंटे",
      sleepPlaceholder: "उदाहरण: 7.5",
      activity: "गतिविधि",
      physicalActivity: "शारीरिक गतिविधि",
      recordActivityToday: "आज की गतिविधि दर्ज करें",
      activityLevel: "गतिविधि का स्तर",
      selectActivity: "गतिविधि चुनें",
      activityLow: "कम",
      activityModerate: "मध्यम",
      activityHigh: "अधिक",
      saveToday: "आज का डेटा सहेजें",
      saveSuccess: "आज का स्वास्थ्य डेटा सफलतापूर्वक सहेजा गया!",
      loginRequired: "कृपया फिर से लॉग इन करें।",
      saveError: "स्वास्थ्य डेटा सहेजा नहीं जा सका।",
      validationError:
        "जांचें कि चक्र का दिन 1-45, मूड 1-5, और नींद 0-24 घंटे में 0.5 घंटे के अंतराल पर है।",
      recentRecords: "हाल के स्वास्थ्य रिकॉर्ड",
      noRecords: "अभी तक कोई स्वास्थ्य रिकॉर्ड नहीं है।",
      date: "तारीख",
      cycleDay: "चक्र का दिन",
      hours: "घंटे",
      saveTracking: "स्वास्थ्य रिकॉर्ड सहेजें",
    },

    menstrual: {
  subtitle:
    "अपने मासिक धर्म चक्र को ट्रैक करें और अपने चक्र के पैटर्न को समझें।",

  selectFlow: "रक्तस्राव स्तर चुनें",
  light: "कम",
  medium: "मध्यम",
  heavy: "अधिक",

  saveCycle: "चक्र सहेजें",
  savingCycle: "सहेजा जा रहा है...",
  deleteConfirmation: "क्या आप वाकई इस चक्र को हटाना चाहते हैं?",

  aiRequirement:
    "AI के लिए कम से कम 7 क्रमिक दैनिक स्वास्थ्य रिकॉर्ड आवश्यक हैं।",
  minimumDaysError:
    "स्वास्थ्य ट्रैकिंग के लिए कम से कम 7 दिनों के रिकॉर्ड आवश्यक हैं। वर्तमान में दर्ज दिन: {count}.",

  confidenceDescription:
    "विश्वसनीयता चयनित चरण के लिए मॉडल की अनुमानित संभावना को दर्शाती है।",

  featuresImputed: "पूरित विशेषताएं",

  personalizedEstimates:
    "आपके रिकॉर्ड किए गए चक्रों के आधार पर व्यक्तिगत अनुमान।",

  days: "दिन",
  day: "दिन",
  cramps: "ऐंठन",
  features: "विशेषताएं",
  noData: "कोई डेटा नहीं",
  regular: "नियमित",
  slightlyIrregular: "थोड़ा अनियमित",
  irregular: "अनियमित",

  currentCycle: "वर्तमान चक्र",
  currentEstimatedCycleDay: "वर्तमान अनुमानित चक्र दिवस",

  averageCycle: "औसत चक्र",
  basedOnRecordedCycles: "रिकॉर्ड किए गए चक्रों के आधार पर",

  averagePeriod: "औसत मासिक धर्म अवधि",
  averageBleedingDuration: "औसत रक्तस्राव अवधि",

  cyclePattern: "चक्र पैटर्न",
  basedOnAvailableHistory: "उपलब्ध इतिहास के आधार पर",

  estimatedFromCycleHistory:
    "आपके चक्र इतिहास से अनुमानित",

  fertileWindow: "अनुमानित फर्टाइल विंडो",
  approximateBasedOnCycleLength:
    "चक्र की अवधि के आधार पर अनुमान",

  estimateDisclaimer:
    "चक्र की ये तिथियां आपके द्वारा दी गई जानकारी के आधार पर अनुमानित हैं। ये चिकित्सीय निदान या विश्वसनीय गर्भनिरोधक तरीका नहीं हैं। चक्र का समय महीने-दर-महीने बदल सकता है।",

  noCycleRecords: "अभी तक कोई चक्र रिकॉर्ड नहीं है।",
  addFirstCycle: "ऊपर अपना पहला चक्र जोड़ें।",

  start: "शुरू",
  end: "समाप्त",
  action: "कार्रवाई",
  insufficientData: "पर्याप्त डेटा नहीं है",

  title: "मासिक धर्म ट्रैकिंग",
  addCycle: "मासिक धर्म चक्र जोड़ें",

  aiPrediction: "AI मासिक धर्म चरण का पूर्वानुमान",

  aiDescription:
    "AI मॉडल आपके हाल के स्वास्थ्य रिकॉर्ड का विश्लेषण करके वर्तमान मासिक धर्म चरण का अनुमान लगाता है।",

  availableDays: "उपलब्ध स्वास्थ्य रिकॉर्ड वाले दिन",
  confidence: "विश्वसनीयता",

  continueAddingRecords:
    "स्वास्थ्य रिकॉर्ड जोड़ना जारी रखें",

  cycleHistory: "मासिक धर्म चक्र इतिहास",

  cycleHistoryDescription:
    "आपके पहले दर्ज किए गए मासिक धर्म चक्र यहां दिखाई देंगे।",

  cycleInsights: "चक्र संबंधी जानकारी",
  cycleLength: "चक्र की अवधि",

  deleteCycle: "चक्र हटाएं",
  featuresProvided: "प्रदान की गई विशेषताएं",

  fertility: "फर्टिलिटी",
  follicular: "फॉलिक्युलर",

  historyLoadError:
    "चक्र इतिहास लोड नहीं किया जा सका।",

  loadingCycleHistory:
    "चक्र इतिहास लोड हो रहा है...",

  loginRequired:
    "मासिक धर्म ट्रैकिंग का उपयोग करने के लिए कृपया लॉगिन करें।",

  luteal: "ल्यूटियल",
  menstrual: "मासिक धर्म",

  nextPeriod: "अगला मासिक धर्म",

  notEnoughData:
    "AI पूर्वानुमान के लिए पर्याप्त डेटा नहीं है।",

  periodEnd: "मासिक धर्म समाप्त",
  periodStart: "मासिक धर्म शुरू",
  cycleLengthPlaceholder: "जैसे: 28",
  symptomsPlaceholder: "जैसे: ऐंठन, सिरदर्द, थकान...",

  periodStartRequired:
    "मासिक धर्म शुरू होने की तारीख आवश्यक है।",

  phaseProbabilities: "चरण की संभावनाएं",
  predictedPhase: "पूर्वानुमानित चरण",

  predicting: "पूर्वानुमान लगाया जा रहा है...",
  predictPhase: "मासिक धर्म चरण का पूर्वानुमान लगाएं",

  researchNote:
  "यह शोध LSTM मॉडल मासिक धर्म, हार्मोन, पहनने योग्य उपकरण और स्व-रिपोर्ट की गई विशेषताओं वाले mcPHASES डेटा का उपयोग करके प्रशिक्षित किया गया है। SakhiAI द्वारा एकत्र नहीं की गई विशेषताओं को प्रशिक्षण डेटा के माध्यिका मानों से भरा जाता है।",

aiDisclaimer:
  "यह AI पूर्वानुमान केवल जानकारी और स्वास्थ्य संबंधी सहायता के लिए है। यह चिकित्सीय निदान नहीं है और इसे पेशेवर चिकित्सा सलाह का विकल्प नहीं माना जाना चाहिए.",

  researchModelInfo:
    "मासिक धर्म चक्र के डेटा पर आधारित शोध मॉडल।",

  saveError:
    "चक्र सहेजा नहीं जा सका।",

  sequence: "सीक्वेंस लंबाई",
  sequenceLength: "अनुक्रम की लंबाई",

  symptoms: "लक्षण",
  flowLevel: "रक्तस्राव स्तर",

  healthTrackingLoadError:
    "स्वास्थ्य रिकॉर्ड लोड नहीं किए जा सके।",

  deleteError:
    "चक्र हटाया नहीं जा सका।",

  predictionError:
    "मासिक धर्म चरण का पूर्वानुमान तैयार नहीं किया जा सका।",
},

    pmos: {
      title: "PMOS जागरूकता",
      pageTitle: "PMOS जोखिम जागरूकता",
      subtitle: "अपने वर्तमान स्वास्थ्य-जागरूकता स्कोर और उसमें योगदान देने वाले कारकों को समझें।",
      loading: "PMOS जागरूकता लोड हो रही है...",
      loadingDescription: "आपकी दर्ज की गई स्वास्थ्य जानकारी का विश्लेषण किया जा रहा है।",
      loginRequired: "जारी रखने के लिए कृपया लॉग इन करें।",
      loadError: "PMOS जानकारी लोड नहीं हो सकी।",
      currentScore: "वर्तमान जागरूकता स्कोर",
      whatThisMeans: "इसका क्या अर्थ है",
      meaningHigh: "दर्ज किए गए कई स्वास्थ्य कारक उच्च जागरूकता स्कोर में योगदान दे रहे हैं। अपनी हाल की स्वास्थ्य जानकारी की समीक्षा करें और चिंता होने पर पेशेवर मार्गदर्शन लें।",
      meaningModerate: "कुछ दर्ज किए गए स्वास्थ्य कारक वर्तमान जागरूकता स्कोर में योगदान दे रहे हैं। अपनी सेहत को नियमित रूप से ट्रैक करती रहें।",
      meaningLow: "दर्ज किए गए वर्तमान स्वास्थ्य कारकों से जागरूकता स्कोर कम है। अपनी सेहत पर नज़र रखना जारी रखें।",
      meaningNoData: "जागरूकता स्कोर पाने के लिए अपनी स्वास्थ्य जानकारी दर्ज करें।",
      scoreFallback: "आपका स्कोर आपकी हाल की दर्ज स्वास्थ्य जानकारी से निकाला गया है।",
      noHealthDataMessage: "कृपया पहले अपनी स्वास्थ्य जानकारी दर्ज करें।",
      informationalMessage: "यह केवल जानकारी के लिए स्वास्थ्य अनुमान है, चिकित्सीय निदान नहीं।",
      historyNoHealthData: "जागरूकता स्कोर की गणना के लिए पर्याप्त दर्ज स्वास्थ्य जानकारी नहीं है।",
      historyNoFactorsExplanation: "दर्ज किए गए किसी भी स्वास्थ्य कारक ने वर्तमान जागरूकता स्कोर में अंक नहीं जोड़े।",
      historyFactorsExplanation: "वर्तमान जागरूकता स्कोर आपकी हाल की दर्ज स्वास्थ्य जानकारी पर आधारित है। इस स्कोर में योगदान देने वाले कारक हैं: {factors}। हर कारक वर्तमान पारदर्शी नियमों के अनुसार पहले से तय योगदान देता है।",
      dayValue: "दिन {value}",
      hoursValue: "{value} घंटे",
      riskLevel: "जोखिम स्तर",
      riskScore: "जोखिम स्कोर",
      low: "कम",
      moderate: "मध्यम",
      high: "उच्च",
      noData: "कोई डेटा नहीं",
      contributingFactors: "योगदान देने वाले कारक",
      factorsDescription: "ये कारक बताते हैं कि दर्ज की गई कौन-सी स्वास्थ्य जानकारी वर्तमान जागरूकता स्कोर को प्रभावित करती है।",
      recordedValue: "दर्ज मान:",
      impactLabel: "{level} प्रभाव",
      noFactors: "योगदान देने वाले कारक उपलब्ध नहीं हैं",
      noFactorsDescription: "विस्तृत विवरण पाने के लिए और स्वास्थ्य जानकारी दर्ज करें।",
      explainabilityTitle: "जागरूकता स्कोर कैसे बनाया जाता है",
      explainabilityDescription: "SakhiAI अभी आपकी दर्ज जानकारी पर आधारित स्पष्ट स्वास्थ्य नियमों का उपयोग करता है। हर कारक अपने पहले से तय योगदान के अनुसार जागरूकता स्कोर में जुड़ता है।",
      factorMood: "मूड",
      factorSleep: "नींद",
      factorActivity: "गतिविधि",
      factorCycle: "चक्र",
      moodLowExplanation: "आपका दर्ज मूड स्कोर अपेक्षाकृत कम है और वर्तमान जागरूकता स्कोर में अधिक योगदान देता है।",
      moodModerateExplanation: "आपका दर्ज मूड चुने गए पैमाने के मध्य के आसपास है और वर्तमान जागरूकता स्कोर में मध्यम योगदान देता है।",
      sleepVeryLowExplanation: "आपकी दर्ज नींद 6 घंटे से कम है और वर्तमान जागरूकता स्कोर में अधिक योगदान देती है।",
      sleepLowExplanation: "आपकी दर्ज नींद 7 घंटे से कम है और वर्तमान जागरूकता स्कोर में मध्यम योगदान देती है।",
      activityLowExplanation: "आपकी दर्ज गतिविधि का स्तर कम है और जागरूकता स्कोर में योगदान देता है।",
      cycleLaterExplanation: "दर्ज चक्र का दिन 21 या उससे अधिक है और वर्तमान जागरूकता स्कोर में योगदान देता है।",
      historyTitle: "मूल्यांकन इतिहास",
      historyDescription: "अपने पिछले PMOS जागरूकता आकलन देखें और समय के साथ स्कोर में बदलाव पर नज़र रखें।",
      date: "तारीख",
      score: "स्कोर",
      awarenessLevel: "जागरूकता स्तर",
      explanation: "विवरण",
      noHistory: "कोई पिछला आकलन नहीं",
      noHistoryDescription: "नया PMOS जागरूकता आकलन सहेजें; वह यहां दर्ज होगा।",
      saveAssessment: "आकलन इतिहास में सहेजें",
      savingAssessment: "आकलन सहेजा जा रहा है...",
      assessmentSaved: "आकलन आपके इतिहास में सहेज दिया गया है।",
      assessmentSaveError: "यह आकलन सहेजा नहीं जा सका। कृपया फिर से कोशिश करें।",
      historyRefreshError: "आकलन सहेज दिया गया, लेकिन इतिहास रीफ़्रेश नहीं हो सका।",
      disclaimer: "PMOS जागरूकता जानकारी केवल शिक्षा और सामान्य स्वास्थ्य के लिए है। यह चिकित्सीय निदान नहीं है। चिकित्सा संबंधी चिंता के लिए योग्य स्वास्थ्य पेशेवर से सलाह लें।",
    },

    pregnancy: {
  title: "गर्भावस्था सहायता",
  description:
    "अपनी गर्भावस्था और प्रसवोत्तर स्वास्थ्य जानकारी को ट्रैक करें।",
  currentStatus: "वर्तमान स्थिति",
  pregnancy: "गर्भावस्था की स्थिति",
  pregnancyWeek: "गर्भावस्था का सप्ताह",
  dueDate: "अनुमानित प्रसव तिथि",
  postpartum: "प्रसवोत्तर",
  postpartumWellbeing: "प्रसवोत्तर स्वास्थ्य",
  postpartumStatus: "प्रसवोत्तर स्थिति",
  postpartumWeek: "प्रसवोत्तर सप्ताह",
  postpartumMood: "प्रसवोत्तर मूड",
  wellbeingNotes: "स्वास्थ्य और कल्याण नोट्स",
  saveInformation: "जानकारी सहेजें",
  saving: "सहेजा जा रहा है...",
  updateMessage:
    "अपने स्वास्थ्य रिकॉर्ड को अपडेट रखने के लिए जब चाहें अपनी जानकारी अपडेट करें।",
  selectMood: "मूड चुनें",
  veryLow: "बहुत कम",
  lowMood: "कम",
  neutral: "तटस्थ",
  good: "अच्छा",
  veryGood: "बहुत अच्छा",
  notPregnant: "गर्भवती नहीं",
  pregnant: "गर्भवती",
  postpartumStatusValue: "प्रसवोत्तर",
  notPostpartum: "प्रसवोत्तर नहीं",
  week: "सप्ताह",
  noRecords: "अभी कोई गर्भावस्था रिकॉर्ड नहीं है",
  noRecordsDescription:
    "आपके सहेजे गए गर्भावस्था और प्रसवोत्तर स्वास्थ्य रिकॉर्ड यहां दिखाई देंगे।",
  historyTitle: "गर्भावस्था और प्रसवोत्तर इतिहास",
  historyDescription:
    "आपके खाते में सहेजे गए पिछले स्वास्थ्य रिकॉर्ड।",
  wellbeingGuidance: "स्वास्थ्य और कल्याण मार्गदर्शन",
  gentleSelfCare: "हल्की स्व-देखभाल",
  gentleSelfCareDescription:
    "आराम, पानी पीने, भावनात्मक स्वास्थ्य और रोज़मर्रा की उन आदतों पर ध्यान दें जो आपको बेहतर महसूस करने में मदद करती हैं।",
  stayConnected: "जुड़े रहें",
  stayConnectedDescription:
    "यदि आप लगातार शारीरिक या भावनात्मक बदलावों को लेकर चिंतित हैं, तो किसी योग्य स्वास्थ्य पेशेवर से बात करने पर विचार करें।",
  disclaimer:
    "यह मॉड्यूल केवल स्वास्थ्य और कल्याण ट्रैकिंग तथा शैक्षिक सहायता के लिए है। यह चिकित्सा निदान, उपचार या आपातकालीन चिकित्सा सलाह प्रदान नहीं करता है। चिकित्सा संबंधी चिंताओं के लिए योग्य स्वास्थ्य पेशेवर से परामर्श करें।",
  loading: "गर्भावस्था स्वास्थ्य जानकारी लोड हो रही है...",
  loadingDescription:
    "आपकी व्यक्तिगत जानकारी तैयार की जा रही है।",
  loginRequired: "जारी रखने के लिए कृपया लॉगिन करें।",
  loadError:
    "गर्भावस्था की जानकारी लोड नहीं की जा सकी।",
  saveSuccess:
    "आपकी गर्भावस्था और प्रसवोत्तर जानकारी सफलतापूर्वक सहेजी गई है।",
  saveError:
    "आपकी जानकारी सहेजी नहीं जा सकी।",
  pregnancyWeekPlaceholder: "उदाहरण: 12",
  postpartumWeekPlaceholder: "उदाहरण: 6",
  dueDatePlaceholder: "दिन/माह/वर्ष",
  wellbeingNotesPlaceholder:
    "आप कैसा महसूस कर रहे हैं, अपने स्वास्थ्य या किसी ऐसी बात के बारे में लिखें जिसे आप याद रखना चाहते हैं...",
  postpartumLabel: "प्रसवोत्तर",
    defaultWellbeingNote:
    "मैं अच्छा महसूस कर रही हूँ और नियमित स्व-देखभाल कर रही हूँ.",
},

    mentalWellness: {
  title: "मानसिक स्वास्थ्य",
  subtitle:
    "सरल स्व-मूल्यांकन प्रश्नावलियों के माध्यम से अपने भावनात्मक स्वास्थ्य को समझें।",

  important: "महत्वपूर्ण",
  disclaimer:
    "ये प्रश्नावलियां केवल जागरूकता और आत्म-चिंतन के लिए हैं। ये कोई चिकित्सा निदान प्रदान नहीं करती हैं। यदि आप अपने स्वास्थ्य को लेकर चिंतित हैं, तो किसी योग्य स्वास्थ्य पेशेवर से बात करें।",

  depressionAwareness: "अवसाद जागरूकता",
  anxietyAwareness: "चिंता जागरूकता",
  postpartumMoodAwareness: "प्रसवोत्तर मूड जागरूकता",
  postpartumMood: "प्रसवोत्तर मूड",

  questions9: "9 प्रश्न",
  questions7: "7 प्रश्न",
  questions10: "10 प्रश्न",

  phq9Description:
    "आपके हाल के भावनात्मक स्वास्थ्य पर विचार करने में मदद करने वाली PHQ-9 शैली की प्रश्नावली।",

  gad7Description:
    "चिंता से संबंधित अनुभवों पर विचार करने में मदद करने वाली GAD-7 शैली की प्रश्नावली।",

  epdsDescription:
    "प्रसवोत्तर भावनात्मक स्वास्थ्य जागरूकता के लिए बनाई गई EPDS शैली की प्रश्नावली।",

  notAtAll: "बिल्कुल नहीं",
  severalDays: "कई दिनों तक",
  moreThanHalfDays: "आधे से अधिक दिनों तक",
  nearlyEveryDay: "लगभग हर दिन",

  completeAssessment: "मूल्यांकन पूरा करें",
  savingAssessment: "मूल्यांकन सहेजा जा रहा है...",

  awarenessResult: "आपका जागरूकता परिणाम",
  score: "स्कोर",
  awarenessLevel: "जागरूकता स्तर",

  lowerAwareness:
    "आपके उत्तर वर्तमान में कम जागरूकता स्तर में हैं।",

  mildAwareness:
    "आपके उत्तर कुछ ऐसे क्षेत्रों को दिखाते हैं जिनकी निगरानी करना उपयोगी हो सकता है।",

  moderateAwareness:
    "आपके उत्तर बताते हैं कि अतिरिक्त ध्यान और सहायता उपयोगी हो सकती है।",

  professionalSupport:
    "आपके उत्तर बताते हैं कि किसी योग्य स्वास्थ्य पेशेवर से बात करना उपयोगी हो सकता है।",

  resultDisclaimer:
    "यह परिणाम केवल जागरूकता का संकेत है, चिकित्सा निदान नहीं। लगातार या चिंताजनक अनुभवों के बारे में किसी योग्य स्वास्थ्य पेशेवर से चर्चा करने पर विचार करें।",
  immediateSafety:
    "यदि आपको लगता है कि आप स्वयं को नुकसान पहुंचाने के विचारों पर अमल कर सकती हैं या आप तत्काल खतरे में हैं, तो अभी स्थानीय आपातकालीन सेवाओं से संपर्क करें या किसी भरोसेमंद व्यक्ति और योग्य स्वास्थ्य पेशेवर से बात करें।",
  minimalAwarenessLevel: "न्यूनतम जागरूकता स्तर",
  mildAwarenessLevel: "हल्का जागरूकता स्तर",
  moderateAwarenessLevel: "मध्यम जागरूकता स्तर",
  moderatelyHighAwarenessLevel: "मध्यम से अधिक जागरूकता स्तर",
  highAwarenessLevel: "उच्च जागरूकता स्तर",
  lowerAwarenessRange: "कम जागरूकता सीमा",
  possibleConcernRange: "संभावित चिंता की सीमा",
  higherAwarenessRange: "अधिक जागरूकता सीमा",
  unknownInterpretation: "अज्ञात",

  assessmentHistory: "मूल्यांकन इतिहास",
  loadingHistory: "इतिहास लोड हो रहा है...",
  noAssessments: "अभी कोई मूल्यांकन नहीं है",

  noAssessmentsDescription:
    "आपके पूरे किए गए जागरूकता मूल्यांकन यहां दिखाई देंगे।",

  pleaseAnswerAll:
    "सबमिट करने से पहले सभी प्रश्नों का उत्तर दें।",

  loginAgain: "कृपया फिर से लॉगिन करें।",

  saveError:
    "मूल्यांकन सहेजा नहीं जा सका। कृपया पुनः प्रयास करें।",

  assessmentNames: {
    PHQ9: "अवसाद जागरूकता",
    GAD7: "चिंता जागरूकता",
    EPDS: "प्रसवोत्तर मूड जागरूकता",
  },

  questions: {
    PHQ9: [
      "काम करने में बहुत कम रुचि या आनंद महसूस करना",
      "उदास, निराश या हताश महसूस करना",
      "सोने में कठिनाई, नींद में बने रहने में परेशानी या बहुत अधिक सोना",
      "थकान या ऊर्जा की कमी महसूस करना",
      "भूख कम होना या बहुत अधिक खाना",
      "अपने बारे में बुरा महसूस करना",
      "किसी चीज़ पर ध्यान केंद्रित करने में परेशानी",
      "धीरे चलना या बोलना, या असामान्य रूप से बेचैन होना",
      "यह विचार आना कि आपके लिए मर जाना या खुद को नुकसान पहुंचाना बेहतर होगा",
    ],

    GAD7: [
      "घबराहट, चिंता या बेचैनी महसूस करना",
      "चिंता करना बंद या नियंत्रित न कर पाना",
      "विभिन्न चीज़ों के बारे में बहुत अधिक चिंता करना",
      "आराम करने में परेशानी",
      "इतनी बेचैनी महसूस करना कि स्थिर बैठना मुश्किल हो",
      "आसानी से चिड़चिड़ा या परेशान हो जाना",
      "डर महसूस करना कि कुछ भयानक हो सकता है",
    ],

    EPDS: [
      "मैं हंस पाई हूं और चीज़ों का मज़ेदार पक्ष देख पाई हूं",
      "मैंने चीज़ों को खुशी के साथ आगे देखा है",
      "जब चीज़ें गलत हुईं तो मैंने अनावश्यक रूप से खुद को दोष दिया",
      "बिना किसी विशेष कारण के चिंतित या परेशान महसूस किया",
      "बिना किसी विशेष कारण के डरा हुआ या घबराया हुआ महसूस किया",
      "मुझे लगा कि चीज़ें मेरे नियंत्रण से बाहर हो रही हैं",
      "मैं इतनी दुखी थी कि मुझे सोने में परेशानी हुई",
      "मैं उदास या दुखी महसूस करती रही",
      "मैं इतनी दुखी थी कि रोती रही",
      "मेरे मन में खुद को नुकसान पहुंचाने का विचार आया",
    ],
  },
},

    wellness: {
      loading: "स्वास्थ्य और कल्याण जानकारी लोड हो रही है...",
      loadingDescription:
        "आपकी स्वास्थ्य जानकारी तैयार की जा रही है।",
      brand: "SakhiAI स्वास्थ्य",
      title: "आपका स्वास्थ्य और कल्याण",
      subtitle:
        "अपनी हाल की नींद, मूड, गतिविधि और समग्र स्वास्थ्य को समझें।",
      currentWellness: "वर्तमान स्वास्थ्य स्थिति",
      sleep: "नींद",
      hours: "घंटे",
      latestSleep: "हाल की दर्ज नींद",
      mood: "मूड",
      latestMood: "हाल की मूड रेटिंग",
      activity: "गतिविधि",
      activityLow: "कम",
      activityModerate: "मध्यम",
      activityHigh: "अधिक",
      latestActivity: "हाल का गतिविधि स्तर",
      cycleDay: "चक्र का दिन",
      day: "दिन",
      latestCycleDay: "हाल का दर्ज चक्र दिवस",
      trends: "स्वास्थ्य रुझान",
      moodTrend: "मूड रुझान",
      moodTrendDescription:
        "समय के साथ आपकी मूड रेटिंग।",
      sleepTrend: "नींद का रुझान",
      sleepTrendDescription:
        "समय के साथ आपकी दर्ज नींद की अवधि।",
      noHistory: "अभी स्वास्थ्य इतिहास उपलब्ध नहीं है",
      noHistoryDescription:
        "स्वास्थ्य रुझान देखने के लिए अपनी स्वास्थ्य जानकारी दर्ज करना जारी रखें।",
      personalizedInsights: "व्यक्तिगत स्वास्थ्य जानकारी",
      insightsDescription:
        "आपकी हाल की स्वास्थ्य जानकारी पर आधारित जानकारी।",
      noInsights: "अभी कोई व्यक्तिगत जानकारी उपलब्ध नहीं है",
      noInsightsDescription:
        "व्यक्तिगत जानकारी पाने के लिए अपनी स्वास्थ्य जानकारी दर्ज करना जारी रखें।",
      insightsDisclaimer:
        "ये जानकारी केवल सूचना के लिए है और चिकित्सा निदान नहीं है। चिंताजनक या लगातार लक्षण होने पर योग्य स्वास्थ्य पेशेवर से सलाह लें।",
    },

    chat: {
      title: "सहायक",
      subtitle: "आपकी महिला स्वास्थ्य साथी",
      online: "ऑनलाइन",
      welcomeMessage: "नमस्ते! 🌸 मैं SakhiAI हूं। आप अपनी नींद, मूड, गतिविधि, मासिक धर्म चक्र या सामान्य स्वास्थ्य के बारे में पूछ सकती हैं।",
      sessionExpired: "आपका सत्र समाप्त हो गया है। कृपया फिर से लॉग इन करें।",
      requestError: "SakhiAI से संपर्क करते समय कुछ गड़बड़ हुई।",
      responseFallback: "क्षमा करें, मैं जवाब तैयार नहीं कर पाई।",
      thinking: "SakhiAI सोच रहा है...",
      suggestedSleep: "मेरी नींद कैसी है?",
      suggestedMood: "मेरा मूड कैसा है?",
      suggestedCycle: "मेरा चक्र",
      suggestedActivity: "मेरी गतिविधि",
      placeholder: "अपना संदेश लिखें...",
      send: "भेजें",
      sendAriaLabel: "संदेश भेजें",
      disclaimer: "SakhiAI जानकारी के लिए स्वास्थ्य मार्गदर्शन देता है और पेशेवर चिकित्सा सलाह का विकल्प नहीं है।",
    },

    community: {
      title: "समुदाय",
      heading: "सहायता मंडल 🌸",
      subtitle: "अन्य महिलाओं के साथ अनुभव, प्रोत्साहन और रोज़मर्रा की स्वास्थ्य यात्रा साझा करने के लिए एक सुरक्षित स्थान।",
      safetyTitle: "समुदाय की सुरक्षा",
      safetyAnonymous: "पोस्ट अन्य उपयोगकर्ताओं के साथ गुमनाम रूप से साझा की जाती हैं।",
      safetyRespect: "सम्मानजनक और सहायक रहें।",
      safetyPrivacy: "पासवर्ड, फ़ोन नंबर या निजी जानकारी साझा न करें।",
      safetyMedical: "चिकित्सा निदान के लिए समुदाय का उपयोग न करें।",
      safetyReport: "असुरक्षित, अपमानजनक या अनुचित सामग्री की रिपोर्ट करें।",
      shareTitle: "समुदाय के साथ साझा करें",
      shareDescription: "आपकी पोस्ट गुमनाम रूप से दिखाई जाएगी।",
      topic: "विषय",
      categoryGeneral: "सामान्य सहायता",
      categoryMenstrual: "मासिक धर्म स्वास्थ्य",
      categoryPregnancy: "गर्भावस्था",
      categoryPostpartum: "प्रसवोत्तर",
      categoryMentalWellness: "मानसिक स्वास्थ्य",
      shareQuestion: "आप क्या साझा करना चाहेंगी?",
      sharePlaceholder: "अपना अनुभव, विचार, प्रोत्साहन या जो आप महसूस कर रही हैं, साझा करें...",
      loading: "SakhiAI समुदाय लोड हो रहा है...",
      emptyTitle: "अभी कोई बातचीत नहीं है",
      emptyDescription: "समुदाय के साथ कुछ साझा करने वाली पहली सदस्य बनें।",
      conversationsTitle: "समुदाय की बातचीत",
      conversationsDescription: "समुदाय के अनुभव और प्रोत्साहन।",
      anonymousMember: "गुमनाम सदस्य",
      report: "रिपोर्ट करें",
      reportPrompt: "आप इस पोस्ट की रिपोर्ट क्यों करना चाहती हैं?",
      reportSuccess: "धन्यवाद। पोस्ट की रिपोर्ट कर दी गई है।",
      reportError: "इस पोस्ट की रिपोर्ट नहीं हो सकी।",
      postNotFound: "समुदाय की पोस्ट नहीं मिली।",
      alreadyReported: "आप इस पोस्ट की पहले ही रिपोर्ट कर चुकी हैं।",
      emptyPostError: "पोस्ट करने से पहले कृपया कुछ लिखें।",
      loadError: "समुदाय की पोस्ट लोड नहीं हो सकीं।",
      createError: "आपकी पोस्ट नहीं बनाई जा सकी।",
      createSuccess: "आपकी पोस्ट गुमनाम रूप से साझा की गई।",
      sharing: "साझा किया जा रहा है...",
      shareAnonymously: "गुमनाम रूप से साझा करें",
      disclaimer: "SakhiAI समुदाय आपसी सहयोग और जागरूकता के लिए है। सदस्यों द्वारा साझा की गई जानकारी चिकित्सा सलाह या निदान नहीं है। चिंताजनक या लगातार बने रहने वाले लक्षणों के लिए योग्य स्वास्थ्य पेशेवर से सलाह लें।",
    },

    dietWorkout: {
      title: "आहार और व्यायाम",
      brand: "SakhiAI स्वास्थ्य",
      description:
        "आपके द्वारा पहले से दर्ज स्वास्थ्य जानकारी पर आधारित सरल जीवनशैली मार्गदर्शन।",
      loading: "स्वास्थ्य मार्गदर्शन लोड हो रहा है...",
      loadingDescription:
        "आपके लिए व्यक्तिगत सुझाव तैयार किए जा रहे हैं।",
      wellnessOnly: "केवल स्वास्थ्य और कल्याण मार्गदर्शन:",
      wellnessDisclaimer:
        "ये सुझाव सामान्य स्वास्थ्य और कल्याण के लिए हैं; ये व्यक्तिगत चिकित्सा, आहार या व्यायाम संबंधी निर्देश नहीं हैं। यदि आप गर्भवती हैं, प्रसवोत्तर अवस्था में हैं, आपको कोई स्वास्थ्य समस्या है, या व्यायाम अथवा पोषण को लेकर चिंता है, तो उपयुक्त स्वास्थ्य पेशेवर से सलाह लें।",
      snapshotTitle: "आपकी वर्तमान स्वास्थ्य स्थिति",
      snapshotDescription:
        "आपकी हाल की स्वास्थ्य ट्रैकिंग प्रविष्टि के आधार पर।",
      noHealthData: "अभी तक स्वास्थ्य ट्रैकिंग डेटा नहीं है",
      noHealthDataDescription:
        "अधिक प्रासंगिक स्वास्थ्य मार्गदर्शन पाने के लिए अपनी नींद, मूड, गतिविधि और चक्र की जानकारी दर्ज करें।",
      cycle: "चक्र",
      day: "दिन",
      sleep: "नींद",
      hours: "घंटे",
      mood: "मूड",
      activity: "गतिविधि",
      activityLow: "कम",
      activityModerate: "मध्यम",
      activityHigh: "अधिक",
      nutritionTitle: "पोषण और भोजन मार्गदर्शन",
      nutritionDescription: "रोज़मर्रा के पोषण के लिए सरल सुझाव।",
      dietLateCycleIron:
        "हरी पत्तेदार सब्ज़ियां, दालें, बीन्स और पोषक तत्वों से समृद्ध खाद्य पदार्थ जैसे आयरन-युक्त भोजन शामिल करें।",
      dietLateCycleBalanced:
        "प्रोटीन, साबुत अनाज, सब्ज़ियों और फलों वाले संतुलित भोजन चुनें।",
      dietLateCycleHydration:
        "दिन भर पर्याप्त तरल लेते रहें।",
      dietLowMoodRegularMeals:
        "भोजन छोड़ने के बजाय नियमित और संतुलित भोजन चुनें।",
      dietLowMoodProtein:
        "दाल, बीन्स, अंडे, दही या आपके लिए उपयुक्त अन्य प्रोटीन-युक्त खाद्य पदार्थ शामिल करें।",
      dietLowMoodProduce:
        "फल, सब्ज़ियां और पर्याप्त तरल शामिल करें।",
      dietDefaultBalanced:
        "सब्ज़ियों, फलों, साबुत अनाज और प्रोटीन वाला संतुलित भोजन लेने का प्रयास करें।",
      dietDefaultIronProtein:
        "आयरन और प्रोटीन-युक्त खाद्य पदार्थ नियमित रूप से शामिल करें।",
      dietDefaultHydration:
        "दिन भर पर्याप्त पानी पिएं।",
      hydrationTitle: "पानी और तरल",
      hydrationDescription:
        "दिन भर नियमित रूप से पानी पीते रहें।",
      hydrationGuidance:
        "पानी की बोतल पास रखें और नियमित रूप से पानी पिएं। आपकी तरल की ज़रूरत गतिविधि, मौसम, गर्भावस्था की स्थिति और अन्य व्यक्तिगत बातों के अनुसार बदल सकती है।",
      movementTitle: "गतिविधि और व्यायाम",
      movementDescription:
        "आपके वर्तमान गतिविधि स्तर के अनुसार हल्की गतिविधियों के सुझाव।",
      workoutLowWalk:
        "15–20 मिनट की हल्की सैर से शुरुआत करें।",
      workoutLowStretch:
        "हल्की स्ट्रेचिंग या गतिशीलता वाले व्यायाम आज़माएं।",
      workoutLowGradual:
        "अपनी सहजता के अनुसार गतिविधि धीरे-धीरे बढ़ाएं।",
      workoutHighBalance:
        "सक्रिय दिनों के साथ पर्याप्त आराम और रिकवरी का संतुलन रखें।",
      workoutHighStretch:
        "स्ट्रेचिंग और गतिशीलता वाले व्यायाम शामिल करें।",
      workoutHighRest:
        "थकान महसूस होने पर पर्याप्त आराम करें।",
      workoutDefaultActivity:
        "नियमित रूप से मध्यम स्तर की शारीरिक गतिविधि बनाए रखें।",
      workoutDefaultExamples:
        "चलना, स्ट्रेचिंग, योग या हल्के शक्ति व्यायाम सामान्य स्वास्थ्य और कल्याण में सहायक हो सकते हैं।",
      workoutDefaultRecovery:
        "अधिक सक्रिय दिनों के बीच आराम और रिकवरी का समय रखें।",
      restTitle: "आराम और रिकवरी",
      restDescription:
        "रिकवरी रोज़मर्रा के स्वास्थ्य और कल्याण का महत्वपूर्ण हिस्सा है।",
      sleepBelowTarget:
        "आपकी हाल की नींद 7 घंटे से कम है। सोने का नियमित समय बनाने और पर्याप्त आराम के लिए समय रखने पर विचार करें।",
      sleepRoutine:
        "नींद की नियमित दिनचर्या बनाए रखें और अपने शरीर को रिकवर होने के लिए पर्याप्त समय दें।",
      recovery: "रिकवरी",
      recoveryGuidance:
        "अपने शरीर के संकेतों पर ध्यान दें। खासकर थकान या अधिक तनाव के समय गतिविधि और आराम में संतुलन रखें।",
      everydayIdeas: "रोज़मर्रा के स्वास्थ्य सुझाव",
      homeCookedMeals: "घर का बना भोजन",
      homeCookedMealsDescription:
        "परिचित खाद्य पदार्थों और विविध सामग्री से संतुलित भोजन चुनें।",
      gentleMovement: "हल्की गतिविधि",
      gentleMovementDescription:
        "चलना, स्ट्रेचिंग, योग या अन्य आरामदायक गतिविधियां स्वस्थ दिनचर्या का हिस्सा हो सकती हैं।",
      community: "समुदाय",
      communityDescription:
        "विश्वसनीय परिवार, मित्रों या सहायक समुदायों से जुड़े रहना भावनात्मक स्वास्थ्य में मदद कर सकता है।",
      selfCare: "स्वयं की देखभाल",
      selfCareDescription:
        "आराम, विश्रांति, शौक और आपको सहज महसूस कराने वाली गतिविधियों के लिए समय निकालें।",
    },

    reports: {
      title: "रिपोर्ट",
      loading: "आपकी स्वास्थ्य रिपोर्ट तैयार की जा रही है...",
      loadingDescription: "आपकी दर्ज स्वास्थ्य जानकारी एकत्र की जा रही है।",
      reportTitle: "स्वास्थ्य रिपोर्ट",
      subtitle: "आपकी दर्ज स्वास्थ्य जानकारी का सारांश।",
      printSave: "रिपोर्ट प्रिंट / सेव करें",
      patientInformation: "रोगी की जानकारी",
      profileDescription: "इस रिपोर्ट से जुड़ी मूल प्रोफ़ाइल जानकारी।",
      name: "नाम",
      email: "ईमेल",
      age: "आयु",
      lifeStage: "जीवन चरण",
      averageMood: "औसत मूड",
      averageSleep: "औसत नींद",
      activityRecords: "गतिविधि रिकॉर्ड",
      pmosAwareness: "PMOS जागरूकता",
      healthHistory: "स्वास्थ्य ट्रैकिंग इतिहास",
      historyDescription: "कालक्रम के अनुसार आपकी दर्ज स्वास्थ्य जानकारी।",
      noHealthRecords: "स्वास्थ्य रिकॉर्ड उपलब्ध नहीं हैं",
      noHealthRecordsDescription: "अपना रिपोर्ट इतिहास बनाने के लिए स्वास्थ्य जानकारी दर्ज करना शुरू करें।",
      date: "तारीख",
      cycle: "चक्र",
      mood: "मूड",
      sleep: "नींद",
      activity: "गतिविधि",
      day: "दिन {value}",
      hoursAbbreviation: "घं.",
      currentAwarenessScore: "वर्तमान जागरूकता स्कोर",
      noData: "कोई डेटा नहीं",
      pmosUnavailable: "जागरूकता अनुमान पाने के लिए स्वास्थ्य जानकारी दर्ज करें।",
      aiHealthInsights: "AI स्वास्थ्य जानकारी",
      noInsights: "अभी कोई व्यक्तिगत जानकारी उपलब्ध नहीं है।",
      generatedOn: "रिपोर्ट तैयार की गई",
      includedPeriod: "शामिल अवधि",
      allAvailableRecords: "सभी उपलब्ध रिकॉर्ड",
      privacyNotice: "गोपनीय स्वास्थ्य जानकारी। इसे केवल रोगी की सहमति और अधिकृत देखभाल टीम के साथ साझा करें।",
      menstrualHistory: "मासिक धर्म इतिहास",
      pregnancyHistory: "गर्भावस्था और प्रसवोत्तर इतिहास",
      mentalWellnessHistory: "मानसिक स्वास्थ्य मूल्यांकन इतिहास",
      noMenstrualRecords: "मासिक धर्म के रिकॉर्ड उपलब्ध नहीं हैं।",
      noPregnancyRecords: "गर्भावस्था या प्रसवोत्तर रिकॉर्ड उपलब्ध नहीं हैं।",
      noMentalAssessments: "मानसिक स्वास्थ्य मूल्यांकन उपलब्ध नहीं हैं।",
      periodStart: "माहवारी शुरू",
      periodEnd: "माहवारी समाप्त",
      cycleLength: "चक्र की अवधि",
      symptoms: "लक्षण",
      flowLevel: "रक्तस्राव का स्तर",
      pregnancyStatus: "गर्भावस्था की स्थिति",
      pregnancyWeek: "गर्भावस्था का सप्ताह",
      dueDate: "प्रसव की अनुमानित तारीख",
      postpartumStatus: "प्रसवोत्तर स्थिति",
      postpartumWeek: "प्रसवोत्तर सप्ताह",
      postpartumMood: "प्रसवोत्तर मूड",
      wellbeingNotes: "स्वास्थ्य और कल्याण संबंधी नोट्स",
      assessmentType: "मूल्यांकन",
      score: "स्कोर",
      interpretation: "व्याख्या",
      totalHealthRecords: "कुल स्वास्थ्य रिकॉर्ड",
      disclaimer: "SakhiAI रिपोर्ट स्वास्थ्य जागरूकता, शिक्षा, स्वास्थ्य ट्रैकिंग और स्वास्थ्य पेशेवरों से संवाद में सहायता के लिए हैं। वे चिकित्सीय निदान या पेशेवर चिकित्सा सलाह का विकल्प नहीं हैं। चिंताजनक या लगातार बने रहने वाले लक्षणों के लिए योग्य स्वास्थ्य पेशेवर से सलाह लें।",
    },

    consultation: {
      brand: "SakhiAI स्वास्थ्य सेवा",
      loading: "परामर्श की जानकारी लोड हो रही है...",
      title: "डॉक्टर से परामर्श",
      subtitle: "स्वास्थ्य पेशेवर खोजें और परामर्श के लिए अनुरोध करें।",
      availableDoctors: "उपलब्ध डॉक्टर",
      noDoctors: "कोई डॉक्टर उपलब्ध नहीं है।",
      hospital: "अस्पताल:",
      experience: "अनुभव:",
      years: "{count} वर्ष",
      requestConsultation: "परामर्श का अनुरोध करें",
      myRequests: "मेरे परामर्श अनुरोध",
      myRequestsDescription: "अपने परामर्श देखें और डॉक्टर द्वारा साझा किए गए नोट पढ़ें।",
      refresh: "रीफ्रेश करें",
      noRequests: "अभी कोई परामर्श अनुरोध नहीं है।",
      noRequestsDescription: "आपके अनुरोध यहां दिखाई देंगे।",
      requested: "अनुरोध की तारीख:",
      pending: "लंबित",
      accepted: "स्वीकृत",
      completed: "पूरा हुआ",
      cancelled: "रद्द किया गया",
      cancel: "रद्द करें",
      doctorNotes: "डॉक्टर के नोट",
      doctorNotesDescription: "ये नोट आपके डॉक्टर ने साझा किए हैं। स्पष्टीकरण के लिए अपने स्वास्थ्य पेशेवर से संपर्क करें।",
      reasonLabel: "परामर्श का कारण",
      reasonPlaceholder: "बताएं कि आप परामर्श क्यों लेना चाहती हैं...",
      sending: "भेजा जा रहा है...",
      sendRequest: "अनुरोध भेजें",
      loginRequired: "कृपया फिर से लॉग इन करें।",
      loadDoctorsError: "डॉक्टरों की जानकारी लोड नहीं हो सकी।",
      loadRequestsError: "परामर्श अनुरोध लोड नहीं हो सके।",
      loadInfoError: "परामर्श की जानकारी लोड नहीं हो सकी।",
      reasonRequired: "कृपया परामर्श का कारण दर्ज करें।",
      requestSent: "परामर्श अनुरोध {doctor} को भेजा गया।",
      sendError: "परामर्श अनुरोध नहीं भेजा जा सका।",
      cancelSuccess: "परामर्श अनुरोध रद्द कर दिया गया।",
      cancelError: "अनुरोध रद्द नहीं किया जा सका।",
      doctorNotFound: "चयनित डॉक्टर नहीं मिला।",
      consultationNotFound: "परामर्श अनुरोध नहीं मिला।",
      requestNoLongerPending: "केवल लंबित परामर्श अनुरोध रद्द किए जा सकते हैं।",
      doctorNumber: "डॉक्टर #{id}",
    },

    notifications: {
      title: "सूचनाएं",
      subtitle: "अपने स्वास्थ्य संबंधी अनुस्मारकों की जानकारी पाएं।",
      unread: "अपठित सूचनाएं",
      total: "कुल",
      loading: "सूचनाएं लोड हो रही हैं...",
      noNotifications: "अभी कोई सूचना नहीं है",
      emptyDescription: "आपके स्वास्थ्य अनुस्मारक यहां दिखाई देंगे।",
      new: "नई",
      markAsRead: "पढ़ा हुआ चिह्नित करें",
      delete: "हटाएं",
      loginRequired: "कृपया फिर से लॉग इन करें।",
      sessionExpired: "आपका सत्र समाप्त हो गया है। कृपया फिर से लॉग इन करें।",
      loadError: "सूचनाएं लोड नहीं हो सकीं।",
      markReadError: "सूचना को पढ़ा हुआ चिह्नित नहीं किया जा सका।",
      deleteError: "सूचना हटाई नहीं जा सकी।",
      doctorNotesTitle: "डॉक्टर के नए नोट",
      doctorNotesMessage: "आपके डॉक्टर {doctor} ने आपके परामर्श के लिए नोट जोड़े या अपडेट किए हैं। उन्हें देखने के लिए SakhiAI में लॉग इन करें और अपना परामर्श पृष्ठ खोलें।",
      doctorNotesMessageGeneric: "आपके डॉक्टर ने आपके परामर्श के लिए नोट जोड़े या अपडेट किए हैं। उन्हें देखने के लिए SakhiAI में लॉग इन करें और अपना परामर्श पृष्ठ खोलें।",
      cycleReminderTitle: "🌸 चक्र अनुस्मारक",
      cycleReminderMessage: "आपका मासिक धर्म चक्र ट्रैक किया जा रहा है। बेहतर अनुमान के लिए अपने चक्र की जानकारी दर्ज करते रहें।",
    },
  },
} as const;

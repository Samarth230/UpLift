/**
 * UpLift Translation System
 * Complete English ↔ Hindi translations for every UI string
 */

const translations = {
  en: {
    // === Brand ===
    appName: 'UpLift',
    tagline: 'AI-Powered Disaster Response Platform',
    taglineShort: 'Disaster Response Platform',

    // === Landing Page ===
    landing: {
      subtitle: 'Choose your role to continue',
      reportsFiled: 'Reports Filed',
      volunteersActive: 'Volunteers Active',
      issuesResolved: 'Issues Resolved',
      secureFooter: 'Secure. Verified. Impactful.',
    },

    // === Roles ===
    roles: {
      ngo: 'NGO Staff',
      volunteer: 'Volunteer',
      ngoDesc: 'Verify AI-analyzed disaster reports, manage relief operations, and coordinate response teams from your verification dashboard.',
      volunteerDesc: 'Chat with our AI coordinator to find disaster relief tasks near you. Get matched based on your skills and location in seconds.',
      openDashboard: 'Open Dashboard',
      startHelping: 'Start Helping',
      ngoFeature1: 'Live Map',
      ngoFeature2: 'AI Insights',
      ngoFeature3: 'Real-time',
      volFeature1: 'AI Matching',
      volFeature2: 'Nearby Tasks',
      volFeature3: 'Team Up',
    },

    // === Login ===
    login: {
      signIn: 'Sign In',
      enterPhone: 'Enter your mobile number to receive a verification code',
      phonePlaceholder: 'Enter phone number',
      sendOtp: 'Send OTP',
      sendingOtp: 'Sending OTP...',
      verifyOtp: 'Verify OTP',
      enterOtp: 'Enter the 6-digit code sent to',
      verifyContinue: 'Verify & Continue',
      verifying: 'Verifying...',
      completeProfile: 'Complete Profile',
      verifyIdentity: 'Verify Your Identity',
      almostThere: 'Almost There!',
      enterDetails: 'Enter your details and verify your NGO credentials',
      enterName: 'Enter your name to complete registration',
      namePlaceholder: 'Your full name',
      accessDashboard: 'Access Dashboard',
      settingUp: 'Setting up...',
      welcome: 'Welcome,',
      redirecting: 'Redirecting to your',
      dashboard: 'dashboard',
      chat: 'chat',
      backToRoles: 'Back to roles',
      back: 'Back',
      signingAs: 'Signing in as',
      secureData: 'Your data is secure and encrypted',
      didntReceive: "Didn't receive the code?",
      resend: 'Resend',
      ngoVerification: 'NGO Verification Required',
      ngoEmailPlaceholder: 'NGO email (e.g., you@redcross.org)',
      orgCodePlaceholder: 'Organization code',
      or: 'or',
      ngoHint: 'Enter your verified NGO email or organization code. Only authorized staff can access the verification dashboard.',
      ngoError: 'NGO verification failed. Use a verified NGO email address or enter the organization code. Demo code: UPLIFT2026',
      phoneError: 'Please enter a valid 10-digit phone number',
      otpError: 'Please enter the complete 6-digit OTP',
      nameError: 'Please enter your name',
      demoPhoneHint: 'For the moment put any mobile number',
      demoOtpHint: 'Input 6 digits for the moment',
      demoNgoHint: 'Write uplift2026 directly',
      demoNameHint: 'Put any name for the moment',
      // Brand features
      ngoFeature1: 'Verified NGO-only access',
      ngoFeature2: 'AI-analyzed report verification',
      ngoFeature3: 'Real-time situation map',
      volFeature1: 'Instant task matching',
      volFeature2: 'AI-powered skill matching',
      volFeature3: 'Find tasks near your location',
      brandDesc_ngo: 'Access the NGO verification dashboard to manage disaster reports and coordinate response teams.',
      brandDesc_vol: 'Join our volunteer network and get matched with disaster relief tasks near you using AI.',
    },

    // === Header ===
    header: {
      uploadPhotos: 'Upload Photos',
      switchRole: 'Switch role',
      exportCsv: 'Export CSV',
    },

    // === NGO Dashboard ===
    dashboard: {
      verificationQueue: 'Verification Queue',
      pending: 'Pending',
      verified: 'Verified',
      all: 'All',
      noReports: 'No {tab} reports',
      allReviewed: 'All reports have been reviewed. Nice work!',
      noCategory: 'No reports in this category yet.',
      demoData: 'Using demo data — connect Firebase to go live',
      liveData: 'All reports are AI-analyzed and awaiting your verification',
      reports: 'Reports',
      critical: 'Critical',
    },

    // === Report Card ===
    report: {
      verify: 'Verify',
      reject: 'Reject',
      insightTrace: 'Insight Trace',
      reportedBy: 'Reported by',
      ago: 'ago',
    },

    // === Upload Modal ===
    upload: {
      title: '📷 Upload Report Photo',
      dropTitle: 'Drop your report photo here',
      dropDesc: 'or click to browse — JPG, PNG up to 10MB',
      namePlaceholder: 'Your name (optional)',
      submitBtn: 'Analyze & Submit Report',
      successTitle: 'Report Submitted!',
      successDesc: 'Your report has been AI-analyzed and added to the verification queue. An NGO coordinator will review it shortly.',
      done: 'Done',
    },

    // === Insight Modal ===
    insight: {
      title: 'AI Insight Trace',
      category: 'Category',
      urgency: 'Urgency',
      status: 'Status',
      location: 'Location',
      aiSummary: 'AI Summary',
      extractedText: 'Extracted Text (OCR)',
      noText: 'No text extracted',
      reportDetails: 'Report Details',
      reportedBy: 'Reported By',
      timestamp: 'Timestamp',
      coordinates: 'Coordinates',
      verifyReport: 'Verify Report',
      rejectReport: 'Reject',
      anonymous: 'Anonymous',
      na: 'N/A',
    },

    // === Status/Urgency Badges ===
    status: {
      pending: 'Pending',
      processing: 'Processing',
      verified: 'Verified',
      failed: 'Failed',
      rejected: 'Rejected',
    },
    urgency: {
      1: 'Low',
      2: 'Minor',
      3: 'Moderate',
      4: 'Severe',
      5: 'Critical',
    },

    // === Map ===
    map: {
      urgencyLegend: 'Urgency',
    },

    // === Volunteer Chat ===
    chat: {
      welcomeMsg: "Hello! 👋 I'm your UpLift Emergency Coordinator. I'm here to help you find tasks and assist with disaster relief efforts in your area.\n\nAre you near Indiranagar, Bangalore? Tell me your location and skills, and I'll find tasks that match!",
      inputPlaceholder: 'Type your message...',
      matchedTasks: 'Matched Tasks',
      tasksFound: 'tasks found nearby',
      askAi: 'Ask the AI to find tasks',
      emptyTasks: 'Tell the AI your location and skills to discover matching tasks',
      suggestion1: 'I want to help nearby',
      suggestion2: 'Show urgent tasks in Indiranagar',
      suggestion3: "I'm a doctor, need medical tasks",
      suggestion4: 'Any cleanup work near me?',
      suggestion5: 'What tasks need volunteers?',
    },

    // === SOS ===
    sos: {
      btnLabel: 'SOS',
      title: '🆘 Emergency SOS',
      desc: 'Send an emergency alert with your current location. This creates an urgency 5 (Critical) report immediately.',
      detecting: 'Detecting your location...',
      locationFound: 'Location detected',
      locationFailed: 'Could not detect location — using default area',
      descPlaceholder: 'Briefly describe the emergency (optional)',
      sendAlert: 'Send Emergency Alert',
      sending: 'Sending...',
      sent: 'Emergency alert sent! NGO teams have been notified.',
      cancel: 'Cancel',
    },

    // === Toast Messages ===
    toast: {
      reportVerified: 'Report verified and published to live map',
      reportRejected: 'Report rejected and removed from queue',
      csvExported: 'Reports exported to CSV successfully',
      sosAlert: 'Emergency SOS alert sent!',
      langSwitch: 'Language changed to English',
    },

    // === Footer / Misc ===
    misc: {
      switchHint: 'Switch roles to see how reports flow from submission to verification',
      unknown: 'Unknown',
    },

    // === Categories (keep English for data consistency, labels translated) ===
    categories: {
      'Flooding': 'Flooding',
      'Building Collapse': 'Building Collapse',
      'Road Damage': 'Road Damage',
      'Power Outage': 'Power Outage',
      'Water Contamination': 'Water Contamination',
      'Fallen Tree': 'Fallen Tree',
      'Gas Leak': 'Gas Leak',
      'Fire': 'Fire',
      'Medical Emergency': 'Medical Emergency',
      'Other': 'Other',
    },
  },

  hi: {
    // === Brand ===
    appName: 'UpLift',
    tagline: 'AI-संचालित आपदा प्रतिक्रिया मंच',
    taglineShort: 'आपदा प्रतिक्रिया मंच',

    // === Landing Page ===
    landing: {
      subtitle: 'जारी रखने के लिए अपनी भूमिका चुनें',
      reportsFiled: 'दर्ज रिपोर्ट',
      volunteersActive: 'सक्रिय स्वयंसेवक',
      issuesResolved: 'समाधान किए गए',
      secureFooter: 'सुरक्षित। सत्यापित। प्रभावशाली।',
    },

    // === Roles ===
    roles: {
      ngo: 'एनजीओ कर्मचारी',
      volunteer: 'स्वयंसेवक',
      ngoDesc: 'AI-विश्लेषित आपदा रिपोर्ट सत्यापित करें, राहत कार्य प्रबंधित करें, और अपने सत्यापन डैशबोर्ड से प्रतिक्रिया टीमों का समन्वय करें।',
      volunteerDesc: 'अपने आस-पास के आपदा राहत कार्य खोजने के लिए हमारे AI समन्वयक से बात करें। अपने कौशल और स्थान के आधार पर सेकंडों में मिलान करें।',
      openDashboard: 'डैशबोर्ड खोलें',
      startHelping: 'मदद शुरू करें',
      ngoFeature1: 'लाइव मैप',
      ngoFeature2: 'AI इनसाइट्स',
      ngoFeature3: 'रियल-टाइम',
      volFeature1: 'AI मिलान',
      volFeature2: 'पास के कार्य',
      volFeature3: 'टीम बनाएं',
    },

    // === Login ===
    login: {
      signIn: 'साइन इन करें',
      enterPhone: 'सत्यापन कोड प्राप्त करने के लिए अपना मोबाइल नंबर दर्ज करें',
      phonePlaceholder: 'फ़ोन नंबर दर्ज करें',
      sendOtp: 'OTP भेजें',
      sendingOtp: 'OTP भेज रहे हैं...',
      verifyOtp: 'OTP सत्यापित करें',
      enterOtp: 'पर भेजा गया 6 अंकों का कोड दर्ज करें',
      verifyContinue: 'सत्यापित करें और जारी रखें',
      verifying: 'सत्यापित हो रहा है...',
      completeProfile: 'प्रोफ़ाइल पूरा करें',
      verifyIdentity: 'अपनी पहचान सत्यापित करें',
      almostThere: 'लगभग हो गया!',
      enterDetails: 'अपने विवरण दर्ज करें और अपने एनजीओ प्रमाण-पत्र सत्यापित करें',
      enterName: 'पंजीकरण पूरा करने के लिए अपना नाम दर्ज करें',
      namePlaceholder: 'आपका पूरा नाम',
      accessDashboard: 'डैशबोर्ड एक्सेस करें',
      settingUp: 'सेटअप हो रहा है...',
      welcome: 'स्वागत है,',
      redirecting: 'आपके',
      dashboard: 'डैशबोर्ड',
      chat: 'चैट',
      backToRoles: 'भूमिकाओं पर वापस',
      back: 'वापस',
      signingAs: 'के रूप में साइन इन',
      secureData: 'आपका डेटा सुरक्षित और एन्क्रिप्टेड है',
      didntReceive: 'कोड नहीं मिला?',
      resend: 'पुनः भेजें',
      ngoVerification: 'एनजीओ सत्यापन आवश्यक',
      ngoEmailPlaceholder: 'एनजीओ ईमेल (जैसे, you@redcross.org)',
      orgCodePlaceholder: 'संगठन कोड',
      or: 'या',
      ngoHint: 'अपना सत्यापित एनजीओ ईमेल या संगठन कोड दर्ज करें। केवल अधिकृत कर्मचारी सत्यापन डैशबोर्ड तक पहुंच सकते हैं।',
      ngoError: 'एनजीओ सत्यापन विफल। सत्यापित एनजीओ ईमेल या संगठन कोड दर्ज करें। डेमो कोड: UPLIFT2026',
      phoneError: 'कृपया एक वैध 10 अंकों का फ़ोन नंबर दर्ज करें',
      otpError: 'कृपया पूरा 6 अंकों का OTP दर्ज करें',
      nameError: 'कृपया अपना नाम दर्ज करें',
      demoPhoneHint: 'अभी के लिए कोई भी मोबाइल नंबर डालें',
      demoOtpHint: 'अभी के लिए 6 अंक डालें',
      demoNgoHint: 'सीधे uplift2026 लिखें',
      demoNameHint: 'अभी के लिए कोई भी नाम डालें',
      ngoFeature1: 'सत्यापित एनजीओ-केवल एक्सेस',
      ngoFeature2: 'AI-विश्लेषित रिपोर्ट सत्यापन',
      ngoFeature3: 'रियल-टाइम स्थिति मैप',
      volFeature1: 'तत्काल कार्य मिलान',
      volFeature2: 'AI-संचालित कौशल मिलान',
      volFeature3: 'अपने स्थान के पास कार्य खोजें',
      brandDesc_ngo: 'आपदा रिपोर्ट प्रबंधित करने और प्रतिक्रिया टीमों का समन्वय करने के लिए एनजीओ सत्यापन डैशबोर्ड एक्सेस करें।',
      brandDesc_vol: 'हमारे स्वयंसेवक नेटवर्क से जुड़ें और AI का उपयोग करके अपने पास के आपदा राहत कार्यों से मिलान करें।',
    },

    // === Header ===
    header: {
      uploadPhotos: 'फ़ोटो अपलोड करें',
      switchRole: 'भूमिका बदलें',
      exportCsv: 'CSV निर्यात',
    },

    // === NGO Dashboard ===
    dashboard: {
      verificationQueue: 'सत्यापन कतार',
      pending: 'लंबित',
      verified: 'सत्यापित',
      all: 'सभी',
      noReports: 'कोई {tab} रिपोर्ट नहीं',
      allReviewed: 'सभी रिपोर्ट की समीक्षा हो चुकी है। बहुत बढ़िया!',
      noCategory: 'इस श्रेणी में अभी तक कोई रिपोर्ट नहीं।',
      demoData: 'डेमो डेटा उपयोग हो रहा है — लाइव जाने के लिए Firebase कनेक्ट करें',
      liveData: 'सभी रिपोर्ट AI-विश्लेषित हैं और आपके सत्यापन की प्रतीक्षा कर रही हैं',
      reports: 'रिपोर्ट',
      critical: 'गंभीर',
    },

    // === Report Card ===
    report: {
      verify: 'सत्यापित करें',
      reject: 'अस्वीकार',
      insightTrace: 'AI विश्लेषण',
      reportedBy: 'रिपोर्ट करने वाला',
      ago: 'पहले',
    },

    // === Upload Modal ===
    upload: {
      title: '📷 रिपोर्ट फ़ोटो अपलोड करें',
      dropTitle: 'अपनी रिपोर्ट फ़ोटो यहाँ ड्रॉप करें',
      dropDesc: 'या ब्राउज़ करने के लिए क्लिक करें — JPG, PNG 10MB तक',
      namePlaceholder: 'आपका नाम (वैकल्पिक)',
      submitBtn: 'विश्लेषण करें और रिपोर्ट सबमिट करें',
      successTitle: 'रिपोर्ट सबमिट हो गई!',
      successDesc: 'आपकी रिपोर्ट का AI-विश्लेषण हो गया है और सत्यापन कतार में जोड़ दिया गया है। एक एनजीओ समन्वयक जल्द ही इसकी समीक्षा करेगा।',
      done: 'हो गया',
    },

    // === Insight Modal ===
    insight: {
      title: 'AI इनसाइट ट्रेस',
      category: 'श्रेणी',
      urgency: 'तत्कालता',
      status: 'स्थिति',
      location: 'स्थान',
      aiSummary: 'AI सारांश',
      extractedText: 'निकाला गया टेक्स्ट (OCR)',
      noText: 'कोई टेक्स्ट नहीं निकाला गया',
      reportDetails: 'रिपोर्ट विवरण',
      reportedBy: 'रिपोर्ट करने वाला',
      timestamp: 'समय',
      coordinates: 'निर्देशांक',
      verifyReport: 'रिपोर्ट सत्यापित करें',
      rejectReport: 'अस्वीकार करें',
      anonymous: 'अज्ञात',
      na: 'उपलब्ध नहीं',
    },

    // === Status/Urgency Badges ===
    status: {
      pending: 'लंबित',
      processing: 'प्रक्रिया में',
      verified: 'सत्यापित',
      failed: 'विफल',
      rejected: 'अस्वीकृत',
    },
    urgency: {
      1: 'कम',
      2: 'मामूली',
      3: 'मध्यम',
      4: 'गंभीर',
      5: 'अत्यंत गंभीर',
    },

    // === Map ===
    map: {
      urgencyLegend: 'तत्कालता',
    },

    // === Volunteer Chat ===
    chat: {
      welcomeMsg: "नमस्ते! 👋 मैं आपका UpLift आपातकालीन समन्वयक हूं। मैं आपको कार्य खोजने और आपके क्षेत्र में आपदा राहत प्रयासों में सहायता करने के लिए यहाँ हूं।\n\nक्या आप इंदिरानगर, बेंगलुरु के पास हैं? मुझे अपना स्थान और कौशल बताएं, और मैं मिलान वाले कार्य ढूंढूंगा!",
      inputPlaceholder: 'अपना संदेश लिखें...',
      matchedTasks: 'मिलान किए गए कार्य',
      tasksFound: 'कार्य पास में मिले',
      askAi: 'कार्य खोजने के लिए AI से पूछें',
      emptyTasks: 'मिलान कार्य खोजने के लिए AI को अपना स्थान और कौशल बताएं',
      suggestion1: 'मैं पास में मदद करना चाहता हूं',
      suggestion2: 'इंदिरानगर में तत्काल कार्य दिखाएं',
      suggestion3: 'मैं डॉक्टर हूं, चिकित्सा कार्य चाहिए',
      suggestion4: 'मेरे पास कोई सफाई कार्य है?',
      suggestion5: 'किन कार्यों में स्वयंसेवकों की जरूरत है?',
    },

    // === SOS ===
    sos: {
      btnLabel: 'SOS',
      title: '🆘 आपातकालीन SOS',
      desc: 'अपने वर्तमान स्थान के साथ आपातकालीन अलर्ट भेजें। यह तुरंत तत्कालता 5 (अत्यंत गंभीर) रिपोर्ट बनाता है।',
      detecting: 'आपका स्थान पता लगा रहे हैं...',
      locationFound: 'स्थान का पता चला',
      locationFailed: 'स्थान का पता नहीं चला — डिफ़ॉल्ट क्षेत्र का उपयोग',
      descPlaceholder: 'आपातकाल का संक्षिप्त विवरण (वैकल्पिक)',
      sendAlert: 'आपातकालीन अलर्ट भेजें',
      sending: 'भेज रहे हैं...',
      sent: 'आपातकालीन अलर्ट भेजा गया! एनजीओ टीमों को सूचित किया गया है।',
      cancel: 'रद्द करें',
    },

    // === Toast Messages ===
    toast: {
      reportVerified: 'रिपोर्ट सत्यापित और लाइव मैप पर प्रकाशित',
      reportRejected: 'रिपोर्ट अस्वीकृत और कतार से हटाई गई',
      csvExported: 'रिपोर्ट CSV में सफलतापूर्वक निर्यात',
      sosAlert: 'आपातकालीन SOS अलर्ट भेजा गया!',
      langSwitch: 'भाषा हिन्दी में बदली गई',
    },

    // === Footer / Misc ===
    misc: {
      switchHint: 'रिपोर्ट सबमिशन से सत्यापन तक का प्रवाह देखने के लिए भूमिका बदलें',
      unknown: 'अज्ञात',
    },

    // === Categories ===
    categories: {
      'Flooding': 'बाढ़',
      'Building Collapse': 'भवन ढहना',
      'Road Damage': 'सड़क क्षति',
      'Power Outage': 'बिजली कटौती',
      'Water Contamination': 'जल प्रदूषण',
      'Fallen Tree': 'गिरा हुआ पेड़',
      'Gas Leak': 'गैस रिसाव',
      'Fire': 'आग',
      'Medical Emergency': 'चिकित्सा आपातकाल',
      'Other': 'अन्य',
    },
  }
};

export default translations;

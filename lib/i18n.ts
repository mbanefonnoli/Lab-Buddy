export type Locale = "en" | "es" | "fr";

export const LANGUAGES: { code: Locale; label: string; nativeLabel: string }[] = [
  { code: "en", label: "English", nativeLabel: "English" },
  { code: "es", label: "Spanish", nativeLabel: "Español" },
  { code: "fr", label: "French", nativeLabel: "Français" },
];

export const translations = {
  en: {
    nav: { home: "Home", results: "Results", chat: "Chat", settings: "Settings" },
    layout: { appName: "Lab Buddy", profile: "Profile" },
    home: {
      title: "Your Health Story, Simplified!",
      subtitle: "No scary words, just friendly facts.",
      newAnalysis: "New Analysis",
    },
    input: {
      uploadTitle: "Show me your report!",
      uploadSubtitle: "Tap or drag your file here",
      uploadTitleHasFile: "Got it! Need a change?",
      uploadSubtitleHasFile: "Tap to pick a different file",
      orPasteText: "Or Paste Text",
      placeholder: "Paste your lab report text here…",
      privacyNote: "Your secrets are safe!",
      clear: "Clear",
      analyze: "Magic Analysis",
      thinking: "Thinking...",
      fileError: "Failed to read file. Please try pasting the text manually.",
    },
    results: {
      analysisComplete: "Analysis Complete",
      yourHealthSummary: "Your Health Summary",
      flaggedItems: (count: number) =>
        `We found ${count} ${count === 1 ? "thing" : "things"} to look at together!`,
      everythingLooksWonderful: "Everything looks wonderful!",
      oopsieDaisy: "Oopsie Daisy!",
      errorDefault: "Our medical buddy got a bit confused. Mind trying that again?",
      tryAgain: "Try Again",
    },
    status: {
      normal: "Doing Great!",
      low: "A Bit Low",
      high: "A Bit High",
      critical: "Heads Up!",
    },
    resultsPage: {
      title: "No Results Yet!",
      subtitle: "Run your first analysis and your results will appear here.",
      cta: "Analyze a Report",
      tipLabel: "Pro Tip",
      tipText:
        "Upload a PDF or paste text from your lab report. Lab Buddy will explain every value in plain English — no medical degree needed!",
      savedLabel: "Last analyzed",
      clearResult: "Clear saved result",
      analyzeNew: "Analyze a new report",
    },
    chatPage: {
      title: "Ask Lab Buddy",
      subtitle: "Common questions, friendly answers.",
      comingSoon:
        "Live chat is coming soon! For now, browse our most asked questions below.",
      disclaimer:
        "These answers are for general information only. Always consult your healthcare provider for medical advice.",
      faq: [
        {
          q: "What is a normal blood sugar level?",
          a: "A fasting blood glucose of 70–100 mg/dL is considered normal for most adults.",
        },
        {
          q: "What does a high WBC count mean?",
          a: "A high white blood cell count can indicate your body is fighting an infection, inflammation, or other conditions. Your doctor can give you the full picture.",
        },
        {
          q: "Should I be worried about slightly high cholesterol?",
          a: "Mildly elevated cholesterol is common and often managed with diet and lifestyle changes. Discuss your specific numbers with your healthcare provider.",
        },
      ],
    },
    settingsPage: {
      title: "Settings",
      subtitle: "Manage your Lab Buddy experience.",
      notifications: "Notifications",
      notificationsOn: "On",
      notificationsOff: "Off",
      language: "Language",
      dataPrivacy: "Data & Privacy",
      viewPolicy: "View policy",
      appName: "Lab Buddy",
      version: "Version 1.0.0",
      aboutText:
        "Lab Buddy helps you understand your medical lab results in plain English. We use AI to explain each value — always with a reminder that this is not medical advice.",
      noDataStored:
        "Lab Buddy does not store your lab data. All processing happens in the moment.",
      languagePickerTitle: "Choose Language",
    },
  },

  es: {
    nav: { home: "Inicio", results: "Resultados", chat: "Chat", settings: "Ajustes" },
    layout: { appName: "Lab Buddy", profile: "Perfil" },
    home: {
      title: "¡Tu historia de salud, simplificada!",
      subtitle: "Sin palabras confusas, solo datos amigables.",
      newAnalysis: "Nuevo Análisis",
    },
    input: {
      uploadTitle: "¡Muéstrame tu informe!",
      uploadSubtitle: "Toca o arrastra tu archivo aquí",
      uploadTitleHasFile: "¡Listo! ¿Necesitas cambiarlo?",
      uploadSubtitleHasFile: "Toca para elegir otro archivo",
      orPasteText: "O Pega el Texto",
      placeholder: "Pega el texto de tu informe de laboratorio aquí…",
      privacyNote: "¡Tus secretos están seguros!",
      clear: "Limpiar",
      analyze: "Análisis Mágico",
      thinking: "Pensando...",
      fileError:
        "No se pudo leer el archivo. Intenta pegar el texto manualmente.",
    },
    results: {
      analysisComplete: "Análisis Completo",
      yourHealthSummary: "Tu Resumen de Salud",
      flaggedItems: (count: number) =>
        `¡Encontramos ${count} ${count === 1 ? "cosa" : "cosas"} para revisar juntos!`,
      everythingLooksWonderful: "¡Todo se ve maravilloso!",
      oopsieDaisy: "¡Ups!",
      errorDefault:
        "Nuestro asistente se confundió un poco. ¿Lo intentamos de nuevo?",
      tryAgain: "Intentar de Nuevo",
    },
    status: {
      normal: "¡Muy Bien!",
      low: "Un Poco Bajo",
      high: "Un Poco Alto",
      critical: "¡Atención!",
    },
    resultsPage: {
      title: "¡Sin Resultados Aún!",
      subtitle: "Haz tu primer análisis y tus resultados aparecerán aquí.",
      cta: "Analizar un Informe",
      tipLabel: "Consejo",
      tipText:
        "Sube un PDF o pega el texto de tu informe de laboratorio. Lab Buddy explicará cada valor en español simple — ¡sin necesidad de título médico!",
      savedLabel: "Último análisis",
      clearResult: "Borrar resultado guardado",
      analyzeNew: "Analizar un nuevo informe",
    },
    chatPage: {
      title: "Pregunta a Lab Buddy",
      subtitle: "Preguntas comunes, respuestas amigables.",
      comingSoon:
        "¡El chat en vivo llega pronto! Por ahora, explora nuestras preguntas más frecuentes.",
      disclaimer:
        "Estas respuestas son solo para información general. Siempre consulta a tu médico para asesoramiento médico.",
      faq: [
        {
          q: "¿Cuál es un nivel normal de azúcar en sangre?",
          a: "Una glucosa en ayunas de 70–100 mg/dL se considera normal para la mayoría de los adultos.",
        },
        {
          q: "¿Qué significa un conteo alto de glóbulos blancos?",
          a: "Un conteo alto de glóbulos blancos puede indicar que tu cuerpo está combatiendo una infección, inflamación u otras condiciones. Tu médico puede darte el panorama completo.",
        },
        {
          q: "¿Debo preocuparme por el colesterol ligeramente alto?",
          a: "El colesterol levemente elevado es común y a menudo se maneja con dieta y cambios de estilo de vida. Habla sobre tus números específicos con tu médico.",
        },
      ],
    },
    settingsPage: {
      title: "Ajustes",
      subtitle: "Gestiona tu experiencia en Lab Buddy.",
      notifications: "Notificaciones",
      notificationsOn: "Activadas",
      notificationsOff: "Desactivadas",
      language: "Idioma",
      dataPrivacy: "Datos y Privacidad",
      viewPolicy: "Ver política",
      appName: "Lab Buddy",
      version: "Versión 1.0.0",
      aboutText:
        "Lab Buddy te ayuda a entender tus resultados de laboratorio en español simple. Usamos IA para explicar cada valor, siempre recordándote que esto no es consejo médico.",
      noDataStored:
        "Lab Buddy no almacena tus datos de laboratorio. Todo el procesamiento ocurre en el momento.",
      languagePickerTitle: "Elegir Idioma",
    },
  },

  fr: {
    nav: { home: "Accueil", results: "Résultats", chat: "Chat", settings: "Réglages" },
    layout: { appName: "Lab Buddy", profile: "Profil" },
    home: {
      title: "Votre santé, simplifiée !",
      subtitle: "Pas de mots compliqués, juste des faits sympathiques.",
      newAnalysis: "Nouvelle Analyse",
    },
    input: {
      uploadTitle: "Montrez-moi votre rapport !",
      uploadSubtitle: "Appuyez ou déposez votre fichier ici",
      uploadTitleHasFile: "Reçu ! Besoin de changer ?",
      uploadSubtitleHasFile: "Appuyez pour choisir un autre fichier",
      orPasteText: "Ou Collez le Texte",
      placeholder: "Collez le texte de votre rapport de laboratoire ici…",
      privacyNote: "Vos secrets sont en sécurité !",
      clear: "Effacer",
      analyze: "Analyse Magique",
      thinking: "En train de réfléchir...",
      fileError:
        "Impossible de lire le fichier. Essayez de coller le texte manuellement.",
    },
    results: {
      analysisComplete: "Analyse Terminée",
      yourHealthSummary: "Votre Bilan de Santé",
      flaggedItems: (count: number) =>
        `Nous avons trouvé ${count} ${count === 1 ? "point" : "points"} à examiner ensemble !`,
      everythingLooksWonderful: "Tout semble merveilleux !",
      oopsieDaisy: "Oups !",
      errorDefault: "Notre assistant s'est un peu perdu. On réessaie ?",
      tryAgain: "Réessayer",
    },
    status: {
      normal: "Très Bien !",
      low: "Un Peu Bas",
      high: "Un Peu Élevé",
      critical: "Attention !",
    },
    resultsPage: {
      title: "Pas encore de résultats !",
      subtitle: "Effectuez votre première analyse et vos résultats apparaîtront ici.",
      cta: "Analyser un Rapport",
      tipLabel: "Conseil",
      tipText:
        "Importez un PDF ou collez le texte de votre rapport. Lab Buddy expliquera chaque valeur en français simple — aucun diplôme médical requis !",
      savedLabel: "Dernière analyse",
      clearResult: "Effacer le résultat sauvegardé",
      analyzeNew: "Analyser un nouveau rapport",
    },
    chatPage: {
      title: "Demandez à Lab Buddy",
      subtitle: "Questions courantes, réponses conviviales.",
      comingSoon:
        "Le chat en direct arrive bientôt ! Pour l'instant, parcourez nos questions les plus fréquentes.",
      disclaimer:
        "Ces réponses sont à titre informatif uniquement. Consultez toujours votre médecin pour des conseils médicaux.",
      faq: [
        {
          q: "Quel est un taux de glycémie normal ?",
          a: "Une glycémie à jeun de 70–100 mg/dL est considérée comme normale pour la plupart des adultes.",
        },
        {
          q: "Que signifie un nombre élevé de globules blancs ?",
          a: "Un nombre élevé de globules blancs peut indiquer que votre corps combat une infection, une inflammation ou d'autres conditions. Votre médecin peut vous donner une vue d'ensemble.",
        },
        {
          q: "Dois-je m'inquiéter d'un cholestérol légèrement élevé ?",
          a: "Un cholestérol légèrement élevé est courant et souvent géré par l'alimentation et des changements de mode de vie. Discutez de vos chiffres spécifiques avec votre médecin.",
        },
      ],
    },
    settingsPage: {
      title: "Réglages",
      subtitle: "Gérez votre expérience Lab Buddy.",
      notifications: "Notifications",
      notificationsOn: "Activées",
      notificationsOff: "Désactivées",
      language: "Langue",
      dataPrivacy: "Données & Confidentialité",
      viewPolicy: "Voir la politique",
      appName: "Lab Buddy",
      version: "Version 1.0.0",
      aboutText:
        "Lab Buddy vous aide à comprendre vos résultats de laboratoire en français simple. Nous utilisons l'IA pour expliquer chaque valeur — toujours avec un rappel que ce n'est pas un conseil médical.",
      noDataStored:
        "Lab Buddy ne stocke pas vos données de laboratoire. Tout le traitement se fait en temps réel.",
      languagePickerTitle: "Choisir la langue",
    },
  },
} as const;

export type Translations = typeof translations.en;

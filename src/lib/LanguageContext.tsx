import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (path: string) => string;
}

const translations: Record<Language, Record<string, any>> = {
  en: {
    common: {
      backToHome: "Back to Home",
      version: "VERSION 1.2.0",
      noRisk: "NO RISK | NO DEPOSIT | PURE COGNITIVE REFLEX PRACTICE",
      educationalSimulator: "EDUCATIONAL SIMULATOR | MATHEMATICAL HILO PRACTICE | NO REAL MONEY CONVERSIONS",
      back: "Back",
      allRights: "ALL RIGHTS RESERVED"
    },
    home: {
      title: "BLACKJACK CARD COUNTER",
      trainer: "TRAINER",
      heroTitle: "Practice Blackjack Card Counting Online",
      subtitle: "Free browser-based trainer supporting Hi-Lo practice, True Count drills and realistic casino shoe simulations.",
      countTrainerTitle: "COUNT TRAINER",
      countTrainerDesc: "Fast-paced card counting drills focused on running count accuracy, deck estimation conversions, and custom table speed calibration.",
      bullet1: "Running & True Counts",
      bullet2: "Standard & Shoe Modes",
      bullet3: "Custom Seat Bots",
      launchTrainer: "Launch Trainer",
      casinoSimulationTitle: "CASINO SIMULATION",
      casinoSimulationDesc: "Interactive real-world table mode with manual gameplay, custom bets, split gestures, and virtual bankroll analytics.",
      bulletC1: "Manual Play Decisions",
      bulletC2: "Betting Systems",
      bulletC3: "Bankroll Tracking",
      comingSoon: "Coming Soon",
      feedback: "Feedback",
      howToCount: "How to Count",
      about: "About",
      github: "GitHub"
    },
    about: {
      title: "About Us",
      desc: "Understand our platform, our terms of usage, and the core principles of responsible training.",
      theAppTitle: "Our Platform",
      theAppDesc: "This platform is a state-of-the-art mental gym built to simulate blackjack action in real-time. By managing computer players, simulating deck penetration, and requiring mathematical feedback of the count, the software is purely a cognitive training system. There is no gambling, no real money wagering, and no deposit mechanics.",
      termsTitle: "Terms of Use",
      termsDesc: "By using this platform, you agree that it is provided strictly for educational, cognitive, and analytical purposes. You assume full personal responsibility for how you utilize these mathematical concepts. We do not endorse, facilitate, or promote real-money gaming or casino betting.",
      responsiblePractice: "Responsible Practice",
      responsibleSubtitle: "Card counting is a mental discipline, not a shortcut to wealth.",
      responsibleP1: "Card counting is a mathematical concept based on tracking the ratio of high-to-low cards left in the dealer's shoe. While this simulator is an exceptional aid to sharpen your focus, speed, and accuracy, success in real-world scenarios requires extensive practice, continuous discipline, and high personal responsibility.",
      responsibleP2: "Having theoretical knowledge is not enough. Maintaining focus under loud, high-pressure environments requires hundreds of hours of manual training. More importantly, statistical variance means no mathematical strategy guarantees short-term positive outcomes.",
      responsibleP3: "We urge all practitioners to treat card counting solely as an intellectual and cognitive exercise. Never wager money you cannot afford to lose, play responsibly, and respect local regulations and casino policies at all times.",
      launchPractice: "Launch Practice"
    },
    howToCount: {
      title: "How to Count Cards",
      desc: "Master the mathematics of blackjack. Learn the standard Hi-Lo system, convert to True Count, and gain a statistical edge.",
      hiloStrategyTitle: "1. The Hi-Lo Strategy",
      hiloStrategyDesc: "Card counting is a system used to track the ratio of high cards to low cards remaining in the deck. The most common and effective method is the Hi-Lo System. Instead of memorizing every card, you assign a value to three distinct card groupings:",
      lowCards: "Low Cards",
      lowCardsDesc: "Low cards favor the dealer. When they leave, the deck gets better for you.",
      middleCards: "Middle Cards",
      middleCardsDesc: "Neutral cards do not shift the player's mathematical margins.",
      highCards: "High Cards",
      highCardsDesc: "High cards favor the player. When they leave, the deck gets worse for you.",
      runningCountTitle: "2. The Running Count",
      runningCountDesc: "When a fresh shoe is shuffled, you start your count at 0. As each card is dealt, you add or subtract its designated value to maintain a continuous sum. This sum is known as your Running Count.",
      exampleSequence: "Example Round Sequence:",
      freshShoe: "Fresh Shoe:",
      runningCountLabel: "Running Count:",
      runningCountFootnote: "A high positive running count indicates that many low cards have already been dealt, meaning there is a higher density of 10s and Aces left in the shoe waiting to be dealt.",
      trueCountTitle: "3. Converting to True Count",
      trueCountDesc: "In single-deck blackjack, the running count is directly actionable. However, modern casino tables use multi-deck shoes (usually 6 or 8 decks). A running count of +6 with 5 decks left is much less powerful than a +6 with only 1 deck left.",
      trueCountDesc2: "To normalize your calculation, you must divide your Running Count by the number of remaining decks in the shoe. This yields the True Count:",
      formulaLabel: "Standard Mathematical Conversion formula",
      scenarioATitle: "Scenario A: Decks in Shoe",
      scenarioAText: "Running count is +8, and 4 decks remain out of a 6-deck shoe.",
      scenarioBTitle: "Scenario B: High Penetration",
      scenarioBText: "Running count is +8, and only 1 deck remains in the shoe.",
      scenarioFootnote: "Notice how Scenario B represents an extremely favorable state with a highly concentrated set of remaining high cards, whereas Scenario A is only moderately positive.",
      strategyTitle: "4. Strategy and Betting Ramp",
      strategyDesc: "The primary purpose of keeping the True Count is to adapt your bet sizing and gameplay strategy:",
      strategyBullet1: "True Count <= +1: The casino retains the mathematical edge. You should play the table minimum (e.g., 1 unit) to protect your bankroll.",
      strategyBullet2: "True Count >= +2: The advantage shifts in your favor. As the True Count grows, increase your bet proportionally (e.g., 2 units at +2, 4 units at +3, 8 units at +4+).",
      strategyBullet3: "Gameplay Deviations: Players who master advanced index numbers will also modify standard Basic Strategy plays (such as insurance, double-downs, or splitting) as the count moves into deep positive or negative states.",
      startTraining: "Start Training Session"
    },
    casino: {
      back: "Back to Home",
      coming: "COMING",
      soon: "SOON",
      title: "COMING",
      titleSoon: "SOON",
      desc: "The ultimate training playground. Designed to simulate the actual pressure of a real blackjack table, where every decision counts.",
      trainerModeTitle: "Trainer Mode",
      trainerModeCard: "Trainer Mode",
      trainerModeDesc: "Count Speed Training: Purely focused on training your mental agility and visual reflexes. It helps you memorize card values rapidly without the distraction of playing decisions, perfect for building speed and muscle memory.",
      casinoModeTitle: "Casino Mode",
      casinoModeCard: "Casino Mode",
      casinoModeDesc: "Realistic & Simultaneous Practice: A mode where you can play blackjack hands, count cards, and wager fictitiously all at once. At the same time, you must adhere to basic strategy guidelines under changing game situations. The goal is to master all 4 core actions simultaneously: counting, playing, betting, and making perfect choices under realistic pressure.",
      fictionalBetting: "Fictional Betting",
      fictionalBettingDesc: "Practice sizing your bets fictitiously based on the True Count to manage your virtual bankroll and simulate real advantage-play returns.",
      basicStrategy: "Basic Strategy",
      basicStrategyDesc: "Make Hit, Stand, Double, Split, or Surrender decisions and get instant verification according to the mathematically optimal basic strategy.",
      complexHands: "Complex Hands",
      complexHandsDesc: "Train specifically on difficult scenarios including soft totals (Soft Hands) and pair splitting where most strategy errors typically occur.",
      road1Title: "Fictional Betting",
      road1Desc: "Practice sizing your bets fictitiously based on the True Count to manage your virtual bankroll and simulate real advantage-play returns.",
      road2Title: "Basic Strategy",
      road2Desc: "Make Hit, Stand, Double, Split, or Surrender decisions and get instant verification according to the mathematically optimal basic strategy.",
      road3Title: "Complex Hands",
      road3Desc: "Train specifically on difficult scenarios including soft totals (Soft Hands) and pair splitting where most strategy errors typically occur.",
      alertTitle: "UNDER ACTIVE DEVELOPMENT",
      alertDesc: "The full multi-seat casino engine is being built with real-time hand dealing, custom bet spreads, and basic strategy feedback. In the meantime, use the Count Trainer to master your speed.",
      ctaTrainer: "Launch Count Trainer",
      ctaBack: "Return to Home"
    },
    trainer: {
      title: "Card",
      titleCounter: "Counter",
      accuracy: "Accuracy",
      round: "Round",
      pace: "Pace",
      players: "Players",
      systemTitle: "CARD COUNTING SYSTEM",
      systemMode: "MODE",
      exitTitle: "Are you sure you want to leave?",
      exitDesc: "If you leave now, you will lose your current training session progress.",
      exitNo: "No, Keep Training",
      exitYes: "Yes, Exit",
      submitCountTitle: "Mental Checkpoint",
      submitCountDesc: "Determine the accumulated running count passing across the felt.",
      inputCountPlaceholder: "Enter running count...",
      submitButton: "Verify Count",
      incorrectTitle: "Incorrect Count",
      incorrectP1: "Your entered count of",
      incorrectP2: "was incorrect.",
      incorrectP3: "The correct Running Count was",
      incorrectP4: "and the True Count was",
      incorrectP5: "remaining decks",
      incorrectFoot: "We've synced your running count to the correct value so you can continue training.",
      continueButton: "Continue Session",
      correctTitle: "Perfect Count!",
      correctDesc: "Your mental running count is 100% accurate. Keep pushing your speed limits.",
      depletedTitle: "Shoe Depleted",
      depletedDesc: "All decks have been successfully dealt. Excellent endurance practice.",
      resetButton: "Reshuffle Shoe",
      settingsTitle: "Trainer Settings",
      settingsDesc: "Calibrate simulation complexity and speed",
      settingsDecks: "Number of Decks",
      settingsMode: "Practice Mode",
      modeStandard: "Standard (One-Round Check)",
      modeAdvanced: "Advanced Shoe Penetration",
      modeStandardDesc: "Ask for the count after each round. Best for beginners.",
      modeAdvancedDesc: "Keep counting multiple consecutive rounds without knowing the count. Best for endurance.",
      settingsPlayers: "Active Spot Players",
      settingsSpeed: "Dealing Pace (ms per card)",
      settingsSpeedFast: "Fast",
      settingsSpeedMedium: "Medium",
      settingsSpeedSlow: "Slow",
      settingsApply: "Apply Settings",
      settingsCancel: "Close",
      payoutLabel: "Blackjack Pays 3 To 2",
      dealerRule: "Dealer must draw to 16 and stand on all 17s",
      insuranceLabel: "Insurance Pays 2 To 1"
    },
    feedback: {
      title: "Developer Feedback",
      subtitle: "Improve the App",
      category: "Feedback Category",
      suggestion: "Suggestion",
      bugReport: "Bug Report",
      praise: "Praise",
      other: "Other",
      rateTitle: "Rate Card Counter Trainer",
      messageTitle: "Your Message",
      placeholder: "Comment on your training experience or suggest features...",
      cancel: "Cancel",
      submit: "Submit Feedback",
      cataloged: "Feedback Cataloged!",
      successDesc: "Thank you! Your suggestion is processed in our backlog under",
      close: "Close Menu",
      writeMore: "Write More"
    }
  },
  es: {
    common: {
      backToHome: "Volver al Inicio",
      version: "VERSIÓN 1.2.0",
      noRisk: "SIN RIESGO | SIN DEPÓSITO | PRÁCTICA DE REFLEJOS COGNITIVOS",
      educationalSimulator: "SIMULADOR EDUCATIVO | PRÁCTICA MATEMÁTICA HILO | SIN TRANSACCIONES DE DINERO REAL",
      back: "Atrás",
      allRights: "TODOS LOS DERECHOS RESERVADOS"
    },
    home: {
      title: "BLACKJACK CARD COUNTER",
      trainer: "TRAINER",
      heroTitle: "Practica el Conteo de Cartas de Blackjack en Línea",
      subtitle: "Entrenador web gratuito con práctica de Hi-Lo, simulaciones reales de zapatos de casino y ejercicios de conteo real.",
      countTrainerTitle: "ENTRENADOR DE CONTEO",
      countTrainerDesc: "Ejercicios de conteo de cartas de ritmo rápido enfocados en precisión del conteo real, conversiones de estimación de barajas y calibración de velocidad.",
      bullet1: "Conteo Corriente y Real",
      bullet2: "Modos Estándar y de Zapato",
      bullet3: "Bots de Asiento Personalizados",
      launchTrainer: "Iniciar Entrenador",
      casinoSimulationTitle: "SIMULACIÓN DE CASINO",
      casinoSimulationDesc: "Modo interactivo de mesa real con jugabilidad manual, apuestas personalizadas, gestos de división y análisis de fondos virtuales.",
      bulletC1: "Decisiones de Juego Manuales",
      bulletC2: "Sistemas de Apuestas",
      bulletC3: "Seguimiento de Fondos",
      comingSoon: "Próximamente",
      feedback: "Comentarios",
      howToCount: "Cómo Contar",
      about: "Acerca de",
      github: "GitHub"
    },
    about: {
      title: "Acerca de Nosotros",
      desc: "Entiende nuestra plataforma, nuestros términos de uso y los principios fundamentales de la práctica responsable.",
      theAppTitle: "Nuestra Plataforma",
      theAppDesc: "Esta plataforma es un gimnasio mental de última generación diseñado para simular la acción del blackjack en tiempo real. Al gestionar jugadores controlados por computadora, simular la penetración de barajas y requerir retroalimentación matemática del conteo, el software es puramente un sistema de entrenamiento cognitivo. No hay apuestas con dinero real ni mecanismos de depósito.",
      termsTitle: "Términos de Uso",
      termsDesc: "Al utilizar esta plataforma, aceptas que se proporciona estrictamente para fines educativos, cognitivos y analíticos. Asumes la plena responsabilidad personal sobre cómo utilizas estos conceptos matemáticos. No respaldamos, facilitamos ni promovemos el juego con dinero real o las apuestas en casinos.",
      responsiblePractice: "Práctica Responsable",
      responsibleSubtitle: "El conteo de cartas es una disciplina mental, no un atajo hacia la riqueza.",
      responsibleP1: "El conteo de cartas es un concepto matemático basado en el seguimiento de la proporción de cartas altas y bajas que quedan en el zapato del crupier. Si bien este simulador es una ayuda excepcional para afinar tu enfoque, velocidad y precisión, el éxito en el mundo real requiere práctica constante, disciplina continua y una gran responsabilidad personal.",
      responsibleP2: "Tener conocimiento teórico no es suficiente. Mantener la concentración bajo entornos ruidosos y de alta presión requiere cientos de horas de entrenamiento. Lo más importante es que la varianza estadística significa que ninguna estrategia matemática garantiza resultados positivos a corto plazo.",
      responsibleP3: "Instamos a todos los practicantes a tratar el conteo de cartas únicamente como un ejercicio intelectual y cognitivo. Nunca apuestes dinero que no puedas permitirte perder, juega de manera responsable y respeta siempre las regulaciones locales y políticas de los casinos.",
      launchPractice: "Iniciar Práctica"
    },
    howToCount: {
      title: "Cómo Contar Cartas",
      desc: "Domina las matemáticas del blackjack. Aprende el sistema estándar Hi-Lo, convierte al conteo real y obtén una ventaja estadística.",
      hiloStrategyTitle: "1. La Estrategia Hi-Lo",
      hiloStrategyDesc: "El conteo de cartas es un sistema utilizado para rastrear la proporción de cartas altas y bajas que quedan en la baraja. El método más común y efectivo es el sistema Hi-Lo. En lugar de memorizar cada carta, asignas un valor a tres grupos de cartas distintos:",
      lowCards: "Cartas Bajas",
      lowCardsDesc: "Las cartas bajas favorecen al crupier. Cuando se van, la baraja mejora para ti.",
      middleCards: "Cartas Medias",
      middleCardsDesc: "Las cartas neutrales no alteran los márgenes matemáticos del jugador.",
      highCards: "Cartas Altas",
      highCardsDesc: "Las cartas altas favorecen al jugador. Cuando se van, la baraja empeora para ti.",
      runningCountTitle: "2. El Conteo Corriente",
      runningCountDesc: "Cuando se baraja un zapato nuevo, comienzas tu conteo en 0. A medida que se reparte cada carta, sumas o restas su valor designado para mantener una suma continua. Esta suma se conoce como Conteo Corriente.",
      exampleSequence: "Secuencia de Ronda de Ejemplo:",
      freshShoe: "Zapato Nuevo:",
      runningCountLabel: "Conteo Corriente:",
      runningCountFootnote: "Un conteo corriente positivo alto indica que ya se han repartido muchas cartas bajas, lo que significa que queda una mayor densidad de cartas de valor 10 y Ases en el zapato listos para ser repartidos.",
      trueCountTitle: "3. Conversión al Conteo Real",
      trueCountDesc: "En el blackjack de una sola baraja, el conteo corriente es directamente aplicable. Sin embargo, las mesas de casino modernas usan zapatos de múltiples barajas (normalmente 6 u 8). Un conteo corriente de +6 con 5 barajas restantes es mucho menos poderoso que un +6 con solo 1 baraja restante.",
      trueCountDesc2: "Para normalizar tu cálculo, debes dividir tu Conteo Corriente por el número de barajas restantes en el zapato. Esto produce el Conteo Real:",
      formulaLabel: "Fórmula estándar de conversión matemática",
      scenarioATitle: "Escenario A: Barajas en el Zapato",
      scenarioAText: "El conteo corriente es +8, y quedan 4 barajas de un zapato de 6 barajas.",
      scenarioBTitle: "Escenario B: Alta Penetración",
      scenarioBText: "El conteo corriente es +8, y solo queda 1 baraja en el zapato.",
      scenarioFootnote: "Nota cómo el Escenario B representa un estado extremadamente favorable con un conjunto muy concentrado de cartas altas restantes, mientras que el Escenario A es solo moderadamente positivo.",
      strategyTitle: "4. Estrategia y Rampa de Apuestas",
      strategyDesc: "El propósito principal de llevar el Conteo Real es adaptar el tamaño de tus apuestas y tu estrategia de juego:",
      strategyBullet1: "Conteo Real <= +1: El casino conserva la ventaja matemática. Debes jugar el mínimo de la mesa (ej. 1 unidad) para proteger tu capital.",
      strategyBullet2: "Conteo Real >= +2: La ventaja se inclina a tu favor. A medida que el Conteo Real crece, aumenta tu apuesta proporcionalmente (ej. 2 unidades con +2, 4 unidades con +3, 8 unidades con +4+).",
      strategyBullet3: "Desviaciones de juego: Los jugadores que dominan los números índice avanzados también modificarán las jugadas estándar de Estrategia Básica (como seguros, doblar apuestas o dividir) a medida que el conteo se mueva a estados muy positivos o negativos.",
      startTraining: "Comenzar Práctica"
    },
    casino: {
      back: "Volver al Inicio",
      coming: "PRÓXIMAMENTE",
      soon: "MODO CASINO",
      title: "PRÓXIMAMENTE",
      titleSoon: "",
      desc: "El campo de entrenamiento definitivo. Diseñado para simular la presión real de una mesa de juego real, donde cada decisión cuenta.",
      trainerModeTitle: "Modo Entrenador",
      trainerModeCard: "Modo Entrenador",
      trainerModeDesc: "Entrenamiento de Velocidad de Conteo: Enfocado puramente en entrenar la agilidad mental y los reflejos visuales. Te ayuda a memorizar los valores del conteo de cartas rápidamente y sin distracciones de juego, perfeccionando tu precisión a altas velocidades de reparto de cartas.",
      casinoModeTitle: "Modo Casino",
      casinoModeCard: "Modo Casino",
      casinoModeDesc: "Práctica Realista y Simultánea: Un modo donde puedes jugar a contar cartas mientras apuestas de manera ficticia. Al mismo tiempo, debes aplicar la estrategia básica en tiempo real según la dificultad de tus manos. El objetivo es dominar las 4 acciones clave simultáneamente: contar, jugar, apostar y tomar decisiones perfectas bajo escenarios de juego realistas.",
      fictionalBetting: "Apuestas Ficticias",
      fictionalBettingDesc: "Practica el dimensionamiento de apuestas de manera ficticia según el conteo real (True Count) para gestionar tu bankroll virtual y simular ganancias reales.",
      basicStrategy: "Estrategia Básica",
      basicStrategyDesc: "Toma decisiones de Hit, Stand, Double, Split o Surrender y recibe validación instantánea de acuerdo a la estrategia básica óptima para cada mano.",
      complexHands: "Manos Complejas",
      complexHandsDesc: "Entrena bajo escenarios de alta dificultad con manos 'suaves' (Soft Hands) y divisiones de pares donde se cometen la mayoría de los errores.",
      road1Title: "Apuestas Ficticias",
      road1Desc: "Practica el dimensionamiento de apuestas de manera ficticia según el conteo real (True Count) para gestionar tu bankroll virtual y simular ganancias reales.",
      road2Title: "Estrategia Básica",
      road2Desc: "Toma decisiones de Hit, Stand, Double, Split o Surrender y recibe validación instantánea de acuerdo a la estrategia básica óptima para cada mano.",
      road3Title: "Manos Complejas",
      road3Desc: "Entrena bajo escenarios de alta dificultad con manos 'suaves' (Soft Hands) y divisiones de pares donde se cometen la mayoría de los errores.",
      alertTitle: "EN DESARROLLO ACTIVO",
      alertDesc: "El motor completo de casino multiasiento se está construyendo con reparto de manos en tiempo real, gestión de apuestas y validación de estrategia. Mientras tanto, utiliza el Entrenador de Conteo para dominar tu velocidad.",
      ctaTrainer: "Iniciar Entrenador de Conteo",
      ctaBack: "Volver al Inicio"
    },
    trainer: {
      title: "Contador",
      titleCounter: "de Cartas",
      accuracy: "Precisión",
      round: "Ronda",
      pace: "Paso",
      players: "Jugadores",
      systemTitle: "SISTEMA DE CONTEO DE CARTAS",
      systemMode: "MODO",
      exitTitle: "¿Estás seguro de que deseas salir?",
      exitDesc: "Si sales ahora, perderás todo el progreso de tu sesión de entrenamiento actual.",
      exitNo: "No, seguir entrenando",
      exitYes: "Sí, salir",
      submitCountTitle: "Punto de Control Mental",
      submitCountDesc: "Determina el conteo corriente acumulado de las cartas repartidas.",
      inputCountPlaceholder: "Ingresa el conteo corriente...",
      submitButton: "Verificar Conteo",
      incorrectTitle: "Conteo Incorrecto",
      incorrectP1: "Tu conteo de",
      incorrectP2: "fue incorrecto.",
      incorrectP3: "El Conteo Corriente correcto era",
      incorrectP4: "y el Conteo Real era",
      incorrectP5: "barajas restantes",
      incorrectFoot: "Hemos sincronizado tu conteo corriente al valor correcto para que puedas continuar con la sesión.",
      continueButton: "Continuar Sesión",
      correctTitle: "¡Conteo Perfecto!",
      correctDesc: "Tu conteo corriente mental es 100% preciso. Sigue superando tus límites de velocidad.",
      depletedTitle: "Zapato Agotado",
      depletedDesc: "Todas las barajas han sido repartidas con éxito. Excelente práctica de resistencia.",
      resetButton: "Rebarajar Zapato",
      settingsTitle: "Ajustes del Entrenador",
      settingsDesc: "Calibrar la complejidad y velocidad de la simulación",
      settingsDecks: "Número de Barajas",
      settingsMode: "Modo de Práctica",
      modeStandard: "Estándar (Verificación de una Ronda)",
      modeAdvanced: "Penetración de Zapato Avanzada",
      modeStandardDesc: "Pide el conteo después de cada ronda. Ideal para principiantes.",
      modeAdvancedDesc: "Sigue contando múltiples rondas consecutivas sin saber el conteo. Ideal para resistencia.",
      settingsPlayers: "Jugadores Activos",
      settingsSpeed: "Ritmo de Reparto (ms por carta)",
      settingsSpeedFast: "Rápido",
      settingsSpeedMedium: "Medio",
      settingsSpeedSlow: "Lento",
      settingsApply: "Aplicar Ajustes",
      settingsCancel: "Cerrar",
      payoutLabel: "El Blackjack Paga 3 a 2",
      dealerRule: "Crupier debe pedir con 16 y plantarse con todos los 17",
      insuranceLabel: "Seguro Paga 2 a 1"
    },
    feedback: {
      title: "Comentarios del Desarrollador",
      subtitle: "Mejora la Aplicación",
      category: "Categoría",
      suggestion: "Sugerencia",
      bugReport: "Reporte de Error",
      praise: "Elogios",
      other: "Otro",
      rateTitle: "Califica el Entrenador",
      messageTitle: "Tu Mensaje",
      placeholder: "Comenta sobre tu experiencia de entrenamiento o sugiere nuevas funciones...",
      cancel: "Cancelar",
      submit: "Enviar Comentarios",
      cataloged: "¡Comentario Registrado!",
      successDesc: "¡Muchas gracias! Tu sugerencia se ha guardado en nuestro backlog bajo la categoría",
      close: "Cerrar Menú",
      writeMore: "Escribir Más"
    }
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('blackjack_trainer_lang');
    return (saved === 'es' || saved === 'en') ? saved : 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('blackjack_trainer_lang', lang);
  };

  const t = (path: string): string => {
    const keys = path.split('.');
    let value: any = translations[language];
    for (const key of keys) {
      if (value && typeof value === 'object' && key in value) {
        value = value[key];
      } else {
        return path;
      }
    }
    return typeof value === 'string' ? value : path;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

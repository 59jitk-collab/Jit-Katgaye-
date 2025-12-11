import { Question, QuestionType, Flashcard, ChapterNote, Activity } from './types';

// Class 10 Subjects
export const SUBJECTS = ['Science', 'Mathematics', 'Social Science', 'English'];

export const MOCK_QUESTIONS: Question[] = [
  // --- Science: Chemical Reactions ---
  {
    id: 'sci-chem-1',
    text: 'When magnesium ribbon is burnt in air, the ash formed is:',
    type: QuestionType.MCQ,
    options: ['Black', 'White', 'Yellow', 'Pink'],
    correctAnswer: 1,
    explanation: 'Magnesium burns in oxygen to form Magnesium Oxide (MgO), which is a white powder.',
    subject: 'Science',
    chapter: 'Chemical Reactions and Equations',
    year: 2023,
    isPYQ: true,
    difficulty: 'Easy',
    tags: ['Chemistry', 'NCERT Activity']
  },
  {
    id: 'sci-chem-2',
    text: 'Fe2O3 + 2Al -> Al2O3 + 2Fe. This reaction is an example of:',
    type: QuestionType.MCQ,
    options: ['Combination reaction', 'Double displacement reaction', 'Decomposition reaction', 'Displacement reaction'],
    correctAnswer: 3,
    explanation: 'Aluminum is more reactive than Iron, so it displaces Iron from its oxide. This is a displacement reaction.',
    subject: 'Science',
    chapter: 'Chemical Reactions and Equations',
    year: 2020,
    isPYQ: true,
    difficulty: 'Medium',
    tags: ['Chemistry']
  },

  // --- Science: Life Processes ---
  {
    id: 'sci-bio-1',
    text: 'The kidneys in human beings are a part of the system for:',
    type: QuestionType.MCQ,
    options: ['Nutrition', 'Respiration', 'Excretion', 'Transportation'],
    correctAnswer: 2,
    explanation: 'Kidneys filter blood to remove nitrogenous waste (urea), forming urine. This is the excretion system.',
    subject: 'Science',
    chapter: 'Life Processes',
    year: 2019,
    isPYQ: true,
    difficulty: 'Easy',
    tags: ['Biology']
  },
  {
    id: 'sci-bio-2',
    text: 'Assertion(A): The opening and closing of the pore is a function of the guard cells. Reason(R): Stomatal pores are the site for exchange of gases by diffusion.',
    type: QuestionType.CBQ,
    options: ['Both A and R are true and R is correct explanation', 'Both A and R are true but R is NOT correct explanation', 'A is true but R is false', 'A is false but R is true'],
    correctAnswer: 1,
    explanation: 'Both statements are true. However, R explains WHAT stomata do, not HOW guard cells open them (which is via turgor pressure changes). So R is NOT the correct explanation for A.',
    subject: 'Science',
    chapter: 'Life Processes',
    year: 2022,
    isSQP: true,
    difficulty: 'Hard',
    tags: ['Biology', 'Reasoning']
  },

  // --- Science: Light ---
  {
    id: 'sci-phy-1',
    text: 'Where should an object be placed in front of a convex lens to get a real image of the size of the object?',
    type: QuestionType.MCQ,
    options: ['At the principal focus of the lens', 'At twice the focal length', 'At infinity', 'Between the optical centre and principal focus'],
    correctAnswer: 1,
    explanation: 'For a convex lens, placing the object at 2F (twice focal length) produces a real, inverted image of the same size at 2F on the other side.',
    subject: 'Science',
    chapter: 'Light - Reflection and Refraction',
    year: 2018,
    isPYQ: true,
    difficulty: 'Medium',
    tags: ['Physics', 'Light']
  },

  // --- Mathematics: Trigonometry ---
  {
    id: 'math-trig-1',
    text: 'If sin A = 3/4, calculate cos A.',
    type: QuestionType.MCQ,
    options: ['4/3', '√7/4', '3/√7', '√7/3'],
    correctAnswer: 1,
    explanation: 'sin A = P/H = 3/4. By Pythagoras, B = √(4^2 - 3^2) = √(16-9) = √7. cos A = B/H = √7/4.',
    subject: 'Mathematics',
    chapter: 'Introduction to Trigonometry',
    year: 2021,
    isPYQ: true,
    difficulty: 'Medium',
    tags: ['Trigonometry']
  },
  {
    id: 'math-trig-2',
    text: 'The value of (sin 30° + cos 30°) - (sin 60° + cos 60°) is:',
    type: QuestionType.MCQ,
    options: ['-1', '0', '1', '2'],
    correctAnswer: 1,
    explanation: 'sin 30 = 1/2, cos 30 = √3/2. sin 60 = √3/2, cos 60 = 1/2. The terms cancel out perfectly to 0.',
    subject: 'Mathematics',
    chapter: 'Introduction to Trigonometry',
    year: 2023,
    isPYQ: true,
    difficulty: 'Easy',
    tags: ['Trigonometry']
  },

  // --- Mathematics: AP ---
  {
    id: 'math-ap-1',
    text: 'The 10th term of the AP: 5, 8, 11, 14, ... is:',
    type: QuestionType.MCQ,
    options: ['32', '35', '38', '185'],
    correctAnswer: 0,
    explanation: 'a=5, d=3. an = a + (n-1)d. a10 = 5 + (9)*3 = 5 + 27 = 32.',
    subject: 'Mathematics',
    chapter: 'Arithmetic Progressions',
    year: 2020,
    isPYQ: true,
    difficulty: 'Easy',
    tags: ['Algebra']
  },

  // --- Social Science ---
  {
    id: 'sst-hist-1',
    text: 'Who remarked "When France sneezes, the rest of Europe catches cold"?',
    type: QuestionType.MCQ,
    options: ['Giuseppe Mazzini', 'Metternich', 'Otto von Bismarck', 'Napoleon'],
    correctAnswer: 1,
    explanation: 'Duke Metternich, the Austrian Chancellor, made this remark about the influence of French political events on Europe.',
    subject: 'Social Science',
    chapter: 'The Rise of Nationalism in Europe',
    year: 2022,
    isPYQ: true,
    difficulty: 'Easy',
    tags: ['History']
  },
  {
    id: 'sst-geo-1',
    text: 'Which one of the following is a Rabi crop?',
    type: QuestionType.MCQ,
    options: ['Rice', 'Millets', 'Gram', 'Cotton'],
    correctAnswer: 2,
    explanation: 'Gram (Chickpea) is a Rabi crop sown in winter. Rice, Millets, and Cotton are Kharif crops.',
    subject: 'Social Science',
    chapter: 'Agriculture',
    year: 2021,
    isPYQ: true,
    difficulty: 'Medium',
    tags: ['Geography']
  }
];

export const MOCK_FLASHCARDS: Flashcard[] = [
  { id: '1', front: 'Ohm\'s Law Formula', back: 'V = IR (Voltage = Current × Resistance)', masteryLevel: 4 },
  { id: '2', front: 'Powerhouse of the Cell', back: 'Mitochondria (Site of ATP production)', masteryLevel: 5 },
  { id: '3', front: 'Quadratic Formula', back: 'x = [-b ± √(b² - 4ac)] / 2a', masteryLevel: 2 },
  { id: '4', front: 'Swaraj meant...', back: 'Self-rule', masteryLevel: 3 },
  { id: '5', front: 'Xylem function', back: 'Transport of water and minerals from roots to leaves.', masteryLevel: 4 },
  { id: '6', front: 'Mirror Formula', back: '1/v + 1/u = 1/f', masteryLevel: 1 },
  { id: '7', front: 'Baking Soda Formula', back: 'NaHCO3 (Sodium Hydrogen Carbonate)', masteryLevel: 3 },
  { id: '8', front: 'Federalism', back: 'A system of government in which power is divided between a central authority and constituent units.', masteryLevel: 2 },
];

export const MOCK_CHAPTER_NOTES: ChapterNote[] = [
  // Science
  { id: 'sci-1', subject: 'Science', chapterName: 'Chemical Reactions and Equations', content: '', readTime: '15 min' },
  { id: 'sci-2', subject: 'Science', chapterName: 'Acids, Bases and Salts', content: '', readTime: '18 min' },
  { id: 'sci-3', subject: 'Science', chapterName: 'Metals and Non-metals', content: '', readTime: '20 min' },
  { id: 'sci-4', subject: 'Science', chapterName: 'Life Processes', content: '', readTime: '25 min' },
  { id: 'sci-5', subject: 'Science', chapterName: 'Light - Reflection and Refraction', content: '', readTime: '22 min' },
  { id: 'sci-6', subject: 'Science', chapterName: 'Electricity', content: '', readTime: '20 min' },
  
  // Math
  { id: 'math-1', subject: 'Mathematics', chapterName: 'Real Numbers', content: '', readTime: '10 min' },
  { id: 'math-2', subject: 'Mathematics', chapterName: 'Polynomials', content: '', readTime: '12 min' },
  { id: 'math-3', subject: 'Mathematics', chapterName: 'Pair of Linear Equations', content: '', readTime: '15 min' },
  { id: 'math-4', subject: 'Mathematics', chapterName: 'Quadratic Equations', content: '', readTime: '15 min' },
  { id: 'math-5', subject: 'Mathematics', chapterName: 'Arithmetic Progressions', content: '', readTime: '12 min' },
  { id: 'math-6', subject: 'Mathematics', chapterName: 'Introduction to Trigonometry', content: '', readTime: '25 min' },
  
  // SST
  { id: 'sst-1', subject: 'Social Science', chapterName: 'The Rise of Nationalism in Europe', content: '', readTime: '20 min' },
  { id: 'sst-2', subject: 'Social Science', chapterName: 'Resources and Development', content: '', readTime: '15 min' },
  { id: 'sst-3', subject: 'Social Science', chapterName: 'Power Sharing', content: '', readTime: '12 min' },
  { id: 'sst-4', subject: 'Social Science', chapterName: 'Development (Economics)', content: '', readTime: '14 min' },
  
  // English
  { id: 'eng-1', subject: 'English', chapterName: 'A Letter to God', content: '', readTime: '8 min' },
  { id: 'eng-2', subject: 'English', chapterName: 'Nelson Mandela: Long Walk to Freedom', content: '', readTime: '12 min' },
];

export const MOCK_ACTIVITIES: Activity[] = [
  {
    id: 'act-1',
    subject: 'Science',
    chapter: 'Chemical Reactions',
    title: 'Burning of Magnesium Ribbon',
    aim: 'To observe the reaction of Magnesium with Oxygen.',
    materials: ['Magnesium Ribbon', 'Burner', 'Tongs', 'Watch Glass', 'Sandpaper'],
    procedure: [
      'Clean the magnesium ribbon with sandpaper.',
      'Hold it with a pair of tongs.',
      'Burn it using a spirit lamp or burner.',
      'Collect the ash formed in a watch glass.'
    ],
    conclusion: 'Magnesium burns with a dazzling white flame to form a white powder called Magnesium Oxide.',
    visualType: 'CHEMISTRY_BURN'
  },
  {
    id: 'act-2',
    subject: 'Science',
    chapter: 'Acids, Bases and Salts',
    title: 'Reaction of Zn with Dilute H2SO4',
    aim: 'To observe the reaction of a metal with a dilute acid.',
    materials: ['Zinc Granules', 'Dilute Sulphuric Acid', 'Test Tube', 'Soap Solution'],
    procedure: [
      'Take a few zinc granules in a test tube.',
      'Add dilute sulphuric acid to it.',
      'Observe the gas bubbles.',
      'Pass the gas through soap solution and bring a burning candle near the bubbles.'
    ],
    conclusion: 'Hydrogen gas is evolved, which burns with a pop sound.',
    visualType: 'CHEMISTRY_BUBBLE'
  },
  {
    id: 'act-3',
    subject: 'Science',
    chapter: 'Electricity',
    title: 'Verification of Ohm\'s Law',
    aim: 'To study the dependence of current (I) on the potential difference (V).',
    materials: ['Resistor', 'Voltmeter', 'Ammeter', 'Battery', 'Key', 'Rheostat'],
    procedure: [
      'Connect the circuit as per the circuit diagram.',
      'Note the reading of the Ammeter and Voltmeter.',
      'Vary the current using the rheostat and take multiple readings.',
      'Plot a graph between V and I.'
    ],
    conclusion: 'The graph is a straight line passing through the origin, verifying V ∝ I.'
  },
  {
    id: 'act-4',
    subject: 'Science',
    chapter: 'Life Processes',
    title: 'To show that CO2 is necessary for Photosynthesis',
    aim: 'To demonstrate the importance of Carbon Dioxide for photosynthesis.',
    materials: ['Potted plant', 'KOH solution', 'Bell jar', 'Vaseline', 'Iodine solution'],
    procedure: [
      'Keep the plant in dark for 3 days to destarch leaves.',
      'Place a part of a leaf inside a bottle containing KOH (absorbs CO2).',
      'Keep the setup in sunlight.',
      'Perform starch test with iodine.'
    ],
    conclusion: 'The part inside the bottle does not turn blue-black, showing no starch was formed without CO2.',
    visualType: 'BIOLOGY_3D_PLANT'
  }
];
import { Question, QuestionType, Flashcard } from './types';

export const MOCK_QUESTIONS: Question[] = [
  {
    id: '1',
    text: 'In the context of React, what is the primary purpose of useEffect?',
    type: QuestionType.MCQ,
    options: ['To modify the DOM directly', 'To handle side effects', 'To manage global state', 'To style components'],
    correctAnswer: 1,
    explanation: 'useEffect is a Hook that lets you perform side effects in function components, such as data fetching or subscriptions.',
    subject: 'Computer Science',
    year: 2023
  },
  {
    id: '2',
    text: 'A patient presents with chronic fatigue and pallor. Blood tests reveal microcytic anemia. Which deficiency is most likely?',
    type: QuestionType.CBQ,
    options: ['Vitamin B12', 'Iron', 'Folate', 'Vitamin C'],
    correctAnswer: 1,
    explanation: 'Iron deficiency anemia is characterized by microcytic (small) red blood cells and is a common cause of fatigue and pallor.',
    subject: 'Biology',
    year: 2022
  },
  {
    id: '3',
    text: 'Calculate the derivative of f(x) = 3x^2 + 2x.',
    type: QuestionType.MCQ,
    options: ['6x + 2', '3x + 2', '6x', 'x^3 + x^2'],
    correctAnswer: 0,
    explanation: 'Using the power rule, the derivative of 3x^2 is 6x, and the derivative of 2x is 2.',
    subject: 'Mathematics',
    year: 2024
  }
];

export const MOCK_FLASHCARDS: Flashcard[] = [
  { id: '1', front: 'Mitochondria', back: 'The powerhouse of the cell; organelle responsible for energy production.', masteryLevel: 2 },
  { id: '2', front: 'Newton\'s Second Law', back: 'Force equals mass times acceleration (F=ma).', masteryLevel: 4 },
  { id: '3', front: 'Photosynthesis', back: 'The process by which green plants use sunlight to synthesize foods from CO2 and water.', masteryLevel: 1 },
  { id: '4', front: 'Avogadro\'s Number', back: '6.022 × 10^23', masteryLevel: 3 },
];

export const SUBJECTS = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'History'];

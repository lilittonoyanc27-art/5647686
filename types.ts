/**
 * Types for Español Shop — Aprende Comprando
 */

export type Category = 'hombre' | 'mujer' | 'ninos' | 'calzado' | 'accesorios' | 'rebajas';

export type ClothingColor = 'rojo' | 'azul' | 'verde' | 'amarillo' | 'negro' | 'blanco' | 'marron' | 'gris' | 'rosa' | 'morado' | 'naranja' | 'beige';

export type ClothingSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | '34' | '36' | '38' | '40' | '41' | '42' | '43' | '44' | 'Única';

export interface ClothingItem {
  id: string;
  spanishName: string;
  armenianName: string;
  category: Category;
  gender: 'hombre' | 'mujer' | 'unisex' | 'ninos';
  price: number;
  discountPercent?: number; // e.g. 10, 20, 30, 50
  color: string;
  colorHex: string;
  size: ClothingSize;
  availableSizes: ClothingSize[];
  icon: string; // Emoji / SVG symbol representation
  descriptionEs: string;
  descriptionHy: string;
  exampleEs: string;
  exampleHy: string;
  materialEs: string;
  materialHy: string;
  department: string;
  isPopular?: boolean;
}

export interface WordInfo {
  word: string;
  lemma?: string;
  translationHy: string;
  pronunciation: string;
  partOfSpeech: string;
  exampleEs: string;
  exampleHy: string;
}

export interface DialogueTurn {
  id: string;
  speaker: 'vendedor' | 'cliente';
  avatar: string;
  speakerNameEs: string;
  speakerNameHy: string;
  textEs: string;
  textHy: string;
  audioPrompt?: string;
  options?: DialogueOption[];
}

export interface DialogueOption {
  id: string;
  textEs: string;
  textHy: string;
  isCorrect?: boolean;
  feedbackEs?: string;
  feedbackHy?: string;
  nextTurnId?: string;
}

export interface DialogueScenario {
  id: string;
  titleEs: string;
  titleHy: string;
  level: 'A1' | 'A2' | 'B1' | 'B2';
  situationEs: string;
  situationHy: string;
  icon: string;
  initialTurnId: string;
  turns: Record<string, DialogueTurn>;
  vocabulary: string[];
}

export interface GrammarTopic {
  id: string;
  titleEs: string;
  titleHy: string;
  level: 'A1' | 'A2' | 'B1' | 'B2';
  icon: string;
  summaryEs: string;
  summaryHy: string;
  theoryEs: string[];
  theoryHy: string[];
  rules: { ruleEs: string; ruleHy: string; exampleEs: string; exampleHy: string }[];
  quiz: {
    questionEs: string;
    questionHy: string;
    options: string[];
    correctIndex: number;
    explanationHy: string;
  }[];
}

export interface ListeningExercise {
  id: string;
  titleEs: string;
  titleHy: string;
  level: 'A1' | 'A2' | 'B1' | 'B2';
  audioTextEs: string;
  speaker: string;
  dialoguePairs: { speakerEs: string; speakerHy: string; textEs: string; textHy: string }[];
  transcriptEs: string;
  transcriptHy: string;
  questions: {
    id: string;
    questionEs: string;
    questionHy: string;
    optionsEs: string[];
    optionsHy: string[];
    correctIndex: number;
    explanationHy: string;
  }[];
}

export type ExerciseType =
  | 'multiple_choice'
  | 'translation'
  | 'match_image'
  | 'reorder_words'
  | 'sentence_builder'
  | 'fix_error'
  | 'fill_blanks'
  | 'true_false'
  | 'guess_by_description'
  | 'odd_one_out'
  | 'choose_size'
  | 'calculate_cost'
  | 'continue_dialogue'
  | 'choose_clothes'
  | 'translate_sentence';

export interface ExerciseItem {
  id: string;
  type: ExerciseType;
  level: 'A1' | 'A2' | 'B1' | 'B2';
  instructionEs: string;
  instructionHy: string;
  promptEs?: string;
  promptHy?: string;
  image?: string;
  audioText?: string;
  options?: string[];
  optionsHy?: string[];
  correctAnswer: string | number | string[];
  explanationEs?: string;
  explanationHy: string;
  scrambledWords?: string[];
  exampleEs?: string;
  exampleHy?: string;
}

export interface ExamQuestion {
  id: string;
  section: 'vocabulario' | 'gramatica' | 'dialogo' | 'audicion' | 'situacion';
  level: 'A1' | 'A2' | 'B1' | 'B2';
  promptEs: string;
  promptHy: string;
  contextEs?: string;
  contextHy?: string;
  audioText?: string;
  options: { textEs: string; textHy: string; isCorrect: boolean }[];
  explanationHy: string;
  exampleEs: string;
  exampleHy: string;
}

export interface CartItem {
  clothingItem: ClothingItem;
  quantity: number;
  selectedSize: ClothingSize;
  selectedColor: string;
}

export interface DressingTask {
  id: string;
  titleEs: string;
  titleHy: string;
  descriptionEs: string;
  descriptionHy: string;
  targetCategory: {
    top: string[]; // required types or tags
    bottom: string[];
    shoes: string[];
    accessory?: string[];
  };
  rewardPoints: number;
}

export interface StudentProgress {
  coins: number;
  score: number;
  streak: number;
  level: 'A1' | 'A2' | 'B1' | 'B2';
  completedDialogues: string[];
  completedGrammar: string[];
  completedListening: string[];
  completedExercises: string[];
  examScores: Record<string, { score: number; total: number; date: string }>;
  mistakes: {
    timestamp: string;
    question: string;
    userAnswer: string;
    correctAnswer: string;
    explanationHy: string;
  }[];
  customQuestions?: ExamQuestion[];
}

export interface TeacherSettings {
  hideArmenianTranslation: boolean;
  selectedLevel: 'A1' | 'A2' | 'B1' | 'B2' | 'all';
  selectedTopic: string;
  questionCount: number;
  soundEnabled: boolean;
}

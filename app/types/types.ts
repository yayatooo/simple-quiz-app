export interface QuestionProps {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface ConfirmationProps {
  types: string;
  difficulty: string;
  handleStartQuiz: () => void;
}
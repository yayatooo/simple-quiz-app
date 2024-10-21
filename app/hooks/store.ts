import { create } from 'zustand'
import { QuestionProps } from '../types/types';

interface QuizState {
  categoryName: CategoryName | '';
  categoryId: number | null;
  difficulty: string;
  questions: QuestionProps[];
  currentQuestionIndex: number;
  isLoading: boolean;
  error: string | null;
  userAnswers: string[];
  setCategoryName: (category: CategoryName) => void;
  setDifficulty: (difficulty: string) => void;
  getCategoryId: () => number | null;
  setQuestions: (questions: QuestionProps[]) => void;
  setCurrentQuestionIndex: (index: number) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  submitAnswer: (answer: string) => void;
  fetchQuestions: () => Promise<void>;
}

export const categoryMapping = {
  'General Knowledge': 9,
  'Entertainment: Books': 10,
  'Entertainment: Film': 11,
  'Entertainment: Music': 12,
  'Entertainment: Television': 14,
  'Entertainment: Video Games': 15,
  'Entertainment: Board Games': 16,
  'Science & Nature': 17,
  'Science: Computers': 18,
  'Science: Mathematics': 19,
  'Mythology': 20,
  'Sports': 21,
  'Geography': 22,
  'History': 23,
  'Politics': 24,
  'Art': 25,
  'Celebrities': 26,
  'Animals': 27,
  'Vehicles': 28,
  'Entertainment: Comics': 29,
  'Science: Gadgets': 30,
  'Entertainment: Japanese Anime & Manga': 31,
  'Entertainment: Cartoon & Animations': 32,
} as const;

type CategoryName = keyof typeof categoryMapping;

interface QuizState {
  categoryName: CategoryName | '';
  categoryId: number | null;
  difficulty: string;
  setCategoryName: (category: CategoryName) => void;
  setDifficulty: (difficulty: string) => void;
  getCategoryId: () => number | null;
  score: number;
  calculateScore: () => void;
  resetQuiz: () => void;
}

const useQuizStore = create<QuizState>((set, get) => ({
  categoryName: '',
  categoryId: null,
  difficulty: '',
  questions: [],
  currentQuestionIndex: 0,
  isLoading: false,
  error: null,
  userAnswers: [],
  setCategoryName: (categoryName) => 
    set({ 
      categoryName,
      categoryId: categoryMapping[categoryName]
    }),
  setDifficulty: (difficulty) => set({ difficulty }),
  getCategoryId: () => get().categoryId,
  setQuestions: (questions) => set({ questions }),
  setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  submitAnswer: (answer) => {
    const { userAnswers, currentQuestionIndex, questions } = get();
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestionIndex] = answer;
    set({ userAnswers: newUserAnswers });
  },
  fetchQuestions: async () => {
    const { categoryId, difficulty } = get();
    
    if (!categoryId || !difficulty) {
      set({ error: "Please select both category and difficulty" });
      return;
    }

    set({ isLoading: true, error: null });

    try {
      const query = `https://opentdb.com/api.php?amount=10&category=${categoryId}&difficulty=${difficulty}&type=multiple`;
      const res = await fetch(query);
      const data = await res.json();
      
      if (data.response_code === 0) {
        set({ 
          questions: data.results,
          currentQuestionIndex: 0,
          userAnswers: []
        });
      } else {
        set({ error: "Failed to fetch questions. Please try again." });
      }
    } catch (error) {
      set({ error: "An error occurred while fetching questions." });
    } finally {
      set({ isLoading: false });
    }
  },
  score: 0,
  calculateScore: () => {
    const { questions, userAnswers } = get();
    const score = questions.reduce((acc, question, index) => {
      return acc + (question.correct_answer === userAnswers[index] ? 1 : 0);
    }, 0);
    set({ score });
  },
  resetQuiz: () => {
    set({
      categoryName: '',
      categoryId: null,
      difficulty: '',
      questions: [],
      currentQuestionIndex: 0,
      isLoading: false,
      error: null,
      userAnswers: [],
      score: 0,
    });
  },
}))


export default useQuizStore
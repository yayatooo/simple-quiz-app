"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useQuizStore from "@/app/hooks/store";
import { Button } from "@/components/ui/button";

export default function QuestionPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { 
    questions, 
    currentQuestionIndex, 
    isLoading, 
    error, 
    userAnswers,
    submitAnswer,
    setCurrentQuestionIndex 
  } = useQuizStore();

  const questionIndex = parseInt(params.id) - 1;

  useEffect(() => {
    setCurrentQuestionIndex(questionIndex);
  }, [questionIndex, setCurrentQuestionIndex]);

  if (isLoading) return <p>Loading questions...</p>;
  if (error) return <p>{error}</p>;
  if (questions.length === 0) return <p>No questions found. Please try different options.</p>;
  if (questionIndex >= questions.length) return <p>Question not found</p>;

  const currentQuestion = questions[questionIndex];
  const allAnswers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer]
    .sort(() => Math.random() - 0.5);

  const handleAnswerSelect = (answer: string) => {
    submitAnswer(answer);
    
    if (questionIndex < questions.length - 1) {
      router.push(`/question/${questionIndex + 2}`);
    } else {
      router.push('/result');
    }
  };

  return (
    <main className="container py-20 mx-auto">
      <section className="mx-auto w-6/12">
        <div className="mb-4">
          <span className="text-sm text-gray-500">
            Question {questionIndex + 1} of {questions.length}
          </span>
        </div>
        <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-lg font-medium mb-4">{currentQuestion.question}</h3>
          <div className="space-y-3">
            {allAnswers.map((answer, idx) => (
              <Button
                key={idx}
                variant="outline"
                className="w-full justify-start h-auto py-3 px-4"
                onClick={() => handleAnswerSelect(answer)}
              >
                {answer}
              </Button>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
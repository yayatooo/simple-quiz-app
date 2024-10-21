"use client"
import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import Link from "next/link";
import useQuizStore from "@/app/hooks/store";
// import { useRouter } from "next/navigation";

export default function ResultPage() {
  const { score, questions, userAnswers, calculateScore, resetQuiz } = useQuizStore();

  useEffect(() => {
    calculateScore();
  }, [calculateScore]);

  const totalQuestions = questions.length;
  const correctAnswers = score;
  const wrongAnswers = totalQuestions - correctAnswers;
  // const router = useRouter()

  // const handleResetQuiz = () => {
  //   resetQuiz();
  //   router.push('/start');
  // };

  return (
    <main className="container py-20 mx-auto">
      <section className="w-4/12 mx-auto">
        <h1 className="text-5xl flex justify-center items-center font-semibold bg-green-700 text-white rounded-full w-32 h-32 mx-auto">
          {score}
        </h1>
        <div className="flex py-8 justify-between text-lg">
          <div>
            <h4>Correct Answer</h4>
            <h4>Wrong Answer</h4>
            <h4>Answer Submitted</h4>
          </div>
          <div>
            <h4>{correctAnswers}</h4>
            <h4>{wrongAnswers}</h4>
            <h4>{totalQuestions}</h4>
          </div>
        </div>
        <Link href="/">
          <Button className="w-full rounded-full" onClick={resetQuiz}>Back to home</Button>
        </Link>
      </section>
    </main>
  );
}
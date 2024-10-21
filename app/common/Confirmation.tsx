import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ConfirmationProps } from "../types/types";

export const ConfirmationQuiz = ({
  types,
  difficulty,
  handleStartQuiz,
}: ConfirmationProps) => {


  return (
    <AlertDialog>
    <AlertDialogTrigger asChild>
      <Button variant="outline">Get Started</Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Quiz Info!</AlertDialogTitle>
        <AlertDialogDescription className="text-black">
          Your quiz will have <span className="font-semibold">10</span> questions 
          in the category <span className="text-green-700 font-semibold">{types} </span> 
          with a difficulty of <span className="text-sky-600 font-semibold">{difficulty} </span>. 
          You have <span className="text-yellow-600 font-semibold">10 minutes</span> to complete it! 
          Do you still want to start?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={handleStartQuiz}>Continue</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  );
};

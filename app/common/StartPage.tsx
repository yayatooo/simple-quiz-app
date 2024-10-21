"use client";
import React from "react";
import { Label } from "@radix-ui/react-label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectOptionDificullty } from "@/utils/data";
import { ConfirmationQuiz } from "./Confirmation";
import { useRouter } from "next/navigation";
import useQuizStore, { categoryMapping } from "../hooks/store"

export default function StartPage() {
  const router = useRouter();
  const { categoryName, difficulty, setCategoryName, setDifficulty } = useQuizStore();
  
  const handleTypes = (value: keyof typeof categoryMapping) => {
    setCategoryName(value);
  };

  const handleDifficulty = (value: string) => {
    setDifficulty(value);
  };

  const handleStartQuiz = async () => {
    await useQuizStore.getState().fetchQuestions();
    const { error } = useQuizStore.getState();
    
    if (!error) {
      router.push('/question/1');
    }
  };

  return (
    <main className="container mx-auto py-16">
      <section>
        <div className="text-center pb-8">
          <h1 className="text-3xl font-semibold">Welcome to Myquiz bro!</h1>
          <p>You can select your type of quiz first</p>
        </div>
        <form className="w-6/12 mx-auto space-y-5">
          <div>
            <Label htmlFor="category">Select Type</Label>
            <Select onValueChange={handleTypes}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Type Quiz" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Category</SelectLabel>
                  {Object.keys(categoryMapping).map((category) => (
                    <SelectItem 
                      value={category} 
                      key={categoryMapping[category as keyof typeof categoryMapping]}
                    >
                      {category}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="difficulty">Select Difficulty</Label>
            <Select onValueChange={handleDifficulty}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Difficulty</SelectLabel>
                  {SelectOptionDificullty.map((item) => (
                    <SelectItem value={item.value} key={item.id}>
                      {item.value}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <ConfirmationQuiz
            types={categoryName}
            difficulty={difficulty}
            handleStartQuiz={handleStartQuiz}
          />
        </form>
      </section>
    </main>
  );
}
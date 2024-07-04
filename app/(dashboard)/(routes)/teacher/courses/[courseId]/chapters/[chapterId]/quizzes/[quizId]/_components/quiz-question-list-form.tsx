"use client";

import { Question } from "@prisma/client";
import { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface QuestionsListProps {
  items: Question[];
  onEdit: (id: string) => void;
}

export const ChapterQuestionsList = ({
  items,
  onEdit,
}: QuestionsListProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [questions, setQuestions] = useState<Question[]>(items);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setQuestions(items);
  }, [items]);

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      {questions.map((question) => (
        <div
          key={question.id}
          className={cn(
            "flex items-center p-2 gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb-4 text-sm",
            
          )}
        >
          {question.text}
        </div>
      ))}
    </div>
  );
};

export default ChapterQuestionsList;

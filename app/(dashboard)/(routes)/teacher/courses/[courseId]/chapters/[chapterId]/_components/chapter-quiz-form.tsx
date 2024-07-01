// components/quiz-form.tsx
"use client";

// components/quiz-form.tsx
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PlusCircle, Trash } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Chapter } from "@prisma/client";

interface QuizFormProps {
  initialData: Chapter;
  courseId: string;
  chapterId: string;
}

interface QuizQuestion {
  question: string;
  type: "normal" | "mcq";
  options?: string[];
  correctAnswers?: string[];
  timeline?: string;
}

const formSchema = z.array(
  z.object({
    question: z.string().min(1),
    type: z.enum(["normal", "mcq"]),
    options: z.array(z.string()).optional(),
    correctAnswers: z.array(z.string()).optional(),
    timeline: z.string().optional(),
  })
);

export const ChapterQuizForm = ({
  initialData,
  courseId,
  chapterId,
}: QuizFormProps) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [isAddingQuestion, setIsAddingQuestion] = useState(false);

  const router = useRouter();

  const form = useForm<QuizQuestion[]>({
    resolver: zodResolver(formSchema),
    defaultValues: [],
  });

  const { isSubmitting, isValid } = form.formState;

  const addQuestion = () => {
    setQuestions((prevQuestions) => [
      ...prevQuestions,
      {
        question: "",
        type: "normal",
        options: ["", "", "", ""], // Initial options for MCQ
        correctAnswers: [],
        timeline: "",
      },
    ]);
    setIsAddingQuestion(true);
  };

  const removeQuestion = (index: number) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions.splice(index, 1);
      return updatedQuestions;
    });
  };

  const onSubmit = async (values: QuizQuestion[]) => {
    try {
      await axios.post(
        `/api/courses/${courseId}/chapters/${chapterId}/quizzes`,
        {
          questions: values,
        }
      );
      toast.success("Quiz added successfully");
      router.push(`/teacher/courses/${courseId}/chapters/${chapterId}`);
    } catch (error) {
      toast.error("Failed to add quiz");
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Quiz Questions
        {!isAddingQuestion && (
          <Button onClick={addQuestion} variant="ghost">
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Question
          </Button>
        )}
      </div>
      {questions.length > 0 && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            {questions.map((question, index) => (
              <div key={index} className="border p-4 rounded-md">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium">Question {index + 1}</h4>
                  <Button
                    onClick={() => removeQuestion(index)}
                    variant="ghost"
                    className="text-red-500"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
                <FormField
                  control={form.control}
                  name={`${index}.question`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          disabled={isSubmitting}
                          placeholder="Enter your question"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`${index}.type`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select
                          disabled={isSubmitting}
                          {...field}
                          onChange={(e) => {
                            const selectedType = e.target.value as "normal" | "mcq";
                            form.setValue(`${index}.type`, selectedType);
                            if (selectedType === "mcq") {
                              form.setValue(`${index}.options`, ["", "", "", ""]);
                              form.setValue(`${index}.correctAnswers`, []);
                            } else {
                              form.setValue(`${index}.options`, undefined);
                              form.setValue(`${index}.correctAnswers`, undefined);
                            }
                          }}
                        >
                          <option value="normal">Normal Question</option>
                          <option value="mcq">Multiple Choice Question</option>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {question.type === "mcq" && (
                  <>
                    <div className="mb-4">
                      <label className="block text-sm">Options</label>
                      {question.options?.map((_, optionIndex) => (
                        <FormField
                          key={optionIndex}
                          control={form.control}
                          name={`${index}.options.${optionIndex}`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  disabled={isSubmitting}
                                  placeholder={`Option ${optionIndex + 1}`}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                    <FormField
                      control={form.control}
                      name={`${index}.correctAnswers`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              disabled={isSubmitting}
                              placeholder="Enter correct answers"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
                <FormField
                  control={form.control}
                  name={`${index}.timeline`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          disabled={isSubmitting}
                          type="datetime-local"
                          placeholder="Select timeline"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}
            <div className="flex items-center gap-x-2 mt-4">
              <Button disabled={!isValid || isSubmitting} type="submit">
                Save Quiz
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default ChapterQuizForm;

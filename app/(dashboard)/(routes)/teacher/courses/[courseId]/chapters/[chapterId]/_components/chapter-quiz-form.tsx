// components/ChapterQuizForm.tsx
"use client"
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2, PlusCircle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Chapter, Quiz } from "@prisma/client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { ChapterQuizList } from "./chapter-quizlist";

interface QuizzesFormProps {
  initialData: Chapter & { quizzes: Quiz[] };
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  title: z.string().min(1),
  timeline: z.string().refine((value) => /^\d{2}:\d{2}:\d{2}$/.test(value), {
    message: "Please enter a valid time format (hh:mm:ss)",
  }),
});

export const ChapterQuizForm = ({
  initialData,
  courseId,
  chapterId,
}: QuizzesFormProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      timeline: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const toggleCreating = () => {
    setIsCreating((current) => !current);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post(`/api/courses/${courseId}/chapters/${chapterId}/quizzes`, {
        title: values.title,
        timeline: values.timeline,
      });

      const newQuiz = response.data;
      toast.success("Quiz created");
      toggleCreating();

      router.refresh(); // Refresh the page or relevant data after creation
    } catch (error) {
      console.error("Quiz creation error:", error);
      toast.error("Something went wrong");
    }
  };

  const onReorder = async (updateData: { id: string; position: number }[]) => {
    try {
      setIsUpdating(true);
      await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/quizzes/reorder`, {
        list: updateData,
      });
      toast.success("Quizzes reordered");
      router.refresh();
    } catch (error) {
      console.error("Quiz reorder error:", error);
      toast.error("Something went wrong");
    } finally {
      setIsUpdating(false);
    }
  };

  const onEdit = (id: string) => {
    router.push(`/teacher/courses/${courseId}/chapters/${chapterId}/quizzes/${id}`);
  };

  return (
    <div className="relative mt-6 border bg-slate-100 rounded-md p-4">
      {isUpdating && (
        <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-m flex items-center justify-center">
          <Loader2 className="animate-spin h-6 w-6 text-sky-700" />
        </div>
      )}
      <div className="font-medium flex items-center justify-between">
        Chapter quizzes
        <Button onClick={toggleCreating} variant="ghost">
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a quiz
            </>
          )}
        </Button>
      </div>
      {isCreating && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input disabled={isSubmitting} placeholder="e.g. 'Quiz 1'" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="timeline"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Enter timeline (hh:mm:ss)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={!isValid || isSubmitting} type="submit">
              Create
            </Button>
          </form>
        </Form>
      )}
      {!isCreating && (
        <div
          className={cn(
            "text-sm mt-2",
            (!initialData.quizzes || initialData.quizzes.length === 0) &&
              "text-slate-500 italic"
          )}
        >
          {!initialData.quizzes || initialData.quizzes.length === 0 ? (
            "No quizzes"
          ) : (
            <ChapterQuizList
              onEdit={onEdit}
              onReorder={onReorder}
              items={initialData.quizzes || []}
            />
          )}
        </div>
      )}
      {!isCreating && (
        <p className="text-xs text-muted-foreground mt-4">
          Drag and drop to reorder the quizzes
        </p>
      )}
    </div>
  );
};

export default ChapterQuizForm;

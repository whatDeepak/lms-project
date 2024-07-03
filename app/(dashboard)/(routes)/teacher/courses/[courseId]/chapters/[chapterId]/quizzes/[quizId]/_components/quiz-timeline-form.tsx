"use client"

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { Form, FormField, FormControl, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface QuizTimelineFormProps {
  initialData: {
    timeline: number; // Stored in seconds
  };
  courseId: string;
  chapterId: string;
  quizId: string;
}

const formSchema = z.object({
  timeline: z
    .string()
    .regex(/^([0-1]?[0-9]|2[0-3]):([0-5]?[0-9]):([0-5]?[0-9])$/, "Invalid time format (hh:mm:ss)"),
});

const convertSecondsToHHMMSS = (seconds: number) => {
  const hrs = Math.floor(seconds / 3600).toString().padStart(2, "0");
  const mins = Math.floor((seconds % 3600) / 60).toString().padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");
  return `${hrs}:${mins}:${secs}`;
};

const convertHHMMSSToSeconds = (time: string) => {
  const [hrs, mins, secs] = time.split(":").map(Number);
  return hrs * 3600 + mins * 60 + secs;
};

export const QuizTimelineForm = ({
  initialData,
  courseId,
  chapterId,
  quizId,
}: QuizTimelineFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      timeline: convertSecondsToHHMMSS(initialData.timeline),
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const toggleEdit = () => setIsEditing((current) => !current);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/quizzes/${quizId}`, {
        timeline: convertHHMMSSToSeconds(values.timeline),
      });
      toast.success("Quiz timeline updated");
      toggleEdit();
      router.refresh();
    } catch (error) {
      console.error("[QUIZ_TIMELINE_UPDATE]", error);
      toast.error("Failed to update quiz timeline");
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Quiz timeline
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit timeline
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p className="text-sm mt-2">{convertSecondsToHHMMSS(initialData.timeline)}</p>
      )}
      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="timeline"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input disabled={isSubmitting} placeholder="e.g. '01:30:00'" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

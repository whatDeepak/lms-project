"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Pencil } from "lucide-react";

enum QuestionType {
    NORMAL = "NORMAL",
    MCQ = "MCQ",
}

const formSchema = z.object({
    questions: z.array(
        z.object({
            text: z.string().min(1),
            type: z.nativeEnum(QuestionType),
            options: z.array(z.string()).optional(),
            answers: z.array(z.string()).optional(),
        })
    ),
});

interface QuizQuestionsFormProps {
    initialData: any;
    courseId: string;
    chapterId: string;
    quizId: string;
}

export const QuizQuestionsForm = ({
    initialData,
    courseId,
    chapterId,
    quizId,
}: QuizQuestionsFormProps) => {
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { questions: initialData },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "questions",
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(
                `/api/courses/${courseId}/chapters/${chapterId}/quizzes/${quizId}/questions`,
                values
            );
            toast.success("Quiz questions updated");
            router.refresh();
        } catch {
            toast.error("Something went wrong");
        }
    };

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Quiz Questions

                <Button
                    variant="ghost"
                    onClick={() =>
                        append({ text: "", type: QuestionType.NORMAL, options: [], answers: [] })
                    }
                    disabled={isSubmitting}
                >
                    <Pencil className="h-4 w-4 mr-2" />
                    Add a question
                </Button>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                    {fields.map((field, index) => (
                        <div key={field.id} className="border p-4 rounded-md space-y-4">
                            <FormField
                                control={form.control}
                                name={`questions.${index}.text`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                disabled={isSubmitting}
                                                placeholder="Question"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={`questions.${index}.type`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Select
                                                value={field.value}
                                                onValueChange={(value) =>
                                                    form.setValue(`questions.${index}.type`, value as any)
                                                }
                                            >
                                                <SelectTrigger className="w-[180px]">
                                                    <SelectValue placeholder="Select question type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel>Type</SelectLabel>
                                                        <SelectItem value={QuestionType.NORMAL}>
                                                            Normal
                                                        </SelectItem>
                                                        <SelectItem value={QuestionType.MCQ}>
                                                            Multiple Choice
                                                        </SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {form.watch(`questions.${index}.type`) === QuestionType.MCQ && (
                                <>
                                    <FormField
                                        control={form.control}
                                        name={`questions.${index}.options`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <div className="space-y-2">
                                                        {[...Array(4)].map((_, optIndex) => (
                                                            <Input
                                                                key={optIndex}
                                                                placeholder={`Option ${optIndex + 1}`}
                                                                value={field.value?.[optIndex] ?? ""}
                                                                onChange={(e) => {
                                                                    const newOptions = field.value ? [...field.value] : [];
                                                                    newOptions[optIndex] = e.target.value;
                                                                    field.onChange(newOptions);
                                                                }}
                                                            />
                                                        ))}
                                                    </div>
                                                </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name={`questions.${index}.answers`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Correct answer"
                                                        value={field.value?.[0] ?? ""}
                                                        onChange={(e) =>
                                                            field.onChange([e.target.value])
                                                        }
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </>
                            )}
                            {form.watch(`questions.${index}.type`) === QuestionType.NORMAL && (
                                <FormField
                                    control={form.control}
                                    name={`questions.${index}.answers`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    placeholder="Correct answer"
                                                    value={field.value?.[0] ?? ""}
                                                    onChange={(e) => field.onChange([e.target.value])}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}
                            <Button
                                variant="ghost"
                                onClick={() => remove(index)}
                                disabled={isSubmitting}
                            >
                                Remove question
                            </Button>
                        </div>
                    ))}
                    <div className="flex items-center gap-x-2">
                        <Button disabled={!isValid || isSubmitting} type="submit">
                            Save
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

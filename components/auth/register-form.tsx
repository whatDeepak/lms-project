"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { RegisterSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import { CardWrapper } from "@/components/auth/card-wrapper"
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { register } from "@/actions/register";

export const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [selectedTab, setSelectedTab] = useState<string>("teacher");

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      rollNo: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      register(values)
        .then((data) => {
          setError(data.error);
          setSuccess(data.success);
        });
    });
  };

  let nameValidationRules;
  let rollNoValidationRules;

  nameValidationRules = {
    required: "Name is required",
  };

  rollNoValidationRules = {
    required: "Roll Number is required",
    pattern: {
      value: /^\d+$/,
      message: "Roll Number must be an integer",
    },
  };

  // if (selectedTab === "teacher") {
  //   nameValidationRules = {
  //     required: "Name is required",
  //   };
  // } else if (selectedTab === "student") {
  //   nameValidationRules = {
  //     required: "Name is required",
  //   };
  //   rollNoValidationRules = {
  //     required: "Roll Number is required",
  //     pattern: {
  //       value: /^\d+$/,
  //       message: "Roll Number must be an integer",
  //     },
  //   };
  // }

  return (
    <CardWrapper
      headerLabel="You're creating an account as?"
      backButtonLabel="Already have an account?"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Tabs defaultValue="student" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="student" onClick={() =>{ form.reset(); setSelectedTab("student")}}>Student</TabsTrigger>
              <TabsTrigger value="teacher" onClick={() => { form.reset(); setSelectedTab("teacher")}}>Teacher</TabsTrigger>
            </TabsList>
            <TabsContent value="student">
              <div className="mt-6 space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  rules={selectedTab === 'student' ? nameValidationRules : undefined}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>User Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="John Doe"
                          className="border border-gray-300 focus:border-input-border focus:outline-none"
                          
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="rollNo"
                  rules={selectedTab === 'student' ? rollNoValidationRules : undefined}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Roll Number</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="22103046"
                          className="border border-gray-300 focus:border-input-border focus:outline-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </TabsContent>
            <TabsContent value="teacher">
              <div className="mt-6">
                <FormField
                  control={form.control}
                  name="name"
                  rules={selectedTab === 'teacher' ? nameValidationRules : undefined}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>User Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="John Doe"
                          
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </TabsContent>
          </Tabs>

          <FormError message={error} />
          <FormSuccess message={success} />
          <Button disabled={isPending} type="submit" className="w-full">
            Create an account
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

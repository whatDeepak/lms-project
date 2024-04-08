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
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { register } from "@/actions/register";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { signIn } from "next-auth/react";
import { db } from "@/lib/db";
import { useRouter } from "next/navigation";
// Define separate schemas for student and teacher
const studentSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  rollNo: z.string().min(1, { message: "Roll Number is required" }),
});

const teacherSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
});

export const RegisterForm = () => {
  const router =useRouter();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [selectedTab, setSelectedTab] = useState<string>("teacher");
  // Define a dynamic schema state to hold the current schema
  const [schema, setSchema] = useState<any>(studentSchema);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      rollNo: "",
    },
  });
  // Function to handle tab change and update the schema accordingly
  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
    setSchema(tab === "student" ? studentSchema : teacherSchema);
    form.reset(); // Reset the form when the tab changes
  };
  const onSubmit = async(values: z.infer<typeof RegisterSchema>) => {
    console.log(values);
    setError("");
    setSuccess("");

    if (selectedTab === "student" && !values.rollNo) {
      setError("Roll Number is required");
      return;
    }

    const validatedFields = await RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
      setError("Invalid fields!");
      return ;
    }
    const { name, rollNo} = validatedFields.data;
    try {
      signIn("google", {
        callbackUrl: DEFAULT_LOGIN_REDIRECT,
      });
      await db.user.create({
        data: {
          name,
          rollNo,
        },
      });
    } catch (error) {
      setError("Something went wrong");
      router.push("/")
      
    }

    startTransition(() => {
      // register(values)
      //   .then((data) => {
      //     setError(data.error);
      //     setSuccess(data.success);
      //   });
    });
  };

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
              <TabsTrigger
                value="student"
                onClick={() => handleTabChange("student")}
              >
                Student
              </TabsTrigger>
              <TabsTrigger
                value="teacher"
                onClick={() => handleTabChange("teacher")}
              >
                Teacher
              </TabsTrigger>
            </TabsList>
            <TabsContent value="student">
              <div className="mt-6 space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  rules={
                    selectedTab === "student"
                      ? { required: "Name is required" }
                      : undefined
                  }
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
                  rules={
                    selectedTab === "student"
                      ? { required: "Roll Number is required" }
                      : undefined
                  }
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
                  rules={
                    selectedTab === "teacher"
                      ? { required: "Name is required" }
                      : undefined
                  }
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

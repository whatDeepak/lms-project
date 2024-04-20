"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { db } from "@/lib/db";
import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";


export const register = async (values: z.infer<typeof RegisterSchema>,callbackUrl?: string | null,) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { name, rollNo} = validatedFields.data;

  // signIn("google", {
  //   callbackUrl: DEFAULT_LOGIN_REDIRECT,
  // });
  // const hashedPassword = await bcrypt.hash(password, 10);

  // const existingUser = await getUserByEmail(email);

  // if (existingUser) {
  //   return { error: "Email already in use!" };
  // }

  await db.user.create({
    data: {
      name,
      rollNo,
    },
  });

  return { success: "Confirmation email sent!" };
};

"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { db } from "@/lib/db";
import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";


export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { name, rollNo} = validatedFields.data;
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

  // const verificationToken = await generateVerificationToken(email);
  // await sendVerificationEmail(
  //   verificationToken.email,
  //   verificationToken.token,
  // );

  return { success: "Confirmation email sent!" };
};

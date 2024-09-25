import NextAuth from "next-auth";
import { UserRole } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import authConfig from "@/auth.config";
import { getUserById } from "@/data/user";
import { getAccountByUserId } from "./data/account";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  unstable_update,
} = NextAuth({
  pages: {
    signIn: "/auth/register",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ account, profile }) {
      // Check if email is verified and ends with `@nitj.ac.in`
      // if (!profile?.email_verified || !profile?.email?.endsWith(`@nitj.ac.in`)) {
      //   return false;
      // }
      if (!profile?.email_verified) {
        return false;
      }
      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      if (session.user) {
        session.user.rollNo = token.rollNo as String;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email!;
        session.user.isOAuth = token.isOAuth as boolean;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      // Fetch the existing user by ID
      const existingUser = await getUserById(token.sub);
      if (!existingUser) {
        return token;
      }

      // Fetch the existing account
      const existingAccount = await getAccountByUserId(existingUser.id);
      token.isOAuth = !!existingAccount;
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;
      token.rollNo = existingUser.rollNo

      // Check if the user's email exists in the teacher collection
      if (token.email) {
        const teacher = await db.teacher.findUnique({
          where: {
            email: token.email,
          },
        });

        // If the email is found in the teacher collection and the user's current role is not already "TEACHER"
        if (teacher && existingUser.role !== UserRole.TEACHER) {
          token.role = UserRole.TEACHER;

          // Update the user's role in the MongoDB database
          await db.user.update({
            where: { id: existingUser.id },
            data: { role: UserRole.TEACHER },
          });

        }
      }

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
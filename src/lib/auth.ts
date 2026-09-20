import "server-only";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./db";
import { verifyPassword } from "./password";

/**
 * Admin authentication only — there are no public user accounts
 * anywhere in this application. Email + password against the Admin
 * table, hashed with bcrypt (src/lib/password.ts). No social
 * providers, no registration flow.
 *
 * Session strategy: JWT. NextAuth's Credentials provider is not
 * compatible with database-backed sessions (this is a hard
 * limitation of the library, not a choice made for convenience) —
 * JWT is the correct, standard approach for credentials-based auth
 * and is what every NextAuth credentials setup uses. The Admin's
 * role is embedded in the token/session via the callbacks below so
 * the future EDITOR role is usable without a schema or config change.
 */
export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/admin/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const admin = await prisma.admin.findUnique({
          where: { email: credentials.email },
        });

        if (!admin) {
          return null;
        }

        const isValidPassword = await verifyPassword(
          credentials.password,
          admin.passwordHash
        );

        if (!isValidPassword) {
          return null;
        }

        return {
          id: admin.id,
          email: admin.email,
          role: admin.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role: string }).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as typeof session.user & { role?: string }).role =
          token.role as string | undefined;
      }
      return session;
    },
  },
};

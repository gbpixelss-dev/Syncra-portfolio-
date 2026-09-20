import "server-only";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./db";
import { verifyPassword } from "./password";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  pages: { signIn: "/admin/login" },
  providers: [CredentialsProvider({name:"Credentials",credentials:{email:{label:"Email",type:"email"},password:{label:"Password",type:"password"}},async authorize(credentials){if(!credentials?.email||!credentials?.password)return null;const admin=await prisma.admin.findUnique({where:{email:credentials.email}});if(!admin)return null;const ok=await verifyPassword(credentials.password,admin.passwordHash);if(!ok)return null;return{id:admin.id,email:admin.email,role:admin.role};}})],
  callbacks:{async jwt({token,user}){if(user&&"role" in user){token.role=user.role as string;}return token;},async session({session,token}){if(session.user){(session.user as typeof session.user & {role?:string}).role=token.role as string|undefined;}return session;}}
};
import NextAuth, { type NextAuthOptions } from 'next-auth'
import GoogleProvider from "next-auth/providers/google";
import LineProvider from "next-auth/providers/line";
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from '@/lib/prisma';
import { compare } from 'bcrypt';
import { User } from '@prisma/client';

export const authOptions: NextAuthOptions={
  session: {
    strategy: 'jwt'
  },
  providers: [
       CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Sign in',
    // `credentials` is used to generate a form on the sign in page.
    // You can specify which fields should be submitted, by adding keys to the `credentials` object.
    // e.g. domain, username, password, 2FA token, etc.
    // You can pass any HTML attribute to the <input> tag through the object.
    credentials: {
      email: {
        label: 'Email',
        type: 'email',
        placeholder: 'hello@example.com'
      },
      password: { label: 'Password', type: 'password' }
    },
    async authorize(credentials) {
      if (!credentials?.email || !credentials.password) {
        return null
      }

      const user = await prisma.user.findUnique({
        where: {
          email: credentials.email
        }
      })

      if (!user) {
        return null
      }

      const isPasswordValid = await compare(
        credentials.password,
        user.password
      )

      if (!isPasswordValid) {
        return null
      }

      return {
        id: user.id + '',
        email: user.email,
        name: user.name,
        randomKey: 'Hey cool'
      }
    
      // if (user) {
      //   // Any object returned will be saved in `user` property of the JWT
      //   return user
      // } else {
      //   // If you return null then an error will be displayed advising the user to check their details.
      //   return null

      //   // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
      // }
    }
    }),
    LineProvider({
      clientId: process.env.LINE_CLIENT_ID ?? "",
      clientSecret: process.env.LINE_CLIENT_SECRET ?? "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRETC,
  callbacks: {
    session: ({ session, token }) => {
      console.log('Session Callback', { session, token })
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          randomKey: token.randomKey
        }
      }
      // return session
    },
    jwt: ({ token, user }) => {
      console.log('JWT Callback', { token, user })
      if (user) {
        const u = user as unknown as any
        return {
          ...token,
          id: u.id,
          randomKey: u.randomKey
        }
      }
      return token
    }
  },
  pages:{
    signIn: '/login'
  },
}
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
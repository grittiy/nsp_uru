import NextAuth, { type NextAuthOptions } from 'next-auth'
import GoogleProvider from "next-auth/providers/google";
import LineProvider from "next-auth/providers/line";
import CredentialsProvider from "next-auth/providers/credentials"
import FacebookProvider from "next-auth/providers/facebook";
import { prisma } from '@/lib/prisma';
import { compare } from 'bcrypt';
import { PrismaClient, Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';


export const authOptions: NextAuthOptions = {

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

        return user as any

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
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
    }),

    LineProvider({
      clientId: process.env.LINE_CLIENT_ID || '',
      clientSecret: process.env.LINE_CLIENT_SECRET || '',
    }),
  ],
  secret: process.env.NEXTAUTH_SECRETC,

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.role = token.role
      }
      return session
    }

    // async signIn({ account, profile }) {
    //         // console.log({ account, profile })

    //     if (!profile?.email) {
    //       throw new Error('No profile')
    //     }

    //     if (!profile?.name) {
    //       throw new Error('No profile')
    //     }
    //     const user = await prisma.user.upsert({
    //       where: {
    //         email: profile.email
    //       },
    //       create: {
    //         email: profile.email,
    //         name: profile.name,
    //         avatar: (profile as any).picture,
    //         password: profile.name,
    //         // pk 
    //         // tenant:{   
    //         //   create: {}
    //         // }
    //       },
    //       update: {
    //         name: profile.name,
    //         avatar: (profile as any).picture,
    //       }
    //     })
    // console.log('user', user)



    //    if (account?.provider === 'line' && profile) {
    // if (!profile?.email) {
    //   throw new Error('No profile')
    // }

    // if (!profile?.name) {
    //   throw new Error('No profile')
    // }
    // const user = await prisma.user.upsert({
    //   where: {
    //     email: profile.email
    //   },
    //   create: {
    //     email: profile.email,
    //     name: profile.name,
    //     // avatar: profile.picture
    //     password: profile.name
    //   },
    //   update: {
    //     name: profile.name
    //   }
    // })
    // console.log('user', user)
    // return profile.email.endsWith("@example.com")
    // }
    //   return true

    // },

    // session: ({session, token}) => {
    //   console.log('Session Callback', { session, token})
    //   return {
    //     ...session,
    //     user:{
    //       ...session.user,
    //       id: token.id,
    //       randomKey: token.randomKey
    //     }
    //   }
    // return session
    // },
    //   jwt: ({ token, user }) => {
    //     console.log('JWT Callback', { token, user })
    //     if (user) {
    //       const u = user as unknown as any
    //       return {
    //         ...token,
    //         id: u.id,
    //         randomKey: u.randomKey
    //       }
    //     }
    //     return token
    //   }

  },
  // events: {
  //   async signIn({ profile, account }) {
  //     // if (account.provider === 'credentials') {
  //       if (!profile?.email) {
  //         throw new Error('No profile')
  //       }

  //       if (!profile?.name) {
  //         throw new Error('No profile')
  //       }
  //       const user = await prisma.user.upsert({
  //         where: {
  //           email: profile.email
  //         },
  //         create: {
  //           email: profile.email,
  //           name: profile.name,
  //           avatar: (profile as any).picture,
  //           password: profile.name,
  //           // pk 
  //           // tenant:{   
  //           //   create: {}
  //           // }
  //         },
  //         update: {
  //           name: profile.name,
  //           avatar: (profile as any).picture,
  //         }
  //       })
  //     // }
  //   },
  // },
  pages: {
    signIn: '/login'
  },

}
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }


import NextAuth, { type NextAuthOptions } from 'next-auth'
import GoogleProvider from "next-auth/providers/google";
import LineProvider from "next-auth/providers/line";
import CredentialsProvider from "next-auth/providers/credentials"
import FacebookProvider from "next-auth/providers/facebook";
import { prisma } from '@/lib/prisma';
import { compare } from 'bcrypt';
import { hash } from "bcrypt"


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
      profile(profile) {
        if (profile && profile.sub !== undefined) {
          //console.log(profile)
          return {
            ...profile,
            role: profile.role ?? "USER",
            id: profile.sub.toString(),
            image: profile.avatar
          }
        } else {
          return {
            role: "USER",
            id: "",
            image: ""
          };
        }
      },
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',

    }),
    LineProvider({
      profile(profile) {
        if (profile && profile.sub !== undefined) {
          //console.log(profile)
          return {
            ...profile,
            role: profile.role ?? "USER",
            id: profile.sub.toString(),
            image: profile.avatar
          }
        } else {
          return {
            role: "USER",
            id: "",
            image: ""
          };
        }
      },
      clientId: process.env.LINE_CLIENT_ID || '',
      clientSecret: process.env.LINE_CLIENT_SECRET || '',
    }),
  ],
  secret: process.env.NEXTAUTH_SECRETC,

  callbacks: {
    async signIn({ account, profile }) {
      // const saltRounds  = 10
      // let hashedPassword = null
      // if (profile && profile.name) {
      //   const plaintextPassword = profile.name
      //   const hashedPassword = await hash(plaintextPassword, saltRounds);
      // }

      if (account && account.provider === 'google' && profile) {
        let plaintextPassword: string | undefined = undefined;
        let hashedPassword: string | undefined = undefined;

        if (profile.name) {
          plaintextPassword = profile.name;
          const saltRounds = 10;
          hashedPassword = await hash(plaintextPassword, saltRounds);
        }
        if (!profile?.email) {
          throw new Error('No profile')
        }

        if (!profile?.name) {
          throw new Error('No profile')
        }
        const user = await prisma.user.upsert({
          where: {
            email: profile.email,
          },
          create: {
            email: profile.email,
            name: profile.name,
            avatar: (profile as any).picture,
            password: hashedPassword || '',
            // role:'USER',
            // pk 
            // tenant:{   
            //   create: {}
            // }
          },
          update: {
            name: profile.name,
            avatar: (profile as any).picture,
          }
        })
      }
      if (account && account.provider === 'line' && profile) {
        try {
          let plaintextPassword: string | undefined = undefined;
          let hashedPassword: string | undefined = undefined;

          if (profile.name) {
            plaintextPassword = profile.name;
            const saltRounds = 10;
            hashedPassword = await hash(plaintextPassword, saltRounds);
          }

          if (!profile?.name) {
            throw new Error('No profile')
          }
          const user = await prisma.user.upsert({
            where: {
              lineId: profile.sub,
            },
            create: {
              name: profile.name,
              lineId: profile.sub,
              avatar: (profile as any).picture,
              password: hashedPassword || '',

              // pk 
              // tenant:{   
              //   create: {}
              // }
            },
            update: {
              name: profile.name,
              avatar: (profile as any).picture,
            }
          })

        } catch (err) {
          console.error('LINE Login Error:', err);
          return false;
        }
      }
      return true
    },
    async jwt({ token, user,account,profile }) {
console.log({token,account,profile,user})
      if (user) {
        token.id = user.id
        token.role = user.role
      }

      // if (profile) {
      //   const user = await prisma.user.findUnique({
      //     where :{
      //       email:profile.email
      //     }
      //   })

      //   if (!user) {
      //     throw new Error('No user found')
      //   }
      //   token.id = user.id
      //   token.reservation = {
      //     id: user.reservationId
      //   }
      //   token.borrow ={
      //     id: user.borrowId
      //   }
      // }
      return token
    },
    async session({ session, token, user }) {
      if (token && session.user) {
        session.user.role = token.role

      }
      if (token && user) {
        session.user.role = user.role;
      }
      return session
    }
  },
  pages: {
    signIn: '/login'
  },

}
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }


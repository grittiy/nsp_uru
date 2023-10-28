import { User,getServerSession } from "next-auth"

export const session = async ({ session, token, user }: any) => {
    if (token && session.user) {
            session.user.role = token.role
    
          }
          if (token && user) {
            session.user.role = user.role;
          }
    session.user.id = token.id
    session.user.reservation = token.reservation
    session.user.borrow = token.borrow
    return session
  }
  

export const getUserSession = async (): Promise<User> => {
    const authUserSession = await getServerSession({
      callbacks: {
        session
      }
    })
    if (!authUserSession) throw new Error('unauthorized')
    return authUserSession.user
  }
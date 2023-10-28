import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
    interface Session {
        user?: DefaultUser & { id: string; role: string };
        user: User
    }
    interface User extends DefaultUser {
        role: string;
    }
    interface User {
      id:string;
      reservation: {
        id: string
      }
      borrow: {
        id: string
      }
    }

  
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
  }
}
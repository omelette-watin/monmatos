/* eslint-disable @typescript-eslint/no-unused-vars */
import { Movement } from "@prisma/client"
import "next-auth/jwt"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: User
  }

  interface User {
    group: {
      id: string
      name: string
      movement: Movement
    }
    user?: {
      id: string
      isAdmin: boolean
      email: string
      firstName?: string
      lastName?: string
    }
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    user: User
  }
}

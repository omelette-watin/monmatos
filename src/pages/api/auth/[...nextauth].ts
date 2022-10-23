import { prisma } from "@/server/db/client"
import NextAuth, { type NextAuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"

import { loginSchema } from "@/common/validation/auth"

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        identifier: { label: "Identifiant de Groupe", type: "text" },
      },
      authorize: async (credentials) => {
        const creds = await loginSchema.parseAsync(credentials)

        const group = await prisma.group.findUnique({
          where: {
            id: creds?.identifier,
          },
        })

        if (!group) return null

        return {
          group: {
            id: group.id,
            name: group.name,
            movement: group.movement,
          },
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user: infos }) => {
      if (infos) {
        const { user, group } = infos

        token.user = {
          group,
          user,
        }
      }

      return token
    },
    session: async ({ session, token: { user } }) => {
      session.user = user

      return session
    },
  },
  jwt: {
    maxAge: 15 * 24 * 30 * 60, // 15 days
  },
  pages: {
    signIn: "/connexion",
    error: "/connexion",
    newUser: "/inscription",
  },
}

export default NextAuth(authOptions)

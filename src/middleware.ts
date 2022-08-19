import { withAuth } from "next-auth/middleware"

export default withAuth({
  callbacks: {
    authorized: ({ token, req }) => {
      if (
        req.nextUrl.pathname.startsWith("/inscription") ||
        req.nextUrl.pathname.startsWith("/connexion")
      ) {
        return true
      }

      return token?.user.id
    },
  },
})

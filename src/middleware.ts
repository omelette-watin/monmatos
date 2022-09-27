import { withAuth } from "next-auth/middleware"

export const config = {
  matcher: ["/", "/([^/.]*)"],
}

export default withAuth({
  callbacks: {
    authorized: ({ token, req }) => {
      if (
        req.nextUrl.pathname.startsWith("/group") ||
        req.nextUrl.pathname.startsWith("/tentes")
      ) {
        return token?.user.id
      }

      return true
    },
  },
})

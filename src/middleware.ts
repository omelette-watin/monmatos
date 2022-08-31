import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  (req) => {
    if (req.nextauth.token && req.nextUrl.pathname === "/") {
      return NextResponse.redirect(new URL("/app", req.url))
    }
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        if (req.nextUrl.pathname.startsWith("/app")) {
          return token?.user.id
        }

        return true
      },
    },
  },
)

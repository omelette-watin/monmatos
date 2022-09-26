import { NextRequest, NextResponse } from "next/server"

export const config = {
  matcher: ["/", "/([^/.]*)"],
}

export default function middleware(req: NextRequest) {
  const url = req.nextUrl

  // Get hostname of request (e.g. demo.vercel.pub, demo.localhost:3000)
  const hostname = req.headers.get("host") || "monmatos.org"

  /*  You have to replace ".vercel.pub" with your own domain if you deploy this example under your domain.
      You can also use wildcard subdomains on .vercel.app links that are associated with your Vercel team slug
      in this case, our team slug is "platformize", thus *.platformize.vercel.app works. Do note that you'll
      still need to add "*.platformize.vercel.app" as a wildcard domain on your Vercel dashboard. */
  const currentHost =
    process.env.NODE_ENV === "production" && process.env.VERCEL === "1"
      ? hostname.replace(`.monmatos.org`, "")
      : hostname.replace(`.localhost:3000`, "")
  // rewrites for app pages

  if (currentHost == "app") {
    if (
      url.pathname === "/connexion" &&
      (req.cookies.get("next-auth.session-token") ||
        req.cookies.get("__Secure-next-auth.session-token"))
    ) {
      url.pathname = "/"

      return NextResponse.redirect(url)
    }

    url.pathname = `/app${url.pathname}`

    return NextResponse.rewrite(url)
  }

  // rewrite root application to `/home` folder
  // if (hostname === "localhost:3000" || hostname === "monmatos.vercel.app") {
  //   url.pathname = `/www${url.pathname}`

  //   return NextResponse.rewrite(url)
  // }
}

// import { withAuth } from "next-auth/middleware"
// import { NextResponse } from "next/server"

// export default withAuth(
//   (req) => {
//     if (req.nextauth.token && req.nextUrl.pathname === "/") {
//       return NextResponse.redirect(new URL("/app", req.url))
//     }
//   },
//   {
//     callbacks: {
//       authorized: ({ token, req }) => {
//         if (req.nextUrl.pathname.startsWith("/app")) {
//           return token?.user.id
//         }

//         return true
//       },
//     },
//   },
// )

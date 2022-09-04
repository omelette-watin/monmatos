import Auth from "@/components/business/Auth"
import AppToaster from "@/components/ui/AppToaster"
import { trpc } from "@/utils/trpc"
import { NextPage } from "next"
import { SessionProvider } from "next-auth/react"
import { AppProps } from "next/app"
import { Router } from "next/router"
import NProgress from "nprogress"
import { ReactElement, ReactNode, useEffect } from "react"
import "../styles/globals.css"

NProgress.configure({
  showSpinner: false,
  easing: "ease",
  speed: 600,
})

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
  protected?: boolean
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const App = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) => {
  const getLayout = Component.getLayout || ((page) => page)
  useEffect(() => {
    Router.events.on("routeChangeStart", () => NProgress.start())
    Router.events.on("routeChangeComplete", () => NProgress.done())
    Router.events.on("routeChangeError", () => NProgress.done())
  }, [])

  return (
    <SessionProvider session={session}>
      <AppToaster />
      {Component.protected ? (
        <Auth>
          <>{getLayout(<Component {...pageProps} />)}</>
        </Auth>
      ) : (
        <>{getLayout(<Component {...pageProps} />)}</>
      )}
    </SessionProvider>
  )
}

export default trpc.withTRPC(App)

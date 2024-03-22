import AppToaster from "@/components/ui/AppToaster"
import { trpc } from "@/utils/trpc"
import { NextPage } from "next"
import { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
import { AppProps } from "next/app"
import { ReactElement, ReactNode } from "react"
import "../styles/globals.css"

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
} & { pageProps: { session: Session | null | undefined } }

const App = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) => {
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <SessionProvider session={session}>
      <AppToaster />
      {getLayout(<Component {...pageProps} />)}
    </SessionProvider>
  )
}

export default trpc.withTRPC(App)

import Navbar from "@/components/app/Navbar"
import useRequireAuth from "@/components/hooks/useRequireAuth"
import LoadingPage from "@/components/ui/LoadingPage"
import type { WithChildren } from "@/types/common"
import Head from "next/head"

interface LayoutProps extends WithChildren {
  title?: string
}

const AppLayout = ({ children, title }: LayoutProps) => {
  const pageTitle = `${title ? `${title} - ` : ""} MonMatos`
  const description = "Gérez votre matériel en un clin d'oeil"
  const logo = "/favicon.ico"
  const session = useRequireAuth()

  if (!session) return <LoadingPage />

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <link rel="icon" href={logo} />
        <link rel="shortcut icon" type="image/x-icon" href={logo} />
        <link rel="apple-touch-icon" sizes="180x180" href={logo} />

        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />

        <meta itemProp="name" content={pageTitle} />
        <meta itemProp="description" content={description} />
        <meta itemProp="image" content={logo} />
        <meta name="description" content={description} />

        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={logo} />
        <meta property="og:type" content="website" />
      </Head>
      <Navbar />
      <main className="mx-auto p-4 lg:container">{children}</main>
    </>
  )
}

export default AppLayout

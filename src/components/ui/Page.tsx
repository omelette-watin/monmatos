import { UIProps } from "@/utils/typedProps"
import Head from "next/head"
import { FC } from "react"
import Container from "./Container"

const Page: FC<UIProps<{ title?: string }>> = ({
  children,
  title,
  ...otherProps
}) => {
  const pageTitle = `${title ? `${title} - ` : ""}Mon Matos`

  return (
    <main {...otherProps}>
      <Head>
        <title>{pageTitle}</title>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="MonMatos, outil de gestion de matériel scout. Simple, gratuit et open-source !"
        />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_URL}`} />
        <meta
          property="og:title"
          content="MonMatos  | outil de gestion de matériel scout"
        />
        <meta
          property="og:description"
          content="Centralisez et simplifiez votre suivi de matériel 🏕"
        />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_URL}/apple-touch-icon.png`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>{children}</Container>
    </main>
  )
}

export default Page

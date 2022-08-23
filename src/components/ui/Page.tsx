import { UIProps } from "@/utils/typedProps"
import Head from "next/head"
import { FC } from "react"
import Container from "./Container"

const Page: FC<UIProps<{ title?: string }>> = ({
  children,
  title,
  ...otherProps
}) => {
  const pageTitle = `${title ? `${title} | ` : ""}Mon Matos`

  return (
    <main {...otherProps}>
      <Head>
        <title>{pageTitle}</title>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>{children}</Container>
    </main>
  )
}

export default Page

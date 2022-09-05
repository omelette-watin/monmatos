import { ReactElement } from "react"
import Page from "../Page"
import Header from "../Header"

const PublicLayout = ({
  children,
  title,
}: {
  children: ReactElement
  title?: string
}) => {
  return (
    <div className="min-h-screen w-full">
      <Header />
      <Page title={title} className="py-4">
        {children}
      </Page>
    </div>
  )
}

export default PublicLayout

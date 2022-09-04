import { ReactElement } from "react"
import Header from "../Header"
import Page from "../Page"

const AppLayout = ({
  children,
  title,
}: {
  children: ReactElement
  title?: string
}) => {
  return (
    <div className="min-h-screen w-[100vw]">
      <Header />
      <Page title={title} className="py-4">
        {children}
      </Page>
    </div>
  )
}

export default AppLayout

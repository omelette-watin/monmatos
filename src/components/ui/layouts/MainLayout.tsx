import { ReactElement } from "react"
import Page from "../Page"
import Header from "../Header"

const MainLayout = ({
  children,
  title,
}: {
  children: ReactElement
  title?: string
}) => {
  return (
    <div className="min-h-screen w-[100vw]">
      <Header />
      <Page title={title} className="min-h-[50000px] p-4">
        {children}
      </Page>
    </div>
  )
}

export default MainLayout

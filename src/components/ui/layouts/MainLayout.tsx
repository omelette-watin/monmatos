import { ReactElement } from "react"
import Page from "../Page"
import Header from "../Header"
import Notification from "@/components/business/Notification"

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
      <Page title={title} className="py-4">
        {children}
        <Notification />
      </Page>
    </div>
  )
}

export default MainLayout

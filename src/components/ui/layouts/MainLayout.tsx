import { ReactElement } from "react"
import Page from "../Page"
import Header from "../Header"
import Notification from "@/components/business/Notification"
import Modal from "../modal"

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
        <Modal />
        <Notification />
      </Page>
    </div>
  )
}

export default MainLayout

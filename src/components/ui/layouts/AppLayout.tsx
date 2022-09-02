import Notification from "@/components/business/Notification"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { ReactElement, useEffect } from "react"
import Header from "../Header"
import Modal from "../modal"
import Page from "../Page"

const AppLayout = ({
  children,
  title,
}: {
  children: ReactElement
  title?: string
}) => {
  const router = useRouter()
  const { status } = useSession()

  useEffect(() => {
    router.prefetch("/connexion")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/connexion")
    }
  }, [status, router])

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

export default AppLayout

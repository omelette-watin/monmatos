import { ReactElement } from "react"
import { Toaster } from "react-hot-toast"
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
      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 1500,
        }}
      />
      <Page title={title} className="py-4">
        {children}
      </Page>
    </div>
  )
}

export default AppLayout

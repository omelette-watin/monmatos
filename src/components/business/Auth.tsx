import { useSession } from "next-auth/react"
import { ReactElement } from "react"
import LoadingPage from "../ui/LoadingPage"

const Auth = ({ children }: { children: ReactElement }) => {
  const { status } = useSession({ required: true })

  if (status === "loading") return <LoadingPage />

  return children
}

export default Auth

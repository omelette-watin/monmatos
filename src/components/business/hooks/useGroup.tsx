import { Session } from "next-auth"
import { useSession } from "next-auth/react"

export const useGroup = () => {
  const { data } = useSession()

  return (data as unknown as Session).user
}

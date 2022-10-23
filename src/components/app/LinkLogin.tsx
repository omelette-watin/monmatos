import { ILogin } from "@/common/validation/auth"
import Loading from "@/components/ui/Loading"
import Logo from "@/components/ui/Logo"
import { signIn, useSession } from "next-auth/react"
import Head from "next/head"
import { useRouter } from "next/router"
import { useCallback, useEffect } from "react"

interface LinkLoginProps {
  groupId: string
  callbackUrl: string
}

const LinkLogin = ({ groupId, callbackUrl }: LinkLoginProps) => {
  const router = useRouter()
  const { data: session } = useSession()
  const login = useCallback(
    async (values: ILogin) => {
      const res = await signIn("credentials", {
        ...values,
        redirect: false,
      })

      if (!res?.ok) {
        router.push(`/connexion?error=GroupNotFound&callbackUrl=${callbackUrl}`)

        return
      }

      router.push(`${callbackUrl}?connected=1`)
    },
    [callbackUrl, router],
  )

  useEffect(() => {
    if (typeof session !== "undefined") {
      if (session?.user?.group.id === groupId) {
        router.push(callbackUrl)

        return
      }

      login({ identifier: groupId })
    }
  }, [callbackUrl, groupId, login, router, session])

  return (
    <>
      <Head>
        <title>Connexion - MonMatos</title>
      </Head>
      <div className="flex h-screen w-full flex-col items-center justify-start gap-24 pt-20">
        <Logo size="lg" />
        <Loading />
      </div>
    </>
  )
}

export default LinkLogin

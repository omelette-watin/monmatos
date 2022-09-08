import { ILogin } from "@/common/validation/auth"
import SignInForm from "@/components/business/sign/SignInForm"
import Loading from "@/components/ui/Loading"
import Logo from "@/components/ui/Logo"
import Page from "@/components/ui/Page"
import { GetServerSideProps } from "next"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useCallback, useEffect } from "react"

interface SignInPageProps {
  error: string | null
  callbackUrl: string
  groupId: string | null
}

const SignInPage = ({ error, callbackUrl, groupId }: SignInPageProps) => {
  const router = useRouter()
  const { data: session } = useSession()

  const handleSubmit = useCallback(
    async (values: ILogin) => {
      await signIn("credentials", { ...values, callbackUrl })
    },
    [callbackUrl],
  )

  useEffect(() => {
    if (groupId) {
      if (session?.user?.id === groupId) {
        router.push(callbackUrl)

        return
      }

      if (session?.user?.id !== groupId) {
        handleSubmit({ identifier: groupId })
      }
    }
  }, [session, groupId, router, callbackUrl, handleSubmit])

  if (!groupId) {
    return <SignInForm callbackUrl={callbackUrl} error={error} />
  }

  return (
    <Page title="Connexion">
      <div className="flex h-screen w-full flex-col items-center justify-start gap-24 pt-20">
        <Logo size="lg" />
        <Loading />
      </div>
    </Page>
  )
}

export default SignInPage

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { i = null, callbackUrl = "/app", error = null } = query

  return {
    props: {
      groupId: i,
      callbackUrl,
      error,
    },
  }
}

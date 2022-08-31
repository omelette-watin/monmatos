import { ILogin } from "@/common/validation/auth"
import Loading from "@/components/ui/Loading"
import Logo from "@/components/ui/Logo"
import Page from "@/components/ui/Page"
import { Field, Form, Formik } from "formik"
import { NextPage } from "next"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useCallback } from "react"

const SignInPage: NextPage = () => {
  const router = useRouter()
  const { query } = router
  const { status, data: session } = useSession()
  const groupId = query.i as string
  const callbackUrl = (query.callbackUrl as string) || "/app"
  const credsError = query.error as string
  const errorMessage = credsError ? "Identifiant incorrect" : null

  const handleSubmit = useCallback(
    async (values: ILogin) => {
      await signIn("credentials", { ...values, callbackUrl })
    },
    [callbackUrl],
  )

  if (groupId) {
    if (status !== "loading") {
      if (session?.user?.id === groupId) {
        router.push(callbackUrl)
      } else {
        handleSubmit({ identifier: groupId })
      }
    }
  }

  if (!groupId) {
    return (
      <Page title="Connexion">
        <Formik
          initialValues={{
            identifier: "ca5e5d0c-3bee-4269-9b9b-4e2372ffdc82",
          }}
          onSubmit={handleSubmit}
        >
          <Form className="m-auto my-10 flex w-fit flex-col gap-3">
            <Field name="identifier" className="border border-red-400" />
            {errorMessage && (
              <p className="font-bold text-red-500">{errorMessage}</p>
            )}
            <button type="submit">GO</button>
          </Form>
        </Formik>
      </Page>
    )
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

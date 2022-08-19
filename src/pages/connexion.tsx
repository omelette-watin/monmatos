import { ILogin } from "@/common/validation/auth"
import Page from "@/components/ui/Page"
import { Field, Form, Formik } from "formik"
import { NextPage } from "next"
import { signIn } from "next-auth/react"
import { useRouter } from "next/router"
import { useCallback } from "react"

const SignInPage: NextPage = () => {
  const { query } = useRouter()
  const groupId = query.i as string
  const callbackUrl = (query.callbackUrl as string) || "/"
  const credsError = query.error as string
  const errorMessage = credsError ? "Identifiant incorrect" : null

  const handleSubmit = useCallback(
    async (values: ILogin) => {
      await signIn("credentials", { ...values, callbackUrl })
    },
    [callbackUrl],
  )

  if (groupId) {
    handleSubmit({ identifier: groupId })

    return <p className="min-h-screen bg-green-400">Loading</p>
  }

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

export default SignInPage

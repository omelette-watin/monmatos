import { ILogin } from "@/common/validation/auth"
import Button from "@/components/ui/Button"
import ButtonLink from "@/components/ui/ButtonLink"
import Icon from "@/components/ui/Icon"
import Loading from "@/components/ui/Loading"
import Logo from "@/components/ui/Logo"
import Page from "@/components/ui/Page"
import classNames from "classnames"
import { Field, Form, Formik } from "formik"
import { NextPage } from "next"
import { signIn, useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useCallback, useEffect } from "react"

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

  useEffect(() => {
    router.prefetch("/app/tentes")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
          <Form className="sm:bg-card mx-auto mt-10 flex w-[400px] max-w-[90vw] flex-col items-center gap-8 p-6 sm:rounded-md sm:shadow-md">
            <Logo size="sm" className="self-start" />
            <h1 className="text-3xl font-bold sm:text-4xl">Connexion</h1>
            <Field
              name="identifier"
              className={classNames(
                "w-full rounded-md px-2 py-1 shadow-inner outline-none",
                {
                  "border-2 border-red-600 text-red-600": errorMessage,
                },
              )}
            />
            {errorMessage && (
              <div className="-mt-7 flex w-fit cursor-pointer items-center space-x-1 self-end rounded-md py-1 px-2 text-sm font-medium text-red-600">
                <Icon name="MdOutlineErrorOutline" className="text-xl" />
                <span>{errorMessage}</span>
              </div>
            )}
            <div className="flex flex-col items-center gap-2">
              <Button
                type="submit"
                size="xs"
                icon="ArrowRightIcon"
                iconPosition="right"
                variant="black"
                className="max-w-fit"
              >
                Me connecter
              </Button>
              <p>ou</p>
              <ButtonLink
                href="/inscription"
                size="xs"
                className="max-w-fit"
                variant="white"
              >
                Inscrire mon groupe
              </ButtonLink>
            </div>
            <Link href="/">
              <a className="underline hover:text-emerald-600">
                Revenir à l'accueil
              </a>
            </Link>
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

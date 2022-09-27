import { ILogin, loginSchema } from "@/common/validation/auth"
import { zodFormikAdapter } from "@/common/validation/zodFormikAdapter"
import Button from "@/components/ui/Button"
import Logo from "@/components/ui/Logo"
import Tooltip from "@/components/ui/Tooltip"
import { Disclosure } from "@headlessui/react"
import { ChevronUpIcon, EyeIcon, EyeOffIcon } from "@heroicons/react/solid"
import classNames from "classnames"
import { Field, Form, Formik } from "formik"
import { signIn } from "next-auth/react"
import Head from "next/head"
import Link from "next/link"
import { useCallback, useEffect, useState } from "react"
import toast from "react-hot-toast"
import LoadingDots from "../ui/LoadingDots"

interface SignInFormProps {
  callbackUrl: string
  error: string | null
}

const SignInForm = ({ callbackUrl, error }: SignInFormProps) => {
  const [showIdentifier, setShowIdentifier] = useState(false)
  const showId = () => setShowIdentifier(true)
  const hideId = () => setShowIdentifier(false)
  const handleSubmit = useCallback(
    async (values: ILogin) => {
      await signIn("credentials", { ...values, callbackUrl })
    },
    [callbackUrl],
  )

  useEffect(() => {
    if (error) {
      toast.error(errorMessages[error] || "Veuillez réessayer plus tard", {
        id: "error-message",
      })
    }

    return () => toast.dismiss("error-message")
  }, [error])

  return (
    <div className="bg-main flex min-h-screen flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Me connecter - MonMatos</title>
      </Head>
      <Formik
        initialValues={{ identifier: "" }}
        validationSchema={zodFormikAdapter(loginSchema)}
        onSubmit={handleSubmit}
      >
        {({ isValid, isSubmitting, dirty }) => (
          <div className="mx-auto sm:w-full sm:max-w-lg">
            <Logo className="mb-6 pl-4" />
            <Form className="mx-auto flex flex-col gap-10 rounded-md bg-white p-5 text-slate-900 shadow-lg sm:p-10">
              <h1 className="text-2xl font-bold">
                Connectez-vous à votre{" "}
                <span className="text-emerald-600">Groupe</span>
              </h1>
              <label htmlFor="identifier" className="-mb-8 font-medium">
                Identifiant de groupe
              </label>
              <div className="flex w-full items-center">
                <div className="flex w-full items-center gap-4 rounded-lg border-2 border-slate-300 p-3 focus-within:border-blue-600">
                  <Field
                    name="identifier"
                    id="identifer"
                    type={showIdentifier ? "text" : "password"}
                    placeholder="ex: ae64a5-def8-4705-8d04-088fa"
                    className="w-full bg-transparent text-sm outline-none"
                  />
                  <div className="group relative">
                    {showIdentifier ? (
                      <EyeOffIcon
                        className="hover:text-blue-gray-900 w-6 cursor-pointer transition-colors"
                        onClick={hideId}
                      />
                    ) : (
                      <EyeIcon
                        className="hover:text-blue-gray-900 w-6 cursor-pointer transition-colors"
                        onClick={showId}
                      />
                    )}
                    <Tooltip className="-left-16 whitespace-nowrap">
                      {`${
                        showIdentifier ? "Cacher" : "Afficher"
                      } l'identifiant`}
                    </Tooltip>
                  </div>
                </div>
              </div>
              <Disclosure>
                {({ open }) => (
                  <div>
                    <Disclosure.Button className="-mt-5 flex w-full justify-between rounded-lg bg-blue-50 px-4 py-2 text-left text-sm font-medium text-blue-900 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
                      <span>Je n'ai pas mon identifiant</span>
                      <ChevronUpIcon
                        className={classNames(
                          "h-5 w-5 transform text-blue-900 transition-transform duration-300",
                          {
                            "rotate-180": !open,
                            "rotate-0": open,
                          },
                        )}
                      />
                    </Disclosure.Button>

                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm  text-slate-900">
                      Si vous avez un QR Code vous pouvez le scanner avec votre
                      caméra. Sinon demandez à ce que l'on vous invite dans le
                      groupe.
                    </Disclosure.Panel>
                  </div>
                )}
              </Disclosure>
              <Button
                size="lg"
                variant="black"
                disabled={isSubmitting || !isValid || !dirty}
                className="mx-auto text-base font-medium normal-case"
                type="submit"
              >
                {isSubmitting ? <LoadingDots /> : "Continuer"}
              </Button>
              <p className="text-sm">
                Votre groupe n'est pas encore enregistré ?{" "}
                <Link href="/inscription">
                  <a className="w-fit pl-1 font-medium text-blue-500 focus:bg-blue-300/20 focus:outline-none">
                    Inscrivez-le
                  </a>
                </Link>
              </p>
            </Form>
            <Link href="/">
              <a className="mx-auto mt-10 block w-fit text-sm underline">
                Revenir à l'accueil
              </a>
            </Link>
          </div>
        )}
      </Formik>
    </div>
  )
}

const errorMessages: Record<string, string> = {
  CredentialsSignin: "Identifiant incorrect",
  SessionRequired: "Veuillez vous reconnecter",
  GroupNotFound: "Nous n'avons pas trouver ce groupe",
}

export default SignInForm

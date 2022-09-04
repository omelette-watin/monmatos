import { ILogin } from "@/common/validation/auth"
import ButtonLink from "@/components/ui/ButtonLink"
import Icon from "@/components/ui/Icon"
import Logo from "@/components/ui/Logo"
import { UIProps } from "@/utils/typedProps"
import classNames from "classnames"
import { Field, Form, Formik } from "formik"
import { signIn } from "next-auth/react"
import Head from "next/head"
import Link from "next/link"
import { FC, useCallback, useEffect, useState } from "react"
import { toast } from "react-hot-toast"

const errorMessages: Record<string, string> = {
  CredentialsSignin: "Identifiant incorrect",
}

const LoginForm: FC<UIProps<{ callbackUrl: string; error: string | null }>> = ({
  callbackUrl,
  error,
}) => {
  const [showHint, setShowHint] = useState(false)
  const [showIdentifier, setShowIdentifier] = useState(false)
  const handleSubmit = useCallback(
    async (values: ILogin) => {
      await signIn("credentials", { ...values, callbackUrl })
    },
    [callbackUrl],
  )
  const showId = () => {
    setShowIdentifier(true)
    setTimeout(() => setShowIdentifier(false), 1000)
  }

  useEffect(() => {
    if (error) {
      toast.error(errorMessages[error] || "Veuillez réessayer plus tard", {
        id: "error-message",
      })
    }

    return () => toast.dismiss("error-message")
  })

  return (
    <>
      <Head>
        <title>Connexion | MonMatos</title>
      </Head>
      <div className="flex">
        <div className="hidden min-h-screen w-full items-center justify-center bg-emerald-500 lg:flex">
          <div className="flex flex-col gap-1 text-white">
            <Logo white size="xl" />
            <p className="self-end font-semibold">
              Gérer mon matériel en un clic !
            </p>
          </div>
        </div>
        <div className="bg-main flex min-h-screen w-full flex-col items-center justify-between gap-14 px-6 py-8 lg:pt-28">
          <div className="flex w-full flex-col items-center gap-10">
            <div className="self-start lg:hidden">
              <Logo />
            </div>
            <h1 className="text-4xl font-black sm:text-5xl lg:text-emerald-500">
              Me connecter
            </h1>
            <Formik
              initialValues={{
                identifier: "ca5e5d0c-3bee-4269-9b9b-4e2372ffdc82",
              }}
              onSubmit={handleSubmit}
            >
              <Form className="flex w-[400px] max-w-[90vw] flex-col items-center gap-2">
                <h3 className="self-start font-medium">
                  Identifiant de groupe
                </h3>

                <div className="flex w-full items-center">
                  <div className="bg-card flex w-full items-center gap-4 rounded-l-lg border-2 p-2 shadow-inner focus-within:border-blue-600">
                    <button type="button" onClick={showId}>
                      <Icon name="IoMdEye" className="text-xl" />
                    </button>
                    <Field
                      type={showIdentifier ? "text" : "password"}
                      name="identifier"
                      placeholder="Identifiant"
                      className="w-full bg-transparent text-sm outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="flex h-full items-center justify-center rounded-r-lg bg-emerald-500 px-3 text-white shadow-sm transition-[filter] hover:brightness-110 focus:brightness-110"
                  >
                    <Icon name="ArrowRightIcon" />
                  </button>
                </div>
                <div className="relative flex w-[400px] max-w-[90vw] flex-col items-center bg-blue-50 font-medium text-blue-900">
                  <button
                    type="button"
                    onClick={() => setShowHint((prev) => !prev)}
                    className={classNames(
                      "z-10 flex w-full cursor-pointer items-center gap-1 self-start rounded-lg bg-blue-100 p-2 text-lg shadow-sm transition-all duration-500",
                      {
                        "rounded-b-none": showHint,
                      },
                    )}
                  >
                    <Icon name="RiQuestionLine" />
                    <div className="text-sm">Je n'ai pas mon identifiant</div>
                    <Icon
                      name="RiArrowDownSLine"
                      className={classNames(
                        "ml-auto transition-all duration-500",
                        {
                          "rotate-0": !showHint,
                          "-rotate-180": showHint,
                        },
                      )}
                    />
                  </button>
                  <div
                    className={classNames(
                      "absolute bottom-0 h-fit w-full translate-y-full overflow-hidden rounded-b-lg bg-blue-50 shadow-md transition-[max-height] duration-500",
                      {
                        "max-h-0": !showHint,
                        "max-h-40": showHint,
                      },
                    )}
                  >
                    <div className="space-y-2 p-4 text-sm">
                      <p>
                        - Si vous avez un QR Code vous pouvez le scanner avec
                        votre caméra
                      </p>
                      <p>- Demandez à ce que l'on vous invite dans le groupe</p>
                    </div>
                  </div>
                </div>
              </Form>
            </Formik>
            <div className="flex flex-col items-center gap-4 py-6 text-center">
              <p className="text-sm">Toujours pas sur MonMatos ?</p>
              <ButtonLink
                href="/inscription"
                variant="black"
                size="xs"
                className="max-w-fit"
                icon="FaPen"
              >
                Inscrire mon groupe
              </ButtonLink>
            </div>
          </div>

          <Link href="/">
            <a className="text-sm underline">Revenir à l'accueil</a>
          </Link>
        </div>
      </div>
    </>
  )
}

export default LoginForm

// <Button
//   type="button"
//   variant="black"
//   icon="MdQrCodeScanner"
//   size="sm"
//   className="max-w-fit"
// >
//   J'ai un QR Code !
// </Button>

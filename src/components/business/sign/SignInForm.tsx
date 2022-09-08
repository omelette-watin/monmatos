import { ILogin } from "@/common/validation/auth"
import Accordion from "@/components/ui/Accordion"
import Icon from "@/components/ui/Icon"
import { UIProps } from "@/utils/typedProps"
import { Field, Form, Formik } from "formik"
import { signIn } from "next-auth/react"
import Head from "next/head"
import { FC, useCallback, useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import FormWrapper from "./FormWrapper"
import SignWrapper from "./SignWrapper"

const errorMessages: Record<string, string> = {
  CredentialsSignin: "Identifiant incorrect",
  SessionRequired: "Veuillez vous reconnecter",
}

const SignInForm: FC<
  UIProps<{ callbackUrl: string; error: string | null }>
> = ({ callbackUrl, error }) => {
  const [showIdentifier, setShowIdentifier] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const handleSubmit = useCallback(
    async (values: ILogin) => {
      setSubmitting(true)
      await signIn("credentials", { ...values, callbackUrl })
    },
    [callbackUrl],
  )
  const showId = () => setShowIdentifier(true)
  const hideId = () => setShowIdentifier(false)

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
      <SignWrapper>
        <FormWrapper title="Me connecter">
          <Formik
            initialValues={{
              identifier: "",
            }}
            onSubmit={handleSubmit}
          >
            <Form className="flex w-[400px] max-w-[90vw] flex-col items-center gap-2">
              <h3 className="self-start font-medium">Identifiant de groupe</h3>

              <div className="flex w-full items-center">
                <div className="flex w-full items-center gap-4 rounded-l-lg border-2 bg-slate-100 p-2 shadow-inner focus-within:border-blue-600">
                  <button type="button" onMouseDown={showId} onMouseUp={hideId}>
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
                  disabled={submitting}
                  className="flex h-full items-center justify-center rounded-r-lg bg-emerald-500 px-3 text-white shadow-sm transition-[filter] hover:brightness-110 focus:brightness-110"
                >
                  {submitting ? (
                    <div className="flex items-center justify-center px-[2px]">
                      <div
                        className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-white border-r-transparent"
                        role="status"
                      />
                    </div>
                  ) : (
                    <Icon name="ArrowRightIcon" />
                  )}
                </button>
              </div>
              <Accordion label="Je n'ai pas mon identifiant">
                <div className="space-y-2 p-4 text-sm">
                  <p>
                    - Si vous avez un QR Code vous pouvez le scanner avec votre
                    caméra
                  </p>
                  <p>- Demandez à ce que l'on vous invite dans le groupe</p>
                </div>
              </Accordion>
            </Form>
          </Formik>
        </FormWrapper>
      </SignWrapper>
    </>
  )
}

export default SignInForm

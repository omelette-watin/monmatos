import { IRegister, registerSchema } from "@/common/validation/auth"
import { zodFormikAdapter } from "@/common/validation/zodFormikAdapter"
import Logo from "@/components/ui/Logo"
import { trpc } from "@/utils/trpc"
import { Form, Formik, FormikProps } from "formik"
import { signIn } from "next-auth/react"
import Head from "next/head"
import Link from "next/link"
import { useCallback, useState } from "react"
import toast from "react-hot-toast"
import CustomUnitsStep from "./CustomUnitsStep"
import DefaultUnitStep from "./DefaultUnitStep"
import NameAndMovementStep from "./NameAndMovementStep"

export interface ISignUpSteps {
  form: FormikProps<IRegister>
  goForward: () => void
  goBackward: () => void
}

const SignUpForm = () => {
  const logo = "/favicon.ico"
  const registerMutation = trpc.group.create.useMutation({
    onError() {
      setStep(0)
    },
  })
  const [step, setStep] = useState(0)
  const handleSubmit = useCallback(
    async (values: IRegister) => {
      await toast
        .promise(registerMutation.mutateAsync(values), {
          loading: "Création du groupe ...",
          error: "Veuillez réessayer plus tard",
          success: "Vous allez être redirigé",
        })
        .then((id) =>
          signIn("credentials", {
            identifier: id,
            callbackUrl: "/groupe?connected=1",
          }),
        )
    },
    [registerMutation],
  )

  const goForward = () => setStep((prev) => prev + 1)
  const goBackward = () => setStep((prev) => prev - 1)

  return (
    <div className="bg-main flex min-h-screen flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Inscrire mon groupe - MonMatos</title>
        <link rel="icon" href={logo} />
        <link rel="shortcut icon" type="image/x-icon" href={logo} />
        <link rel="apple-touch-icon" sizes="180x180" href={logo} />

        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>
      <Formik
        initialValues={{ name: "", movement: "SGDF", customUnits: null }}
        validationSchema={zodFormikAdapter(registerSchema)}
        onSubmit={handleSubmit}
      >
        {(form: FormikProps<IRegister>) => (
          <div className="mx-auto sm:w-full sm:max-w-lg">
            <Logo className="mb-6 pl-4" />
            <Form className="mx-auto flex flex-col gap-10 rounded-md bg-white p-5 text-slate-900 shadow-lg sm:p-10">
              <h1 className="text-2xl font-bold">
                Inscrivez votre <span className="text-emerald-600">Groupe</span>
              </h1>
              {step === 0 && (
                <NameAndMovementStep
                  goBackward={goBackward}
                  goForward={goForward}
                  form={form}
                />
              )}
              {step === 1 && (
                <DefaultUnitStep
                  goBackward={goBackward}
                  goForward={goForward}
                  form={form}
                />
              )}
              {step === 2 && (
                <CustomUnitsStep
                  goBackward={goBackward}
                  goForward={goForward}
                  form={form}
                />
              )}

              <p className="text-sm">
                Votre groupe est déjà inscrit ?{" "}
                <Link href="/connexion">
                  <a className="w-fit pl-1 font-medium text-blue-500 focus:bg-blue-300/20 focus:outline-none">
                    Connectez-vous
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

export default SignUpForm

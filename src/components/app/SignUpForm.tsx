import { IRegister, registerSchema } from "@/common/validation/auth"
import { zodFormikAdapter } from "@/common/validation/zodFormikAdapter"
import Button from "@/components/ui/Button"
import Logo from "@/components/ui/Logo"
import { movements } from "@/utils/records"
import { trpc } from "@/utils/trpc"
import { Field, Form, Formik } from "formik"
import { signIn } from "next-auth/react"
import Head from "next/head"
import Link from "next/link"
import { useCallback } from "react"
import toast from "react-hot-toast"
import Icon from "../ui/Icon"
import LoadingDots from "../ui/LoadingDots"

const SignUpForm = () => {
  const registerMutation = trpc.group.create.useMutation()
  const handleSubmit = useCallback(
    async (values: IRegister) => {
      toast
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

  return (
    <div className="bg-main flex min-h-screen flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Inscrire mon groupe - MonMatos</title>
      </Head>
      <Formik
        initialValues={{ name: "", movement: "SGDF" }}
        validationSchema={zodFormikAdapter(registerSchema)}
        onSubmit={handleSubmit}
      >
        {({ isValid, isSubmitting, dirty }) => (
          <div className="mx-auto sm:w-full sm:max-w-lg">
            <Logo className="mb-6 pl-4" />
            <Form className="mx-auto flex flex-col gap-10 rounded-md bg-white p-5 text-slate-900 shadow-lg sm:p-10">
              <h1 className="text-2xl font-bold">
                Inscrivez votre <span className="text-emerald-600">Groupe</span>
              </h1>
              <label htmlFor="name" className="-mb-8 font-medium">
                Nom du Groupe
              </label>
              <div className="flex w-full items-center">
                <div className="flex w-full items-center gap-4 rounded-lg border-2 border-slate-300 p-3 focus-within:border-blue-600">
                  <Field
                    name="name"
                    id="name"
                    type="text"
                    placeholder="ex: Saint Vincent de Paul"
                    className="w-full bg-transparent text-sm outline-none"
                  />
                </div>
              </div>
              <label htmlFor="movement" className="-mb-8 -mt-5 font-medium">
                Mouvement scout
              </label>
              <div className="flex w-full items-center">
                <div className="flex w-full items-center gap-4 rounded-lg border-2 border-slate-300 p-3  focus-within:border-blue-600">
                  <Icon name="GiJerusalemCross" className="w-6" />
                  <Field
                    id="movement"
                    as="select"
                    name="movement"
                    placeholder="ex: Saint Vincent de Paul"
                    className="w-full bg-transparent text-sm outline-none"
                  >
                    {Object.entries(movements).map(([movement, label]) => (
                      <option value={movement} key={movement}>
                        {label}
                      </option>
                    ))}
                  </Field>
                </div>
              </div>

              <Button
                size="lg"
                variant="black"
                disabled={isSubmitting || !isValid || !dirty}
                className="mx-auto text-base font-medium normal-case"
                type="submit"
              >
                {isSubmitting ? <LoadingDots /> : "C'est parti !"}
              </Button>
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
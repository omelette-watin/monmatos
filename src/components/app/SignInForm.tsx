import Head from "next/head"
import { useEffect } from "react"
import toast from "react-hot-toast"

interface SignInFormProps {
  callbackUrl: string
  error: string | null
}

const SignInForm = ({ callbackUrl, error }: SignInFormProps) => {
  useEffect(() => {
    if (error) {
      toast.error(errorMessages[error] || "Veuillez réessayer plus tard", {
        id: "error-message",
      })
    }

    return () => toast.dismiss("error-message")
  }, [error])

  return (
    <>
      <Head>
        <title>Connexion - MonMatos</title>
      </Head>
    </>
  )
}

const errorMessages: Record<string, string> = {
  CredentialsSignin: "Identifiant incorrect",
  SessionRequired: "Veuillez vous reconnecter",
  GroupNotFound: "Nous n'avons pas trouver ce groupe",
}

export default SignInForm

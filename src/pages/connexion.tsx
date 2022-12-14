import LinkLogin from "@/components/app/LinkLogin"
import SignInForm from "@/components/app/SignInForm"
import { GetServerSideProps } from "next"

interface SignInPageProps {
  error: string | null
  callbackUrl: string
  groupId: string | null
}

const SignInPage = ({ error, callbackUrl, groupId }: SignInPageProps) => {
  if (!groupId) {
    return <SignInForm callbackUrl={callbackUrl} error={error} />
  }

  return <LinkLogin groupId={groupId} callbackUrl={callbackUrl} />
}

export default SignInPage

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { i = null, callbackUrl = "/groupe", error = null } = query

  return {
    props: {
      groupId: i,
      callbackUrl,
      error,
    },
  }
}

import Head from "next/head"
import Loading from "./Loading"

const LoadingPage = () => {
  return (
    <>
      <Head>
        <title>Chargement | MonMatos</title>
      </Head>
      <div className="flex h-screen w-screen items-center justify-center">
        <Loading />
      </div>
    </>
  )
}

export default LoadingPage

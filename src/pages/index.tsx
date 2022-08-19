import MainLayout from "@/components/ui/layouts/MainLayout"
import { ReactElement } from "react"
import { NextPageWithLayout } from "./_app"

const HomePage: NextPageWithLayout = () => {
  return (
    <>
      <p>Home</p>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre>
      {status === "authenticated" && (
        <Button onClick={() => signOut()}>Déconnexion</Button>
      )}
      {status === "unauthenticated" && (
        <Button onClick={() => router.push("/connexion")}>Connexion</Button>
      )} */}
    </>
  )
}

HomePage.getLayout = (page: ReactElement) => {
  return <MainLayout title="Accueil">{page}</MainLayout>
}

export default HomePage

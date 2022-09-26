import Hero from "@/components/www/Hero"
import PublicLayout from "@/components/www/Layout"
import { ReactElement } from "react"
import { NextPageWithLayout } from "./_app"

const HomePage: NextPageWithLayout = () => {
  return <Hero />
}

HomePage.getLayout = (page: ReactElement) => <PublicLayout>{page}</PublicLayout>

export default HomePage

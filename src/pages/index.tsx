import Hero from "@/components/business/home/Hero"
import PublicLayout from "@/components/ui/layouts/PublicLayout"
import { ReactElement } from "react"
import { NextPageWithLayout } from "./_app"

const HomePage: NextPageWithLayout = () => {
  return <Hero />
}

HomePage.getLayout = (page: ReactElement) => <PublicLayout>{page}</PublicLayout>

export default HomePage

import Glimpse from "@/components/business/home/Glimpse"
import Hero from "@/components/business/home/Hero"
import PublicLayout from "@/components/ui/layouts/PublicLayout"
import { ReactElement } from "react"
import { NextPageWithLayout } from "./_app"

const HomePage: NextPageWithLayout = () => {
  return (
    <div>
      <Hero />
      <Glimpse />
    </div>
  )
}

HomePage.getLayout = (page: ReactElement) => <PublicLayout>{page}</PublicLayout>

export default HomePage

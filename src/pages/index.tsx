import PublicLayout from "@/components/ui/layouts/PublicLayout"
import { ReactElement } from "react"
import { NextPageWithLayout } from "./_app"

const HomePage: NextPageWithLayout = () => {
  return <div>Home Page</div>
}

HomePage.getLayout = (page: ReactElement) => <PublicLayout>{page}</PublicLayout>

export default HomePage

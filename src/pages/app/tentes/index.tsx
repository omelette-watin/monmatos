import MainLayout from "@/components/ui/layouts/MainLayout"
import { ReactElement } from "react"
import { NextPageWithLayout } from "../../_app"

const TentsPage: NextPageWithLayout = () => {
  return <div>Tents Page</div>
}

TentsPage.getLayout = (page: ReactElement) => (
  <MainLayout title="Mes Tentes">{page}</MainLayout>
)

export default TentsPage

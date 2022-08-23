import MainLayout from "@/components/ui/layouts/MainLayout"
import { ReactElement } from "react"
import { NextPageWithLayout } from "../../_app"

const TentPage: NextPageWithLayout = () => {
  return <div>Tent Page</div>
}

TentPage.getLayout = (page: ReactElement) => (
  <MainLayout title={`Tente ${page.props.tent?.identifyingNum}`}>
    {page}
  </MainLayout>
)

export default TentPage

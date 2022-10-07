import ComingSoon from "@/components/ui/ComingSoon"
import PublicLayout from "@/components/www/Layout"
import { ReactElement } from "react"
import { NextPageWithLayout } from "./_app"

const TutorielsPage: NextPageWithLayout = () => {
  return <ComingSoon name="Tutoriels" />
}

TutorielsPage.getLayout = (page: ReactElement) => (
  <PublicLayout>{page}</PublicLayout>
)

export default TutorielsPage

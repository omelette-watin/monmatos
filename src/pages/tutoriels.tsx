import ComingSoon from "@/components/ui/ComingSoon"
import PublicLayout from "@/components/www/Layout"
import { ReactElement } from "react"
import { NextPageWithLayout } from "./_app"

const GuidesPage: NextPageWithLayout = () => {
  return <ComingSoon name="Tutoriels" />
}

GuidesPage.getLayout = (page: ReactElement) => (
  <PublicLayout>{page}</PublicLayout>
)

export default GuidesPage

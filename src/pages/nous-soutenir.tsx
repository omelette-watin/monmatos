import ComingSoon from "@/components/ui/ComingSoon"
import PublicLayout from "@/components/ui/layouts/PublicLayout"
import { ReactElement } from "react"
import { NextPageWithLayout } from "./_app"

const SupportPage: NextPageWithLayout = () => {
  return <ComingSoon name="Soutien" />
}

SupportPage.getLayout = (page: ReactElement) => (
  <PublicLayout>{page}</PublicLayout>
)

export default SupportPage

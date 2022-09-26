import ComingSoon from "@/components/ui/ComingSoon"
import PublicLayout from "@/components/www/Layout"
import { ReactElement } from "react"
import { NextPageWithLayout } from "./_app"

const FAQPage: NextPageWithLayout = () => {
  return <ComingSoon name="FAQ" />
}

FAQPage.getLayout = (page: ReactElement) => <PublicLayout>{page}</PublicLayout>

export default FAQPage

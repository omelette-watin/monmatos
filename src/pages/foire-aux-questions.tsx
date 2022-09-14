import ComingSoon from "@/components/ui/ComingSoon"
import PublicLayout from "@/components/ui/layouts/PublicLayout"
import { ReactElement } from "react"
import { NextPageWithLayout } from "./_app"

const FAQPage: NextPageWithLayout = () => {
  return <ComingSoon name="FAQ" />
}

FAQPage.getLayout = (page: ReactElement) => <PublicLayout>{page}</PublicLayout>

export default FAQPage

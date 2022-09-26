import ComingSoon from "@/components/ui/ComingSoon"
import PublicLayout from "@/components/www/Layout"
import { ReactElement } from "react"
import { NextPageWithLayout } from "./_app"

const ContactPage: NextPageWithLayout = () => {
  return <ComingSoon name="Contact" />
}

ContactPage.getLayout = (page: ReactElement) => (
  <PublicLayout>{page}</PublicLayout>
)

export default ContactPage

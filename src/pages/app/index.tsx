import MainLayout from "@/components/ui/layouts/MainLayout"
import { ReactElement } from "react"
import { NextPageWithLayout } from "../_app"

const GroupPage: NextPageWithLayout = () => {
  return <div>Group Page</div>
}

GroupPage.getLayout = (page: ReactElement) => (
  <MainLayout title="Mon Groupe">{page}</MainLayout>
)

export default GroupPage

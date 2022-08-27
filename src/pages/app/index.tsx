import ActionsPanel from "@/components/business/dashboard/ActionsPanel"
import OverviewPanel from "@/components/business/dashboard/OverviewPanel"
import { useAppContext } from "@/components/ui/hooks/useAppContext"
import MainLayout from "@/components/ui/layouts/MainLayout"
import Loading from "@/components/ui/Loading"
import { useSession } from "next-auth/react"
import { ReactElement } from "react"
import { NextPageWithLayout } from "../_app"

const GroupPage: NextPageWithLayout = () => {
  const { data } = useSession()
  const { tents, isLoadingTents } = useAppContext()

  return (
    <div className="space-y-10">
      <h1 className="text-4xl font-bold lg:text-5xl">
        <span>Groupe </span>
        <span className="text-emerald-600">{data?.user?.name}</span>
      </h1>
      {isLoadingTents && (
        <div className="m-auto w-fit py-32">
          <Loading />
        </div>
      )}
      {tents && data && (
        <>
          <ActionsPanel session={data} tents={tents} />
          <OverviewPanel session={data} tents={tents} />
        </>
      )}
    </div>
  )
}

GroupPage.getLayout = (page: ReactElement) => (
  <MainLayout title="Mon Groupe">{page}</MainLayout>
)

export default GroupPage

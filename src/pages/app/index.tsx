import ActionsPanel from "@/components/app/dashboard/ActionsPanel"
import OverviewPanel from "@/components/app/dashboard/OverviewPanel"
import AppLayout from "@/components/app/Layout"
import { useGroup } from "@/components/hooks/useGroup"
import Loading from "@/components/ui/Loading"
import { trpc } from "@/utils/trpc"
import { ReactElement } from "react"
import { NextPageWithLayout } from "../_app"

const GroupPage: NextPageWithLayout = () => {
  const { name } = useGroup()
  const { data: tents, isLoading } = trpc.tents.getAll.useQuery()

  return (
    <div className="space-y-10">
      <h1 className="text-4xl font-bold transition-opacity lg:text-5xl">
        <span>Groupe </span>
        <span className="text-emerald-600">{name}</span>
      </h1>
      {isLoading && (
        <div className="m-auto w-fit py-32">
          <Loading />
        </div>
      )}
      {tents && (
        <>
          <ActionsPanel tents={tents} />
          <OverviewPanel tents={tents} />
        </>
      )}
    </div>
  )
}

GroupPage.getLayout = (page: ReactElement) => (
  <AppLayout title="Mon Groupe">{page}</AppLayout>
)

export default GroupPage

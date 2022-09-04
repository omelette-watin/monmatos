import ActionsPanel from "@/components/business/dashboard/ActionsPanel"
import OverviewPanel from "@/components/business/dashboard/OverviewPanel"
import AppLayout from "@/components/ui/layouts/AppLayout"
import Loading from "@/components/ui/Loading"
import { trpc } from "@/utils/trpc"
import { useSession } from "next-auth/react"
import { ReactElement } from "react"
import { NextPageWithLayout } from "../_app"

const GroupPage: NextPageWithLayout = () => {
  const { data } = useSession()
  const { data: tents, isLoading } = trpc.tents.getAll.useQuery()

  return (
    <div className="space-y-10">
      <h1 className="text-4xl font-bold transition-opacity lg:text-5xl">
        <span>Groupe </span>
        <span className="text-emerald-600">{data?.user.name}</span>
      </h1>
      {isLoading && (
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

GroupPage.protected = true

GroupPage.getLayout = (page: ReactElement) => (
  <AppLayout title="Mon Groupe">{page}</AppLayout>
)

export default GroupPage

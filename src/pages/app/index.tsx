import ActionsPanel from "@/components/business/dashboard/ActionsPanel"
import MainLayout from "@/components/ui/layouts/MainLayout"
import { trpc } from "@/utils/trpc"
import { useSession } from "next-auth/react"
import { ReactElement } from "react"
import { NextPageWithLayout } from "../_app"

const GroupPage: NextPageWithLayout = () => {
  const { data } = useSession()
  const { data: tents } = trpc.useQuery(["tents.getAll"])

  return (
    <div className="space-y-10">
      <h1 className="text-4xl font-bold lg:text-5xl">
        <span>Groupe </span>
        <span className="text-emerald-600">{data?.user?.name}</span>
      </h1>
      {tents && data && (
        <>
          <ActionsPanel session={data} tents={tents} />
        </>
      )}
    </div>
  )
}

GroupPage.getLayout = (page: ReactElement) => (
  <MainLayout title="Mon Groupe">{page}</MainLayout>
)

export default GroupPage

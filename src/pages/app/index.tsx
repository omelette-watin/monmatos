import ActionsPanel from "@/components/app/dashboard/ActionsPanel"
import OverviewPanel from "@/components/app/dashboard/OverviewPanel"
import AppLayout from "@/components/app/Layout"
import { useGroup } from "@/components/hooks/useGroup"
import Loading from "@/components/ui/Loading"
import { trpc } from "@/utils/trpc"
import { useRouter } from "next/router"
import { ReactElement, useEffect } from "react"
import { toast } from "react-hot-toast"
import { NextPageWithLayout } from "../_app"

const GroupPage: NextPageWithLayout = () => {
  const router = useRouter()
  const { name } = useGroup()
  const { data: tents, isLoading } = trpc.tents.getAll.useQuery()

  useEffect(() => {
    if (router.query.connected) {
      toast.success("Bienvenue !", { id: "welcome-toast" })
      router.replace("/", undefined, { shallow: true })
    }
  }, [router])

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

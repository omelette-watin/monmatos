import { useModalContext } from "@/components/business/hooks/useModalContext"
import Button from "@/components/ui/Button"
import Panel from "@/components/ui/Panel"
import { Filters, Tents } from "@/pages/app/tentes"
import { UIProps } from "@/utils/typedProps"
import { Tent } from "@prisma/client"
import { FC } from "react"
import TentAddPanel from "./TentAddPanel"
import TentCard from "./TentCard"
import TentCardSkeleton from "./TentCardSkeleton"

const TentsContainer: FC<
  UIProps<{
    tents: Tents | undefined
    filters: Filters
    loading: boolean
    sorting: "asc" | "desc"
  }>
> = ({ tents, filters, loading, sorting = "asc" }) => {
  const { setModal } = useModalContext()
  const getTentToBeDisplayed = (tents: Tent[]) =>
    tents.filter((tent) => {
      let wanted = true
      Object.entries(filters).forEach(([key, value]) => {
        wanted = (value ? tent[key as keyof Tent] === value : true) && wanted
      })

      return wanted
    })
  const openAddTentPanel = () =>
    setModal({
      component: <TentAddPanel tents={tents || []} />,
      visible: true,
    })

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {new Array(15).fill(null).map((_, index) => (
          <TentCardSkeleton key={index} />
        ))}
      </div>
    )
  }

  if (!tents || !tents.length) {
    return (
      <Panel className="text-center">
        <div className="flex w-full flex-col items-center justify-center gap-4 py-24">
          <div className="font-medium text-slate-400 sm:text-lg">
            Vous n'avez pas encore ajouté de tente ...
          </div>
          <Button
            onClick={openAddTentPanel}
            type="button"
            variant="green"
            size="sm"
            className="max-w-fit"
            icon="BsPlusLg"
          >
            J'en ajoute une !
          </Button>
        </div>
      </Panel>
    )
  }

  return (
    <Panel className="text-center">
      {getTentToBeDisplayed(tents).length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {getTentToBeDisplayed(tents)
            .sort((a, b) =>
              sorting === "asc"
                ? a.identifyingNum - b.identifyingNum
                : b.identifyingNum - a.identifyingNum,
            )
            .map((tent) => (
              <TentCard tent={tent} key={tent.id} />
            ))}
        </div>
      )}
      {getTentToBeDisplayed(tents).length === 0 && (
        <div className="flex w-full flex-col items-center justify-center gap-4 py-24">
          <div className="font-medium text-slate-400 sm:text-lg">
            Aucune tente ne correspond à vos critères de recherche ...
          </div>
        </div>
      )}
    </Panel>
  )
}

export default TentsContainer

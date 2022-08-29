import Button from "@/components/ui/Button"
import { useAppContext } from "@/components/ui/hooks/useAppContext"
import { Filters } from "@/pages/app/tentes"
import { UIProps } from "@/utils/typedProps"
import { Tent } from "@prisma/client"
import { FC } from "react"
import TentAddPanel from "./TentAddPanel"
import TentCard from "./TentCard"

const TentsContainer: FC<
  UIProps<{
    tents: Tent[]
    filters: Filters
    sorting: "asc" | "desc"
  }>
> = ({ tents, filters, sorting = "asc" }) => {
  const { setModal } = useAppContext()
  const getTentToBeDisplayed = (tents: Tent[]) =>
    tents.filter((tent) => {
      let wanted = true
      Object.entries(filters).forEach(([key, value]) => {
        wanted = (value ? tent[key as keyof Tent] === value : true) && wanted
      })

      return wanted
    })
  const openAddTentPanel = () =>
    setModal({ component: <TentAddPanel />, visible: true })

  return (
    <>
      {!tents.length && (
        <div className="flex w-full flex-col items-center justify-center gap-4 py-32">
          <div className="text-lg font-semibold text-slate-400">
            Vous n'avez pas encore ajouté de tente ...
          </div>
          <Button
            onClick={openAddTentPanel}
            type="button"
            variant="black"
            size="sm"
            className="max-w-fit"
            icon="BsPlusLg"
          >
            J'en ajoute une !
          </Button>
        </div>
      )}
      {getTentToBeDisplayed(tents).length > 0 ? (
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
      ) : (
        tents.length > 0 && (
          <div className="flex w-full flex-col items-center justify-center gap-4 py-32">
            <div className="text-lg font-semibold text-slate-400">
              Aucune tente ne correspond à vos critères de recherche ...
            </div>
          </div>
        )
      )}
    </>
  )
}

export default TentsContainer

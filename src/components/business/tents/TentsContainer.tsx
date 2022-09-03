import Button from "@/components/ui/Button"
import { useAppContext } from "@/components/ui/hooks/useAppContext"
import { useTentsContext } from "@/components/ui/hooks/useTentsContext"
import Panel from "@/components/ui/Panel"
import { Filters } from "@/pages/app/tentes"
import { UIProps } from "@/utils/typedProps"
import { Tent } from "@prisma/client"
import { FC, useEffect } from "react"
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
  const { ctxTents, setCtxTents } = useTentsContext()
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

  useEffect(() => {
    setCtxTents(tents)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Panel className="text-center">
      {ctxTents && !ctxTents.length && (
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
      )}
      {getTentToBeDisplayed(ctxTents).length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {getTentToBeDisplayed(ctxTents)
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
        ctxTents.length > 0 && (
          <div className="flex w-full flex-col items-center justify-center gap-4 py-24">
            <div className="font-medium text-slate-400 sm:text-lg">
              Aucune tente ne correspond à vos critères de recherche ...
            </div>
          </div>
        )
      )}
    </Panel>
  )
}

export default TentsContainer

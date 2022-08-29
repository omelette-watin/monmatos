import Card from "@/components/ui/Card"
import { useAppContext } from "@/components/ui/hooks/useAppContext"
import Icon from "@/components/ui/Icon"
import Tooltip from "@/components/ui/Tooltip"
import { inferQueryOutput } from "@/utils/trpc"
import { UIProps } from "@/utils/typedProps"
import { units } from "@/utils/unit"
import { Group } from "@prisma/client"
import { FC } from "react"
import { stateColors } from "../dashboard/StateChart"
import TentCharacteristic from "./TentCharacteristic"
import TentDeletePanel from "./TentDeletePanel"
import TentUpdatePanel from "./TentUpdatePanel"
import TentViewPanel from "./TentViewPanel"

export type ArrayElement<A> = A extends readonly (infer T)[] ? T : never
export type SingleTent = ArrayElement<inferQueryOutput<"tents.getAll">>

const TentCard: FC<
  UIProps<{ tent: SingleTent; movement?: Group["movement"] }>
> = ({ tent, movement = "SGDF" }) => {
  const { identifyingNum, size, unit, state, type } = tent
  const { setModal } = useAppContext()
  const openViewPanel = () =>
    setModal({
      component: <TentViewPanel tent={tent} />,
      visible: true,
    })
  const openDeletePanel = (e: { stopPropagation: () => void }) => {
    e.stopPropagation()
    setModal({
      component: <TentDeletePanel tent={tent} />,
      visible: true,
    })
  }
  const openUpdatePanel = (e: { stopPropagation: () => void }) => {
    e.stopPropagation()
    setModal({
      component: <TentUpdatePanel tent={tent} />,
      visible: true,
    })
  }

  return (
    <Card className="cursor-pointer" onClick={openViewPanel}>
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-slate-800">
            <h2 className="text-2xl font-bold">{identifyingNum}</h2>
          </div>
          <div>
            <h3 className="text-lg font-bold leading-tight">
              {units[movement][unit] || "GROUPE"}
            </h3>
            <p className="text-sm font-semibold ">{size} places</p>
          </div>
        </div>
        <div className="space-y-2">
          <TentCharacteristic
            type={"state"}
            label="ÉTAT"
            value={state}
            variants={stateColors}
          />
          <TentCharacteristic
            type={"type"}
            label="TYPE"
            value={type.toUpperCase()}
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="text-xs underline" onClick={openViewPanel}>
            Voir plus d'infos
          </div>
          <div className="flex items-center">
            <button
              type="button"
              onClick={openUpdatePanel}
              className="group relative hover:text-blue-500"
            >
              <Icon name="HiPencil" />
              <Tooltip>Modifier</Tooltip>
            </button>
            <button
              type="button"
              onClick={openDeletePanel}
              className="group relative hover:text-red-500"
            >
              <Icon name="HiTrash" />
              <Tooltip>Supprimer</Tooltip>
            </button>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default TentCard

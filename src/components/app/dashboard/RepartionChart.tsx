import Card from "@/components/ui/Card"
import Icon from "@/components/ui/Icon"
import { units } from "@/utils/records"
import { UIProps } from "@/utils/typedProps"
import { Tent, Unit } from "@prisma/client"
import classNames from "classnames"
import { FC } from "react"
import { useGroup } from "../../hooks/useGroup"

const colors: Record<Unit, string> = {
  FARFADETS: "bg-green-500",
  BATISSEURS: "bg-green-500",
  MOUSSAILLONS: "bg-orange-500",
  LUTINS: "bg-green-500",
  LUTINES: "bg-green-600",
  JEANNETTES: "bg-yellow-500",
  LOUVETTES: "bg-yellow-500",
  LOUVETEAUX: "bg-orange-500",
  MOUSSES: "bg-blue-500",
  GUIDES: "bg-sky-500",
  ECLAIREUSES: "bg-sky-500",
  SCOUTS: "bg-blue-500",
  ECLAIREURS: "bg-blue-500",
  MARINS: "bg-red-600",
  CARAVELLES: "bg-red-500",
  GUIDESAINNES: "bg-red-500",
  AINEES: "bg-red-500",
  EQUIPIERES: "bg-red-500",
  PIONNIERS: "bg-red-600",
  AINES: "bg-red-600",
  ROUTIERS: "bg-red-600",
  EQUIPIERS: "bg-red-600",
  PERSPECTIVES: "bg-red-600",
  COMPAGNONS: "bg-emerald-600",
  RESPONSABLES: "bg-violet-500",
  GROUPE: "bg-gray-200",
}

const customColors = [
  "bg-green-500",
  "bg-orange-500",
  "bg-yellow-500",
  "bg-green-600",
  "bg-orange-600",
  "bg-yellow-400",
  "bg-blue-500",
  "bg-sky-500",
  "bg-red-600",
  "bg-red-500",
  "bg-red-600",
  "bg-pink-500",
  "bg-emerald-500",
  "bg-emerald-600",
  "bg-violet-500",
]

const Bar: FC<
  UIProps<{ unit: string; count: number; total: number; index?: number }>
> = ({ unit, count, total, index }) => {
  return (
    <div className="flex w-full flex-col-reverse items-center font-bold text-slate-900 md:w-16">
      <div className="flex h-8 w-full items-center justify-center">
        <span className="text-lg">{count}</span>
      </div>
      <div
        style={{ height: `${(count / total) * 230 || 4}px` }}
        className={classNames(
          "expends w-full rounded-sm",
          typeof index !== "undefined"
            ? customColors[index]
            : colors[unit as Unit],
          unit === "GROUPE" && colors["GROUPE"],
        )}
      />
    </div>
  )
}

const RepartitionChart: FC<
  UIProps<{ tents: Tent[]; customUnits: string[]; className?: string }>
> = ({ tents, customUnits }) => {
  const { movement } = useGroup()

  const movementUnits = units[movement] as Record<Unit, string>
  const countOf = (unit: string) => {
    return tents.filter(
      (tent) => tent.unit === unit || tent.customUnit === unit,
    ).length
  }

  return (
    <Card className="max-w-full">
      <h3 className="flex items-center space-x-2 self-start text-xl font-semibold">
        <Icon name="FaUserAlt" />
        <span className="text-slate-900">
          Répartition des <span className="text-emerald-600">tentes</span>
        </span>
      </h3>
      <div className="flex w-full flex-col items-end gap-8 lg:h-[300px] lg:flex-row">
        {!customUnits.length ? (
          <>
            <div className="mr-4 space-y-1 self-start py-3">
              {Object.entries(movementUnits).map(([key, value]) => {
                return (
                  <div key={value} className="flex items-center space-x-2">
                    <div
                      className={classNames(
                        "h-5 w-5 rounded-sm",
                        colors[key as Unit],
                      )}
                    />
                    <span className="whitespace-nowrap text-xs">{value}</span>
                  </div>
                )
              })}
            </div>
            <div className="mx-auto flex w-full items-end space-x-3 md:w-fit">
              {Object.entries(movementUnits).map(([key]) => {
                return (
                  <Bar
                    unit={key as Unit}
                    count={countOf(key as Unit)}
                    total={tents.length}
                    key={key}
                  />
                )
              })}
            </div>
          </>
        ) : (
          <>
            <div className="mr-4 space-y-1 self-start py-3">
              {customUnits.concat(["NON ATTRIBUÉE"]).map((value, index) => {
                return (
                  <div key={value} className="flex items-center space-x-2">
                    <div
                      className={classNames(
                        "h-5 w-5 rounded-sm",
                        value === "NON ATTRIBUÉE" && colors["GROUPE"],
                        customColors[index],
                      )}
                    />
                    <span className="whitespace-nowrap text-xs">{value}</span>
                  </div>
                )
              })}
            </div>
            <div className="mx-auto flex w-full items-end space-x-3 md:w-fit">
              {customUnits.concat(["GROUPE"]).map((value, index) => {
                console.log(index)

                return (
                  <Bar
                    unit={value}
                    count={countOf(value)}
                    total={tents.length}
                    key={value}
                    index={index}
                  />
                )
              })}
            </div>
          </>
        )}
      </div>
    </Card>
  )
}

export default RepartitionChart

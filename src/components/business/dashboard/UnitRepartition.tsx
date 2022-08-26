import Card from "@/components/ui/Card"
import Icon from "@/components/ui/Icon"
import { UIProps } from "@/utils/typedProps"
import { units } from "@/utils/unit"
import { Group, Tent, Unit } from "@prisma/client"
import classNames from "classnames"
import { Session } from "next-auth"
import { FC } from "react"

const colors: Record<Unit, string> = {
  FARFADETS: "bg-green-500",
  JEANNETTES: "bg-yellow-500",
  LOUVETTES: "bg-yellow-500",
  LOUVETEAUX: "bg-orange-500",
  GUIDES: "bg-sky-500",
  ECLAIREUSES: "bg-sky-500",
  SCOUTS: "bg-blue-500",
  ECLAIREURS: "bg-blue-500",
  CARAVELLES: "bg-red-500",
  GUIDESAINNES: "bg-red-500",
  EQUIPIERES: "bg-red-500",
  PIONNIERS: "bg-red-600",
  ROUTIERS: "bg-red-600",
  EQUIPIERS: "bg-red-600",
  GROUPE: "bg-gray-500",
}

const Bar: FC<UIProps<{ unit: Unit; count: number; total: number }>> = ({
  unit,
  count,
  total,
}) => {
  return (
    <div className="flex w-full flex-col-reverse items-center font-bold text-black md:w-16">
      <div className="flex h-8 w-full items-center justify-center">
        <span className="text-lg">{count}</span>
      </div>
      <div
        style={{ height: `${(count / total) * 230 + 4}px` }}
        className={classNames("expends w-full rounded-sm", colors[unit])}
      />
    </div>
  )
}

const RepartitionChart: FC<
  UIProps<{ tents: Tent[]; session: Session; className?: string }>
> = ({ tents, session }) => {
  const movementUnits = units[
    session.user?.movement as Group["movement"]
  ] as Record<Unit, string>
  const countOf = (unit: keyof typeof movementUnits) => {
    return tents.filter((tents) => tents.unit === unit).length
  }

  return (
    <Card className="max-w-full">
      <h3 className="flex items-center space-x-2 self-start text-xl font-semibold">
        <Icon name="FaUserAlt" />
        <span className="text-black">
          Répartition des <span className="text-emerald-600">tentes</span>
        </span>
      </h3>
      <div className="flex w-full flex-col items-end gap-8 lg:h-[300px] lg:flex-row">
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
      </div>
    </Card>
  )
}

export default RepartitionChart

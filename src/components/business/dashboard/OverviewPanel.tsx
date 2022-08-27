import Icon from "@/components/ui/Icon"
import Panel from "@/components/ui/Panel"
import { UIProps } from "@/utils/typedProps"
import { Group, Tent } from "@prisma/client"
import { Session } from "next-auth"
import { FC } from "react"
import StateChart from "./StateChart"
import RepartitionChart from "./RepartionChart"
import Card from "@/components/ui/Card"
import { units } from "@/utils/unit"

const OverviewPanel: FC<UIProps<{ tents: Tent[]; session: Session }>> = ({
  tents,
  session,
}) => {
  const numberOfUnits =
    Object.keys(units[session.user?.movement as Group["movement"]]).length - 1

  return (
    <Panel id="overview">
      <h2 className="flex items-center space-x-2 p-1 text-2xl font-bold">
        <Icon name="PresentationChartBarIcon" className="w-8" />
        <span>Vue d'ensemble</span>
      </h2>
      <div className="space-y-5 py-4">
        <div className="flex flex-col gap-5 xl:flex-row">
          <Card className="max-w-full">
            <div className="flex max-h-full flex-wrap justify-around gap-8 pt-1 text-center xl:flex-col">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">
                  <span>
                    Nombre total de{" "}
                    <span className="text-emerald-500">tentes</span>
                  </span>
                </h3>
                <div className="text-5xl font-bold text-emerald-500">
                  {tents.length}
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">
                  <span>Nombre total d'unités</span>
                </h3>
                <div className="text-5xl font-bold text-emerald-500">
                  {numberOfUnits}
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">
                  <span>
                    Moyenne <span className="text-emerald-500">tentes</span> /
                    unités
                  </span>
                </h3>
                <div className="text-5xl font-bold text-emerald-500">
                  {(tents.length / numberOfUnits).toFixed(1)}
                </div>
              </div>
            </div>
          </Card>
          <RepartitionChart tents={tents} session={session} />
        </div>
        <StateChart tents={tents} />
      </div>
    </Panel>
  )
}

export default OverviewPanel

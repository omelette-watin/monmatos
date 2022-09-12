import Card from "@/components/ui/Card"
import Icon from "@/components/ui/Icon"
import Panel from "@/components/ui/Panel"
import { units } from "@/utils/records"
import { UIProps } from "@/utils/typedProps"
import { Tent } from "@prisma/client"
import { FC } from "react"
import { useGroup } from "../hooks/useGroup"
import RepartitionChart from "./RepartionChart"
import StateChart from "./StateChart"

const OverviewPanel: FC<UIProps<{ tents: Tent[] }>> = ({ tents }) => {
  const { movement } = useGroup()
  const numberOfUnits = Object.keys(units[movement]).length - 1

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
          <RepartitionChart tents={tents} />
        </div>
        <StateChart tents={tents} />
      </div>
    </Panel>
  )
}

export default OverviewPanel

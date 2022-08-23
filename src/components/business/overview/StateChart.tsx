import { UIProps } from "@/utils/typedProps"
import { State, Tent } from "@prisma/client"
import classNames from "classnames"
import { FC } from "react"

const colors: Record<State, string> = {
  INUTILISABLE: "bg-black",
  MAUVAIS: "bg-red-500",
  BON: "bg-lime-500",
  NEUF: "bg-green-500",
}

const Bar: FC<UIProps<{ state: State; count: number; total: number }>> = ({
  state,
  count,
  total,
}) => {
  return (
    <div className="flex w-8 flex-col-reverse items-center font-bold text-black sm:w-16">
      <div className="flex h-8 w-full items-center justify-center">
        <span className="text-lg">{count}</span>
      </div>
      <div
        style={{ height: `${(count / total) * 230 + 10}px` }}
        className={classNames("expends w-full", colors[state])}
      />
    </div>
  )
}

const StateChart: FC<UIProps<{ tents: Tent[]; className?: string }>> = ({
  tents,
}) => {
  const countOf = (state: State) => {
    return tents.filter((tents) => tents.state === state).length
  }

  return (
    <div className="flex h-[300px] w-fit items-end space-x-3 rounded-xl border px-6 py-2 shadow-md">
      {Object.entries(State)
        .map(([, value]) => {
          return (
            <Bar
              state={value}
              count={countOf(value)}
              total={tents.length}
              key={value}
            />
          )
        })
        .reverse()}
    </div>
  )
}

export default StateChart

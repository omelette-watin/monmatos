import type { UIProps } from "@/utils/typedProps"
import classNames from "classnames"
import { FC, ReactNode, useState } from "react"
import type { IconName } from "./Icon"
import Icon from "./Icon"

const Accordion: FC<
  UIProps<{
    label: string
    icon?: IconName
    children: ReactNode
    maxHeight?: string
  }>
> = ({ label, icon, children, maxHeight = "max-h-40" }) => {
  const [showHint, setShowHint] = useState(false)

  return (
    <div className="relative flex w-[400px] max-w-[90vw] flex-col items-center bg-blue-50 font-medium text-blue-900">
      <button
        type="button"
        onClick={() => setShowHint((prev) => !prev)}
        className="z-20 flex w-full cursor-pointer items-center gap-1 self-start rounded-lg bg-blue-100 p-2 text-lg shadow-md transition-all duration-500"
      >
        <Icon name={icon || "RiQuestionLine"} />
        <div className="text-sm">{label}</div>
        <Icon
          name="RiArrowDownSLine"
          className={classNames("ml-auto transition-all duration-500", {
            "rotate-0": !showHint,
            "-rotate-180": showHint,
          })}
        />
      </button>
      <div
        className={classNames(
          "absolute bottom-1 z-10 h-fit w-[98%] translate-y-full overflow-hidden rounded-b-lg bg-blue-50 shadow-md transition-[max-height] duration-500",
          {
            "max-h-0": !showHint,
            [maxHeight]: showHint,
          },
        )}
      >
        {children}
      </div>
    </div>
  )
}

export default Accordion

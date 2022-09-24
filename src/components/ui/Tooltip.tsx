import { UIProps } from "@/utils/typedProps"
import classNames from "classnames"
import { FC, ReactNode } from "react"

const Tooltip: FC<UIProps<{ children: ReactNode; className?: string }>> = ({
  children,
  className,
  ...otherProps
}) => {
  return (
    <div
      className={classNames(
        "absolute -bottom-8 hidden rounded-md bg-slate-900 px-2 py-1 text-xs text-white shadow-md group-hover:block",
        className,
      )}
      {...otherProps}
    >
      {children}
    </div>
  )
}

export default Tooltip

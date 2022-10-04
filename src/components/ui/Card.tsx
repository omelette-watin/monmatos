import { UIProps } from "@/utils/typedProps"
import classNames from "classnames"
import { FC, ReactNode } from "react"
const Card: FC<UIProps<{ children: ReactNode; className?: string }>> = ({
  children,
  className,
  ...otherProps
}) => {
  return (
    <div
      className={classNames(
        "bg-main mx-auto h-fit w-full space-y-4 rounded-xl border border-gray-200 p-6 pt-4 shadow-lg",
        className,
      )}
      {...otherProps}
    >
      {children}
    </div>
  )
}

export default Card

import { UIProps } from "@/utils/typedProps"
import { FC, ReactNode } from "react"
import classNames from "classnames"
const Card: FC<UIProps<{ children: ReactNode; className?: string }>> = ({
  children,
  className,
  ...otherProps
}) => {
  return (
    <div
      className={classNames(
        "space-y-4 rounded-xl bg-white p-6 pt-4 shadow-md",
        className,
      )}
      {...otherProps}
    >
      {children}
    </div>
  )
}

export default Card

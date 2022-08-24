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
        "bg-card mx-auto h-fit w-full max-w-[350px] space-y-4 rounded-xl p-6 pt-4 shadow-lg",
        className,
      )}
      {...otherProps}
    >
      {children}
    </div>
  )
}

export default Card

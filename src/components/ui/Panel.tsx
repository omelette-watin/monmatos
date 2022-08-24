import { UIProps } from "@/utils/typedProps"
import classNames from "classnames"
import { FC, ReactNode } from "react"

const Panel: FC<UIProps<{ children: ReactNode; className?: string }>> = ({
  children,
  className,
  ...otherProps
}) => {
  return (
    <section
      className={classNames(
        "space-y-6 rounded-xl border-4 bg-slate-50 p-4",
        className,
      )}
      {...otherProps}
    >
      {children}
    </section>
  )
}

export default Panel

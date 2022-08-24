import { UIProps } from "@/utils/typedProps"
import classNames from "classnames"
import { FC, ReactNode } from "react"

const Panel: FC<
  UIProps<{ children: ReactNode; className?: string; id?: string }>
> = ({ children, className, id, ...otherProps }) => {
  return (
    <section
      className={classNames("border-t-2 py-6 sm:p-6", className)}
      {...otherProps}
    >
      {id && <span id={id} className="invisible scroll-mt-[110px]" />}
      <div className="space-y-6">{children}</div>
    </section>
  )
}

export default Panel

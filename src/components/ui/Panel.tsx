import { UIProps } from "@/utils/typedProps"
import classNames from "classnames"
import { FC, ReactNode } from "react"

const Panel: FC<
  UIProps<{ children: ReactNode; className?: string; id?: string }>
> = ({ children, className, id, ...otherProps }) => {
  return (
    <section
      className={classNames("rounded-xl border-4 bg-slate-50 p-4", className)}
      {...otherProps}
    >
      {id && <span id={id} className="invisible scroll-mt-[110px]" />}
      <div className="space-y-6">{children}</div>
    </section>
  )
}

export default Panel

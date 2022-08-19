import { UIProps } from "@/utils/typedProps"
import { FC, ReactNode } from "react"

const Container: FC<UIProps<{ children: ReactNode }>> = ({ children }) => {
  return (
    <div className="m-auto w-full p-4 sm:w-[95%] xl:w-[1300px]">{children}</div>
  )
}

export default Container

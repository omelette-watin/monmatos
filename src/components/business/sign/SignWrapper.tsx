import Logo from "@/components/ui/Logo"
import type { UIProps } from "@/utils/typedProps"
import type { FC, ReactElement } from "react"

const SignWrapper: FC<UIProps<{ children: ReactElement }>> = ({ children }) => {
  return (
    <div className="flex">
      <div className="hidden min-h-screen w-full items-center justify-center bg-emerald-500 lg:flex">
        <div className="flex flex-col gap-1 text-white">
          <Logo white size="xl" />
          <p className="self-end font-semibold">
            Gérer mon matériel en un clic !
          </p>
        </div>
      </div>
      {children}
    </div>
  )
}

export default SignWrapper

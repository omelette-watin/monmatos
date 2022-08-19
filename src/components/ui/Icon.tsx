import { UIProps } from "@/utils/typedProps"
import * as HeroIcons from "@heroicons/react/outline"
import { FC } from "react"
import cn from "classnames"

export type IconName = keyof typeof HeroIcons

const Icon: FC<UIProps<{ name: IconName }, SVGSVGElement>> = ({
  name,
  className,
  ...otherProps
}) => {
  const HeroIcon = HeroIcons[name as IconName]

  return <HeroIcon {...otherProps} className={cn("w-6", className)} />
}

export default Icon

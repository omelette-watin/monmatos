import { UIProps } from "@/utils/typedProps"
import * as HeroIcons from "@heroicons/react/outline"
import * as ReactIcons from "react-icons/all"
import { FC } from "react"
import cn from "classnames"

export type HeroIconsName = keyof typeof HeroIcons
export type ReactIconsName = keyof typeof ReactIcons
export type IconName = HeroIconsName | ReactIconsName

const Icon: FC<UIProps<{ name: IconName }, SVGSVGElement>> = ({
  name,
  className,
  ...otherProps
}) => {
  const Icon =
    HeroIcons[name as HeroIconsName] || ReactIcons[name as ReactIconsName]

  return <Icon {...otherProps} className={cn("w-6", className)} />
}

export default Icon

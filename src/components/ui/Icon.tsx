import { UIProps } from "@/utils/typedProps"
import * as HeroIcons from "@heroicons/react/outline"
import * as fa from "react-icons/fa"
import * as io from "react-icons/io"
import * as md from "react-icons/md"
import * as ti from "react-icons/ti"
import * as go from "react-icons/go"
import * as fi from "react-icons/fi"
import * as gi from "react-icons/gi"
import * as wi from "react-icons/wi"
import * as di from "react-icons/di"
import * as ai from "react-icons/ai"
import * as bs from "react-icons/bs"
import * as ri from "react-icons/ri"
import * as fc from "react-icons/fc"
import * as gr from "react-icons/gr"
import * as hi from "react-icons/hi"
import * as si from "react-icons/si"
import * as im from "react-icons/im"
import * as bi from "react-icons/bi"
import * as cg from "react-icons/cg"
import * as vsc from "react-icons/vsc"
import * as tb from "react-icons/tb"
import { FC } from "react"
import cn from "classnames"

const ReactIcons = {
  ...fa,
  ...io,
  ...md,
  ...ti,
  ...go,
  ...fi,
  ...gi,
  ...wi,
  ...di,
  ...ai,
  ...bs,
  ...ri,
  ...fc,
  ...gr,
  ...si,
  ...hi,
  ...im,
  ...bi,
  ...cg,
  ...vsc,
  ...tb,
}

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

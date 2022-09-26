import { UIProps } from "@/utils/typedProps"
import cn from "classnames"
import { FC } from "react"
import Icon, { IconName } from "./Icon"

export const buttonVariants = {
  green: "text-white bg-emerald-500 border-emerald-500",
  black: "text-white bg-slate-900 border-slate-900",
  blue: "text-white bg-blue-600 border-blue-600",
  white: "text-slate-900 bg-main border-black",
  red: "text-white bg-red-500 border-red-500",
}
export const buttonSizes = {
  xxs: "px-3 py-[6px] text-xs font-medium",
  xs: "px-4 py-2 text-sm font-medium",
  sm: "px-5 py-2 text-base font-medium",
  md: "px-6 py-2 text-lg font-semibold",
  lg: "px-7 py-2 text-xl font-semibold",
}

export const iconMargins = {
  lg: {
    left: "-ml-4 mr-3 w-6",
    right: "ml-3 -mr-4 w-6",
  },
  md: {
    left: "-ml-1 mr-3 w-5",
    right: "ml-3 -mr-1 w-5",
  },
  sm: {
    left: "-ml-1 mr-2 w-4",
    right: "ml-2 -mr-1 w-4",
  },
  xs: {
    left: "mr-2 w-3",
    right: "ml-2 w-3",
  },
  xxs: {
    left: "mr-2 -ml-1 w-3",
    right: "ml-2 -mr-1 w-3",
  },
}

const Button: FC<
  UIProps<
    {
      variant?: keyof typeof buttonVariants
      size?: "sm" | "md" | "lg" | "xs" | "xxs"
      icon?: IconName
      iconPosition?: "left" | "right"
    },
    "button"
  >
> = ({
  children,
  variant = "green",
  size = "md",
  iconPosition = "left",
  icon,
  className,
  ...otherProps
}) => {
  const iconMarginClassName = children ? iconMargins[size][iconPosition] : ""

  return (
    <button
      {...otherProps}
      className={cn(
        "flex w-full items-center justify-center rounded-xl border shadow-lg transition hover:scale-[0.98] hover:shadow-sm disabled:opacity-50 disabled:shadow-lg disabled:hover:scale-100",
        buttonVariants[variant],
        buttonSizes[size],
        className,
      )}
    >
      {!icon ? null : iconPosition === "right" ? null : (
        <Icon name={icon} className={iconMarginClassName} />
      )}
      <span className="truncate">{children}</span>
      {!icon ? null : iconPosition === "left" ? null : (
        <Icon name={icon} className={iconMarginClassName} />
      )}
    </button>
  )
}

export default Button

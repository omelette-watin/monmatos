import { UIProps } from "@/utils/typedProps"
import { FC } from "react"
import Icon, { IconName } from "./Icon"
import classNames from "classnames"
import Link, { LinkProps } from "next/link"
import { Url } from "url"
import { buttonSizes, buttonVariants, iconMargins } from "./Button"

const ButtonLink: FC<
  UIProps<
    LinkProps & {
      variant?: keyof typeof buttonVariants
      size?: "sm" | "md" | "lg" | "xs" | "xxs"
      icon?: IconName
      iconPosition?: "left" | "right"
      asUrl?: Url
    },
    "a"
  >
> = ({
  children,
  variant = "green",
  size = "md",
  iconPosition = "left",
  href,
  passHref,
  icon,
  asUrl,
  className,
  ...otherProps
}) => {
  const iconMarginClassName = children ? iconMargins[size][iconPosition] : ""

  return (
    <Link href={href} passHref={passHref} as={asUrl}>
      <a
        className={classNames(
          "flex w-full items-center justify-center rounded-xl border shadow-lg transition hover:scale-[0.98] hover:shadow-sm disabled:opacity-50 disabled:shadow-lg disabled:hover:scale-100",
          buttonVariants[variant],
          buttonSizes[size],
          className,
        )}
        {...otherProps}
      >
        {!icon ? null : iconPosition === "right" ? null : (
          <Icon name={icon} className={iconMarginClassName} />
        )}
        <span className="truncate">{children}</span>
        {!icon ? null : iconPosition === "left" ? null : (
          <Icon name={icon} className={iconMarginClassName} />
        )}
      </a>
    </Link>
  )
}

export default ButtonLink

import { UIProps } from "@/utils/typedProps"
import classNames from "classnames"
import Link from "next/link"
import { useRouter } from "next/router"
import { FC, HTMLAttributeAnchorTarget } from "react"
import Icon, { IconName } from "./Icon"

const HeaderLink: FC<
  UIProps<
    {
      label: string
      href: string
      icon?: IconName
      target?: HTMLAttributeAnchorTarget
    },
    "a"
  >
> = ({ href, label, className, target, icon }) => {
  const { asPath } = useRouter()
  const isActive = asPath === href

  return (
    <Link href={href}>
      <a
        target={target}
        className={classNames(
          "flex items-center gap-2 transition-colors hover:text-emerald-600",
          className,
          {
            "text-black": !isActive,
            "text-emerald-600": isActive,
          },
        )}
      >
        {icon && <Icon name={icon} className="w-5" />}
        {label}
      </a>
    </Link>
  )
}

export default HeaderLink

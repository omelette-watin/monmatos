import { UIProps } from "@/utils/typedProps"
import classNames from "classnames"
import Link from "next/link"
import { useRouter } from "next/router"
import { FC, HTMLAttributeAnchorTarget } from "react"

const HeaderLink: FC<
  UIProps<
    {
      label: string
      href: string
      target?: HTMLAttributeAnchorTarget
    },
    "a"
  >
> = ({ href, label, className, target }) => {
  const { asPath } = useRouter()
  const isActive = asPath === href

  return (
    <Link href={href}>
      <a
        target={target}
        className={classNames(
          "transition-colors hover:text-emerald-600",
          className,
          {
            "text-black": !isActive,
            "text-emerald-600": isActive,
          },
        )}
      >
        {label}
      </a>
    </Link>
  )
}

export default HeaderLink

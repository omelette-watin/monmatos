import { UIProps } from "@/utils/typedProps"
import cn from "classnames"
import { signOut } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/router"
import { FC, HTMLAttributeAnchorTarget, useEffect, useState } from "react"
import Container from "./Container"
import Icon from "./Icon"
import Logo from "./Logo"

const MenuLink: FC<
  UIProps<{
    label: string
    href: string
    currentPath: string
    target?: HTMLAttributeAnchorTarget
  }>
> = ({ href, label, currentPath, className, target }) => {
  const isActive = currentPath === href

  return (
    <Link href={href}>
      <a
        target={target}
        className={cn("transition-colors hover:text-emerald-600", className, {
          "text-black": !isActive,
          "text-emerald-600": isActive,
        })}
      >
        {label}
      </a>
    </Link>
  )
}

const MobileSideMenu = () => {
  const { asPath } = useRouter()
  const [visible, setVisible] = useState(false)
  const showMenu = () => setVisible(true)
  const hideMenu = () => setVisible(false)

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "visible"
    }
  }, [visible])

  return (
    <div className="flex items-center lg:hidden">
      <button type="button" onClick={showMenu}>
        <Icon name="MenuIcon" />
      </button>
      <div
        className={cn(
          "bg-main fixed top-0 left-0 bottom-0 z-50 w-4/5 max-w-[100vw] overflow-y-scroll overscroll-contain shadow-xl transition-transform duration-500 sm:w-1/3",
          {
            "-translate-x-full": !visible,
            "translate-x-0": visible,
          },
        )}
      >
        <div className="flex h-full w-full flex-col items-start">
          <div className="flex w-full items-center justify-between p-4 shadow-md">
            <Link href="/app">
              <a>
                <Logo size="sm" />
              </a>
            </Link>

            <button type="button" onClick={hideMenu}>
              <Icon name="XIcon" />
            </button>
          </div>

          <div className="flex flex-col items-start space-y-3 p-6">
            <MenuLink label="Mon groupe" href={"/app"} currentPath={asPath} />
            <MenuLink
              label="Mes tentes"
              href={"/app/tentes"}
              currentPath={asPath}
            />
            <MenuLink
              label="Bien commencer"
              href={"/guide"}
              currentPath={asPath}
              target="_blank"
            />
          </div>
          <div className="flex flex-col items-start space-y-3 p-6">
            <MenuLink
              label="Nous contacter"
              href={"/contact"}
              currentPath={asPath}
              target="_blank"
            />
            <MenuLink
              label="Nous soutenir"
              href={"/nous-soutenir"}
              currentPath={asPath}
              target="_blank"
            />
            <button
              type="button"
              className="text-red-600"
              onClick={() => signOut({ callbackUrl: "/connexion" })}
            >
              Déconnexion
            </button>
          </div>
        </div>
      </div>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-slate-900/50 transition-all duration-500",
          {
            "invisible opacity-0": !visible,
            "visible opacity-100": visible,
          },
        )}
        onClick={hideMenu}
      />
    </div>
  )
}

const Header = () => {
  const { asPath } = useRouter()

  return (
    <div className="bg-main sticky top-0 z-20 border-b shadow-md lg:px-5">
      <Container>
        <div className="flex items-center justify-between font-medium">
          <div className="flex items-center">
            <div className="hidden lg:block">
              <Link href="/app">
                <a>
                  <Logo />
                </a>
              </Link>
            </div>
            <div className="lg:hidden">
              <Link href="/app">
                <a>
                  <Logo size="sm" />
                </a>
              </Link>
            </div>
            <div className="ml-10 hidden items-center gap-4 sm:flex">
              <MenuLink label="Mon groupe" href={"/app"} currentPath={asPath} />
              <MenuLink
                label="Mes tentes"
                href={"/app/tentes"}
                currentPath={asPath}
              />
              <MenuLink
                label="Bien commencer"
                href={"/guide"}
                className="hidden md:block"
                currentPath={asPath}
                target="_blank"
              />
            </div>
          </div>
          <div className="hidden items-center divide-x-2 lg:flex">
            <MenuLink
              label="Nous contacter"
              href={"/contact"}
              currentPath={asPath}
              className="px-4"
              target="_blank"
            />
            <MenuLink
              label="Nous soutenir"
              href={"/nous-soutenir"}
              currentPath={asPath}
              className="px-4"
              target="_blank"
            />
            <button
              className="px-4"
              type="button"
              onClick={() => signOut({ callbackUrl: "/connexion" })}
            >
              <Icon name="LogoutIcon" />
            </button>
          </div>
          <MobileSideMenu />
        </div>
      </Container>
    </div>
  )
}

export default Header

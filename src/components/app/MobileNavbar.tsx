import Button from "@/components/ui/Button"
import HeaderLink from "@/components/ui/HeaderLink"
import Icon from "@/components/ui/Icon"
import Logo from "@/components/ui/Logo"
import classNames from "classnames"
import { signOut } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const MobileNavbar = () => {
  const router = useRouter()
  const [visible, setVisible] = useState(false)
  const showMenu = () => setVisible(true)
  const hideMenu = () => setVisible(false)

  useEffect(() => {
    hideMenu()
  }, [router])

  return (
    <div className="flex items-center lg:hidden">
      <button type="button" onClick={showMenu}>
        <Icon name="MenuIcon" />
      </button>
      <div
        className={classNames(
          "bg-main fixed top-0 left-0 bottom-0 z-50 w-[280px] max-w-[100vw] overflow-y-scroll overscroll-contain text-lg shadow-xl transition-transform duration-500",
          {
            "-translate-x-full": !visible,
            "translate-x-0": visible,
          },
        )}
      >
        <div className="flex h-full w-full flex-col items-start">
          <div className="flex w-full items-center justify-between p-4 shadow-md">
            <Link href="/">
              <a>
                <Logo size="sm" />
              </a>
            </Link>

            <button type="button" onClick={hideMenu}>
              <Icon name="XIcon" />
            </button>
          </div>

          <nav className="flex flex-col items-start space-y-3 p-6">
            <HeaderLink label="Mon groupe" href="/" />
            <HeaderLink label="Mes tentes" href="tentes" />
            <HeaderLink
              label="Guide"
              href={`${process.env.NEXT_PUBLIC_URL}/guide`}
              target="_blank"
            />
            <HeaderLink
              label="FAQ"
              href={`${process.env.NEXT_PUBLIC_URL}/foire-aux-questions`}
              target="_blank"
            />
          </nav>
          <div className="flex h-full w-full flex-col items-start justify-between gap-20 p-6">
            <div className="flex flex-col items-start space-y-3">
              <HeaderLink
                label="Nous contacter"
                href={`${process.env.NEXT_PUBLIC_URL}/contact`}
                className="px-4"
                target="_blank"
              />
              <HeaderLink
                label="Nous soutenir"
                href={`${process.env.NEXT_PUBLIC_URL}/nous-soutenir`}
                className="px-4"
                target="_blank"
              />
            </div>
            <div className="flex w-full flex-col items-center gap-3">
              <Button
                type="button"
                size="xs"
                variant="red"
                className="-ml-1 max-w-fit"
                onClick={() => signOut({ callbackUrl: "/connexion" })}
                icon="LogoutIcon"
                iconPosition="right"
              >
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div
        className={classNames(
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

export default MobileNavbar

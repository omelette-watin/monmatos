import MobileNavbar from "@/components/app/MobileNavbar"
import HeaderLink from "@/components/ui/HeaderLink"
import Icon from "@/components/ui/Icon"
import Logo from "@/components/ui/Logo"
import Tooltip from "@/components/ui/Tooltip"
import classNames from "classnames"
import { signOut } from "next-auth/react"
import Link from "next/link"
import { useEffect, useState } from "react"

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0)

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div
      className={classNames("bg-main sticky top-0 z-20", {
        "shadow-lg": scrolled,
      })}
    >
      <div className="mx-auto flex items-center justify-between p-4 font-medium lg:container">
        <div className="flex items-center">
          <div className="hidden lg:block">
            <Link href="/groupe">
              <a>
                <Logo />
              </a>
            </Link>
          </div>
          <div className="lg:hidden">
            <Link href="/groupe">
              <a>
                <Logo size="sm" />
              </a>
            </Link>
          </div>
          <nav className="ml-10 hidden items-center gap-6 sm:flex">
            <HeaderLink label="Mon groupe" href="/groupe" />
            <HeaderLink label="Mes tentes" href="/tentes" />
            <HeaderLink label="Tutoriels" href="/tutoriels" target="_blank" />
            <HeaderLink
              label="FAQ"
              href="/foire-aux-questions"
              target="_blank"
            />
          </nav>
        </div>
        <div className="hidden items-center divide-x-2 lg:flex">
          <HeaderLink
            label="Nous contacter"
            href="/contact"
            className="px-4"
            target="_blank"
          />
          <HeaderLink
            label="Nous soutenir"
            href="/nous-soutenir"
            className="px-4"
            target="_blank"
          />
          <button
            className="group relative px-4"
            type="button"
            onClick={() => signOut({ callbackUrl: "/connexion" })}
          >
            <Tooltip className="-left-10">Déconnexion</Tooltip>
            <Icon name="LogoutIcon" />
          </button>
        </div>
        <MobileNavbar />
      </div>
    </div>
  )
}

export default Navbar

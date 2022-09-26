import ButtonLink from "@/components/ui/ButtonLink"
import HeaderLink from "@/components/ui/HeaderLink"
import Logo from "@/components/ui/Logo"
import classNames from "classnames"
import Link from "next/link"
import { useEffect, useState } from "react"
import MobileNavbar from "./MobileNavbar"

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
      className={classNames("bg-main sticky top-0 z-20 lg:px-5", {
        "shadow-lg": scrolled,
      })}
    >
      <div className="mx-auto flex items-center justify-between p-4 font-medium lg:container">
        <div className="flex items-center">
          <div className="hidden lg:block">
            <Link href="/">
              <a>
                <Logo />
              </a>
            </Link>
          </div>
          <div className="lg:hidden">
            <Link href="/">
              <a>
                <Logo size="sm" />
              </a>
            </Link>
          </div>
          <nav className="ml-10 hidden items-center gap-6 sm:flex">
            <HeaderLink label="Guide" href="/guide" />
            <HeaderLink label="FAQ" href="/foire-aux-questions" />
            <HeaderLink
              label="Inscrire mon groupe"
              href={`${process.env.NEXT_PUBLIC_APP_URL}/inscription`}
            />
          </nav>
        </div>
        <div className="hidden items-center divide-x-2 lg:flex">
          <HeaderLink label="Nous contacter" href="/contact" className="px-4" />
          <HeaderLink
            label="Nous soutenir"
            href="/nous-soutenir"
            className="px-4"
          />
          <ButtonLink
            href={`${process.env.NEXT_PUBLIC_APP_URL}/connexion`}
            size="sm"
            className="max-w-fit"
            variant="black"
          >
            Me connecter
          </ButtonLink>
        </div>
        <MobileNavbar />
      </div>
    </div>
  )
}

export default Navbar

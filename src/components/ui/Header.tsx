import classNames from "classnames"
import { signOut } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import ButtonLink from "./ButtonLink"
import Container from "./Container"
import HeaderLink from "./HeaderLink"
import Icon from "./Icon"
import Logo from "./Logo"
import MobileSidebar from "./MobileSidebar"

const Header = () => {
  const router = useRouter()
  const { asPath } = router
  const isPublic = !asPath.startsWith("/app")
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
            <div className="ml-10 hidden items-center gap-6 sm:flex">
              {isPublic ? (
                <>
                  <HeaderLink label="Guide" href="/guide" />
                  <HeaderLink label="FAQ" href="/foire-aux-questions" />
                  <HeaderLink label="Inscrire mon groupe" href="/inscription" />
                </>
              ) : (
                <>
                  <HeaderLink label="Mon groupe" href={"/app"} />
                  <HeaderLink label="Mes tentes" href="/app/tentes" />
                  <HeaderLink label="Guide" href="/guide" target="_blank" />
                  <HeaderLink
                    label="FAQ"
                    href="/foire-aux-questions"
                    target="_blank"
                  />
                </>
              )}
            </div>
          </div>
          <div className="hidden items-center divide-x-2 lg:flex">
            {isPublic ? (
              <>
                <HeaderLink
                  label="Nous contacter"
                  href={"/contact"}
                  className="px-4"
                />
                <HeaderLink
                  label="Nous soutenir"
                  href={"/nous-soutenir"}
                  className="px-4"
                />
                <ButtonLink
                  href="/connection"
                  size="xxs"
                  className="max-w-fit"
                  variant="black"
                >
                  Me connecter
                </ButtonLink>
              </>
            ) : (
              <>
                <HeaderLink
                  label="Nous contacter"
                  href={"/contact"}
                  className="px-4"
                  target="_blank"
                />
                <HeaderLink
                  label="Nous soutenir"
                  href={"/nous-soutenir"}
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
              </>
            )}
          </div>
          <MobileSidebar />
        </div>
      </Container>
    </div>
  )
}

export default Header

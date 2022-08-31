import classNames from "classnames"
import { signOut } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import Button from "./Button"
import ButtonLink from "./ButtonLink"
import HeaderLink from "./HeaderLink"
import Icon from "./Icon"
import Logo from "./Logo"

const MobileSidebar = () => {
  const router = useRouter()
  const asPath = router.asPath
  const isPublic = !asPath.startsWith("/app")
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
          <div className="flex h-full w-full flex-col items-start justify-between gap-20 p-6">
            {isPublic ? (
              <>
                <div className="flex flex-col items-start gap-3">
                  <HeaderLink label="Nous contacter" href={"/contact"} />
                  <HeaderLink label="Nous soutenir" href={"/nous-soutenir"} />
                </div>

                <div className="flex w-full flex-col items-center space-y-3">
                  <ButtonLink
                    href="/connexion"
                    size="xs"
                    variant="black"
                    className="-ml-1 max-w-fit"
                  >
                    Me connecter
                  </ButtonLink>
                  <p className="text-base text-slate-500">ou</p>
                  <ButtonLink
                    href="/inscription"
                    size="xs"
                    variant="blue"
                    className="-ml-1 max-w-fit"
                  >
                    Inscrire mon groupe
                  </ButtonLink>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col items-start space-y-3">
                  <HeaderLink
                    label="Nous contacter"
                    href={"/contact"}
                    target="_blank"
                  />
                  <HeaderLink
                    label="Nous soutenir"
                    href={"/nous-soutenir"}
                    target="_blank"
                  />
                </div>
                <div className="flex w-full flex-col items-center gap-3">
                  <Button
                    type="button"
                    size="xs"
                    variant="black"
                    className="-ml-1 max-w-fit"
                    onClick={() => signOut({ callbackUrl: "/connexion" })}
                    icon="LogoutIcon"
                    iconPosition="right"
                  >
                    Déconnexion
                  </Button>
                </div>
              </>
            )}
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

export default MobileSidebar

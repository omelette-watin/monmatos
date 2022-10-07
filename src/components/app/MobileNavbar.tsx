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
            <Link href="/groupe">
              <a>
                <Logo size="sm" />
              </a>
            </Link>

            <button type="button" onClick={hideMenu}>
              <Icon name="XIcon" />
            </button>
          </div>

          <nav className="flex flex-col items-start space-y-3 p-6">
            <HeaderLink label="Mon groupe" href="/groupe" icon="FaChurch" />
            <HeaderLink label="Mes tentes" href="tentes" icon="FaCampground" />
            <HeaderLink
              label="FAQ"
              href="/foire-aux-questions"
              target="_blank"
              icon="RiQuestionnaireFill"
            />
            <HeaderLink
              label="Tutoriels"
              href="/tutoriels"
              target="_blank"
              icon="FaGraduationCap"
            />
            <HeaderLink
              label="Nous contacter"
              href="/contact"
              target="_blank"
              icon="HiMail"
            />
            <HeaderLink
              label="Nous soutenir"
              href="/nous-soutenir"
              target="_blank"
              icon="HiHeart"
            />
            <button
              className="flex items-center gap-2 text-red-600 transition-colors"
              onClick={() => signOut({ callbackUrl: "/connexion" })}
            >
              <Icon name="HiLogout" className="w-5" />
              Déconnexion
            </button>
          </nav>
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

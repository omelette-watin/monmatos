import ButtonLink from "@/components/ui/ButtonLink"
import HeaderLink from "@/components/ui/HeaderLink"
import Icon from "@/components/ui/Icon"
import Logo from "@/components/ui/Logo"
import classNames from "classnames"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const MobileNavbar = () => {
  const router = useRouter()
  const { status } = useSession()
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
            <HeaderLink
              label="Inscrire mon groupe"
              href="/inscription"
              icon="BsPenFill"
            />
            <HeaderLink
              label="FAQ"
              href="/foire-aux-questions"
              icon="RiQuestionnaireFill"
            />
            <HeaderLink label="Guides" href="/guides" icon="FaGraduationCap" />
            <HeaderLink label="Nous contacter" href="/contact" icon="HiMail" />
            <HeaderLink
              label="Nous soutenir"
              href="/nous-soutenir"
              icon="HiHeart"
            />
          </nav>
          <ButtonLink
            href={status === "authenticated" ? "/groupe" : "/tentes"}
            size="sm"
            variant="black"
            className="mx-auto mt-auto mb-10 max-w-fit"
          >
            {status === "authenticated" ? "Mon groupe" : "Me connecter"}
          </ButtonLink>
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

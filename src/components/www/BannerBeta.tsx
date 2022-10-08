import { XIcon } from "@heroicons/react/solid"
import { useEffect, useState } from "react"
import ButtonLink from "../ui/ButtonLink"

const BANNER_KEY = "mon_matos_has_seen_banner"

export const BannerBeta = () => {
  const [isBannerOpen, setIsBannerOpen] = useState(true)

  useEffect(() => {
    setIsBannerOpen(
      () => !JSON.parse(localStorage.getItem(BANNER_KEY) ?? "false"),
    )
  }, [])

  if (!isBannerOpen) return null
  const handleCloseBanner = () => {
    setIsBannerOpen(() => false)
    localStorage.setItem(BANNER_KEY, "true")
  }

  return (
    <div className="absolute top-12 left-0 w-full py-2 md:top-16 lg:top-20">
      <div className="block w-full bg-gradient-to-l from-emerald-400 to-emerald-600">
        <div className="mx-auto max-w-7xl py-3 px-3 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex w-0 flex-1 items-center">
              <p className="ml-3 truncate font-medium text-white">
                <span className="md:inline">
                  Attention, ce site est encore en développement, tout contenu
                  peut-être supprimé.
                </span>
              </p>
            </div>
            <div className="order-3 mt-2 w-full flex-shrink-0 sm:order-2 sm:mt-0 sm:w-auto">
              <ButtonLink variant="white" size="sm" href="/">
                En savoir plus
              </ButtonLink>
            </div>
            <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
              <button
                type="button"
                className="-mr-1 flex items-center justify-center rounded-xl border border-black bg-slate-50 p-2 shadow-lg transition hover:scale-[0.98] hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-white disabled:cursor-not-allowed disabled:opacity-80 disabled:shadow-lg disabled:hover:scale-100 sm:-mr-2"
                onClick={() => {
                  handleCloseBanner()
                }}
              >
                <span className="sr-only">Ne plus afficher</span>
                <XIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

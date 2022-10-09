import Link from "next/link"
import { useEffect, useState } from "react"

const BANNER_KEY = "hasSeenBanner"

const BetaBanner = () => {
  const [shouldBannerOpen, setShouldBannerOpen] = useState<
    boolean | undefined
  >()

  useEffect(() => {
    setShouldBannerOpen(!localStorage.getItem(BANNER_KEY))
  }, [])

  if (typeof shouldBannerOpen === "undefined") return null

  if (!shouldBannerOpen) return null

  const handleCloseBanner = () => {
    setShouldBannerOpen(false)
    localStorage.setItem(BANNER_KEY, "true")
  }

  return (
    <div className="w-full bg-gradient-to-tl from-emerald-400 to-emerald-600 text-white">
      <div className="mx-auto flex flex-col items-center justify-between gap-1 p-3 text-sm sm:flex-row sm:gap-2 sm:p-4  sm:text-base lg:container">
        <div className="text-center">
          <span className="font-bold">MonMatos</span> est encore en cours de{" "}
          <span className="font-bold">développement.</span>
        </div>
        <div className="flex gap-6">
          <button
            className="underline underline-offset-1"
            onClick={handleCloseBanner}
          >
            J'ai compris
          </button>
          <Link href="/beta">
            <a
              target="_blank"
              className="animate-[pulse_1500ms_infinite] underline underline-offset-1"
            >
              En savoir plus
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default BetaBanner

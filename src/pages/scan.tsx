import Button from "@/components/ui/Button"
import Icon from "@/components/ui/Icon"
import Logo from "@/components/ui/Logo"
import Page from "@/components/ui/Page"
import classNames from "classnames"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { ReactElement, useEffect, useState } from "react"
import { QrReader } from "react-qr-reader"
import { NextPageWithLayout } from "./_app"

const ScanPage: NextPageWithLayout = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const [cameraError, setCameraError] = useState("")
  const [urlError, setUrlError] = useState("")
  const [result, setResult] = useState("")

  useEffect(() => {
    router.prefetch("/app/tentes")
    router.prefetch("/app")
    router.prefetch("/connexion")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (result) {
      const url = new URL(result)

      if (url.hostname === process.env.NEXT_PUBLIC_URL) {
        if (!session) {
          router.push(url)
        } else {
          const queries = url.search.split("&callbackUrl=")
          const groupId = queries[0]?.substring(3)

          if (groupId === session.user.id && queries[1]) {
            router.push(queries[1])
          } else {
            router.push(url)
          }
        }
      } else {
        setUrlError("Ce QR Code ne vient pas de MonMatos")
      }
    }
  }, [result, session, router])

  return (
    <div className="flex flex-col items-center justify-center gap-8 py-4">
      <Logo />
      <h1 className="whitespace-nowrap text-2xl font-bold lg:text-3xl">
        <span>Scanner un </span>
        <span className="text-emerald-600">QR Code</span>
      </h1>
      {!cameraError && (
        <div className="flex w-[400px] max-w-[90vw] items-center justify-center rounded-xl bg-slate-300 p-6 shadow-inner">
          <QrReader
            onResult={(result, error) => {
              if (error) {
                setCameraError(error.message)
              }

              if (result) {
                setResult(result.toString())
              }
            }}
            ViewFinder={() => (
              <div
                className={classNames(
                  "absolute left-1/2 top-1/2 z-50 h-[90%] w-[93%] -translate-x-1/2 -translate-y-1/2 rounded-lg border-8 border-dashed transition-colors duration-700",
                  {
                    "border-green-300": result && !urlError,
                    "border-amber-600": urlError,
                  },
                )}
              />
            )}
            className="w-fit max-w-full"
            videoContainerStyle={{
              paddingTop: "none",
              width: "full",
              height: "full",
              borderRadius: "12px",
              position: "relative",
            }}
            videoStyle={{
              position: "static",
            }}
            constraints={{ facingMode: "environment" }}
          />
        </div>
      )}
      {cameraError && (
        <div className="mx-auto flex w-fit items-center space-x-2 rounded-md bg-red-100 py-1 px-2 text-sm font-medium text-red-800 sm:text-base">
          <Icon name="MdOutlineErrorOutline" className="text-xl" />
          <span>
            {cameraError === "Permission denied"
              ? "Vous n'avez pas autorisé l'accès à la caméra"
              : "Il y a eu une erreur"}
          </span>
        </div>
      )}
      {urlError && (
        <div className="mx-auto flex w-fit items-center space-x-2 rounded-md bg-amber-100 py-1 px-2 text-sm font-medium text-amber-800 sm:text-base">
          <Icon name="MdOutlineErrorOutline" className="text-xl" />
          <span>{urlError}</span>
        </div>
      )}
      <div className="text-center text-sm font-semibold sm:text-base">
        <span>
          Si rien ne s'affiche ci-dessus ouvrez votre appareil photo pour
          scanner votre tente.
        </span>
      </div>
      <Button
        onClick={() => router.back()}
        icon="ArrowLeftIcon"
        size="xs"
        variant="white"
        className="max-w-fit"
      >
        Retour
      </Button>
    </div>
  )
}

ScanPage.getLayout = (page: ReactElement) => (
  <Page title="Scanner un QR Code">{page}</Page>
)

export default ScanPage

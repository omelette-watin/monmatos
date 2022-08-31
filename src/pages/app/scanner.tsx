import MainLayout from "@/components/ui/layouts/MainLayout"
import { ReactElement, useEffect, useState } from "react"
import { NextPageWithLayout } from "../_app"
import { QrReader } from "react-qr-reader"
import classNames from "classnames"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import Icon from "@/components/ui/Icon"

const ScanPage: NextPageWithLayout = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const [error, setError] = useState("")
  const [result, setResult] = useState("")

  useEffect(() => {
    if (result && session) {
      const url = new URL(result)
      const queries = url.search.split("&callbackUrl=")
      const groupId = queries[0]?.substring(3)

      if (groupId === session.user?.id && queries[1]) {
        router.push(queries[1])
      } else {
        router.push(url)
      }
    }
  }, [result, session, router])

  return (
    <div>
      <div className="flex flex-col items-center justify-center gap-8">
        <h1 className="whitespace-nowrap text-4xl font-bold lg:text-5xl">
          <span>Scanner ma </span>
          <span className="text-emerald-600">Tente</span>
        </h1>
        {!error && (
          <QrReader
            onResult={(result, error) => {
              if (error) {
                console.log(error)
                setError(error.message)
              }

              if (result) {
                setResult(result.toString())
              }
            }}
            ViewFinder={() => (
              <div
                className={classNames(
                  "absolute left-1/2 top-1/2 h-[90%] w-[93%] -translate-x-1/2 -translate-y-1/2 rounded-lg border-8 border-dashed transition-colors duration-700",
                  {
                    "border-green-300": result,
                  },
                )}
              />
            )}
            className="w-fit"
            videoContainerStyle={{
              paddingTop: "none",
              width: "400px",
              maxWidth: "90vw",
              borderRadius: "12px",
              position: "relative",
            }}
            videoStyle={{
              width: "400px",
              position: "static",
              maxWidth: "90vw",
            }}
            constraints={{ facingMode: "environment" }}
          />
        )}
        {error && (
          <div className="mx-auto flex w-fit items-center space-x-2 rounded-md bg-red-100 py-1 px-2 text-sm font-medium text-red-800 sm:text-base">
            <Icon name="MdOutlineErrorOutline" className="text-xl" />
            <span>Il y a eu une erreur</span>
          </div>
        )}
        <div className="text-center text-sm font-semibold sm:text-base">
          <span>
            Si rien ne s'affiche ci-dessus ouvrez votre appareil photo pour
            scanner votre tente
          </span>
        </div>
      </div>
    </div>
  )
}

ScanPage.getLayout = (page: ReactElement) => (
  <MainLayout title="Mon Groupe">{page}</MainLayout>
)

export default ScanPage

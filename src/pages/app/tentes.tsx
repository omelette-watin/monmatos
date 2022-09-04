import { useModalContext } from "@/components/business/hooks/useModalContext"
import Modal from "@/components/business/modal"
import { ModalContextProvider } from "@/components/business/modal/ModalContext"
import TentAddPanel from "@/components/business/tents/TentAddPanel"
import TentFilterPanel from "@/components/business/tents/TentFilterPanel"
import TentsContainer from "@/components/business/tents/TentsContainer"
import { TentsContextProvider } from "@/components/business/tents/TentsContext"
import TentViewPanel from "@/components/business/tents/TentViewPanel"
import Button from "@/components/ui/Button"
import Icon from "@/components/ui/Icon"
import AppLayout from "@/components/ui/layouts/AppLayout"
import Loading from "@/components/ui/Loading"
import { trpc } from "@/utils/trpc"
import { Tent } from "@prisma/client"
import { useRouter } from "next/router"
import { ReactElement, useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import { NextPageWithLayout } from "../_app"

export type Filters = {
  size: Tent["size"] | null
  unit: Tent["unit"] | null
  state: Tent["state"] | null
}

const TentsPage: NextPageWithLayout = () => {
  const router = useRouter()
  const { setModal } = useModalContext()
  const { data: tents, isLoading } = trpc.useQuery(["tents.getAll"])
  const [filters, setFilters] = useState<Filters>({
    size: null,
    unit: null,
    state: null,
  })
  const [sorting, setSorting] = useState<"asc" | "desc">("asc")
  const openAddTentPanel = () =>
    setModal({
      component: <TentAddPanel />,
      visible: true,
    })
  const openFilterModal = () =>
    setModal({
      component: <TentFilterPanel filters={filters} setFilters={setFilters} />,
      visible: true,
    })

  useEffect(() => {
    if (router.query.t === "add") {
      setModal({
        visible: true,
        component: <TentAddPanel />,
      })
      router.replace("/app/tentes", undefined, { shallow: true })

      return
    }

    if (tents && router.query.i) {
      const targetTent = tents.filter((tent) => tent.id === router.query.i)[0]
      router.replace("/app/tentes", undefined, { shallow: true })

      if (targetTent) {
        setModal({
          visible: true,
          component: <TentViewPanel tent={targetTent} />,
        })

        return
      }

      toast.error("Cette tente n'existe pas")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, tents])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="whitespace-nowrap text-4xl font-bold lg:text-5xl">
          <span>Mes </span>
          <span className="text-emerald-600">Tentes</span>
        </h1>
        <Button
          onClick={openAddTentPanel}
          type="button"
          variant="black"
          size="xs"
          icon="BsPlusLg"
          className="hidden max-w-fit sm:flex"
        >
          Ajouter une tente
        </Button>
        <button
          type="button"
          onClick={openAddTentPanel}
          className="flex h-7 w-7 items-center  justify-center rounded-full border bg-black text-white shadow-lg transition hover:scale-[0.98] hover:shadow-sm disabled:opacity-50 disabled:shadow-lg disabled:hover:scale-100 sm:hidden"
        >
          <Icon name="BsPlusLg" className="text-sm" />
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-end gap-3">
        <button
          type="button"
          onClick={() =>
            setSorting((prev) => (prev === "asc" ? "desc" : "asc"))
          }
          className="flex items-center space-x-1 text-slate-500 transition-colors hover:text-black"
        >
          {sorting === "desc" ? (
            <>
              <Icon name="FaSortNumericDown" className="text-lg" />
              <span className="font-semibold">Ordre croissant</span>
            </>
          ) : (
            <>
              <Icon name="FaSortNumericDownAlt" className="text-lg" />
              <span className="font-semibold">Ordre décroissant</span>
            </>
          )}
        </button>
        <button
          type="button"
          onClick={openFilterModal}
          className="flex items-center space-x-2 text-slate-500 transition-colors hover:text-black"
        >
          <Icon name="AdjustmentsIcon" />
          <span className="font-semibold">Filtrer</span>
        </button>
      </div>
      {isLoading && (
        <div className="m-auto w-fit py-32">
          <Loading />
        </div>
      )}

      {!isLoading && tents && (
        <TentsContainer tents={tents} filters={filters} sorting={sorting} />
      )}
    </div>
  )
}

TentsPage.protected = true

TentsPage.getLayout = (page: ReactElement) => (
  <ModalContextProvider>
    <TentsContextProvider>
      <AppLayout title="Mes Tentes">
        <>
          {page}
          <Modal />
        </>
      </AppLayout>
    </TentsContextProvider>
  </ModalContextProvider>
)

export default TentsPage

import { useModalContext } from "@/components/business/hooks/useModalContext"
import Modal from "@/components/business/modal"
import { ModalContextProvider } from "@/components/business/modal/ModalContext"
import TentAddPanel from "@/components/business/tents/TentAddPanel"
import TentFilterPanel from "@/components/business/tents/TentFilterPanel"
import TentsContainer from "@/components/business/tents/TentsContainer"
import TentViewPanel from "@/components/business/tents/TentViewPanel"
import Button from "@/components/ui/Button"
import Icon from "@/components/ui/Icon"
import AppLayout from "@/components/ui/layouts/AppLayout"
import { AppRouter } from "@/server/trpc/router"
import { trpc } from "@/utils/trpc"
import { inferProcedureOutput } from "@trpc/server"
import { useRouter } from "next/router"
import { ReactElement, useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import { NextPageWithLayout } from "../_app"

export type Tents = inferProcedureOutput<AppRouter["tents"]["getAll"]>

export type ArrayElement<A> = A extends readonly (infer T)[] ? T : never

export type Tent = ArrayElement<Tents>

export type Filters = {
  size: Tent["size"] | null
  unit: Tent["unit"] | null
  state: Tent["state"] | null
}

const TentsPage: NextPageWithLayout = () => {
  const router = useRouter()
  const { setModal } = useModalContext()
  const { data: tents, isLoading } = trpc.tents.getAll.useQuery()
  const [filters, setFilters] = useState<Filters>({
    size: null,
    unit: null,
    state: null,
  })
  const [sorting, setSorting] = useState<"asc" | "desc">("asc")
  const openAddTentPanel = () =>
    setModal({
      component: <TentAddPanel tents={tents || []} />,
      visible: true,
    })

  const openFilterModal = () =>
    setModal({
      component: <TentFilterPanel filters={filters} setFilters={setFilters} />,
      visible: true,
    })

  useEffect(() => {
    if (tents) {
      if (router.query.t === "add") {
        setModal({
          visible: true,
          component: <TentAddPanel tents={tents} />,
        })
        router.replace("/app/tentes", undefined, { shallow: true })

        return
      }

      if (router.query.i) {
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
          disabled={!tents}
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

      <TentsContainer
        tents={tents}
        filters={filters}
        sorting={sorting}
        loading={isLoading}
      />
    </div>
  )
}

TentsPage.protected = true

TentsPage.getLayout = (page: ReactElement) => (
  <ModalContextProvider>
    <AppLayout title="Mes Tentes">
      <>
        {page}
        <Modal />
      </>
    </AppLayout>
  </ModalContextProvider>
)

export default TentsPage

import TentInput from "@/components/business/tents/TentInput"
import TentsContainer from "@/components/business/tents/TentsContainer"
import TentViewPanel from "@/components/business/tents/TentViewPanel"
import Button from "@/components/ui/Button"
import { useAppContext } from "@/components/ui/hooks/useAppContext"
import MainLayout from "@/components/ui/layouts/MainLayout"
import Loading from "@/components/ui/Loading"
import { Modal } from "@/components/ui/modal"
import { trpc } from "@/utils/trpc"
import { UIProps } from "@/utils/typedProps"
import { units } from "@/utils/unit"
import { State, Tent, Unit } from "@prisma/client"
import Head from "next/head"
import { useRouter } from "next/router"
import {
  Dispatch,
  FC,
  ReactElement,
  SetStateAction,
  useEffect,
  useState,
} from "react"
import { NextPageWithLayout } from "../_app"
import TentAddPanel from "@/components/business/tents/TentAddPanel"
import Icon from "@/components/ui/Icon"

export type Filters = {
  size: Tent["size"] | null
  unit: Tent["unit"] | null
  state: Tent["state"] | null
}

const TentsPage: NextPageWithLayout = () => {
  const router = useRouter()
  const { setTents, tents, setNotification, setModal } = useAppContext()
  const { data, isLoading } = trpc.useQuery(["tents.getAll"])
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
      component: <TentFilter filters={filters} setFilters={setFilters} />,
      visible: true,
    })

  useEffect(() => {
    if (data) {
      setTents(data)

      if (router.query.i) {
        const targetTent = data.filter((tent) => tent.id === router.query.i)[0]
        router.replace("/app/tentes", undefined, { shallow: true })

        if (targetTent) {
          setModal({
            visible: true,
            component: <TentViewPanel tent={targetTent} />,
          })

          return
        }

        setNotification({
          type: "error",
          message: "Cette tente n'existe pas",
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, data])

  return (
    <div className="space-y-8">
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

      <div className="flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={openFilterModal}
            className="flex items-center space-x-2 text-slate-500 transition-colors hover:text-black"
          >
            <Icon name="AdjustmentsIcon" />
            <span className="font-semibold">Filtrer</span>
          </button>
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
        </div>
      </div>
      {isLoading && (
        <div className="m-auto w-fit py-32">
          <Loading />
        </div>
      )}

      {!isLoading && (
        <TentsContainer tents={tents} filters={filters} sorting={sorting} />
      )}
    </div>
  )
}

TentsPage.getLayout = (page: ReactElement) => (
  <MainLayout title="Mes Tentes">{page}</MainLayout>
)

export default TentsPage

export const TentFilter: FC<
  UIProps<{ filters: Filters; setFilters: Dispatch<SetStateAction<Filters>> }>
> = ({ filters, setFilters }) => {
  const { setModal } = useAppContext()
  const [wantedFilters, setWantedFilters] = useState<Filters>(filters)
  const resetFilters = () => {
    setWantedFilters({
      size: null,
      unit: null,
      state: null,
    })
  }
  const applyFilters = () => {
    setFilters(wantedFilters)
    setModal({} as Modal)
  }
  const getOptions = (obj: Record<string, string>) =>
    [
      ...Object.entries(obj).map(
        ([key, value]) => [key, value] as [string, string],
      ),
      ["TOUTES", "TOUTES"],
    ] as [string, string][]

  return (
    <>
      <Head>
        <title>Filtrer mes tentes | MonMatos</title>
      </Head>
      <div className="mx-auto max-w-[450px] space-y-2 py-4">
        <h2 className="mb-8 text-3xl font-bold">Choisir mes filtres</h2>
        <TentInput
          value={wantedFilters.unit || "TOUTES"}
          label="Par unité"
          setValue={(value) =>
            setWantedFilters((prev) => {
              return {
                ...prev,
                unit: value === "TOUTES" ? null : (value as Unit),
              }
            })
          }
          options={getOptions(units["SGDF"])}
        />
        <TentInput
          value={wantedFilters.state || "TOUTES"}
          label="Par état"
          setValue={(value) =>
            setWantedFilters((prev) => {
              return {
                ...prev,
                state: value === "TOUTES" ? null : (value as State),
              }
            })
          }
          options={getOptions(State)}
        />
        <TentInput
          value={wantedFilters.size?.toString() || "TOUTES"}
          label="Par taille"
          setValue={(value) =>
            setWantedFilters((prev) => {
              return {
                ...prev,
                size: value === "TOUTES" ? null : parseInt(value as string),
              }
            })
          }
          options={getOptions({
            1: "1 place",
            2: "2 places",
            3: "3 places",
            4: "4 places",
            5: "5 places",
            6: "6 places",
            8: "8 places",
            10: "10 places",
          })}
        />
        <div className="flex flex-wrap items-center justify-center gap-4 py-9">
          <Button
            type="button"
            onClick={resetFilters}
            icon="GrPowerReset"
            variant="white"
            size="sm"
            className="max-w-fit"
          >
            Réinitialiser
          </Button>
          <Button
            type="button"
            onClick={applyFilters}
            icon="FaFilter"
            variant="blue"
            size="sm"
            className="max-w-fit"
          >
            Filtrer
          </Button>
        </div>
      </div>
    </>
  )
}

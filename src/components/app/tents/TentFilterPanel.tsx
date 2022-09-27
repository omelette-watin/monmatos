import { Modal } from "@/components/app/modal"
import { useModalContext } from "@/components/hooks/useModalContext"
import Button from "@/components/ui/Button"
import { Filters } from "@/pages/tentes"
import { units } from "@/utils/records"
import { UIProps } from "@/utils/typedProps"
import { State, Unit } from "@prisma/client"
import Head from "next/head"
import { Dispatch, FC, SetStateAction, useState } from "react"
import TentInput from "./TentInput"

const TentFilterPanel: FC<
  UIProps<{ filters: Filters; setFilters: Dispatch<SetStateAction<Filters>> }>
> = ({ filters, setFilters }) => {
  const { setModal } = useModalContext()
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

export default TentFilterPanel

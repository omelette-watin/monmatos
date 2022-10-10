import { Modal } from "@/components/app/modal"
import { useGroup } from "@/components/hooks/useGroup"
import { useModalContext } from "@/components/hooks/useModalContext"
import Button from "@/components/ui/Button"
import { Filters } from "@/pages/tentes"
import { units } from "@/utils/records"
import { trpc } from "@/utils/trpc"
import { UIProps } from "@/utils/typedProps"
import { State, Unit } from "@prisma/client"
import Head from "next/head"
import { Dispatch, FC, SetStateAction, useState } from "react"
import TentInput from "./TentInput"

const TentFilterPanel: FC<
  UIProps<{ filters: Filters; setFilters: Dispatch<SetStateAction<Filters>> }>
> = ({ filters, setFilters }) => {
  const { setModal } = useModalContext()
  const { movement } = useGroup()
  const { data: customUnits, isLoading } = trpc.tents.getCustomUnits.useQuery()
  const [wantedFilters, setWantedFilters] = useState<Filters>(filters)
  const resetFilters = () => {
    setWantedFilters({
      size: null,
      unit: null,
      state: null,
      customUnit: null,
    })
  }
  const applyFilters = () => {
    setFilters(wantedFilters)
    setModal({} as Modal)
  }

  if (isLoading || typeof customUnits === "undefined") {
    return null
  }

  const getOptions = (obj: Record<string, string>) => [
    ...Object.entries(obj).map(
      ([key, value]) => [key, value] as [string, string],
    ),
    ["TOUTES", "TOUTES"],
  ]

  return (
    <>
      <Head>
        <title>Filtrer mes tentes | MonMatos</title>
      </Head>
      <div className="mx-auto max-w-[450px] space-y-2 py-4">
        <h2 className="mb-8 text-3xl font-bold">Choisir mes filtres</h2>
        <TentInput
          value={
            customUnits.length
              ? wantedFilters.customUnit || "TOUTES"
              : wantedFilters.unit || "TOUTES"
          }
          label="Par unité"
          setValue={(value) =>
            setWantedFilters((prev) => {
              return {
                ...prev,
                unit:
                  customUnits.length || value === "TOUTES"
                    ? null
                    : (value as Unit),
                customUnit:
                  !customUnits.length || value === "TOUTES"
                    ? null
                    : (value as Unit),
              }
            })
          }
          options={
            customUnits.length
              ? customUnits
                  .map((cu) => [cu, cu])
                  .concat([
                    ["GROUPE", "NON ATTRIBUÉE"],
                    ["TOUTES", "TOUTES"],
                  ])
              : getOptions(units[movement])
          }
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
            7: "7 places",
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

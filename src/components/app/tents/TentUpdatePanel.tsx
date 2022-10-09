import type { Modal } from "@/components/app/modal"
import { useGroup } from "@/components/hooks/useGroup"
import { useModalContext } from "@/components/hooks/useModalContext"
import Button from "@/components/ui/Button"
import Icon from "@/components/ui/Icon"
import Textarea from "@/components/ui/Textarea"
import type { Tent } from "@/pages/tentes"
import { units } from "@/utils/records"
import { trpc } from "@/utils/trpc"
import { UIProps } from "@/utils/typedProps"
import { State, Unit } from "@prisma/client"
import Head from "next/head"
import { FC, FormEvent, useState } from "react"
import { toast } from "react-hot-toast"
import TentInput from "./TentInput"
import { getTentsErrorMessage } from "./tentsErrorMessage"
import TentViewPanel from "./TentViewPanel"

const TentUpdatePanel: FC<UIProps<{ tent: Tent }>> = ({ tent }) => {
  const { movement } = useGroup()
  const { setModal } = useModalContext()
  const trpcCtx = trpc.useContext()
  const updateMutation = trpc.tents.update.useMutation({
    onSuccess() {
      setModal({} as Modal)
    },
    onSettled() {
      trpcCtx.tents.getAll.invalidate()
    },
  })
  const [state, setState] = useState(tent.state)
  const [unit, setUnit] = useState(tent.unit)
  const [size, setSize] = useState(tent.size)
  const [complete, setComplete] = useState(tent.complete)
  const [integrated, setIntegrated] = useState(tent.integrated)
  const [type, setType] = useState(tent.type)
  const [comments, setComments] = useState(tent.comments || "")
  const goBackToViewPanel = () =>
    setModal({
      component: <TentViewPanel tent={tent} />,
      visible: true,
    })
  const handleUpdate = (e: FormEvent) => {
    e.preventDefault()
    const updatePromise = updateMutation.mutateAsync({
      id: tent.id,
      values: {
        identifier: tent.identifier,
        state,
        size,
        unit,
        complete,
        integrated,
        type,
        comments,
      },
    })

    toast.promise(updatePromise, {
      success: "Modifications sauvegardées",
      error: getTentsErrorMessage,
      loading: "Sauvegarde en cours ...",
    })
  }

  return (
    <>
      <Head>
        <title>{`Modifier la tente ${tent.identifier} | MonMatos`}</title>
      </Head>
      <form
        className="mx-auto max-w-[450px] space-y-6 py-4"
        onSubmit={handleUpdate}
      >
        {isNaN(Number(tent.identifier)) ? (
          <h2 className="mx-auto my-10 w-fit max-w-[90%] truncate text-3xl font-bold">
            {tent.identifier}
          </h2>
        ) : (
          <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border-4 border-slate-800">
            <h2 className="text-3xl font-bold">{tent.identifier}</h2>
          </div>
        )}
        <div className="pt-4">
          <div className="mx-auto flex w-fit items-center space-x-2 rounded-lg bg-green-100 py-1 px-2 text-sm font-medium text-green-800 sm:text-base">
            <Icon name="MdOutlineErrorOutline" className="text-xl" />
            <span>Pensez à sauvegarder vos modifications</span>
          </div>
        </div>

        <div>
          <p className="text-lg font-bold">Informations</p>
          <p>Cliquez sur les éléments afin de les modifier</p>
        </div>
        <div className="space-y-2">
          <TentInput
            label="Attribué aux"
            value={unit}
            setValue={(value) => setUnit(value as Unit)}
            options={Object.entries(units[movement]).map(([key, value]) => [
              key as Unit,
              value,
            ])}
          />
          <TentInput
            label="Taille"
            value={size.toString()}
            setValue={(value) => {
              const int = parseInt(value as string)
              setSize(int)
            }}
            options={[
              ["1", "1 place"],
              ["2", "2 places"],
              ["3", "3 places"],
              ["4", "4 places"],
              ["5", "5 places"],
              ["6", "6 places"],
              ["7", "7 places"],
              ["8", "8 places"],
            ]}
          />
          <TentInput
            label="ÉTAT"
            value={state}
            setValue={(value) => setState(value as State)}
            options={Object.entries(State).map(([key, value]) => [
              key as State,
              value,
            ])}
          />
          <TentInput
            label="Complète ?"
            value={complete ? "OUI" : "NON"}
            setValue={(value) => setComplete(value === "OUI" ? true : false)}
            options={[
              ["OUI", "OUI"],
              ["NON", "NON"],
            ]}
          />
          <TentInput
            label="TYPE"
            value={type.toUpperCase()}
            setValue={setType}
            options={[
              ["CANADIENNE", "CANADIENNE"],
              ["QUECHUA", "QUECHUA"],
              ["MARABOUT", "MARABOUT"],
            ]}
          />
          <TentInput
            label="Tapis de sol"
            value={integrated ? "INTÉGRÉ" : "NORMAL"}
            setValue={(value) =>
              setIntegrated(value === "INTÉGRÉ" ? true : false)
            }
            options={[
              ["INTÉGRÉ", "INTÉGRÉ"],
              ["NORMAL", "NORMAL"],
            ]}
          />
        </div>
        <Textarea
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          label="Commentaires"
        />
        <div className="flex flex-wrap items-center justify-center gap-8">
          <Button
            type="button"
            onClick={goBackToViewPanel}
            size="sm"
            icon="HiArrowLeft"
            variant="white"
            className="max-w-fit"
          >
            Annuler
          </Button>
          <Button
            type="submit"
            size="sm"
            icon="RiSave2Fill"
            className="max-w-fit"
            disabled={updateMutation.isLoading}
          >
            {updateMutation.isLoading ? "Modification ..." : "Modifier"}
          </Button>
        </div>
      </form>
    </>
  )
}

export default TentUpdatePanel

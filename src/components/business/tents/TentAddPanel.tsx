import Button from "@/components/ui/Button"
import { useAppContext } from "@/components/ui/hooks/useAppContext"
import Icon from "@/components/ui/Icon"
import { Modal } from "@/components/ui/modal"
import { trpc } from "@/utils/trpc"
import { UIProps } from "@/utils/typedProps"
import { units } from "@/utils/unit"
import { Group, State, Unit } from "@prisma/client"
import classNames from "classnames"
import { FC, useState } from "react"
import TentInput from "./TentInput"

const TentAddPanel: FC<UIProps<{ movement?: Group["movement"] }>> = ({
  movement = "SGDF",
}) => {
  const { setModal, setNotification, setTents, tents } = useAppContext()
  const updateMutation = trpc.useMutation(["tents.create"], {
    onSuccess(data) {
      setTents((prev) => [...prev, data])
      setNotification({
        message: "Votre tente a bien été ajoutée",
        type: "success",
      })
      setModal({} as Modal)
    },
    onError(error) {
      console.log(error)
      forbidenIdentifyingNumbers.push(identifyingNum as number)
      setIdentifyingNum(null)
      setNotification({
        message: "Ce numéro de tente est déjà attribué",
        type: "error",
      })
    },
  })
  const [identifyingNum, setIdentifyingNum] = useState<number | null>(null)
  const [state, setState] = useState<State>("NEUF")
  const [unit, setUnit] = useState<Unit>("LOUVETEAUX")
  const [size, setSize] = useState(6)
  const [complete, setComplete] = useState(true)
  const [integrated, setIntegrated] = useState(false)
  const [type, setType] = useState("CANADIENNE")
  const [comments, setComments] = useState("")
  const forbidenIdentifyingNumbers = tents.map((tent) => tent.identifyingNum)
  const closePanel = () => setModal({} as Modal)
  const handleAdd = () => {
    if (identifyingNum) {
      updateMutation.mutate({
        identifyingNum,
        state,
        size,
        unit,
        complete,
        integrated,
        type,
        comments,
      })
    }
  }

  return (
    <div className="mx-auto max-w-[450px] space-y-6 py-4">
      <div
        className={classNames(
          "mx-auto flex h-28 w-28 items-center justify-center rounded-full border-4",
          {
            "border-slate-800 text-slate-800": !identifyingNum,

            "border-emerald-500/90 text-emerald-500/90":
              identifyingNum &&
              !forbidenIdentifyingNumbers.includes(identifyingNum as number),
            "border-red-500/90 text-red-500/90":
              identifyingNum &&
              forbidenIdentifyingNumbers.includes(identifyingNum as number),
          },
        )}
      >
        <input
          type="text"
          autoFocus
          className="w-[90px] rounded-lg border-2 border-dashed bg-transparent p-1 px-2 text-center text-3xl font-bold outline-none"
          placeholder={"XX"}
          onChange={(e) => setIdentifyingNum(parseInt(e.target.value))}
          value={identifyingNum || ""}
        />
      </div>
      <div className="pt-4">
        <div
          className={classNames(
            "mx-auto flex w-fit items-center space-x-2 rounded-lg py-1 px-2 text-sm font-medium  sm:text-base",
            {
              "bg-amber-100 text-amber-800": !identifyingNum,
              "bg-green-100 text-green-800":
                identifyingNum &&
                !forbidenIdentifyingNumbers.includes(identifyingNum as number),
              "bg-red-100 text-red-800":
                identifyingNum &&
                forbidenIdentifyingNumbers.includes(identifyingNum as number),
            },
          )}
        >
          <Icon name="MdOutlineErrorOutline" className="text-xl" />
          <span>Choisissez un numéro de tente non attribué</span>
        </div>
      </div>

      <div>
        <p className="text-lg font-bold">Informations</p>
        <p>Cliquez sur les éléments afin de les modifier</p>
      </div>
      <div className="space-y-2">
        <TentInput
          label={`Attribué au${unit !== "GROUPE" ? "x" : ""}`}
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
            ["8", "8 places"],
          ]}
        />
        <TentInput
          label="ÉTAT"
          value={state}
          setValue={(value) => setState(value as State)}
          options={[
            ["BON", "BON"],
            ["MAUVAIS", "MAUVAIS"],
            ["INUTILISABLE", "INUTILISABLE"],
            ["NEUF", "NEUF"],
          ]}
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
          value={integrated ? "OUI" : "NON"}
          setValue={(value) => setIntegrated(value === "OUI" ? true : false)}
          options={[
            ["OUI", "OUI"],
            ["NON", "NON"],
          ]}
        />
      </div>
      <textarea
        value={comments}
        onChange={(e) => setComments(e.target.value)}
        placeholder="Commentaire"
        className="w-full p-2"
      />
      <div className="flex flex-wrap items-center justify-center gap-8">
        <Button
          type="button"
          onClick={closePanel}
          size="sm"
          icon="HiArrowLeft"
          variant="white"
          className="max-w-fit"
        >
          Annuler
        </Button>
        <Button
          type="button"
          onClick={handleAdd}
          disabled={!identifyingNum}
          size="sm"
          icon="RiSave2Fill"
          className="max-w-fit"
        >
          Ajouter
        </Button>
      </div>
    </div>
  )
}

export default TentAddPanel

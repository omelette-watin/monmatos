import { Modal } from "@/components/app/modal"
import { useGroup } from "@/components/hooks/useGroup"
import { useModalContext } from "@/components/hooks/useModalContext"
import Button from "@/components/ui/Button"
import Icon from "@/components/ui/Icon"
import Textarea from "@/components/ui/Textarea"
import { Tents } from "@/pages/tentes"
import { units } from "@/utils/records"
import { trpc } from "@/utils/trpc"
import { UIProps } from "@/utils/typedProps"
import { Switch } from "@headlessui/react"
import { State, Unit } from "@prisma/client"
import classNames from "classnames"
import Head from "next/head"
import { FC, FormEvent, useState } from "react"
import { toast } from "react-hot-toast"
import TentInput from "./TentInput"
import { getTentsErrorMessage } from "./tentsErrorMessage"

const TentAddPanel: FC<UIProps<{ tents: Tents }>> = ({ tents }) => {
  const { movement } = useGroup()
  const { setModal } = useModalContext()
  const trpcCtx = trpc.useContext()
  const { data: customUnits, isLoading } = trpc.tents.getCustomUnits.useQuery()
  const createMutation = trpc.tents.create.useMutation({
    onSuccess() {
      setModal({} as Modal)
    },
    onError() {
      setBlacklist((prev) => [...prev, identifier])
    },
    onSettled() {
      trpcCtx.tents.getAll.invalidate()
    },
  })
  const [blacklist, setBlacklist] = useState(
    tents.map((tent) => tent.identifier),
  )
  const [textIdentifier, setTextIdentifier] = useState(false)
  const [identifier, setIdentifier] = useState<string>("")
  const [state, setState] = useState<State>("NEUF")
  const [unit, setUnit] = useState<Unit | string>("GROUPE")
  const [size, setSize] = useState(6)
  const [complete, setComplete] = useState(true)
  const [integrated, setIntegrated] = useState(false)
  const [type, setType] = useState("CANADIENNE")
  const [comments, setComments] = useState("")
  const closePanel = () => setModal({} as Modal)

  if (isLoading || typeof customUnits === "undefined") {
    return null
  }

  const handleAdd = (e: FormEvent) => {
    e.preventDefault()

    if (identifier) {
      const createPromise = createMutation.mutateAsync({
        identifier,
        state,
        size,
        complete,
        integrated,
        type,
        comments,
        unit: customUnits.length ? null : (unit as Unit),
        customUnit: !customUnits.length ? null : unit,
      })
      toast.promise(createPromise, {
        success: "Tente ajoutée",
        error: getTentsErrorMessage,
        loading: "Ajout en cours ...",
      })
    }
  }

  return (
    <>
      <Head>
        <title>Ajouter une tente | MonMatos</title>
      </Head>
      <form
        className="mx-auto flex max-w-[450px] flex-col gap-6 py-4"
        onSubmit={handleAdd}
      >
        <div className="mx-auto flex items-center gap-2 text-sm font-medium">
          <span>
            {" "}
            <span
              className={`${
                !textIdentifier ? "text-emerald-500" : ""
              } transition-colors`}
            >
              Numéro
            </span>{" "}
            ou{" "}
            <span
              className={`${
                textIdentifier ? "text-emerald-500" : ""
              } transition-colors`}
            >
              Nom
            </span>{" "}
            ?
          </span>
          <Switch
            checked={textIdentifier}
            onChange={(e: boolean) => {
              setIdentifier("")
              setTextIdentifier(e)
            }}
            className={`${textIdentifier ? "bg-emerald-500" : "bg-slate-900"}
          relative inline-flex h-6 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none  focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
          >
            <span className="sr-only">Type d'identifiant</span>
            <span
              aria-hidden="true"
              className={`${textIdentifier ? "translate-x-6" : "translate-x-0"}
            pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
            />
          </Switch>
        </div>
        {!textIdentifier ? (
          <div
            className={classNames(
              "mx-auto flex h-28 w-28 items-center justify-center rounded-full border-4",
              {
                "border-slate-800 text-slate-800": !identifier,

                "border-emerald-500/90 text-emerald-500/90":
                  identifier && !blacklist.includes(identifier),
                "border-red-500/90 text-red-500/90":
                  identifier && blacklist.includes(identifier),
              },
            )}
          >
            <input
              type="text"
              autoFocus
              className="w-[90px] bg-transparent p-1 px-2 text-center text-3xl font-bold outline-none"
              placeholder={"XX"}
              onChange={(e) => {
                if (parseInt(e.target.value) || !e.target.value.length) {
                  setIdentifier(e.target.value)
                }
              }}
              value={identifier}
            />
          </div>
        ) : (
          <input
            type="text"
            autoFocus
            className={classNames(
              "mx-auto my-8 block max-w-[250px] rounded-none border-b-2 border-t-2 border-t-transparent bg-transparent p-1 px-4 text-3xl font-bold outline-none placeholder:font-medium",
              {
                "border-slate-800 text-slate-800": !identifier,

                "border-emerald-500/90 text-emerald-500/90":
                  identifier && !blacklist.includes(identifier),
                "border-red-500/90 text-red-500/90":
                  identifier && blacklist.includes(identifier),
              },
            )}
            placeholder="La Téméraire"
            onChange={(e) => setIdentifier(e.target.value)}
            value={identifier}
          />
        )}

        <div className="pt-4">
          <div
            className={classNames(
              "mx-auto flex w-fit items-center space-x-2 rounded-lg py-1 px-2 text-sm font-medium  sm:text-base",
              {
                "bg-amber-100 text-amber-800": !identifier,
                "bg-green-100 text-green-800":
                  identifier && !blacklist.includes(identifier),
                "bg-red-100 text-red-800":
                  identifier && blacklist.includes(identifier),
              },
            )}
          >
            <Icon name="MdOutlineErrorOutline" className="text-xl" />
            <span>Choisissez un identifiant de tente non attribué</span>
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
            setValue={(value) => setUnit(value)}
            options={
              customUnits.length
                ? customUnits
                    .map((cu) => [cu, cu])
                    .concat([["GROUPE", "NON ATTRIBUÉE"]])
                : Object.entries(units[movement]).map(([key, value]) => [
                    key as Unit,
                    value,
                  ])
            }
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
          label="Commentaires"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
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
            type="submit"
            disabled={
              !identifier ||
              blacklist.includes(identifier) ||
              createMutation.isLoading
            }
            size="sm"
            icon="RiSave2Fill"
            className="max-w-fit"
          >
            {createMutation.isLoading ? "Ajout ..." : "Ajouter"}
          </Button>
        </div>
      </form>
    </>
  )
}

export default TentAddPanel

import Button from "@/components/ui/Button"
import { useAppContext } from "@/components/ui/hooks/useAppContext"
import { downloadImageFromCanvas } from "@/utils/downloadFns"
import { UIProps } from "@/utils/typedProps"
import { units } from "@/utils/unit"
import { Group } from "@prisma/client"
import { useSession } from "next-auth/react"
import Head from "next/head"
import { QRCodeCanvas } from "qrcode.react"
import { FC } from "react"
import { stateColors } from "../dashboard/StateChart"
import { SingleTent } from "./TentCard"
import TentCharacteristic from "./TentCharacteristic"
import TentDeletePanel from "./TentDeletePanel"
import TentUpdatePanel from "./TentUpdatePanel"

const TentViewPanel: FC<
  UIProps<{ tent: SingleTent; movement?: Group["movement"] }>
> = ({ tent, movement = "SGDF" }) => {
  const { data: session } = useSession()
  const {
    id,
    identifyingNum,
    size,
    unit,
    state,
    type,
    integrated,
    complete,
    comments,
    updatedAt,
    createdAt,
  } = tent
  const { setModal, setNotification } = useAppContext()
  const downloadQRCode = async () => {
    try {
      await downloadImageFromCanvas(id, `tente ${identifyingNum} QR Code`)
    } catch (error) {
      setNotification({
        message:
          "Votre navigateur est trop ancien, veuillez utiliser un autre appareil",
        type: "error",
      })
    }
  }
  const goToDeletePanel = () =>
    setModal({
      visible: true,
      component: <TentDeletePanel tent={tent} />,
    })
  const goToUpdatePanel = () =>
    setModal({
      visible: true,
      component: <TentUpdatePanel tent={tent} />,
    })

  return (
    <>
      <Head>
        <title>{`Tente ${identifyingNum} | MonMatos`}</title>
      </Head>
      <div className="mx-auto max-w-[450px] space-y-6 py-4">
        <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border-4 border-slate-800">
          <h2 className="text-3xl font-bold">{identifyingNum}</h2>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          <Button
            type="button"
            onClick={goToUpdatePanel}
            size="sm"
            icon="HiPencil"
            className="max-w-fit"
          >
            Modifier
          </Button>
          <Button
            type="button"
            onClick={downloadQRCode}
            size="sm"
            variant="black"
            icon="HiDownload"
            className="max-w-fit"
          >
            QRCode
          </Button>
        </div>
        <div>
          <p className="text-lg font-bold">Informations</p>
          <p>
            {createdAt >= updatedAt
              ? `Créée le ${createdAt.toLocaleDateString()}`
              : `Modifiée le ${updatedAt.toLocaleDateString()}`}
          </p>
        </div>

        <div className="space-y-2">
          <TentCharacteristic
            type="unit"
            label={`Attribuée au${unit !== "GROUPE" ? "x" : ""}`}
            value={units[movement][unit] || "GROUPE"}
          />
          <TentCharacteristic
            type="size"
            label="TAILLE"
            value={`${size} place${size > 1 ? "s" : ""}`}
          />
          <TentCharacteristic
            type="state"
            label="ÉTAT"
            value={state}
            variants={stateColors}
          />
          <TentCharacteristic
            label="Complète ?"
            value={complete ? "OUI" : "NON"}
          />
          <TentCharacteristic
            type="type"
            label="TYPE"
            value={type.toUpperCase()}
          />
          <TentCharacteristic
            label="Tapis de sol"
            value={integrated ? "INTÉGRÉ" : "NORMAL"}
          />
          <p className="py-2 italic">
            {comments
              ? `Commentaire: "${comments}"`
              : "Pas encore de commentaire ..."}
          </p>
          <Button
            type="button"
            onClick={goToDeletePanel}
            size="sm"
            variant="red"
            icon="HiTrash"
            className="ml-auto max-w-fit"
          >
            Supprimer
          </Button>
          <QRCodeCanvas
            id={id}
            size={250}
            value={`http://localhost:3000/connexion?i=${session?.user?.id}&callbackUrl=/app/tentes?i=${id}`}
            includeMargin={true}
            className="hidden"
          />
        </div>
      </div>
    </>
  )
}

export default TentViewPanel

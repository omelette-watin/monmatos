import { stateColors } from "@/components/app/dashboard/StateChart"
import { useGroup } from "@/components/hooks/useGroup"
import { useModalContext } from "@/components/hooks/useModalContext"
import Button from "@/components/ui/Button"
import type { Tent } from "@/pages/tentes"
import { downloadImageFromCanvas } from "@/utils/downloadFns"
import { units } from "@/utils/records"
import { UIProps } from "@/utils/typedProps"
import Head from "next/head"
import { QRCodeCanvas } from "qrcode.react"
import { FC } from "react"
import TentCharacteristic from "./TentCharacteristic"
import TentDeletePanel from "./TentDeletePanel"
import TentUpdatePanel from "./TentUpdatePanel"

const TentViewPanel: FC<UIProps<{ tent: Tent }>> = ({ tent }) => {
  const { movement, id: groupId } = useGroup()
  const {
    id,
    identifier,
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
  const { setModal } = useModalContext()
  const downloadQRCode = () =>
    downloadImageFromCanvas(id, `tente ${identifier} QR Code`)

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
        <title>{`Tente ${identifier} | MonMatos`}</title>
      </Head>
      <div className="mx-auto max-w-[450px] space-y-6 py-4">
        {isNaN(Number(identifier)) ? (
          <h2 className="mx-auto my-10 w-fit truncate text-3xl font-bold">
            {identifier}
          </h2>
        ) : (
          <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border-4 border-slate-800">
            <h2 className="text-3xl font-bold">{identifier}</h2>
          </div>
        )}

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
            label="Attribué aux"
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
            value={`${process.env.NEXT_PUBLIC_URL}/connexion?i=${groupId}&callbackUrl=/tentes?i=${id}`}
            includeMargin={true}
            className="hidden"
          />
        </div>
      </div>
    </>
  )
}

export default TentViewPanel

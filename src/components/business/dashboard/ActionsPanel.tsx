import Button from "@/components/ui/Button"
import ButtonLink from "@/components/ui/ButtonLink"
import Icon from "@/components/ui/Icon"
import Panel from "@/components/ui/Panel"
import { copyToClipBoard } from "@/utils/copyToClipBoard"
import { downloadExcel, downloadImageFromCanvas } from "@/utils/downloadFns"
import { UIProps } from "@/utils/typedProps"
import { Group, Tent } from "@prisma/client"
import { Session } from "next-auth"
import { QRCodeCanvas } from "qrcode.react"
import { FC } from "react"

const ActionsPanel: FC<UIProps<{ session: Session; tents: Tent[] }>> = ({
  session,
  tents,
}) => {
  const actions: Record<"partager" | "exporter", Record<number, () => void>> = {
    partager: {
      1: () =>
        copyToClipBoard(
          "Lien",
          `${process.env.NEXT_PUBLIC_URL}/connexion?i=${session.user?.id}&callbackUrl=/app`,
        ),
      2: () => downloadImageFromCanvas("QR", `${session.user?.name} QR Code`),
      3: () => copyToClipBoard("Identifiant", session.user?.id || ""),
    },
    exporter: {
      1: downloadExcel(tents, session.user?.movement as Group["movement"]),
    },
  }

  return (
    <Panel id="actions">
      <h2 className="flex items-center space-x-2 p-1 text-2xl font-bold">
        <Icon name="CursorClickIcon" className="w-8" />
        <span>Actions</span>
      </h2>
      <div className="grid grid-cols-1 gap-10 py-4 lg:grid-cols-2">
        <div className="mx-auto w-full max-w-[350px] space-y-6">
          <h3 className="ml-2 flex items-center space-x-2 self-start text-xl font-semibold">
            <Icon name="TbTent" />
            <span>Tentes</span>
          </h3>
          <div className="flex flex-col items-center justify-center gap-3">
            <ButtonLink
              href="/app/tentes?t=add"
              variant="black"
              size="sm"
              icon="BsPlusLg"
            >
              Ajouter une tente
            </ButtonLink>
            <ButtonLink
              href="/app/tentes"
              variant="white"
              icon="TiThList"
              size="sm"
            >
              Parcourir les tentes
            </ButtonLink>
            <Button
              type="button"
              icon="RiFileExcel2Fill"
              size="sm"
              onClick={actions["exporter"][1]}
            >
              Exporter en .xlsx
            </Button>
          </div>
        </div>
        <div className="mx-auto w-full max-w-[350px] space-y-6">
          <h3 className="ml-2 flex items-center space-x-2 self-start text-xl font-semibold">
            <Icon name="FiShare2" />
            <span>Inviter dans le groupe</span>
          </h3>
          <div className="flex flex-col items-center justify-center gap-3">
            <Button
              type="button"
              icon="ImLink"
              variant="blue"
              size="sm"
              onClick={actions["partager"][1]}
            >
              Copier le lien
            </Button>
            <Button
              type="button"
              variant="black"
              icon="RiQrCodeLine"
              size="sm"
              onClick={actions["partager"][2]}
            >
              Télécharger le QR Code
            </Button>
            <Button
              type="button"
              variant="white"
              icon="MdPassword"
              size="sm"
              onClick={actions["partager"][3]}
            >
              Copier l'identifiant
            </Button>
            <QRCodeCanvas
              id="QR"
              size={250}
              value={`${process.env.NEXT_PUBLIC_URL}/connexion?i=${session.user?.id}&callbackUrl=/app`}
              includeMargin={true}
              className="hidden"
            />
          </div>
        </div>
      </div>
    </Panel>
  )
}

export default ActionsPanel

import Button from "@/components/ui/Button"
import Card from "@/components/ui/Card"
import { useAppContext } from "@/components/ui/hooks/useAppContext"
import Icon from "@/components/ui/Icon"
import Panel from "@/components/ui/Panel"
import { UIProps } from "@/utils/typedProps"
import { Session } from "next-auth"
import { useRouter } from "next/router"
import { FC, useRef } from "react"
import { QRCodeCanvas } from "qrcode.react"
import { downloadExcel, downloadImageFromCanvas } from "@/utils/downloadFns"
import { Group, Tent } from "@prisma/client"
import { useReactToPrint } from "react-to-print"
import AllQRCodes from "./AllQRCodes"
import { copyToClipBoard } from "@/utils/helpers"
import TentAddPanel from "../tents/TentAddPanel"

const ActionsPanel: FC<UIProps<{ session: Session; tents: Tent[] }>> = ({
  session,
  tents,
}) => {
  const router = useRouter()
  const { setNotification, setModal } = useAppContext()
  const pdfRef = useRef<HTMLDivElement>(null)
  const handlePrint = useReactToPrint({
    content: () => pdfRef.current as HTMLDivElement,
    documentTitle: `Tentes ${session.user?.name} QRCode.pdf`,
    onPrintError(errorLocation, error) {
      console.log({ error, errorLocation })
      setNotification({
        message:
          "Votre navigateur est trop ancien, veuillez utiliser un autre appareil",
        type: "error",
      })
    },
  })
  const actions: Record<
    "tentes" | "partager" | "exporter",
    Record<number, () => void>
  > = {
    tentes: {
      1: () =>
        setModal({
          visible: true,
          component: <TentAddPanel movement={session?.user?.movement} />,
        }),
      2: () => router.push("/app/tentes/scanner"),
      3: () => router.push("app/tentes"),
    },
    partager: {
      1: async () =>
        copyToClipBoard(
          `http://localhost:3000/connexion?i=${session.user?.id}&callbackUrl=/app`,
          setNotification,
        ),
      2: async () => {
        try {
          await downloadImageFromCanvas("QR", `${session.user?.name} QR Code`)
        } catch (error) {
          setNotification({
            message:
              "Votre navigateur est trop ancien, veuillez utiliser un autre appareil",
            type: "error",
          })
        }
      },
      3: async () => copyToClipBoard(session.user?.id || "", setNotification),
    },
    exporter: {
      1: downloadExcel(tents, session.user?.movement as Group["movement"]),
      2: handlePrint,
    },
  }

  return (
    <Panel id="actions">
      <h2 className="flex items-center space-x-2 p-1 text-2xl font-bold">
        <Icon name="CursorClickIcon" className="w-8" />
        <span>Actions</span>
      </h2>
      <div className="grid grid-cols-1 gap-5 py-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <h3 className="ml-2 flex items-center space-x-2 self-start text-xl font-semibold">
            <Icon name="TbTent" />
            <span>Tentes</span>
          </h3>
          <div className="flex flex-col items-center justify-center gap-6">
            <Button
              onClick={actions["tentes"][1]}
              type="button"
              variant="green"
              size="sm"
              icon="BsPlusLg"
            >
              Ajouter une tente
            </Button>
            <Button
              onClick={actions["tentes"][2]}
              type="button"
              variant="black"
              icon="MdOutlineQrCodeScanner"
              size="sm"
            >
              Scanner ma tente
            </Button>
            <Button
              onClick={actions["tentes"][3]}
              type="button"
              variant="white"
              icon="TiThList"
              size="sm"
            >
              Parcourir les tentes
            </Button>
          </div>
        </Card>
        <Card>
          <h3 className="ml-2 flex items-center space-x-2 self-start text-xl font-semibold">
            <Icon name="FiShare2" />
            <span>Inviter dans le groupe</span>
          </h3>
          <div className="flex flex-col items-center justify-center gap-6">
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
              value={`http://localhost:3000/connexion?i=${session.user?.id}&callbackUrl=/app`}
              includeMargin={true}
              className="hidden"
            />
          </div>
        </Card>
        <Card>
          <h3 className="ml-2 flex items-center space-x-2 self-start text-xl font-semibold">
            <Icon name="FiShare" />
            <span>Exporter</span>
          </h3>
          <div className="flex flex-col items-center justify-center gap-6">
            <Button
              type="button"
              icon="RiFileExcel2Fill"
              size="sm"
              onClick={actions["exporter"][1]}
            >
              Exporter en .xlsx
            </Button>
            <Button
              type="button"
              variant="black"
              icon="AiOutlinePrinter"
              size="sm"
              onClick={actions["exporter"][2]}
            >
              Imprimer les QR Codes
            </Button>
          </div>
        </Card>
        <AllQRCodes session={session} tents={tents} ref={pdfRef} />
      </div>
    </Panel>
  )
}

export default ActionsPanel

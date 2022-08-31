/* eslint-disable react/display-name */
import { Tent } from "@prisma/client"
import { ForwardedRef, forwardRef } from "react"
import { QRCodeCanvas } from "qrcode.react"
import { Session } from "next-auth"

const AllQRCodes = forwardRef(
  (
    { tents, session }: { tents: Tent[]; session: Session },
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    return (
      <div className="hidden">
        <div ref={ref} className="space-y-5 py-8">
          <h1 className="text-center text-2xl font-bold">
            QR Codes des tentes {session.user?.name}
          </h1>
          <div className="mx-auto grid w-fit grid-cols-4 gap-4">
            {tents.map((tent) => {
              return (
                <div
                  key={tent.identifyingNum}
                  className="w-fit bg-white p-4 text-center"
                >
                  <QRCodeCanvas
                    id="QR"
                    size={180}
                    value={`${process.env.NEXT_PUBLIC_URL}/connexion?i=${session.user?.id}&callbackUrl=/app/tentes${tent.id}`}
                    includeMargin={true}
                  />
                  <p className="text-sm font-semibold">
                    Tente numéro {tent.identifyingNum}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  },
)

export default AllQRCodes

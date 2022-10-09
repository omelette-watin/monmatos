import { PrismaClientKnownRequestError } from "@prisma/client/runtime"

export const tentsErrorMessage: Record<
  PrismaClientKnownRequestError["code"],
  string
> = {
  P2002: "Cet identifiant de tente est déjà attribué",
  P2025: "Cette tente n'existe plus",
  P2003: "Votre groupe n'est plus sur MonMatos",
}

export const getTentsErrorMessage = ({ message }: { message: string }) =>
  tentsErrorMessage[message] || "Veuillez réessayer plus tard"

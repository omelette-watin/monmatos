export const tentsErrorMessage: Record<string, string> = {
  CONFLICT: "Ce numéro de tente est déjà attribué",
  DELETED: "Cette tente n'existe plus",
  NOTFOUND: "Cette tente n'existe pas",
}

export const getTentsErrorMessage = ({ message }: { message: string }) =>
  tentsErrorMessage[message] || "Veuillez réessayer plus tard"

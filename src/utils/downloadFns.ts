import { Group, Tent } from "@prisma/client"
import * as xlsx from "xlsx"
import { units } from "./records"

export const downloadImageFromCanvas = (id: string, filename: string) => {
  const canvas = document.getElementById(id) as HTMLCanvasElement
  const pngUrl = (canvas as HTMLCanvasElement)
    .toDataURL("image/png")
    .replace("image/png", "image/octet-stream")
  const downloadLink = document.createElement("a")

  downloadLink.href = pngUrl
  downloadLink.download = `${filename}.png`
  document.body.appendChild(downloadLink)
  downloadLink.click()
  document.body.removeChild(downloadLink)
}

export const downloadExcel = (
  tents: Tent[],
  movementName: Group["movement"],
) => {
  const formatedTents = tents.map((tent) => {
    return {
      ["Numéro de tente"]: tent.identifyingNum,
      ["Unité"]: tent.unit,
      ["Nombres de place"]: tent.size,
      ["Type de tente"]: tent.type,
      ["Tapis de sol intégré"]: tent.integrated ? "OUI" : "NON",
      ["État"]: tent.state,
      ["Complète"]: tent.complete ? "OUI" : "NON",
      ["Commentaires"]: tent.comments,
    }
  })
  const movementUnits = units[movementName]
  const handleExport = async () => {
    const wb = xlsx.utils.book_new()
    const ws = xlsx.utils.json_to_sheet(formatedTents)
    xlsx.utils.book_append_sheet(wb, ws, "GLOBAL")

    Object.entries(movementUnits).forEach(([key, value]) => {
      const ws = xlsx.utils.json_to_sheet(
        formatedTents.filter((tent) => tent["Unité"] === key),
      )
      xlsx.utils.book_append_sheet(wb, ws, value)
    })

    xlsx.writeFile(wb, "Tentes.xlsx")
  }

  return handleExport
}

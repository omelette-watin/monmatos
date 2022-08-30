import { Notification } from "@/components/business/Notification"

export const copyToClipBoard = async (
  label: string,
  str: string,
  callback: ({
    message,
    type,
  }: {
    message: Notification["message"]
    type: Notification["type"]
  }) => void,
) => {
  try {
    await navigator.clipboard.writeText(str)
    callback({
      message: `${label} copié dans le presse-papier !`,
      type: "success",
    })
  } catch (error) {
    console.log(error)
    let textarea

    try {
      textarea = document.createElement("textarea")
      textarea.setAttribute("readonly", "true")
      textarea.setAttribute("contenteditable", "true")
      textarea.style.position = "fixed"
      textarea.style.display = "hidden"
      textarea.value = str
      document.body.appendChild(textarea)

      textarea.focus()
      textarea.select()

      const range = document.createRange()
      range.selectNodeContents(textarea)

      const sel = window.getSelection()
      sel?.removeAllRanges()
      sel?.addRange(range)

      textarea.setSelectionRange(0, textarea.value.length)
      document.execCommand("copy")
      callback({
        message: `${label} copié dans le presse-papier !`,
        type: "success",
      })
    } catch (error) {
      console.error(error)
      callback({
        message: "Presse-papier non pris en charge",
        type: "warning",
      })
    } finally {
      if (textarea) document.body.removeChild(textarea)
    }
  }
}

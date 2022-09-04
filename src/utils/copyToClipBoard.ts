import { toast } from "react-hot-toast"

export const copyToClipBoard = async (
  label: string,
  str: string,
  id: string,
) => {
  try {
    await navigator.clipboard.writeText(str)
    toast.success(`${label} copié !`, { id })
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
      toast.success(`${label} copié !`, { id })
    } catch (error) {
      console.error(error)
      toast.error("Veuillez réessayer plus tard", { id: `${id}-error` })
    } finally {
      if (textarea) document.body.removeChild(textarea)
    }
  }
}

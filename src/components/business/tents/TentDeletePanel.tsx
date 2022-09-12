import { useModalContext } from "@/components/business/hooks/useModalContext"
import Button from "@/components/ui/Button"
import Icon from "@/components/ui/Icon"
import type { Tent } from "@/pages/app/tentes"
import { trpc } from "@/utils/trpc"
import { UIProps } from "@/utils/typedProps"
import Head from "next/head"
import { FC } from "react"
import { toast } from "react-hot-toast"
import { Modal } from "../modal"
import { getTentsErrorMessage } from "./tentsErrorMessage"
import TentViewPanel from "./TentViewPanel"

const TentDeletePanel: FC<UIProps<{ tent: Tent }>> = ({ tent }) => {
  const { id, identifyingNum } = tent
  const { setModal } = useModalContext()
  const trpcCtx = trpc.useContext()
  const deleteMutation = trpc.tents.delete.useMutation({
    onSuccess() {
      setModal({} as Modal)
    },
    onSettled() {
      trpcCtx.tents.getAll.invalidate()
    },
  })
  const handleDeletion = () => {
    const deletePromise = deleteMutation.mutateAsync(id)
    toast.promise(deletePromise, {
      success: "Tente supprimée !",
      error: getTentsErrorMessage,
      loading: "Suppression en cours ...",
    })
  }
  const goBackToViewPanel = () =>
    setModal({
      component: <TentViewPanel tent={tent} />,
      visible: true,
    })

  return (
    <>
      <Head>
        <title>{`Supprimer la tente ${identifyingNum} | MonMatos`}</title>
      </Head>
      <div className="mx-auto max-w-[450px] space-y-6 py-4">
        <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border-4 border-slate-800">
          <h2 className="text-3xl font-bold">{identifyingNum}</h2>
        </div>
        <p className="text-center text-lg font-semibold">
          Voulez vraiment <span className="text-red-500">supprimer</span> la
          tente numéro {identifyingNum} ?
        </p>
        <div className="mx-auto flex w-fit items-center space-x-2 rounded-md bg-amber-100 py-1 px-2 text-sm font-medium text-amber-800 sm:text-base">
          <Icon name="MdOutlineErrorOutline" className="text-xl" />
          <span>Attention cette action est irreversible !</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-8 pt-4">
          <Button
            type="button"
            onClick={goBackToViewPanel}
            size="sm"
            icon="HiArrowLeft"
            variant="white"
            className="max-w-fit"
          >
            Annuler
          </Button>
          <Button
            type="button"
            onClick={handleDeletion}
            size="sm"
            variant="red"
            icon="HiTrash"
            className="max-w-fit"
            disabled={deleteMutation.isLoading}
          >
            {deleteMutation.isLoading ? "Supression ..." : "Supprimer"}
          </Button>
        </div>
      </div>
    </>
  )
}

export default TentDeletePanel

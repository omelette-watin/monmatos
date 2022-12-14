import classNames from "classnames"
import { ReactNode } from "react"
import { useModalContext } from "../../hooks/useModalContext"
import Icon from "../../ui/Icon"

export type Modal = {
  component: ReactNode
  visible: boolean
}

const Modal = () => {
  const {
    modal: { component, visible },
    setModal,
  } = useModalContext()

  const hideModal = () => setModal({} as Modal)

  return (
    <>
      <div
        className={classNames(
          "bg-main fixed top-0 right-0 bottom-0 z-50 w-screen max-w-[100vw] overflow-y-scroll overscroll-contain p-4 shadow-xl transition-transform duration-500 sm:w-[500px]",
          {
            "translate-x-full": !visible,
            "translate-x-0": visible,
          },
        )}
      >
        <button type="button" onClick={hideModal}>
          <Icon name="XIcon" />
        </button>
        {component}
      </div>
      <div
        className={classNames(
          "fixed inset-0 z-40 bg-slate-900/50 transition-all duration-500",
          {
            "invisible opacity-0": !visible,
            "visible opacity-100": visible,
          },
        )}
        onClick={hideModal}
      />
    </>
  )
}

export default Modal

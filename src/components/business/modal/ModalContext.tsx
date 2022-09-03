import { inferQueryOutput } from "@/utils/trpc"
import { UIProps } from "@/utils/typedProps"
import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useState,
} from "react"
import { Modal } from "."

export type Tents = inferQueryOutput<"tents.getAll">

export type ModalContext = {
  modal: Modal
  setModal: Dispatch<SetStateAction<Modal>>
}

export const ModalContext = createContext<ModalContext>({} as ModalContext)

export const ModalContextProvider: FC<UIProps<{ children: ReactNode }>> = ({
  children,
}) => {
  const [modal, setModal] = useState({} as Modal)

  return (
    <ModalContext.Provider
      value={{
        modal,
        setModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}

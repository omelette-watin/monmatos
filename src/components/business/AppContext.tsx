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
import { Modal } from "../ui/modal"

export type Tents = inferQueryOutput<"tents.getAll">

export type AppContext = {
  modal: Modal
  setModal: Dispatch<SetStateAction<Modal>>
}

export const AppContext = createContext<AppContext>({} as AppContext)

export const AppContextProvider: FC<UIProps<{ children: ReactNode }>> = ({
  children,
}) => {
  const [modal, setModal] = useState({} as Modal)

  return (
    <AppContext.Provider
      value={{
        modal,
        setModal,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

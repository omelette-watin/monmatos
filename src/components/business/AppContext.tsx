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
import { Notification } from "./Notification"

export type Tents = inferQueryOutput<"tents.getAll">

export type AppContext = {
  notification: Notification
  setNotification: Dispatch<SetStateAction<Notification>>
  modal: Modal
  setModal: Dispatch<SetStateAction<Modal>>
  ctxTents: Tents
  setCtxTents: Dispatch<SetStateAction<Tents>>
}

export const AppContext = createContext<AppContext>({} as AppContext)

export const AppContextProvider: FC<UIProps<{ children: ReactNode }>> = ({
  children,
}) => {
  const [notification, setNotification] = useState({} as Notification)
  const [modal, setModal] = useState({} as Modal)
  const [tents, setTents] = useState([] as Tents)

  return (
    <AppContext.Provider
      value={{
        notification,
        setNotification,
        modal,
        setModal,
        ctxTents: tents,
        setCtxTents: setTents,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

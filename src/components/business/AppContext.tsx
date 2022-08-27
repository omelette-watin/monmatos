import { inferQueryOutput, trpc } from "@/utils/trpc"
import { UIProps } from "@/utils/typedProps"
import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useEffect,
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
  tents: Tents
  setTents: Dispatch<SetStateAction<Tents>>
  isLoadingTents: boolean
}

export const AppContext = createContext<AppContext>({} as AppContext)

export const AppContextProvider: FC<UIProps<{ children: ReactNode }>> = ({
  children,
}) => {
  const { data, isLoading } = trpc.useQuery(["tents.getAll"])
  const [notification, setNotification] = useState({} as Notification)
  const [modal, setModal] = useState({} as Modal)
  const [tents, setTents] = useState(data as Tents)

  useEffect(() => {
    if (data) {
      setTents(data)
    }
  }, [data])

  return (
    <AppContext.Provider
      value={{
        notification,
        setNotification,
        modal,
        setModal,
        tents,
        setTents,
        isLoadingTents: isLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

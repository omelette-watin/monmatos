import { UIProps } from "@/utils/typedProps"
import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useState,
} from "react"
import { Notification } from "./Notification"

export type AppContext = {
  notification: Notification
  setNotification: Dispatch<SetStateAction<Notification>>
}

export const AppContext = createContext<AppContext>({} as AppContext)

export const AppContextProvider: FC<UIProps<{ children: ReactNode }>> = ({
  children,
}) => {
  const [notification, setNotification] = useState({} as Notification)

  return (
    <AppContext.Provider value={{ notification, setNotification }}>
      {children}
    </AppContext.Provider>
  )
}

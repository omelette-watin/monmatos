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

export type Tents = inferQueryOutput<"tents.getAll">

export type TentsContext = {
  ctxTents: Tents
  setCtxTents: Dispatch<SetStateAction<Tents>>
}

export const TentsContext = createContext<TentsContext>({} as TentsContext)

export const TentsContextProvider: FC<UIProps<{ children: ReactNode }>> = ({
  children,
}) => {
  const [tents, setTents] = useState([] as Tents)

  return (
    <TentsContext.Provider
      value={{
        ctxTents: tents,
        setCtxTents: setTents,
      }}
    >
      {children}
    </TentsContext.Provider>
  )
}

import { AppRouter } from "@/server/trpc/router"
import { UIProps } from "@/utils/typedProps"
import { inferProcedureOutput } from "@trpc/server"
import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useState,
} from "react"

export type Tents = inferProcedureOutput<AppRouter["tents"]["getAll"]>
export type ArrayElement<A> = A extends readonly (infer T)[] ? T : never
export type Tent = ArrayElement<Tents>

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

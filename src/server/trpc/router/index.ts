import { t } from "../trpc"
import { tentsRouter } from "./tents"

export const appRouter = t.router({
  tents: tentsRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter

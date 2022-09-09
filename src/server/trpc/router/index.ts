import { t } from "../trpc"
import { groupRouter } from "./group"
import { tentsRouter } from "./tents"

export const appRouter = t.router({
  tents: tentsRouter,
  group: groupRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter

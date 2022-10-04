import { t } from "../trpc"
import { groupRouter } from "./group"
import { mailRouter } from "./mail"
import { tentsRouter } from "./tents"

export const appRouter = t.router({
  tents: tentsRouter,
  group: groupRouter,
  mail: mailRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter

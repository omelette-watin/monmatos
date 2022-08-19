import { createRouter } from "./context"
import superjson from "superjson"
import { tentsRouter } from "./routes/tents"

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("tents.", tentsRouter)

export type AppRouter = typeof appRouter

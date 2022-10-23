import { initTRPC, TRPCError } from "@trpc/server"
import superjson from "superjson"
import type { Context } from "./context"

export const t = initTRPC.context<Context>().create({
  transformer: superjson,
})

export const authedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user || !ctx.session.user.group.id) {
    throw new TRPCError({ code: "UNAUTHORIZED" })
  }

  return next({
    ctx: {
      ...ctx,
      session: {
        ...ctx.session,
        user: { ...ctx.session.user.group, id: ctx.session.user.group.id },
      },
    },
  })
})

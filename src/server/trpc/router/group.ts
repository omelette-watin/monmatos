import { registerSchema } from "@/common/validation/auth"
import { t } from "../trpc"

export const groupRouter = t.router({
  create: t.procedure.input(registerSchema).mutation(async ({ ctx, input }) => {
    const { prisma } = ctx

    const group = await prisma.group.create({
      data: input,
    })

    return group.id
  }),
})

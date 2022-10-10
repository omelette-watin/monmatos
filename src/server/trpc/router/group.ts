import { registerSchema } from "@/common/validation/auth"
import { t } from "../trpc"

export const groupRouter = t.router({
  create: t.procedure.input(registerSchema).mutation(async ({ ctx, input }) => {
    const { prisma } = ctx
    const { customUnits, ...otherInput } = input

    const group = await prisma.group.create({
      data: {
        ...otherInput,
        customUnits: {
          create:
            customUnits?.map((customUnit) => {
              return { label: customUnit }
            }) || [],
        },
      },
    })

    return group.id
  }),
})

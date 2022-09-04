import { createTentSchema, updateTentSchema } from "@/common/validation/tents"
import * as trpc from "@trpc/server"
import { z } from "zod"
import { authedProcedure, t } from "../trpc"

export const tentsRouter = t.router({
  getAll: authedProcedure.query(async ({ ctx }) => {
    const { session, prisma } = ctx

    const tents = await prisma.tent.findMany({
      where: {
        groupId: session.user.id,
      },
      orderBy: {
        identifyingNum: "asc",
      },
    })

    return tents
  }),
  getById: authedProcedure.input(z.string()).query(async ({ input, ctx }) => {
    const { prisma } = ctx

    const tent = await prisma.tent.findUnique({
      where: {
        id: input,
      },
    })

    return tent
  }),
  create: authedProcedure
    .input(createTentSchema)
    .mutation(async ({ ctx, input }) => {
      const { prisma, session } = ctx

      const createdTent = await prisma.tent.create({
        data: {
          ...input,
          groupId: session.user.id,
        },
      })

      return createdTent
    }),
  update: authedProcedure
    .input(updateTentSchema)
    .mutation(async ({ ctx, input }) => {
      const { prisma, session } = ctx

      const updatedTent = await prisma.tent.update({
        where: {
          id: input.id,
        },
        data: {
          ...input.values,
          groupId: session.user.id,
        },
      })

      if (!updatedTent) {
        throw new trpc.TRPCError({ code: "NOT_FOUND" })
      }

      return updatedTent
    }),
  delete: authedProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    const { prisma } = ctx

    const deletedTent = await prisma.tent.delete({
      where: {
        id: input,
      },
    })

    return deletedTent
  }),
})

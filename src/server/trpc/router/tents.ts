import { createTentSchema, updateTentSchema } from "@/common/validation/tents"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime"
import { TRPCError } from "@trpc/server"
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
        identifier: "asc",
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

      try {
        const createdTent = await prisma.tent.create({
          data: {
            ...input,
            groupId: session.user.id,
          },
        })

        return createdTent
      } catch (error) {
        handleError(error)
      }
    }),
  update: authedProcedure
    .input(updateTentSchema)
    .mutation(async ({ ctx, input }) => {
      const { prisma, session } = ctx

      try {
        const updatedTent = await prisma.tent.update({
          where: {
            id: input.id,
          },
          data: {
            ...input.values,
            groupId: session.user.id,
          },
        })

        return updatedTent
      } catch (error) {
        handleError(error)
      }
    }),
  delete: authedProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    const { prisma } = ctx

    try {
      const deletedTent = await prisma.tent.delete({
        where: {
          id: input,
        },
      })

      return deletedTent
    } catch (error) {
      handleError(error)
    }
  }),
})

const handleError = (error: unknown) => {
  if (error instanceof PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      throw new TRPCError({
        message: error.code,
        code: "CONFLICT",
      })
    }

    if (error.code === "P2025") {
      throw new TRPCError({
        message: error.code,
        code: "PRECONDITION_FAILED",
      })
    }

    if (error.code === "P2003") {
      throw new TRPCError({
        message: error.code,
        code: "PRECONDITION_FAILED",
      })
    }
  }

  throw new TRPCError({
    code: "INTERNAL_SERVER_ERROR",
  })
}

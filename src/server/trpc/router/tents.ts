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

      try {
        const createdTent = await prisma.tent.create({
          data: {
            ...input,
            groupId: session.user.id,
          },
        })

        return createdTent
      } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === "P2002") {
            throw new TRPCError({
              message: "CONFLICT",
              code: "CONFLICT",
            })
          }
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
        })
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
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === "P2025") {
            throw new TRPCError({
              code: "NOT_FOUND",
              message: "DELETED",
            })
          }
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
        })
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
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "DELETED",
          })
        }
      }

      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
      })
    }
  }),
})

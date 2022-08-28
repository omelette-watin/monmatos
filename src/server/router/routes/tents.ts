import { createTentSchema, updateTentSchema } from "@/common/validation/tents"
import { z } from "zod"
import { createProtectedRouter } from "../createProtectedRouter"
import * as trpc from "@trpc/server"

export const tentsRouter = createProtectedRouter()
  .query("getById", {
    input: z.string(),
    resolve: async ({ ctx, input }) => {
      const { prisma } = ctx

      const tent = await prisma.tent.findUnique({
        where: {
          id: input,
        },
      })

      return tent
    },
  })
  .query("getAll", {
    resolve: async ({ ctx }) => {
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
    },
  })
  .mutation("create", {
    input: createTentSchema,
    resolve: async ({ ctx, input }) => {
      const { prisma, session } = ctx

      const createdTent = await prisma.tent.create({
        data: {
          ...input,
          groupId: session.user.id,
        },
      })

      return createdTent
    },
  })
  .mutation("update", {
    input: updateTentSchema,
    resolve: async ({ ctx, input }) => {
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
    },
  })
  .mutation("delete", {
    input: z.string(),
    resolve: async ({ ctx, input }) => {
      const { prisma } = ctx

      const deletedTent = await prisma.tent.delete({
        where: {
          id: input,
        },
      })

      return deletedTent
    },
  })

import { createTentSchema, updateTentSchema } from "@/common/validation/tents"
import { z } from "zod"
import { createProtectedRouter } from "../createProtectedRouter"

export const tentsRouter = createProtectedRouter()
  .query("getById", {
    input: z.string(),
    resolve: async ({ ctx, input }) => {
      const { prisma, session } = ctx

      const tent = await prisma.tent.findFirst({
        where: {
          id: input,
          groupId: session.user.id,
        },
      })

      return tent
    },
  })
  .query("getAll", {
    resolve: async ({ ctx }) => {
      const {
        session: {
          user: { id },
        },
        prisma,
      } = ctx

      const tents = await prisma.tent.findMany({
        where: {
          groupId: id,
        },
      })

      return tents
    },
  })
  .mutation("create", {
    input: createTentSchema,
    resolve: async ({ ctx, input }) => {
      const {
        prisma,
        session: {
          user: { id },
        },
      } = ctx

      const createdTent = await prisma.tent.create({
        data: {
          ...input,
          groupId: id,
        },
      })

      return createdTent
    },
  })
  .mutation("update", {
    input: updateTentSchema,
    resolve: async ({ ctx, input }) => {
      const {
        prisma,
        session: {
          user: { id },
        },
      } = ctx

      const createdTent = await prisma.tent.updateMany({
        where: {
          id: input.id,
          groupId: id,
        },
        data: {
          ...input.values,
          groupId: id,
        },
      })

      return createdTent
    },
  })
  .mutation("delete", {
    input: z.string(),
    resolve: async ({ ctx, input }) => {
      const {
        prisma,
        session: {
          user: { id },
        },
      } = ctx

      const deletedTent = await prisma.tent.deleteMany({
        where: {
          id: input,
          groupId: id,
        },
      })

      return deletedTent
    },
  })

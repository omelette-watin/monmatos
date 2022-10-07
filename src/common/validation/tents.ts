import { State, Unit } from "@prisma/client"
import { z } from "zod"

const unitsEnum = Object.entries(Unit).map(([, value]) => value) as [
  string,
  ...string[],
]

const stateEnum = Object.entries(State).map(([, value]) => value) as [
  string,
  ...string[],
]

const unit = z.enum(unitsEnum)

const state = z.enum(stateEnum)

export const createTentSchema = z.object({
  identifyingNum: z.number(),
  size: z.number(),
  unit,
  state,
  type: z.string(),
  complete: z.boolean(),
  integrated: z.boolean(),
  comments: z.string().optional(),
})

export const updateTentSchema = z.object({
  id: z.string(),
  values: createTentSchema,
})

export type ICreateTent = z.infer<typeof createTentSchema>

export type IUpdateTent = z.infer<typeof updateTentSchema>

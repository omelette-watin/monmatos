import { State, Unit } from "@prisma/client"
import { z } from "zod"

const unitsEnum = Object.entries(Unit).map(([, value]) => value) as [
  Unit,
  ...Unit[],
]

const stateEnum = Object.entries(State).map(([, value]) => value) as [
  State,
  ...State[],
]

const unit = z.enum(unitsEnum)

const state = z.enum(stateEnum)

export const createTentSchema = z.object({
  identifier: z.string(),
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

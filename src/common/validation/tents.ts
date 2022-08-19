import { z } from "zod"

const unit = z.enum([
  "FARFADETS",
  "JEANNETTES",
  "LOUVETTES",
  "LOUVETEAUX",
  "ECLAIREUSES",
  "GUIDES",
  "ECLAIREURS",
  "SCOUTS",
  "ROUTIERS",
  "GUIDESAINNES",
  "EQUIPIERS",
  "EQUIPIERES",
  "PIONNIERS",
  "CARAVELLES",
  "GROUPE",
])

const state = z.enum(["INUTILISABLE", "MAUVAIS", "BON", "NEUF"])

export const createTentSchema = z.object({
  identifyingNum: z.number(),
  size: z.number(),
  unit,
  state,
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

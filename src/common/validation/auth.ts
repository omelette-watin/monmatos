import { Movement } from "@prisma/client"
import { z } from "zod"

const movementsInitials = Object.entries(Movement).map(
  ([, value]) => value,
) as [Movement, ...Movement[]]

export const loginSchema = z.object({
  identifier: z.string().trim(),
})

export const registerSchema = z.object({
  name: z.string().trim(),
  movement: z.enum(movementsInitials),
  customUnits: z
    .array(
      z
        .string({ required_error: "Veuillez donner un nom à l'unité" })
        .trim()
        .max(20, "Maximum 20 caractères"),
    )
    .max(20)
    .min(1)
    .nullable(),
})

export type IRegister = z.infer<typeof registerSchema>
export type ILogin = z.infer<typeof loginSchema>

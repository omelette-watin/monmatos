import { Movement } from "@prisma/client"
import { z } from "zod"

const movementsInitials = Object.entries(Movement).map(
  ([, value]) => value,
) as [string, ...string[]]

export const loginSchema = z.object({
  identifier: z.string().trim(),
})

export const registerSchema = z.object({
  name: z.string().trim(),
  movement: z.enum(movementsInitials),
})

export type IRegister = z.infer<typeof registerSchema>
export type ILogin = z.infer<typeof loginSchema>

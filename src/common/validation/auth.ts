import { z } from "zod"

export const loginSchema = z.object({
  identifier: z.string().trim(),
})

export const registerSchema = z.object({
  name: z.string().trim(),
  movement: z.enum(["AGSE", "SUF", "SGDF"]),
})

export type IRegister = z.infer<typeof registerSchema>
export type ILogin = z.infer<typeof loginSchema>

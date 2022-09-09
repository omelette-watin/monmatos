import { z } from "zod"

export const loginSchema = z.object({
  identifier: z.string(),
})

export const registerSchema = z.object({
  name: z.string().min(2),
  movement: z.enum(["AGSE", "SUF", "SGDF"]),
})

export type IRegister = z.infer<typeof registerSchema>
export type ILogin = z.infer<typeof loginSchema>

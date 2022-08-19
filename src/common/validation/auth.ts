import { z } from "zod"

export const loginSchema = z.object({
  identifier: z.string(),
})

export type ILogin = z.infer<typeof loginSchema>

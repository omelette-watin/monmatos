import { z } from "zod"

export const mailPropsSchema = z.object({
  email: z
    .string({ required_error: "Veuillez entrer votre adresse e-mail." })
    .email("Veuillez entrer une adresse e-mail valide.")
    .trim(),
  message: z
    .string({ required_error: "Veuillez rentrer votre message." })
    .max(1000)
    .trim(),
  subject: z
    .string({ required_error: "Veuillez donner un sujet au message." })
    .max(50)
    .trim(),
})

export type IMail = z.infer<typeof mailPropsSchema>

import { z } from "zod"

export const mailPropsSchema = z.object({
  email: z
    .string({ required_error: "Veuillez entrer votre adresse e-mail" })
    .email("Veuillez entrer une adresse e-mail valide")
    .trim(),
  message: z
    .string({ required_error: "Veuillez rentrer votre message" })
    .max(1000, { message: "Veuillez respecter la limite de caractères" })
    .trim(),
  subject: z
    .string({ required_error: "Veuillez donner un sujet à votre message" })
    .max(50, { message: "Veuillez respecter la limite de caractères" })
    .trim(),
})

export type IMail = z.infer<typeof mailPropsSchema>

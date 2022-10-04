import { mailPropsSchema } from "@/common/validation/mail"
import mailer from "@/utils/mailer"
import { t } from "../trpc"

export const mailRouter = t.router({
  contact: t.procedure.input(mailPropsSchema).mutation(async ({ input }) => {
    const { subject, message, email } = input

    const infos = await mailer({
      to: "pnwa@icloud.com",
      subject,
      text: message,
      from: email,
    })

    return infos
  }),
})

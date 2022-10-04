import nodemailer from "nodemailer"

interface MailerProps {
  to: string
  subject: string
  text: string
  from: string
}

const mailer = async (props: MailerProps) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  })

  const mailInfo = await transporter.sendMail(props)

  return mailInfo
}

export default mailer

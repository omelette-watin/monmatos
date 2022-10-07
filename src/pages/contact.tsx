import { IMail, mailPropsSchema } from "@/common/validation/mail"
import { zodFormikAdapter } from "@/common/validation/zodFormikAdapter"
import Button from "@/components/ui/Button"
import ButtonLink from "@/components/ui/ButtonLink"
import LoadingDots from "@/components/ui/LoadingDots"
import Textarea from "@/components/ui/Textarea"
import PublicLayout from "@/components/www/Layout"
import { trpc } from "@/utils/trpc"
import classNames from "classnames"
import { Field, FieldProps, Form, Formik } from "formik"
import Link from "next/link"
import { ReactElement, useCallback, useEffect, useRef, useState } from "react"
import { toast } from "react-hot-toast"
import { NextPageWithLayout } from "./_app"

const ContactPage: NextPageWithLayout = () => {
  const [sent, setSent] = useState(true)
  const contactMutation = trpc.mail.contact.useMutation({
    onSuccess() {
      setSent(true)
    },
  })
  const emailInputRef = useRef<HTMLInputElement | null>(null)
  const handleSubmit = useCallback(
    async (values: IMail) => {
      await toast.promise(contactMutation.mutateAsync(values), {
        error: "Veuillez réessayer plus tard",
        success: "Message envoyé",
        loading: "Envoi en cours",
      })
    },
    [contactMutation],
  )

  useEffect(() => {
    setSent(false)
  }, [])

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={{
        email: "",
        subject: "",
        message: "",
      }}
      validationSchema={zodFormikAdapter(mailPropsSchema)}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ isSubmitting, values, errors, resetForm }) => (
        <div className="flex flex-col gap-8 py-8 md:flex-row">
          <div className="flex w-full flex-col gap-8 p-5 text-center md:p-10">
            <h1 className="text-2xl font-bold">
              Vous souhaitez nous dire{" "}
              <span className="text-emerald-500">quelque chose </span> ?
            </h1>
            <p className="pb-5 text-slate-600">
              Vous avez une suggestion d'amélioration ? <br />
              Vous avez une question sur MonMatos ? <br />
              Vous souhaitez nous rejoindre ou nous aider ?
            </p>
            <div className="flex flex-col items-center gap-2 text-gray-500">
              <Button
                icon="BiMessageDetail"
                className="max-w-fit"
                size="sm"
                type="button"
                onClick={() => {
                  resetForm()
                  setSent(false)
                  emailInputRef?.current?.focus()
                }}
              >
                Écrivez-nous un message
              </Button>
              <span>ou</span>
              <ButtonLink
                href="https://discord.gg/qjvvM6Wya6"
                target="_blank"
                variant="black"
                className="max-w-fit"
                icon="FaDiscord"
                size="sm"
              >
                Rejoignez notre Discord
              </ButtonLink>
            </div>
          </div>
          <div
            className={classNames(
              "mx-auto w-full max-w-xl flex-col items-center justify-center gap-4 rounded-md bg-white p-5 text-slate-900 shadow-lg sm:p-10",
              {
                flex: sent,
                hidden: !sent,
              },
            )}
          >
            <svg
              id="successAnimation"
              className="animated"
              xmlns="http://www.w3.org/2000/svg"
              width="70"
              height="70"
              viewBox="0 0 70 70"
            >
              <path
                id="successAnimationResult"
                className="fill-emerald-500"
                d="M35,60 C21.1928813,60 10,48.8071187 10,35 C10,21.1928813 21.1928813,10 35,10 C48.8071187,10 60,21.1928813 60,35 C60,48.8071187 48.8071187,60 35,60 Z M23.6332378,33.2260427 L22.3667622,34.7739573 L34.1433655,44.40936 L47.776114,27.6305926 L46.223886,26.3694074 L33.8566345,41.59064 L23.6332378,33.2260427 Z"
              />
              <circle
                id="successAnimationCircle"
                cx="35"
                cy="35"
                r="24"
                className="stroke-emerald-500"
                strokeWidth="2"
                strokeLinecap="round"
                fill="transparent"
              />
              <polyline
                id="successAnimationCheck"
                className="stroke-emerald-500"
                strokeWidth="2"
                points="23 34 34 43 47 27"
                fill="transparent"
              />
            </svg>
            <div className="animate-[fadeIn_600ms_ease_1000ms_both] space-y-2 text-center">
              <h4 className="text-xl font-semibold">
                Merci pour votre message !
              </h4>
              <p className="text-slate-600">
                Nous vous répondrons dès que possible.
              </p>
            </div>
            <Link href="/">
              <a className="mx-auto mt-10 block w-fit text-sm underline">
                Revenir à l'accueil
              </a>
            </Link>
          </div>
          <Form
            className={classNames(
              "mx-auto flex w-full max-w-xl flex-col gap-8 rounded-md bg-white p-5 text-slate-900 shadow-lg sm:p-10",
              {
                flex: !sent,
                hidden: sent,
              },
            )}
          >
            <h1 className="text-2xl font-bold">
              Donnez-nous votre <span className="text-emerald-500"> avis</span>
            </h1>
            <label htmlFor="email" className="-mb-6 font-medium">
              Votre adresse e-mail
            </label>
            <div
              className={classNames(
                "flex w-full items-center gap-4 rounded-lg border border-gray-200 p-3 focus-within:border-2 focus-within:border-blue-500",
                {
                  "border-2 border-red-500": errors.email,
                },
              )}
            >
              <Field
                innerRef={emailInputRef}
                name="email"
                id="email"
                type="email"
                placeholder="ex: saint.vincent@exemple.com"
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>
            {errors.email && (
              <p className="-mt-6 pl-1 text-xs font-medium text-red-500">
                {errors.email}
              </p>
            )}
            <label htmlFor="subject" className="-mb-6 font-medium">
              Sujet du message
            </label>
            <div
              className={classNames(
                "flex w-full items-center gap-4 rounded-lg border border-gray-200 p-3 focus-within:border-2 focus-within:border-blue-500",
                {
                  "border-2 border-red-500": errors.subject,
                },
              )}
            >
              <Field
                name="subject"
                id="subject"
                type="text"
                placeholder="ex: Proposition d'amélioration"
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>
            <p className="-mt-6 pl-1 text-xs text-gray-400">
              Maximum 50 caractères ({values.subject.length} / 50)
            </p>
            {errors.subject && (
              <p className="-mt-7 pl-1 text-xs font-medium text-red-500">
                {errors.subject}
              </p>
            )}
            <Field name="message">
              {({ field }: FieldProps) => (
                <Textarea
                  id="message"
                  label="Votre message"
                  {...field}
                  error={!!errors.message}
                />
              )}
            </Field>
            <p className="-mt-6 pl-1 text-xs text-gray-400">
              Maximum 1000 caractères ({values.message.length} / 1000)
            </p>
            {errors.message && (
              <p className="-mt-7 pl-1 text-xs font-medium text-red-500">
                {errors.message}
              </p>
            )}

            <Button
              size="lg"
              variant="black"
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? <LoadingDots /> : "Envoyer"}
            </Button>
          </Form>
        </div>
      )}
    </Formik>
  )
}

ContactPage.getLayout = (page: ReactElement) => (
  <PublicLayout title="Contact">{page}</PublicLayout>
)

export default ContactPage

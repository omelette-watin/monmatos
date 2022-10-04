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
import { ReactElement, useCallback, useRef } from "react"
import { toast } from "react-hot-toast"
import { NextPageWithLayout } from "./_app"

const ContactPage: NextPageWithLayout = () => {
  const contactMutation = trpc.mail.contact.useMutation()
  const emailInputRef = useRef<HTMLInputElement | null>(null)
  const handleSubmit = useCallback(
    async (values: IMail) => {
      toast.promise(contactMutation.mutateAsync(values), {
        error: "Veuillez réessayer plus tard",
        success: "Message envoyé",
        loading: "Envoi en cours",
      })
    },
    [contactMutation],
  )

  return (
    <div className="flex flex-col gap-8 py-8 md:flex-row">
      <div className="flex w-full flex-col gap-8 p-5 text-center md:p-10">
        <h1 className="text-2xl font-bold">
          Vous souhaitez nous dire{" "}
          <span className="text-emerald-500">quelque chose </span> ?
        </h1>
        <p className="pb-5 text-slate-600">
          Vous avez une question sur le fonctionnement de MonMatos ? <br />
          Vous avez une suggestion d'amélioration ?
          <br />
          Vous souhaitez nous rejoindre ou nous aider ?
        </p>
        <div className="flex flex-col items-center gap-2 text-gray-500">
          <Button
            icon="BiMessageDetail"
            className="max-w-fit"
            size="sm"
            type="button"
            onClick={() => emailInputRef?.current?.focus()}
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
        {({ isSubmitting, values, errors }) => (
          <Form className="mx-auto flex w-full max-w-xl flex-col gap-8 rounded-md bg-white p-5 text-slate-900 shadow-lg sm:p-10">
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
            <p
              className={classNames("-mt-6 pl-1 text-xs", {
                "text-gray-400": !errors.subject,
                "font-medium text-red-500": errors.subject,
              })}
            >
              Maximum 50 caractères ({values.subject.length} / 50)
              {errors.subject && (
                <>
                  <br />
                  {errors.subject}
                </>
              )}
            </p>
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
            <p
              className={classNames("-mt-6 pl-1 text-xs", {
                "text-gray-400": !errors.message,
                "font-medium text-red-500": errors.message,
              })}
            >
              Maximum 1000 caractères ({values.message.length} / 1000)
              {errors.message && (
                <>
                  <br />
                  {errors.message}
                </>
              )}
            </p>

            <Button
              size="lg"
              variant="black"
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? <LoadingDots /> : "Envoyer"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

ContactPage.getLayout = (page: ReactElement) => (
  <PublicLayout>{page}</PublicLayout>
)

export default ContactPage

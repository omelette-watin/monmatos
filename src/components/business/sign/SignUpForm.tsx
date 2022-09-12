import { IRegister, registerSchema } from "@/common/validation/auth"
import { zodFormikAdapter } from "@/common/validation/zodFormikAdapter"
import Accordion from "@/components/ui/Accordion"
import Button from "@/components/ui/Button"
import Icon from "@/components/ui/Icon"
import { copyToClipBoard } from "@/utils/copyToClipBoard"
import { movements } from "@/utils/records"
import { trpc } from "@/utils/trpc"
import { Field, Form, Formik } from "formik"
import { signIn } from "next-auth/react"
import Head from "next/head"
import { useCallback, useState } from "react"
import { toast } from "react-hot-toast"
import FormWrapper from "./FormWrapper"
import SignWrapper from "./SignWrapper"

const SignUpForm = () => {
  const createMutation = trpc.group.create.useMutation({
    onSuccess(data) {
      setGroupId(data)
    },
  })
  const [submitting, setSubmitting] = useState(false)
  const [copied, setCopied] = useState(false)
  const [groupId, setGroupId] = useState("")
  const handleSubmit = useCallback(
    async (values: IRegister) => {
      setSubmitting(true)
      toast.promise(createMutation.mutateAsync(values), {
        loading: "Création du groupe ...",
        error: "Veuillez réessayer plus tard",
        success: "Groupe créé !",
      })
      setSubmitting(false)
    },
    [createMutation],
  )
  const handleLogin = async () => {
    await signIn("credentials", { identifier: groupId, callbackUrl: "/app" })
  }

  return (
    <>
      <Head>
        <title>Inscription | MonMatos</title>
      </Head>
      <SignWrapper>
        <FormWrapper title="Inscrire mon Groupe">
          <>
            {!groupId && (
              <Formik
                initialValues={{
                  name: "",
                  movement: "SGDF",
                }}
                onSubmit={handleSubmit}
                validationSchema={zodFormikAdapter(registerSchema)}
              >
                {({ isValid }) => (
                  <Form className="flex w-[400px] max-w-[90vw] flex-col items-center gap-2">
                    <label htmlFor="name" className="self-start font-medium">
                      Nom de mon groupe
                    </label>
                    <div className="flex w-full items-center">
                      <div className="flex w-full items-center gap-4 rounded-lg border-2 bg-slate-100 p-2 focus-within:border-blue-600">
                        <Icon name="HiUserGroup" className="text-xl" />
                        <Field
                          id="name"
                          type="text"
                          name="name"
                          placeholder="ex: Saint Vincent de Paul"
                          className="w-full bg-transparent text-sm outline-none"
                        />
                      </div>
                    </div>
                    <label
                      htmlFor="movement"
                      className="self-start font-medium"
                    >
                      Mouvement
                    </label>
                    <div className="flex w-full items-center">
                      <div className="flex w-full items-center gap-4 rounded-lg border-2 bg-slate-100 p-2  focus-within:border-blue-600">
                        <Icon name="GiJerusalemCross" className="text-xl" />
                        <Field
                          id="movement"
                          as="select"
                          name="movement"
                          placeholder="ex: Saint Vincent de Paul"
                          className="w-full bg-transparent text-sm outline-none"
                        >
                          {Object.entries(movements).map(
                            ([movement, label]) => (
                              <option value={movement} key={movement}>
                                {label}
                              </option>
                            ),
                          )}
                        </Field>
                      </div>
                    </div>
                    <Button
                      icon="ArrowRightIcon"
                      iconPosition="right"
                      type="submit"
                      disabled={submitting || !isValid}
                      className="mt-8 max-w-fit"
                    >
                      Valider
                    </Button>
                  </Form>
                )}
              </Formik>
            )}
            {groupId && (
              <div className="flex w-[400px] max-w-[90vw] flex-col items-center gap-2">
                <h2 className="mb-4 text-lg font-semibold text-emerald-500">
                  Votre groupe a bien été enregistré !
                </h2>
                <p className="self-start font-medium">
                  Votre identifiant de groupe
                </p>
                <div className="flex w-full items-center gap-4 rounded-lg border-2 bg-slate-100 p-2">
                  <Icon name="MdPassword" />
                  <p>{groupId || "zeazeakkekll-zelazek-eazekakeozae-zeaea"}</p>
                </div>
                <Accordion label="Que dois-je faire avec ?">
                  <div className="p-4 text-sm">
                    Copiez-le et partagez-le avec les chefs de votre groupe !
                    <br />
                    L'identifiant est l'une des 3 manières de ce connecter à son
                    groupe.
                  </div>
                </Accordion>
                <div className="mt-6 flex flex-wrap items-center gap-2">
                  <Button
                    variant="white"
                    size="sm"
                    className="max-w-fit"
                    onClick={() =>
                      copyToClipBoard(
                        "Identifiant",
                        groupId,
                        "identifier",
                      ).then(() => setCopied(true))
                    }
                  >
                    Copier mon identifiant
                  </Button>
                  <Button
                    size="sm"
                    className="max-w-fit"
                    disabled={!copied}
                    onClick={handleLogin}
                  >
                    C'est parti !
                  </Button>
                </div>
              </div>
            )}
          </>
        </FormWrapper>
      </SignWrapper>
    </>
  )
}

export default SignUpForm

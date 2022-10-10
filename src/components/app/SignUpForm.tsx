import { IRegister, registerSchema } from "@/common/validation/auth"
import { zodFormikAdapter } from "@/common/validation/zodFormikAdapter"
import Button from "@/components/ui/Button"
import Logo from "@/components/ui/Logo"
import { movements, units } from "@/utils/records"
import { trpc } from "@/utils/trpc"
import { Disclosure } from "@headlessui/react"
import { ChevronUpIcon } from "@heroicons/react/outline"
import classNames from "classnames"
import { Field, FieldArray, Form, Formik } from "formik"
import { signIn } from "next-auth/react"
import Head from "next/head"
import Link from "next/link"
import { useCallback, useState } from "react"
import toast from "react-hot-toast"
import Icon from "../ui/Icon"
import LoadingDots from "../ui/LoadingDots"

const SignUpForm = () => {
  const logo = "/favicon.ico"
  const registerMutation = trpc.group.create.useMutation()
  const [step, setStep] = useState(0)
  const handleSubmit = useCallback(
    async (values: IRegister) => {
      toast
        .promise(registerMutation.mutateAsync(values), {
          loading: "Création du groupe ...",
          error: "Veuillez réessayer plus tard",
          success: "Vous allez être redirigé",
        })
        .then((id) =>
          signIn("credentials", {
            identifier: id,
            callbackUrl: "/groupe?connected=1",
          }),
        )
    },
    [registerMutation],
  )

  return (
    <div className="bg-main flex min-h-screen flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Inscrire mon groupe - MonMatos</title>
        <link rel="icon" href={logo} />
        <link rel="shortcut icon" type="image/x-icon" href={logo} />
        <link rel="apple-touch-icon" sizes="180x180" href={logo} />

        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>
      <Formik
        initialValues={{ name: "", movement: "SGDF", customUnits: null }}
        validationSchema={zodFormikAdapter(registerSchema)}
        onSubmit={handleSubmit}
      >
        {({ isValid, isSubmitting, dirty, values, setValues, errors }) => (
          <div className="mx-auto sm:w-full sm:max-w-lg">
            <Logo className="mb-6 pl-4" />
            <Form className="mx-auto flex flex-col gap-10 rounded-md bg-white p-5 text-slate-900 shadow-lg sm:p-10">
              <h1 className="text-2xl font-bold">
                Inscrivez votre <span className="text-emerald-600">Groupe</span>
              </h1>
              {step === 0 && (
                <>
                  <label htmlFor="name" className="-mb-8 font-medium">
                    Nom du Groupe
                  </label>
                  <div className="flex w-full items-center">
                    <div className="flex w-full items-center gap-4 rounded-lg border border-gray-200 p-3 focus-within:border-2 focus-within:border-blue-500">
                      <Field
                        name="name"
                        id="name"
                        type="text"
                        placeholder="ex: Saint Vincent de Paul"
                        className="w-full bg-transparent text-sm outline-none"
                      />
                    </div>
                  </div>
                  <label htmlFor="movement" className="-mb-8 -mt-5 font-medium">
                    Mouvement scout
                  </label>
                  <div className="flex w-full items-center">
                    <div className="flex w-full items-center gap-4 rounded-lg border border-gray-200 p-3 focus-within:border-2  focus-within:border-blue-500">
                      <Icon name="GiJerusalemCross" className="w-6" />
                      <Field
                        id="movement"
                        as="select"
                        name="movement"
                        placeholder="ex: Saint Vincent de Paul"
                        className="w-full bg-transparent text-sm outline-none"
                      >
                        {Object.entries(movements).map(([movement, label]) => (
                          <option value={movement} key={movement}>
                            {label}
                          </option>
                        ))}
                      </Field>
                    </div>
                  </div>
                  <Disclosure>
                    {({ open }) => (
                      <div>
                        <Disclosure.Button className="-mt-5 flex w-full justify-between rounded-lg bg-blue-50 px-4 py-2 text-left text-sm font-medium text-blue-900 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
                          <span>Il n'y a pas mon mouvement</span>
                          <ChevronUpIcon
                            className={classNames(
                              "h-5 w-5 transform text-blue-900 transition-transform duration-300",
                              {
                                "rotate-180": !open,
                                "rotate-0": open,
                              },
                            )}
                          />
                        </Disclosure.Button>

                        <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm  text-slate-900">
                          Venez nous en parler sur{" "}
                          <a
                            href="https://discord.com/invite/qjvvM6Wya6"
                            target="_blank"
                            rel="noreferrer"
                            className="font-medium text-blue-500"
                          >
                            Discord
                          </a>{" "}
                          ou envoyez-nous un{" "}
                          <Link href="/contact">
                            <a className="font-medium text-blue-500">Message</a>
                          </Link>
                          . Nous essayerons d'ajouter votre mouvement et ses
                          spécificités.
                        </Disclosure.Panel>
                      </div>
                    )}
                  </Disclosure>
                  <Button
                    size="lg"
                    variant="black"
                    disabled={!isValid || !dirty}
                    className="mx-auto text-base font-medium normal-case"
                    type="button"
                    onClick={() => setStep(1)}
                  >
                    Suivant
                  </Button>
                </>
              )}
              {step === 1 && (
                <>
                  <h2 className="text-lg font-semibold">
                    Souhaitez-utiliser les noms d'unités par défaut de votre
                    mouvement ?
                  </h2>
                  <Disclosure>
                    {({ open }) => (
                      <div>
                        <Disclosure.Button className="-mt-5 flex w-full justify-between rounded-lg bg-blue-50 px-4 py-2 text-left text-sm font-medium text-blue-900 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
                          <span>Voir les noms d'unités par défaut</span>
                          <ChevronUpIcon
                            className={classNames(
                              "h-5 w-5 transform text-blue-900 transition-transform duration-300",
                              {
                                "rotate-180": !open,
                                "rotate-0": open,
                              },
                            )}
                          />
                        </Disclosure.Button>

                        <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-slate-900">
                          {Object.entries(units[values.movement]).map(
                            ([key, value]) => (
                              <li key={key} className="font-medium">
                                {value}
                              </li>
                            ),
                          )}
                        </Disclosure.Panel>
                      </div>
                    )}
                  </Disclosure>

                  <div className="flex flex-wrap justify-center gap-2">
                    <Button
                      size="sm"
                      variant="blue"
                      type="button"
                      className="max-w-fit"
                      icon="AdjustmentsIcon"
                      onClick={() => {
                        setValues((prev) => {
                          return {
                            ...prev,
                            customUnits: ["Mon unité"],
                          }
                        })
                        setStep(2)
                      }}
                    >
                      Personnaliser
                    </Button>
                    <Button
                      size="sm"
                      variant="black"
                      type="submit"
                      className="max-w-fit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? <LoadingDots /> : "C'est parti !"}
                    </Button>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(0)}
                    className="-mt-2 flex items-center gap-2 font-medium text-blue-500"
                  >
                    <Icon name="ArrowLeftIcon" className="w-4" /> Retour
                  </button>
                </>
              )}
              {step === 2 && (
                <>
                  <h2 className="text-lg font-semibold">
                    Vous pouvez créer jusqu'à{" "}
                    <span className="text-emerald-500">15 types</span> d'unités
                    différents.
                  </h2>
                  <p className="-mt-8 text-sm">
                    <span className="font-medium">Note</span>: vous n'aurez pas
                    accès aux noms d'unités par défaut, pensez donc à recréer
                    ceux dont vous avez besoin.
                  </p>
                  <p className="-mt-8 text-sm">
                    Il n'est pas nécessaire de mettre un type{" "}
                    <span className="font-medium">GROUPE</span> ou{" "}
                    <span className="font-medium">NON ATTRIBUÉE</span>, on s'en
                    charge pour vous.
                  </p>
                  <FieldArray name="customUnits">
                    {({ remove, push }) => (
                      <div className="-mt-4 flex flex-col gap-2">
                        {values.customUnits &&
                          values.customUnits.map((customUnit, index) => (
                            <div
                              className="flex flex-col gap-1"
                              key={customUnit}
                            >
                              <div className="flex items-center gap-3">
                                <Field
                                  type="text"
                                  name={`customUnits[${index}]`}
                                  autoFocus
                                  placeholder="Mon unité"
                                  className="w-full rounded-md border-2 border-gray-200 px-2 py-1 outline-none  focus-within:border-blue-500"
                                />
                                <button
                                  type="button"
                                  className="hover:text-red-500"
                                  onClick={() => remove(index)}
                                >
                                  <Icon name="HiTrash" className="text-xl" />
                                </button>
                              </div>
                              <div className="pl-1 text-xs text-red-500">
                                {errors.customUnits &&
                                  errors.customUnits[index] && (
                                    <p className="pl-1 text-xs">
                                      {errors.customUnits[index]}
                                    </p>
                                  )}
                                {values.customUnits &&
                                  values.customUnits[index] &&
                                  values.customUnits
                                    .filter(
                                      (item, index) =>
                                        values.customUnits?.indexOf(item) !==
                                        index,
                                    )
                                    .includes(
                                      values.customUnits[index] as string,
                                    ) && (
                                    <p>Veuillez ne pas faire de duplicata</p>
                                  )}
                              </div>
                            </div>
                          ))}
                        <Button
                          size="xs"
                          variant="green"
                          onClick={() => push("")}
                          disabled={
                            Array.isArray(errors.customUnits) ||
                            values.customUnits?.length === 20 ||
                            !!values.customUnits?.filter(
                              (item, index) =>
                                values.customUnits?.indexOf(item) !== index,
                            ).length
                          }
                          icon="BsPlusLg"
                          className="mt-4 max-w-fit"
                        >
                          Ajouter une unité
                        </Button>
                      </div>
                    )}
                  </FieldArray>

                  <div className="flex flex-wrap justify-center gap-2">
                    <Button
                      size="lg"
                      variant="black"
                      type="submit"
                      disabled={
                        !isValid ||
                        !dirty ||
                        !values.customUnits?.length ||
                        !!values.customUnits?.filter(
                          (item, index) =>
                            values.customUnits?.indexOf(item) !== index,
                        ).length ||
                        isSubmitting
                      }
                    >
                      {isSubmitting ? <LoadingDots /> : "C'est parti !"}
                    </Button>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setStep(1)
                      setValues((prev) => {
                        return {
                          ...prev,
                          customUnits: null,
                        }
                      })
                    }}
                    className="-mt-2 flex items-center gap-2 font-medium text-blue-500"
                  >
                    <Icon name="ArrowLeftIcon" className="w-4" /> Retour
                  </button>
                </>
              )}

              <p className="text-sm">
                Votre groupe est déjà inscrit ?{" "}
                <Link href="/connexion">
                  <a className="w-fit pl-1 font-medium text-blue-500 focus:bg-blue-300/20 focus:outline-none">
                    Connectez-vous
                  </a>
                </Link>
              </p>
            </Form>
            <Link href="/">
              <a className="mx-auto mt-10 block w-fit text-sm underline">
                Revenir à l'accueil
              </a>
            </Link>
          </div>
        )}
      </Formik>
    </div>
  )
}

export default SignUpForm

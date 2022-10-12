import Button from "@/components/ui/Button"
import Icon from "@/components/ui/Icon"
import { movements } from "@/utils/records"
import { Disclosure } from "@headlessui/react"
import { ChevronUpIcon } from "@heroicons/react/outline"
import classNames from "classnames"
import { Field } from "formik"
import Link from "next/link"
import { ISignUpSteps } from "./SignUpForm"

const NameAndMovementStep = ({ form, goForward }: ISignUpSteps) => {
  const { isValid, dirty } = form

  return (
    <>
      <label htmlFor="name" className="-mb-8 font-medium">
        Nom du Groupe
      </label>
      <div className="flex w-full items-center">
        <div className="flex w-full items-center gap-4 rounded-lg border border-gray-200 p-3 focus-within:border-blue-500">
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
        <div className="flex w-full items-center gap-4 rounded-lg border border-gray-200 p-3  focus-within:border-blue-500">
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
              <span>Je ne trouve pas mon mouvement</span>
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
              . Nous essayerons d'ajouter votre mouvement et ses spécificités.
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
        onClick={() => goForward()}
      >
        Suivant
      </Button>
    </>
  )
}

export default NameAndMovementStep

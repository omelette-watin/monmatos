import Button from "@/components/ui/Button"
import Icon from "@/components/ui/Icon"
import LoadingDots from "@/components/ui/LoadingDots"
import { units } from "@/utils/records"
import { Disclosure } from "@headlessui/react"
import { ChevronUpIcon } from "@heroicons/react/outline"
import classNames from "classnames"
import { ISignUpSteps } from "./SignUpForm"

const DefaultUnitStep = ({ form, goBackward, goForward }: ISignUpSteps) => {
  return (
    <>
      <h2 className="text-lg font-semibold">
        Souhaitez-utiliser les noms d'unités par défaut de votre
        <span className="text-emerald-500"> mouvement</span> ?
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
              {Object.entries(units[form.values.movement]).map(
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
            form.setValues((prev) => {
              return {
                ...prev,
                customUnits: Object.entries(units[form.values.movement])
                  .map(([, label]) => label)
                  .filter((unit) => unit !== "NON ATTRIBUÉE"),
              }
            })
            goForward()
          }}
        >
          Personnaliser
        </Button>
        <Button
          size="sm"
          variant="black"
          type="submit"
          className="max-w-fit"
          disabled={form.isSubmitting}
        >
          {form.isSubmitting ? <LoadingDots /> : "C'est parti !"}
        </Button>
      </div>
      <button
        type="button"
        onClick={() => goBackward}
        className="-mt-2 flex items-center gap-2 font-medium text-blue-500"
      >
        <Icon name="ArrowLeftIcon" className="w-4" /> Retour
      </button>
    </>
  )
}

export default DefaultUnitStep

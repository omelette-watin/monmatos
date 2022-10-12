import Button from "@/components/ui/Button"
import Icon from "@/components/ui/Icon"
import LoadingDots from "@/components/ui/LoadingDots"
import { Field, FieldArray } from "formik"
import { ISignUpSteps } from "./SignUpForm"

const CustomUnitsStep = ({ form, goBackward, goForward }: ISignUpSteps) => {
  return (
    <>
      <h2 className="text-lg font-semibold">
        Vous pouvez <span className="text-emerald-500">modifier</span> vos
        unités ou en <span className="text-blue-500">créer</span> de nouvelles.
      </h2>
      <p className="-mt-8 text-xs">
        <span className="font-medium">Note</span>: il n'est pas nécessaire de
        créer un type <span className="font-medium">GROUPE</span> ou{" "}
        <span className="font-medium">NON ATTRIBUÉE</span>, on s'en charge pour
        vous !
      </p>
      <FieldArray name="customUnits">
        {({ remove, push }) => (
          <div className="-mt-4 flex flex-col gap-3">
            <input
              type="text"
              disabled
              className="w-full rounded-md border border-gray-200 p-3 outline-none placeholder:font-bold placeholder:text-slate-900"
              placeholder="NON ATTRIBUÉE ( obligatoire )"
            />
            {form.values.customUnits &&
              form.values.customUnits.map((customUnit, index) => (
                <div className="flex flex-col gap-1" key={index}>
                  <div className="flex items-center gap-3">
                    <Field
                      type="text"
                      name={`customUnits[${index}]`}
                      placeholder="Mon unité"
                      className="w-full rounded-md border border-gray-200 p-3 outline-none  focus-within:border-blue-500"
                    />
                    <button
                      type="button"
                      className="hover:text-red-500"
                      onClick={() => remove(index)}
                    >
                      <Icon name="HiTrash" className="text-3xl" />
                    </button>
                  </div>
                  <div className="pl-1 text-xs text-red-500">
                    {form.errors.customUnits &&
                      Array.isArray(form.errors.customUnits) &&
                      form.errors.customUnits[index] && (
                        <p className="pl-1 text-xs">
                          {form.errors.customUnits[index]}
                        </p>
                      )}
                    {form.values.customUnits &&
                      form.values.customUnits[index] &&
                      form.values.customUnits
                        .filter(
                          (item, index) =>
                            form.values.customUnits?.indexOf(item) !== index,
                        )
                        .includes(form.values.customUnits[index] as string) && (
                        <p>Veuillez ne pas faire de duplicata</p>
                      )}
                  </div>
                </div>
              ))}
            <div className="mt-2 flex flex-wrap items-center justify-center gap-2 sm:justify-between">
              <p className="pl-1 text-sm text-gray-500">
                <span className="font-bold">15</span> unités maximum
              </p>
              <Button
                size="xs"
                type="button"
                variant="green"
                onClick={() => push("")}
                disabled={
                  Array.isArray(form.errors.customUnits) ||
                  form.values.customUnits?.length === 20 ||
                  !!form.values.customUnits?.filter(
                    (item, index) =>
                      form.values.customUnits?.indexOf(item) !== index,
                  ).length
                }
                icon="BsPlusLg"
                className="max-w-fit"
              >
                Ajouter une unité
              </Button>
            </div>
          </div>
        )}
      </FieldArray>

      <div className="flex flex-wrap justify-center gap-2">
        <Button
          size="lg"
          variant="black"
          type="submit"
          disabled={
            !form.isValid ||
            !form.dirty ||
            !form.values.customUnits?.length ||
            !!form.values.customUnits?.filter(
              (item, index) => form.values.customUnits?.indexOf(item) !== index,
            ).length ||
            form.isSubmitting
          }
        >
          {form.isSubmitting ? <LoadingDots /> : "C'est parti !"}
        </Button>
      </div>
      <button
        type="button"
        onClick={() => {
          form.setValues((prev) => {
            return {
              ...prev,
              customUnits: null,
            }
          })
          goBackward()
        }}
        className="-mt-2 flex items-center gap-2 font-medium text-blue-500"
      >
        <Icon name="ArrowLeftIcon" className="w-4" /> Retour
      </button>
    </>
  )
}

export default CustomUnitsStep

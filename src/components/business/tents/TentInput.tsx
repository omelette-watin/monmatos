import { Tent } from "@prisma/client"
import classNames from "classnames"
import { Dispatch, SetStateAction } from "react"
import { recordableKeyOf } from "./TentCharacteristic"

interface TentCharacteristicProps<T extends recordableKeyOf<Tent>> {
  type?: T
  label: string
  value: Tent[T] | string
  setValue: Dispatch<SetStateAction<Tent[T]>>
  options: [Tent[T], string][]
  variants?: Record<Tent[T] | string, string>
}

const TentInput = <T extends recordableKeyOf<Tent>>({
  label,
  value,
  setValue,
  options,
  variants,
}: TentCharacteristicProps<T>) => {
  return (
    <div
      className={classNames(
        "flex items-center rounded-md text-center text-sm font-semibold",
        {
          [`${variants ? `${variants[value]} text-white` : "bg-slate-200"}`]:
            true,
        },
      )}
    >
      <span className="w-[50%] truncate rounded-md rounded-r-none bg-black px-1 py-2 text-slate-50">
        {label}
      </span>
      <div className="w-full px-1 py-1 ">
        <select
          className="w-full border-none bg-transparent px-4 font-semibold outline-none"
          value={value}
          onChange={(e) => setValue(e.target.value as Tent[T])}
        >
          {options.map((option) => (
            <option value={option[0]} key={option[0]} className="text-black">
              {option[1]}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default TentInput

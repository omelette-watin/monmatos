import { State } from "@prisma/client"
import classNames from "classnames"
import { Dispatch, SetStateAction } from "react"
import { stateColors } from "../dashboard/StateChart"

interface TentInputProps {
  label: string
  value: string
  setValue: Dispatch<SetStateAction<string>>
  options: [string, string][]
}
const TentInput = ({ label, value, setValue, options }: TentInputProps) => {
  return (
    <div
      className={classNames(
        "flex items-center rounded-md text-center text-sm font-semibold",
        {
          [`${
            Object.entries(State)
              .map(([, value]) => value)
              .includes(value as State)
              ? `${stateColors[value as State]} text-white`
              : "bg-slate-200"
          }`]: true,
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
          onChange={(e) => setValue(e.target.value)}
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

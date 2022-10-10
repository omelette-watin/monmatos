import { stateColors } from "@/components/app/dashboard/StateChart"
import { State } from "@prisma/client"
import classNames from "classnames"
import { Dispatch, SetStateAction } from "react"

interface TentInputProps {
  label: string
  value: string
  setValue: Dispatch<SetStateAction<string>>
  options: [string, string][] | string[][]
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
              : "bg-gray-200"
          }`]: true,
        },
      )}
    >
      <span className="w-[50%] truncate rounded-md rounded-r-none bg-slate-900 px-1 py-2 text-slate-50">
        {label}
      </span>
      <div className="w-full cursor-pointer pr-1">
        <select
          className="w-full cursor-pointer border-none bg-transparent py-1 px-4 font-semibold outline-none"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        >
          {options.map((option) => (
            <option
              value={option[0]}
              key={option[0]}
              className="text-slate-900"
            >
              {option[1]}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default TentInput

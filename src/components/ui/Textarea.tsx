import { UIProps } from "@/utils/typedProps"
import classNames from "classnames"
import { FC } from "react"

const Textarea: FC<UIProps<{ label: string; error?: boolean }, "textarea">> = ({
  label,
  error,
  ...otherProps
}) => {
  return (
    <div className="relative w-full min-w-[200px]">
      <textarea
        {...otherProps}
        placeholder=" "
        className={classNames(
          "peer h-full min-h-[100px] w-full resize-y rounded-[7px] border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-gray-700 outline outline-0 transition-all focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-50",
          {
            "border-2 border-red-500 placeholder-shown:border-2 placeholder-shown:border-red-500 placeholder-shown:border-t-red-500":
              error,
            "border border-gray-200 placeholder-shown:border placeholder-shown:border-gray-200 placeholder-shown:border-t-gray-200":
              !error,
          },
        )}
      />
      <label className="pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-gray-400 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-500">
        {label}
      </label>
    </div>
  )
}

export default Textarea

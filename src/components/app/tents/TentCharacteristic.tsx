import type { Tent } from "@/pages/tentes"
import classNames from "classnames"

export type valueOf<T> = T[keyof T]

export type recordableKeyOf<T> = {
  [K in keyof T]: T[K] extends number | symbol | string ? K : never
}[keyof T]

interface TentCharacteristicProps<T extends recordableKeyOf<Tent>> {
  type?: T
  label: string
  value: Tent[T] | string
  variants?: Record<Tent[T] | string, string>
}

const TentCharacteristic = <T extends recordableKeyOf<Tent>>({
  label,
  value,
  variants,
}: TentCharacteristicProps<T>) => {
  const variantClassName = variants
    ? `${variants[value]} text-slate-100`
    : "bg-gray-200"

  return (
    <div
      className={classNames(
        "flex items-center rounded-md text-center text-sm font-semibold",
        variantClassName,
      )}
    >
      <span className="w-[50%] truncate rounded-md rounded-r-none bg-slate-900 px-1 py-2 text-slate-50">
        {label}
      </span>
      <div className="w-full truncate px-1 py-1 ">{value}</div>
    </div>
  )
}

export default TentCharacteristic

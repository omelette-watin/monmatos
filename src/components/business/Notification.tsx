import classNames from "classnames"
import { useEffect, useState } from "react"
import { useAppContext } from "../ui/hooks/useAppContext"
import Icon, { IconName } from "../ui/Icon"

export type Notification = {
  message: string
  type: "error" | "warning" | "success"
}

const variants: Record<
  Notification["type"],
  { className: string; icon: IconName }
> = {
  error: { className: "bg-red-500", icon: "MdOutlineDangerous" },
  warning: { className: "bg-yellow-500", icon: "MdOutlineErrorOutline" },
  success: { className: "bg-emerald-500", icon: "MdCheck" },
}

const Notification = () => {
  const { notification } = useAppContext()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(true)
    const timer = setTimeout(() => setVisible(false), 2000)

    return () => {
      clearTimeout(timer)
    }
  }, [notification])

  return (
    <div
      onClick={() => setVisible(false)}
      className={classNames(
        "fixed left-4 bottom-20 z-[100] max-w-[90vw] cursor-pointer rounded-lg px-4 py-2 text-white shadow-xl transition-transform duration-500 sm:max-w-[600px] md:pb-1",
        variants[notification.type || "success"]["className"],
        {
          "-translate-full-x": !visible || !notification.message,
          "translate-x-0": visible && notification.message,
        },
      )}
    >
      <div className="inline space-x-1 md:space-x-2">
        <Icon
          name={variants[notification.type || "success"]["icon"]}
          className="inline-block pb-1 text-2xl md:text-3xl"
        />
        <span className="text-sm md:text-base">{notification.message}</span>
      </div>
      <div className="absolute -top-2 -right-3 flex h-5 w-5 items-center justify-center rounded-full bg-white text-sm text-black shadow-sm">
        <Icon name="CgClose" />
      </div>
    </div>
  )
}

export default Notification

import classNames from "classnames"
import { useEffect } from "react"
import { useAppContext } from "../ui/hooks/useAppContext"
import Icon, { IconName } from "../ui/Icon"

export type Notification = {
  message: string
  type: "error" | "warning" | "success"
  visible: boolean
}

const variants: Record<
  Notification["type"],
  { className: string; icon: IconName }
> = {
  error: {
    className: "text-red-500 border-red-500",
    icon: "MdOutlineDangerous",
  },
  warning: {
    className: "text-amber-500 border-amber-500",
    icon: "MdOutlineErrorOutline",
  },
  success: {
    className: "text-emerald-500 border-emerald-500",
    icon: "MdCheck",
  },
}

const Notification = () => {
  const { notification, setNotification } = useAppContext()
  const hideNotification = () =>
    setNotification((prev) => {
      return { ...prev, visible: false }
    })
  useEffect(() => {
    const timer = setTimeout(hideNotification, 2000)

    return () => {
      clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notification])

  return (
    <div
      onClick={hideNotification}
      className={classNames(
        "fixed bottom-8 right-0 left-0 z-[100] flex w-full items-center justify-center transition-transform duration-200 ease-in-out",
        {
          "translate-full-y": !notification.visible || !notification.message,
          "translate-y-0": notification.visible && notification.message,
        },
      )}
    >
      <div
        className={classNames(
          "bg-main relative max-w-[90vw] cursor-pointer rounded-md border-l-4 px-4 py-2 shadow-2xl md:pb-1",
          variants[notification.type || "success"]["className"],
        )}
      >
        <div className="inline space-x-1 md:space-x-2">
          <Icon
            name={variants[notification.type || "success"]["icon"]}
            className="inline-block pb-1 text-2xl md:text-3xl"
          />
          <span className="text-sm text-black md:text-base">
            {notification.message}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Notification

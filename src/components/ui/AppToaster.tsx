import { useEffect } from "react"
import toast, { Renderable, Toast, ToastBar, Toaster } from "react-hot-toast"
import Icon from "./Icon"

interface CustomToastBarProps {
  t: Toast
  icon: Renderable
  message: Renderable
}

const durations: Record<Partial<Toast["type"]>, number> = {
  success: 3000,
  error: 4000,
  loading: 2000,
  blank: 2000,
  custom: 2000,
}

const CustomToastBar = ({ t, icon, message }: CustomToastBarProps) => {
  useEffect(() => {
    setTimeout(() => toast.dismiss(t.id), durations[t.type])
  }, [t.id, t.type])

  return (
    <>
      {icon}
      {message}
      {t.type !== "loading" ? (
        <>
          <Icon name="XIcon" className="w-[14px] sm:w-4" />
          <div
            className="absolute inset-0 z-10 cursor-pointer"
            onClick={() => toast.dismiss(t.id)}
          />
        </>
      ) : (
        <div className="absolute inset-0 z-10 cursor-progress" />
      )}
    </>
  )
}

const AppToaster = () => {
  return (
    <Toaster
      position="bottom-left"
      toastOptions={{
        success: {
          duration: durations.success,
        },
        error: {
          duration: durations.error,
        },
      }}
    >
      {(t) => (
        <ToastBar toast={t} position="bottom-center">
          {({ icon, message }) => (
            <CustomToastBar t={t} icon={icon} message={message} />
          )}
        </ToastBar>
      )}
    </Toaster>
  )
}

export default AppToaster

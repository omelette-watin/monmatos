import toast, { ToastBar, Toaster } from "react-hot-toast"

const AppToaster = () => {
  return (
    <Toaster
      position="bottom-left"
      toastOptions={{
        success: {
          duration: 2000,
        },
        error: {
          duration: 3000,
        },
      }}
    >
      {(t) => (
        <ToastBar toast={t} position="bottom-center">
          {({ icon, message }) => (
            <>
              {icon}
              {message}
              {t.type !== "loading" ? (
                <div
                  className="absolute inset-0 z-10 cursor-pointer"
                  onClick={() => toast.dismiss(t.id)}
                />
              ) : (
                <div className="absolute inset-0 z-10 cursor-progress" />
              )}
            </>
          )}
        </ToastBar>
      )}
    </Toaster>
  )
}

export default AppToaster

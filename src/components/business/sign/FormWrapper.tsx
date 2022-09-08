import ButtonLink from "@/components/ui/ButtonLink"
import Logo from "@/components/ui/Logo"
import type { UIProps } from "@/utils/typedProps"
import Link from "next/link"
import type { FC, ReactNode } from "react"

const FormWrapper: FC<
  UIProps<{
    children: ReactNode
    title: "Me connecter" | "Inscrire mon groupe"
  }>
> = ({ children, title }) => {
  return (
    <div
      className="bg-main flex min-h-screen w-full flex-col items-center justify-between gap-32 py-8
    px-6"
    >
      <div className="flex w-full flex-col items-center gap-10 lg:mt-auto">
        <div className="self-start lg:hidden">
          <Logo />
        </div>
        <h1 className="text-4xl font-black sm:text-5xl lg:text-emerald-500">
          {title}
        </h1>
        {children}
      </div>
      <div className="flex flex-col items-center gap-10 text-center text-sm">
        <div className="flex flex-col gap-4">
          <p>Toujours pas sur MonMatos ?</p>

          <ButtonLink
            href={title === "Me connecter" ? "/inscription" : "connexion"}
            variant="black"
            size="xs"
            className="max-w-fit"
            icon="FaPen"
          >
            {title === "Me connecter" ? "Inscrire mon groupe" : "Me connecter"}
          </ButtonLink>
        </div>

        <Link href="/">
          <a className="underline">Revenir à l'accueil</a>
        </Link>
      </div>
    </div>
  )
}

export default FormWrapper

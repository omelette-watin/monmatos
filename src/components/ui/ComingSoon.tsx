import { UIProps } from "@/utils/typedProps"
import Link from "next/link"
import { FC } from "react"

const ComingSoon: FC<UIProps<{ name: string }>> = ({ name }) => {
  return (
    <div className="flex w-full flex-col items-center justify-center pt-20 text-center sm:pt-24 lg:pt-32">
      <h1 className="text-center text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
        Bientôt ici la page "
        <span className="bg-gradient-to-tl from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
          {name}
        </span>
        " . . .
      </h1>
      <p className="mx-auto mt-6 max-w-3xl text-center text-lg text-slate-600">
        Merci de votre patience !
      </p>

      <Link href="/">
        <a className="mt-10 underline">Revenir à l'accueil</a>
      </Link>
    </div>
  )
}

export default ComingSoon

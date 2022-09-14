import { UIProps } from "@/utils/typedProps"
import Link from "next/link"
import { FC } from "react"

const ComingSoon: FC<UIProps<{ name: string }>> = ({ name }) => {
  return (
    <div className="flex w-full flex-col items-center gap-6 py-10 text-center ">
      <div className="text-2xl font-bold sm:text-3xl">Bientôt ici :</div>
      <div className="text-3xl font-bold sm:text-5xl">
        La page <span className="font-extrabold text-amber-500">{name}</span>{" "}
        ...
      </div>
      <p className="text-base font-semibold text-gray-400 sm:text-lg">
        Merci de votre patience !
      </p>

      <Link href="/">
        <a className="underline">Revenir à l'accueil</a>
      </Link>
    </div>
  )
}

export default ComingSoon

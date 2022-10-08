import ButtonLink from "@/components/ui/ButtonLink"
import { useSession } from "next-auth/react"

const Hero = () => {
  const { status } = useSession()

  return (
    <div className="flex w-full flex-col items-center justify-center pt-20 text-center sm:pt-24 lg:pt-32">
      <h1 className="text-center text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
        Gérez votre{" "}
        <span className="bg-gradient-to-tl from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
          matériel
        </span>{" "}
        en un clin d'oeil
      </h1>
      <p className="mx-auto mt-6 max-w-3xl text-center text-lg text-slate-600">
        Un outil de gestion de matériel centralisé, simple et intuitif.
        <br />
        Conçu par et pour des scouts.
      </p>
      <div className="mt-6 flex flex-col items-center justify-center gap-6 text-sm sm:mt-10 sm:flex-row">
        <ButtonLink
          href={status === "authenticated" ? "/groupe" : "/inscription"}
          size="md"
          variant="black"
        >
          {status === "authenticated"
            ? "Dashboard de mon groupe"
            : "Inscrire mon groupe"}
        </ButtonLink>
        <ButtonLink
          href="https://monmatos.org/connexion?i=69c014bd-d264-4ff9-a734-ac9dddabb212&callbackUrl=/groupe"
          target="_blank"
          size="md"
          className="max-w-fit"
          icon="PlayIcon"
        >
          Voir la démo
        </ButtonLink>
      </div>
    </div>
  )
}

export default Hero

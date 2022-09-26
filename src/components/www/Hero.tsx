import ButtonLink from "@/components/ui/ButtonLink"

const Hero = () => {
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
      <div className="mt-6 flex justify-center space-x-6 text-sm sm:mt-10">
        <ButtonLink
          href={`${process.env.NEXT_PUBLIC_APP_URL}/inscription`}
          size="sm"
          variant="black"
        >
          Inscrire mon groupe
        </ButtonLink>
      </div>
    </div>
  )
}

export default Hero

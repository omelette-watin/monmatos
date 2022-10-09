import Logo from "@/components/ui/Logo"
import PublicLayout from "@/components/www/Layout"
import Link from "next/link"
import { ReactElement } from "react"
import { NextPageWithLayout } from "./_app"

const BetaInformationPage: NextPageWithLayout = () => {
  return (
    <div className="flex flex-col gap-10 py-4 text-center text-slate-900 sm:pt-6 lg:py-10">
      <h1 className="flex flex-wrap items-center justify-center gap-2 text-center text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl sm:font-extrabold lg:gap-4 lg:text-5xl">
        <Logo className="inline-flex sm:hidden" size="md" noBetaTag />
        <Logo className="hidden sm:inline-flex lg:hidden" size="lg" noBetaTag />
        <Logo className="hidden lg:inline-flex" size="xl" noBetaTag />
        <span className="w-fit">
          est encore en <span className="text-pink-500">développement</span>{" "}
        </span>
      </h1>

      <div className="px-4 text-slate-600 lg:text-lg">
        <p>
          Vous avez été nombreux à nous proposer des modifications. Merci à vous
          !
        </p>
        <p>
          Nous travaillons en ce moment à ce que MonMatos puisse gèrer les
          <span className="font-semibold"> spécificités</span> de chaque{" "}
          <span className="font-semibold text-emerald-500"> groupe</span>.
        </p>
      </div>

      <section className="flex flex-col gap-2">
        <h2 className="text-xl font-bold lg:text-2xl">
          Concrètement ça veut dire quoi ?
        </h2>
        <div className="px-4 text-slate-600 lg:text-lg">
          <p>
            Pour répondre à vos demandes, nous allons devoir repenser une partie
            de l'application.
          </p>
          <p>
            Il est possible que ce changement entraîne la{" "}
            <span className="font-semibold">
              suppression des éléments que vous avez créés
            </span>{" "}
            (groupe et/ou tentes).
          </p>
        </div>
      </section>
      <section className="flex flex-col gap-2">
        <h2 className="text-xl font-bold lg:text-2xl">
          Aïe ! Mais que dois-je faire ?
        </h2>
        <div className="px-4 text-slate-600 lg:text-lg">
          <p>
            Rien de particulier. Essayez l'outil et faites-nous remonter vos
            idées sur{" "}
            <a
              href="https://discord.gg/qjvvM6Wya6"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-blue-500"
            >
              Discord
            </a>
            .
          </p>
          <p>
            Gardez seulement en tête que l'application est en{" "}
            <span className="font-semibold">béta</span> et que les choses vont
            très probablement changer !
          </p>
        </div>
      </section>
      <section className="flex flex-col gap-2">
        <h2 className="text-xl font-bold lg:text-2xl">
          Sur quoi travaillons-nous en priorité ?
        </h2>
        <div className="px-4 text-slate-600 lg:text-lg">
          <p>
            L'ajout des <span className="font-semibold">mouvements</span> scouts{" "}
            <span className="font-semibold">manquant</span>.
          </p>
          <p>
            Le système d'<span className="font-semibold">identification</span>{" "}
            des tentes (donner un nom à une tente).
          </p>
          <p>L'amélioration générale du système de gestion.</p>
        </div>
      </section>
      <p className="text-xl font-bold">Merci de votre patience !</p>

      <Link href="/">
        <a className="underline">Revenir à l'accueil</a>
      </Link>
    </div>
  )
}

BetaInformationPage.getLayout = (page: ReactElement) => (
  <PublicLayout>{page}</PublicLayout>
)

export default BetaInformationPage

import Image from "next/future/image"
import glimpseImg from "../../../../public/glimpse.png"

const Glimpse = () => {
  return (
    <div className="mt-14 flex flex-col gap-10 pb-80 lg:mt-32 lg:flex-row lg:gap-6">
      <div className="flex w-full flex-col items-center pt-10 lg:items-start">
        <h2 className="text-4xl font-extrabold text-slate-900 sm:text-5xl">
          Fini{" "}
          <span className="bg-gradient-to-tl from-blue-300 to-blue-500 bg-clip-text text-transparent">
            Excel
          </span>
          <br />
          Fini le{" "}
          <span className="bg-gradient-to-tl from-slate-300 to-slate-500 bg-clip-text text-transparent">
            papier
          </span>
          <br />
          Fini la{" "}
          <span className="bg-gradient-to-tl from-red-300 to-red-500 bg-clip-text text-transparent">
            galère
          </span>
        </h2>
        <p className="mt-2 text-sm text-slate-600 sm:text-base lg:mt-6">
          Entre nous, les scouts méritent mieux.
        </p>
      </div>

      <Image
        src={glimpseImg}
        alt="Aperçu du dashboard"
        className="rounded-md shadow-2xl lg:w-2/3"
      />
    </div>
  )
}

export default Glimpse

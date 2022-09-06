import Icon from "@/components/ui/Icon"

const TentCardSkeleton = () => {
  return (
    <div className="h-200px mx-auto h-fit w-full animate-pulse space-y-4 rounded-xl bg-slate-200 p-6 pt-4 text-transparent shadow-lg">
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-slate-300 bg-slate-300">
            <h2 className="text-2xl font-bold">??</h2>
          </div>
          <div className="space-y-1 text-left">
            <h3 className="rounded-md bg-slate-300 text-lg font-bold leading-tight">
              Loading unité
            </h3>
            <p className="rounded-md bg-slate-300 text-sm font-semibold">
              ?? places
            </p>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center rounded-md bg-slate-300 text-center text-sm font-semibold">
            <span className="w-[50%] truncate rounded-md rounded-r-none px-1 py-2">
              ÉTAT
            </span>
            <div className="w-full truncate px-1 py-1">LOADING</div>
          </div>
          <div className="flex items-center rounded-md bg-slate-300 text-center text-sm font-semibold">
            <span className="w-[50%] truncate rounded-md rounded-r-none px-1 py-2">
              TYPE
            </span>
            <div className="w-full truncate px-1 py-1">LOADING</div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="rounded-md bg-slate-300 text-xs underline">
            Voir plus d'infos
          </div>
          <div className="flex items-center space-x-1">
            <div className="rounded-full bg-slate-300">
              <Icon name="HiPencil" />
            </div>
            <div className="rounded-full bg-slate-300">
              <Icon name="HiTrash" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TentCardSkeleton

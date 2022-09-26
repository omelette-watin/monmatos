interface LoadingDotsProps {
  color?: string
}

const LoadingDots = ({ color = "#fff" }: LoadingDotsProps) => {
  const circleCommonClasses = "h-2 w-2 inline-block mx-[2px] rounded-full"

  return (
    <span className="inline-flex items-center">
      <span
        style={{ backgroundColor: color }}
        className={`${circleCommonClasses} animate-[blink_1.4s_infinite_ease-in-out]`}
      />
      <span
        style={{ backgroundColor: color }}
        className={`${circleCommonClasses} animate-[blink_1.4s_infinite_300ms_ease-in-out]`}
      />
      <span
        style={{ backgroundColor: color }}
        className={`${circleCommonClasses} animate-[blink_1.4s_infinite_600ms_ease-in-out]`}
      />
    </span>
  )
}

export default LoadingDots

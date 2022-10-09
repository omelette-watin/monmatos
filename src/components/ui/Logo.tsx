import { UIProps } from "@/utils/typedProps"
import classNames from "classnames"
import { FC } from "react"

const sizes = {
  xs: {
    className: "inline-flex space-x-1 text-base",
    svgProps: {
      width: 18,
      height: 18,
    },
  },
  sm: {
    className: "text-xl space-x-2",
    svgProps: {
      width: 26,
      height: 26,
    },
  },
  md: {
    className: "text-2xl space-x-2",
    svgProps: {
      width: 30,
      height: 30,
    },
  },
  lg: {
    className: "text-3xl space-x-3 font-extrabold",
    svgProps: {
      width: 40,
      height: 40,
    },
  },
  xl: {
    className: "text-5xl space-x-4 font-black",
    svgProps: {
      width: 60,
      height: 60,
    },
  },
}

const Logo: FC<
  UIProps<{
    size?: keyof typeof sizes
    white?: boolean
    noBetaTag?: boolean
  }>
> = ({ size = "md", white, className, noBetaTag }) => {
  return (
    <div
      className={classNames(
        "relative flex w-fit items-center font-bold",
        className,
        sizes[size].className,
        {
          "text-emerald-600": !white,
          "text-white": white,
        },
      )}
    >
      <svg {...sizes[size].svgProps} viewBox="0 0 106.048 106.048">
        <g>
          <path
            fill={white ? "#fff" : "#059669"}
            d="M84.838,0H21.209C9.543,0,0,9.543,0,21.209v63.629c0,11.666,9.543,21.21,21.209,21.21h63.628
		c11.667,0,21.21-9.544,21.21-21.21V21.209C106.048,9.543,96.505,0,84.838,0z M68.755,83.761
		c-9.507-8.911-13.784-19.355-13.784-19.355h-0.155c0,0-4.406,10.843-14.188,19.355H13.256l39.03-55.432l-2.926-3.774l2.905-2.269
		l2.358,3.027v-0.016l0.016,0.016l2.361-3.027l2.91,2.269l-2.926,3.764l35.807,55.375L68.755,83.761z"
          />
        </g>
      </svg>

      <p className="truncate">MonMatos</p>
      {!noBetaTag && (
        <div className="absolute -right-7 -top-2 rounded-sm bg-pink-500 px-1 text-xs font-semibold text-white">
          Beta
        </div>
      )}
    </div>
  )
}

export default Logo

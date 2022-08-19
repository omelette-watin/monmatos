import { PropsWithChildren, SVGProps } from "react"

export type UIProps<
  PROPS = null,
  ELEMENT = "div",
  OMIT extends number | string | symbol = "",
> = PropsWithChildren<PROPS> & {
  className?: string
} & Omit<
    ELEMENT extends SVGElement
      ? SVGProps<ELEMENT>
      : JSX.IntrinsicElements[ELEMENT extends keyof JSX.IntrinsicElements
          ? ELEMENT
          : "div"],
    OMIT
  >

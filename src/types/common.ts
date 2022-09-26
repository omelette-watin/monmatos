import type { PropsWithChildren } from "react"

export type WithChildren<T = Record<string, unknown>> = T &
  PropsWithChildren<Record<string, unknown>>

export type WithClassName<T = Record<string, unknown>> = T & {
  className?: string
}

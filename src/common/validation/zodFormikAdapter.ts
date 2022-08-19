import { z } from "zod"

export class ValidationError extends Error {
  public name = "ValidationError"

  public inner: Array<{ path: string; message: string }> = []

  public constructor(message: string) {
    super(message)
  }
}

const createValidationError = (e: z.ZodError) => {
  const error = new ValidationError(e.message)
  error.inner = e.errors.map((err) => ({
    message: err.message,
    path: err.path.join("."),
  }))

  return error
}

export function zodFormikAdapter<T>(
  schema: z.ZodSchema<T>,
  params?: Partial<z.ParseParams>,
): { validate: (obj: T) => Promise<void> } {
  return {
    async validate(obj: T) {
      try {
        await schema.parseAsync(obj, params)
      } catch (error: unknown) {
        throw createValidationError(error as z.ZodError<T>)
      }
    },
  }
}

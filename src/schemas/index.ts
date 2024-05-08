import { z } from 'zod';

export const ZodNumberNotEmpty = (message = 'Invalid number') =>
  z
    .string()
    .trim()
    .min(1, 'Field cannot be empty')
    .refine((value) => value === null || !isNaN(Number(value)), { message })
    .transform((value) => Number(value));

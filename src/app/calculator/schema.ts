import { z } from 'zod';

import { OperationType } from '@/types/operation';
import { ZodNumberNotEmpty } from '@/schemas';

export const CalculatorFormSchema = z.object({
  type: z.nativeEnum(OperationType),
  firstNumber: ZodNumberNotEmpty(),
  secondNumber: ZodNumberNotEmpty().optional(),
});

export type CalculatorFormValues = z.infer<typeof CalculatorFormSchema>;

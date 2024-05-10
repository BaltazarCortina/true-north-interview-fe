import { z } from 'zod';

import { OperationType } from '@/types/operation';
import { ZodNumberNotEmpty } from '@/schemas';

export const CalculatorFormSchema = z
  .object({
    type: z.nativeEnum(OperationType, { required_error: 'Operation type is required.' }),
    firstNumber: ZodNumberNotEmpty(),
    secondNumber: ZodNumberNotEmpty().optional(),
  })
  .superRefine((values, ctx) => {
    const { type, firstNumber, secondNumber } = values;

    switch (type) {
      case OperationType.RANDOM_STRING:
        if (firstNumber < 1 || firstNumber > 20 || !Number.isInteger(firstNumber)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['firstNumber'],
            message: 'Length must be an integer between 1 and 20.',
          });
        }
        break;
      case OperationType.SQUARE_ROOT:
        if (firstNumber < 0) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['firstNumber'],
            message: 'Number must be greater than or equal to 0.',
          });
        }
        break;
      case OperationType.DIVISION:
        if (secondNumber === 0) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['secondNumber'],
            message: 'Cannot divide by zero.',
          });
        }
        break;
    }
  });

export type CalculatorFormValues = z.infer<typeof CalculatorFormSchema>;

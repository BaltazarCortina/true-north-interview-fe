import { z } from 'zod';

export const OperationResultSchema = z.union([z.string(), z.number()]);

export type OperationResult = z.infer<typeof OperationResultSchema>;

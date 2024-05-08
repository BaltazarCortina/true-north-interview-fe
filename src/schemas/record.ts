import { z } from 'zod';

import { OperationType } from '@/types/operation';

export const RecordSchema = z.object({
  operationId: z.object({
    id: z.string(),
    type: z.nativeEnum(OperationType),
  }),
  amount: z.number(),
  userBalance: z.number(),
  operationResponse: z.string(),
  date: z.string(),
});

export type Record = z.infer<typeof RecordSchema>;

export const PopulatedRecordListSchema = z.object({
  docs: z.array(RecordSchema),
  totalDocs: z.number(),
});

export type PopulatedRecordList = z.infer<typeof PopulatedRecordListSchema>;

import { Record } from '@/schemas/record';

export const parseRecords = (data: Record[]) => {
  return data.map((record) => ({
    id: record.id,
    date: record.date,
    type: record.operationId.type,
    result: record.operationResponse,
    creditsUsed: record.amount,
    balance: record.userBalance,
  }));
};

export type ParsedRecord = ReturnType<typeof parseRecords>[number];

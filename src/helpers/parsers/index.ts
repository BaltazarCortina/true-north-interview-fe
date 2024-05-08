import { Record } from '@/schemas/record';
import { ParsedRecord } from '@/types/record';

export const parseRecords = (data: Record[]): ParsedRecord[] => {
  return data.map((record) => ({
    date: record.date,
    type: record.operationId.type,
    result: record.operationResponse,
    creditsUsed: record.amount,
    balance: record.userBalance,
  }));
};

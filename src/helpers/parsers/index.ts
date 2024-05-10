import { Record } from '@/schemas/record';
import { OperationType } from '@/types/operation';

const parseOperationType = (type: OperationType) => {
  const operationTypes = {
    [OperationType.ADDITION]: 'Addition',
    [OperationType.SUBTRACTION]: 'Subtraction',
    [OperationType.MULTIPLICATION]: 'Multiplication',
    [OperationType.DIVISION]: 'Division',
    [OperationType.SQUARE_ROOT]: 'Square Root',
    [OperationType.RANDOM_STRING]: 'Random String',
  };

  return operationTypes[type];
};

export const parseRecords = (data: Record[]) => {
  return data.map((record) => ({
    id: record.id,
    date: record.date,
    type: parseOperationType(record.operationId.type),
    result: record.operationResponse,
    creditsUsed: record.amount,
    balance: record.userBalance,
  }));
};

export type ParsedRecord = ReturnType<typeof parseRecords>[number];

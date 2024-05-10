import { OperationType } from '@/types/operation';

export const operations = [
  { type: OperationType.ADDITION, symbol: '+', label: 'Addition' },
  { type: OperationType.SUBTRACTION, symbol: '-', label: 'Subtraction' },
  { type: OperationType.MULTIPLICATION, symbol: 'x', label: 'Multiplication' },
  { type: OperationType.DIVISION, symbol: '/', label: 'Division' },
  { type: OperationType.SQUARE_ROOT, symbol: '√', label: 'Square Root' },
  { type: OperationType.RANDOM_STRING, symbol: 'Random', label: 'Random String Generator' },
];

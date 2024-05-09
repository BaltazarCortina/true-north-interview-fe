export enum OperationType {
  ADDITION = 'ADDITION',
  SUBTRACTION = 'SUBTRACTION',
  MULTIPLICATION = 'MULTIPLICATION',
  DIVISION = 'DIVISION',
  SQUARE_ROOT = 'SQUARE_ROOT',
  RANDOM_STRING = 'RANDOM_STRING',
}

export interface NewOperation {
  type: OperationType;
  firstNumber: number;
  secondNumber?: number;
}

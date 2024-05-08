import { OperationResult, OperationResultSchema } from '@/schemas/operation';
import { post } from './api';
import { NewOperation } from '@/types/record';

export const postRecord = async (body: NewOperation) =>
  post<OperationResult>(`${process.env.NEXT_PUBLIC_API_URL}records`, body, OperationResultSchema);

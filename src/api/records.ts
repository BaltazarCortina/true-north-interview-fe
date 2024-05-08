import { OperationResult, OperationResultSchema } from '@/schemas/operation';
import { get, post } from './api';
import { NewOperation } from '@/types/operation';
import { PopulatedRecordListSchema, PopulatedRecordList } from '@/schemas/record';

export const getRecords = async (userId: string, page: number, rowsPerPage: number) =>
  get<PopulatedRecordList>(
    `${process.env.NEXT_PUBLIC_API_URL}/records/${userId}?page=${page + 1}&limit=${rowsPerPage}`,
    PopulatedRecordListSchema
  );

export const postRecord = async (body: NewOperation) =>
  post<OperationResult>(`${process.env.NEXT_PUBLIC_API_URL}/records`, body, OperationResultSchema);

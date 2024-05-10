import { OperationResult, OperationResultSchema } from '@/schemas/operation';
import { get, patch, post } from '.';
import { NewOperation } from '@/types/operation';
import { PopulatedRecordListSchema, PopulatedRecordList } from '@/schemas/record';

export const getRecords = async (page: number, rowsPerPage: number) =>
  get<PopulatedRecordList>(
    `${process.env.NEXT_PUBLIC_API_URL}/records?page=${page + 1}&limit=${rowsPerPage}`,
    PopulatedRecordListSchema
  );

export const postRecord = async (body: NewOperation) =>
  post<OperationResult>(`${process.env.NEXT_PUBLIC_API_URL}/records`, body, OperationResultSchema);

export const deleteRecord = async (id: string) =>
  patch<OperationResult>(`${process.env.NEXT_PUBLIC_API_URL}/records/${id}`);

import { OperationResult, OperationResultSchema } from '@/schemas/operation';
import { get, patch, post } from '.';
import { PopulatedRecordListSchema, PopulatedRecordList } from '@/schemas/record';
import { CalculatorFormValues } from '@/app/(private)/calculator/schema';

export const getRecords = async (
  page: number,
  rowsPerPage: number,
  filter: string,
  search: string
) => {
  const params = `page=${page + 1}&limit=${rowsPerPage}&filter=${filter}&search=${search}`;
  return get<PopulatedRecordList>(
    `${process.env.NEXT_PUBLIC_API_URL}/records?${params}`,
    PopulatedRecordListSchema
  );
};

export const postRecord = async (body: CalculatorFormValues) =>
  post<OperationResult>(`${process.env.NEXT_PUBLIC_API_URL}/records`, body, OperationResultSchema);

export const deleteRecord = async (id: string) =>
  patch<OperationResult>(`${process.env.NEXT_PUBLIC_API_URL}/records/${id}`);

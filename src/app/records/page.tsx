'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getRecords } from '@/api/records';
import DataTable from '@/components/Table';
import { ParsedRecord } from '@/types/record';
import { parseRecords } from '@/helpers/parsers';

const columns: { header: string; key: keyof ParsedRecord }[] = [
  {
    header: 'Date',
    key: 'date',
  },
  {
    header: 'Operation',
    key: 'type',
  },
  {
    header: 'Result',
    key: 'result',
  },
  {
    header: 'Credits Used',
    key: 'creditsUsed',
  },
  {
    header: 'Balance',
    key: 'balance',
  },
];

const userId = '663917cb3fbf6138ba79efa8'; // TODO: Replace with actual user id

const Records = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { data, isPending } = useQuery({
    queryKey: ['records', page, rowsPerPage],
    queryFn: () => getRecords(userId, page, rowsPerPage),
    select: (data) => ({
      docs: parseRecords(data.data.docs),
      totalDocs: data.data.totalDocs,
    }),
  });

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <DataTable
        columns={columns}
        data={data?.docs}
        isPending={isPending}
        page={page}
        rowsPerPage={rowsPerPage}
        setPage={setPage}
        setRowsPerPage={setRowsPerPage}
        totalRows={data?.totalDocs ?? 0}
      />
    </div>
  );
};

export default Records;

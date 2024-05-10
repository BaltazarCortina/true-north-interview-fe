'use client';

import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Delete } from '@mui/icons-material';

import { deleteRecord, getRecords } from '@/api/records';
import DataTable from '@/components/Table';
import { ParsedRecord, parseRecords } from '@/helpers/parsers';

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

const Records = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { data, isPending, refetch } = useQuery({
    queryKey: ['records', page, rowsPerPage],
    queryFn: () => getRecords(page, rowsPerPage),
    select: (data) => ({
      docs: parseRecords(data.data.docs),
      totalDocs: data.data.totalDocs,
    }),
  });

  const { mutate, isPending: isPendingDelete } = useMutation({
    mutationFn: deleteRecord,
    onSettled: async () => await refetch(),
  });

  const actions = [
    {
      label: 'Delete',
      icon: <Delete />,
      onClick: async (record: ParsedRecord) => mutate(record.id),
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center flex-grow px-8 bg-gray-900">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full">
        <h1 className="text-2xl font-bold mb-8  text-gray-900">Records history</h1>
        <DataTable
          columns={columns}
          data={data?.docs}
          actions={actions}
          isPending={isPending || isPendingDelete}
          page={page}
          rowsPerPage={rowsPerPage}
          setPage={setPage}
          setRowsPerPage={setRowsPerPage}
          totalRows={data?.totalDocs ?? 0}
        />
      </div>
    </div>
  );
};

export default Records;

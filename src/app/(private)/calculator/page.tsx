'use client';

import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@mui/material';

import CustomInput from '@/components/CustomInput';
import OperationButton from '@/components/OperationButton';
import { OperationType } from '@/types/operation';
import { postRecord } from '@/api/records';
import { CalculatorFormSchema, CalculatorFormValues } from './schema';

const operations = [
  { type: OperationType.ADDITION, symbol: '+', label: 'Addition' },
  { type: OperationType.SUBTRACTION, symbol: '-', label: 'Subtraction' },
  { type: OperationType.MULTIPLICATION, symbol: 'x', label: 'Multiplication' },
  { type: OperationType.DIVISION, symbol: '/', label: 'Division' },
  { type: OperationType.SQUARE_ROOT, symbol: '√', label: 'Square Root' },
  { type: OperationType.RANDOM_STRING, symbol: 'Random', label: 'Random String Generator' },
];

const CalculatorPage = () => {
  const [result, setResult] = useState<string | number>();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<CalculatorFormValues>({
    mode: 'onBlur',
    resolver: zodResolver(CalculatorFormSchema),
  });

  const operationType = watch('type');

  useEffect(() => {
    if (
      operationType === OperationType.SQUARE_ROOT ||
      operationType === OperationType.RANDOM_STRING
    ) {
      setValue('secondNumber', undefined);
    }
  }, [operationType, setValue]);

  const onSubmit: SubmitHandler<CalculatorFormValues> = async (formData) => {
    const body = {
      userId: '663917cb3fbf6138ba79efa8', // TODO: use current user id
      type: formData.type,
      firstNumber: formData.firstNumber,
      secondNumber: formData.secondNumber,
    };
    try {
      const response = await postRecord(body);
      setResult(response.data);
    } catch {
      console.log('Error'); // TODO: handle error
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <form
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-2xl font-bold mb-8 text-center text-gray-900">Calculator</h1>
        <div className="grid grid-cols-2 gap-4">
          <CustomInput
            label={operationType === OperationType.RANDOM_STRING ? 'String Length' : 'Number 1'}
            name="firstNumber"
            register={register}
            type="number"
            placeholder="Enter a number"
            error={errors.firstNumber}
          />
          {operationType !== OperationType.SQUARE_ROOT &&
            operationType !== OperationType.RANDOM_STRING && (
              <CustomInput
                label="Number 2"
                name="secondNumber"
                register={register}
                type="number"
                placeholder="Enter a number"
                error={errors.secondNumber}
              />
            )}
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4">
          {operations.map(({ type, symbol, label }) => (
            <OperationButton
              selected={operationType}
              setOperation={(operation) => setValue('type', operation)}
              type={type}
              key={type}
              label={label}
            >
              {symbol}
            </OperationButton>
          ))}
        </div>
        <div className="mt-4 space-y-2">
          <p className="text-gray-700">{`Result: ${result ?? ''}`}</p>
        </div>
        <div className="mt-4 text-center">
          <Button type="submit">Calculate!</Button>
        </div>
      </form>
    </div>
  );
};

export default CalculatorPage;

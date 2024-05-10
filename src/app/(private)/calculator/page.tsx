'use client';

import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import CustomInput from '@/components/CustomInput';
import OperationButton from '@/components/OperationButton';
import CustomButton from '@/components/CustomButton';
import { OperationType } from '@/types/operation';
import { postRecord } from '@/api/records';
import { operations } from '@/helpers/constants';
import { CalculatorFormSchema, CalculatorFormValues } from './schema';
import { Alert } from '@mui/material';

const CalculatorPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm<CalculatorFormValues>({
    mode: 'onBlur',
    resolver: zodResolver(CalculatorFormSchema),
  });

  const operationType = watch('type');

  const { mutate, isPending, error, isError, data } = useMutation({
    mutationFn: postRecord,
  });

  useEffect(() => {
    if (
      operationType === OperationType.SQUARE_ROOT ||
      operationType === OperationType.RANDOM_STRING
    ) {
      setValue('secondNumber', undefined);
    }
  }, [operationType, setValue]);

  const onSubmit: SubmitHandler<CalculatorFormValues> = (formData) => {
    const body = {
      type: formData.type,
      firstNumber: formData.firstNumber,
      secondNumber: formData.secondNumber,
    };
    mutate(body);
  };

  const isValid = Object.keys(errors).length === 0;

  return (
    <div className="flex flex-col items-center justify-center flex-grow bg-gray-900">
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
              setOperation={(operation) => {
                setValue('type', operation);
                clearErrors('type');
              }}
              type={type}
              key={type}
              label={label}
            >
              {symbol}
            </OperationButton>
          ))}
          {errors.type && <span className="text-red-700 text-xs">{errors.type.message}</span>}
        </div>
        <div className="mt-8 text-center">
          <CustomButton type="submit" variant="secondary" disabled={!isValid} loading={isPending}>
            Calculate!
          </CustomButton>
        </div>
        {!isPending && !isError && data && (
          <div className="mt-8 space-y-2">
            <Alert severity="success">
              {'The result of this operation is: '}
              <span className="font-bold ml-1">{data.data}</span>
            </Alert>
          </div>
        )}
        {!isPending && isError && (
          <div className="mt-8 space-y-2">
            <Alert severity="error">
              {error.message || 'An error occurred while processing the operation.'}
            </Alert>
          </div>
        )}
      </form>
    </div>
  );
};

export default CalculatorPage;

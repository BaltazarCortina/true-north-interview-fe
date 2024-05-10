'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Alert } from '@mui/material';

import CustomInput from '@/components/CustomInput';
import CustomButton from '@/components/CustomButton';
import { SignUpFormSchema, SignUpFormValues } from './schema';
import { createUser } from '@/api/auth';
import { useAuth } from '@/lib/firebase/Provider';

const CalculatorPage = () => {
  const { signIn } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    mode: 'onBlur',
    resolver: zodResolver(SignUpFormSchema),
  });

  const { mutate, isPending, error, isError } = useMutation({
    mutationFn: createUser,
    onSuccess: (_data, variables) => signIn(variables.email, variables.password),
  });

  const onSubmit: SubmitHandler<SignUpFormValues> = (formData) => {
    const newUser = {
      email: formData.email,
      password: formData.password,
    };
    mutate(newUser);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
      <form
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-2xl font-bold mb-8 text-center text-gray-900">Create an account</h1>
        <div className="flex flex-col items-center gap-4 max-w-72 mx-auto">
          <CustomInput
            label="Email"
            name="email"
            register={register}
            type="email"
            error={errors.email}
            disabled={isPending}
          />
          <CustomInput
            label="Password"
            name="password"
            register={register}
            error={errors.password}
            type="password"
            disabled={isPending}
          />
          <CustomInput
            label="Repeat password"
            name="repeatPassword"
            register={register}
            error={errors.repeatPassword}
            type="password"
            disabled={isPending}
          />
        </div>
        <div className="mt-8 text-center">
          <CustomButton type="submit" variant="secondary" disabled={isPending}>
            Sign up!
          </CustomButton>
        </div>
        {!isPending && isError && (
          <div className="mt-8 space-y-2">
            <Alert severity="error">{error.message || 'There was an error signing in.'}</Alert>
          </div>
        )}
      </form>
    </div>
  );
};

export default CalculatorPage;

'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Alert } from '@mui/material';

import CustomInput from '@/components/CustomInput';
import { useAuth } from '@/lib/firebase/Provider';
import CustomButton from '@/components/CustomButton';
import { SignInFormSchema, SignInFormValues } from './schema';

const CalculatorPage = () => {
  const { signIn } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormValues>({
    mode: 'onBlur',
    resolver: zodResolver(SignInFormSchema),
  });

  const { mutate, isPending, error, isError } = useMutation({
    mutationFn: (formData: SignInFormValues) => signIn(formData.email, formData.password),
  });

  const onSubmit: SubmitHandler<SignInFormValues> = (formData) => {
    mutate(formData);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
      <form
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-2xl font-bold mb-8 text-center text-gray-900">
          Sign in to your account
        </h1>
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
        </div>
        <div className="mt-8 text-center">
          <CustomButton type="submit" variant="secondary" disabled={isPending}>
            Sign in!
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

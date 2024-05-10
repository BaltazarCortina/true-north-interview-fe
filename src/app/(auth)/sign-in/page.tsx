'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

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

  const onSubmit: SubmitHandler<SignInFormValues> = async (formData) => {
    try {
      await signIn(formData.email, formData.password);
    } catch {
      console.log('Error'); // TODO: handle error
    }
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
          />
          <CustomInput
            label="Password"
            name="password"
            register={register}
            error={errors.password}
            type="password"
          />
        </div>
        <div className="mt-8 text-center">
          <CustomButton type="submit" variant="secondary">
            Sign in!
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default CalculatorPage;

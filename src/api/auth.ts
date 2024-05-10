import { SignUpFormValues } from '@/app/(auth)/sign-up/schema';
import { post } from '.';

export const createUser = async (body: Omit<SignUpFormValues, 'repeatPassword'>) =>
  post(`${process.env.NEXT_PUBLIC_API_URL}/auth`, body);

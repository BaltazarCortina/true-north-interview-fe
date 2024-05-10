import { FormLabel, Input } from '@mui/material';
import { UseFormRegister, FieldValues, Path } from 'react-hook-form';

interface CustomInputProps<T extends FieldValues> {
  label: string;
  register: UseFormRegister<T>;
  name: Path<T>;
  placeholder?: string;
  type?: string;
  error?: any;
}

const CustomInput = <T extends FieldValues>({
  label,
  register,
  name,
  error,
  type,
  placeholder,
}: CustomInputProps<T>) => {
  return (
    <div className="flex flex-col space-y-2 w-full">
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Input id={name} placeholder={placeholder} type={type || 'text'} {...register(name)} />
      {error && <span className="text-red-700 text-xs">{error.message}</span>}
    </div>
  );
};

export default CustomInput;

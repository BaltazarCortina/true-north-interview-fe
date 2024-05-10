import { FormLabel, TextField } from '@mui/material';
import { UseFormRegister, FieldValues, Path } from 'react-hook-form';

interface CustomInputProps<T extends FieldValues> {
  label: string;
  register: UseFormRegister<T>;
  name: Path<T>;
  placeholder?: string;
  type?: string;
  variant?: 'standard' | 'filled' | 'outlined';
  error?: any;
  disabled?: boolean;
}

const CustomInput = <T extends FieldValues>({
  label,
  register,
  name,
  error,
  type,
  variant = 'standard',
  placeholder,
  disabled,
}: CustomInputProps<T>) => {
  return (
    <div className="flex flex-col space-y-2 w-full">
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <TextField
        id={name}
        placeholder={placeholder}
        type={type || 'text'}
        variant={variant}
        disabled={disabled}
        {...register(name)}
      />
      {error && <span className="text-red-700 text-xs">{error.message}</span>}
    </div>
  );
};

export default CustomInput;

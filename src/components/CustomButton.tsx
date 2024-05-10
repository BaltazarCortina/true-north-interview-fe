export const getButtonStyles = (variant: ButtonVariant) => {
  const buttonVariants = {
    primary: 'text-gray-900 bg-gray-100 rounded-md hover:bg-gray-200',
    secondary:
      'text-gray-100 bg-gray-950 rounded-md border border-gray-200 border-gray-800 hover:bg-gray-800',
    disabled:
      'text-gray-100 bg-gray-600 rounded-md border border-gray-200 border-gray-800 cursor-not-allowed',
  };

  const baseStyle =
    'inline-flex items-center justify-center px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900';

  const variantStyle = buttonVariants[variant];

  return `${baseStyle} ${variantStyle}`;
};

type ButtonVariant = 'primary' | 'secondary' | 'disabled';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
  loading?: boolean;
}

const CustomButton = ({ variant = 'primary', children, loading, ...rest }: Props) => {
  const disabled = rest.disabled || loading;
  return (
    <button className={getButtonStyles(disabled ? 'disabled' : variant)} {...rest}>
      {children}
    </button>
  );
};

export default CustomButton;

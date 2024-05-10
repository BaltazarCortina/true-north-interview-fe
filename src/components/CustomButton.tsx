export const getButtonStyles = (variant: ButtonVariant) => {
  const buttonVariants = {
    primary: 'text-gray-900 bg-gray-50 rounded-md hover:bg-gray-200',
    secondary:
      'text-gray-100 bg-gray-950 rounded-md border border-gray-200 border-gray-800 hover:bg-gray-800',
  };

  const baseStyle =
    'inline-flex items-center justify-center px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900';

  const variantStyle = buttonVariants[variant];

  return `${baseStyle} ${variantStyle}`;
};

type ButtonVariant = 'primary' | 'secondary';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
}

const CustomButton = ({ variant = 'primary', children, ...rest }: Props) => {
  return (
    <button className={getButtonStyles(variant)} {...rest}>
      {children}
    </button>
  );
};

export default CustomButton;

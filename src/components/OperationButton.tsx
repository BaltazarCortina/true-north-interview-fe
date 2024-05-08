import { OperationType } from '@/types/operation';
import { Button } from '@mui/material';

interface OperationButtonProps {
  selected: OperationType | undefined;
  setOperation: (operation: OperationType) => void;
  type: OperationType;
  children: React.ReactNode;
  label?: string;
}

const OperationButton = ({
  selected,
  setOperation,
  type,
  children,
  label,
}: OperationButtonProps) => {
  return (
    <Button
      variant={selected === type ? 'text' : 'outlined'}
      onClick={() => setOperation(type)}
      className={selected === type ? 'bg-gray-200' : ''}
      title={label}
    >
      {children}
    </Button>
  );
};

export default OperationButton;

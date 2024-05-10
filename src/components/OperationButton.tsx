import { OperationType } from '@/types/operation';
import { getButtonStyles } from './CustomButton';
import { MouseEvent } from 'react';

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
  const variant = selected === type ? 'secondary' : 'primary';

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    setOperation(type);
  };

  return (
    <button className={getButtonStyles(variant)} onClick={handleClick} title={label}>
      {children}
    </button>
  );
};

export default OperationButton;

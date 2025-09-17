
import { Control, FieldValues, Path } from 'react-hook-form';
import { IconType } from 'react-icons';

export interface IFormDateProps<T extends FieldValues = FieldValues> {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  className?: string;
  name: Path<T>;
  control?: Control<T>;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  id?: string;
  icon?: IconType;
  labelIcon?: IconType;
  required?: boolean;
  sx?: object;
  errors?: string[];
}

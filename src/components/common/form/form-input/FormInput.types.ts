
import { Control, FieldValues, Path } from 'react-hook-form';
import { IconType } from 'react-icons';


export interface IFormInputProps<T extends FieldValues = FieldValues> {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  type?: string;
  className?: string;
  name: Path<T>;
  control?: Control<T>;
  placeholder?: string;
  disabled?: boolean;
  id?: string;
  icon?: IconType;
  labelIcon?: IconType;
  required?: boolean;
  sx?: object;
  errors?: string[];
  minRows?: number;
  maxRows?: number;
  multiline?: boolean;
  InputProps?: any;
}

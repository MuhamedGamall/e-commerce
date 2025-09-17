import { Control, FieldValues, Path } from 'react-hook-form';

export interface FormOtpProps<T extends FieldValues = FieldValues> {
  length?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  type?: string;
  className?: string;
  name: Path<T>;
  control?: Control<T>;
  placeholder?: string;
  disabled?: boolean;
  id?: string;
  required?: boolean;
  sx?: object;
  direction?: 'row' | 'column';
  errors?: string[];
  minRows?: number;
  maxRows?: number;
  multiline?: boolean;
}

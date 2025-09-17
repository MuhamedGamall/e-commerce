import { Control, FieldValues, Path } from 'react-hook-form';

export interface FormCheckboxProps<T extends FieldValues = FieldValues> {
  onChange?: (checked: boolean) => void;
  checked?: boolean;
  checkboxIcon?: React.ReactNode;
  name: Path<T>;
  control?: Control<T>;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  id?: string;
  required?: boolean;
  sx?: object;
  direction?: 'row' | 'column';
  errors?: string[];
}

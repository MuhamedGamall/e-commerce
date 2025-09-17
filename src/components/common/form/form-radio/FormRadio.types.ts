import { Control, FieldValues, Path } from 'react-hook-form';
import { Option } from '../form-control/FormControl.types';

export interface FormRadioProps<T extends FieldValues = FieldValues> {
  name: Path<T>;
  control?: Control<T>;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  id?: string;
  required?: boolean;
  sx?: object;
  direction?: 'row' | 'column';
  options?: Option[];
  errors?: string[];
}

import { Control, FieldValues, Path } from 'react-hook-form';
import { IconType } from 'react-icons';

export interface IFormEditorProps<T extends FieldValues = FieldValues> {
  onChange?: (value: string) => void;
  value?: string;
  type?: string;
  className?: string;
  name: Path<T>;
  control?: Control<T>;
  placeholder?: string;
  disabled?: boolean;
  id?: string;
  labelIcon?: IconType;
  required?: boolean;
  InputProps?: any;
  toolbar?: string[];
}

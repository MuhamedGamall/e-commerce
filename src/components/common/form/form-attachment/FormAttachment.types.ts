import { Control, FieldValues, Path } from 'react-hook-form';
import { IconType } from 'react-icons';

export interface FormAttachmentProps<T extends FieldValues = FieldValues> {
  onChange?: (files: File | File[] | null) => void;
  value?: File | File[] | null;
  accept?: string;
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
  multiple?: boolean;
  className?: string;
}

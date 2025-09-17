import { ReactNode } from 'react';
import { Control, FieldValues, Path } from 'react-hook-form';
import { ZodType } from 'zod';
import { IconType } from 'react-icons';

export type FormInputTypes =
  | 'text'
  | 'email'
  | 'select'
  | 'textarea'
  | 'submit'
  | 'number'
  | 'search'
  | 'tel'
  | 'url'
  | 'password'
  | 'otp'
  | 'checkbox'
  | 'switch'
  | 'radio'
  | 'file'
  | 'date'
  | 'editor'
  | 'dropzone'
  | 'hidden';

export interface Option {
  value: string;
  label: string;
  id: string;
  disabled?: boolean;
}
export interface IFormFieldProps<T extends FieldValues = FieldValues> {
  name: Path<T>;
  control?: Control<T>;
  type: FormInputTypes;
  placeholder?: string;
  disabled?: boolean;
  id?: string;
  icon?: IconType;
  minRows?: number;
  maxRows?: number;
  multiline?: boolean;
  labelIcon?: IconType;
  required?: boolean;
  sx?: object;
  direction?: 'row' | 'column';
  options?: Option[];
  errors?: string[];
}

export interface IFormField<T extends FieldValues = FieldValues> extends IFormFieldProps<T> {
  [field: string]: any;
}

export interface IFormControlProps<T extends FieldValues = FieldValues> {
  initialValues?: Partial<T>;
  validationSchema?: ZodType<T> | any;
  fields: Array<IFormField<T>> | any;
  isLoading?: boolean;
  submitLabel?: string;
  cancelLabel?: string;
  onCancel?: () => void;
  onSubmit: (values: T) => void;
  cancelIcon?: ReactNode;
  submitIcon?: ReactNode;
  cancelButtonIconPosition?: 'start' | 'end';
  submitButtonIconPosition?: 'start' | 'end';
  sx?: object;
  size?: 'sm' | 'md' | 'lg';
}

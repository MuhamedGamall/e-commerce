import { Control, FieldValues, Path } from "react-hook-form";
import { IconType } from "react-icons";

export interface IFormDropzoneProps<T extends FieldValues = FieldValues> {
  accept?: { [key: string]: string[] };
  contentLabel?: string;
  type?: string;
  className?: string;
  name: Path<T>;
  control?: Control<T>;
  placeholder?: string;
  disabled?: boolean;
  id?: string;
  labelIcon?: IconType;
  uploadIcon?: any;
  uploadedIcon: any;
  maxFiles?: number;
  required?: boolean;
  sx?: object;
}

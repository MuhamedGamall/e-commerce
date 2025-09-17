import { FieldValues, Path, Control } from "react-hook-form";
import { Option } from "../form-control/FormControl.types";
import { IconType } from "react-icons";

export interface IFormSelectProps<T extends FieldValues = FieldValues> {
  onChange?: (value: string[] | string) => void;
  value?: string[];
  multiple?: boolean;
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
  options?: Option[];
  errors?: string[];
}

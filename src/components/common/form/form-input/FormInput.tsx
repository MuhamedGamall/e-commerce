import { TextField, InputAdornment } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import { IFormInputProps } from "./FormInput.types";

const FormInput = ({
  name,
  control,
  icon: Icon,
  sx,
  onChange,
  value,
  id,
  ...rest
}: IFormInputProps) => {
  const renderInput = (
    value: string | undefined,
    onChange: ((...event: any[]) => void) | undefined,
    error?: boolean,
    errorMessage?: string
  ) => (
    <TextField
      id={id}
      name={name}
      value={value ?? ""}
      onChange={rest?.disabled ? undefined : onChange}
      className={"form-field"}
      sx={{ input: { color: "#595959", fontWeight: "100" }, ...sx }}
      error={error}
      helperText={errorMessage}
      InputProps={{
        endAdornment: Icon ? (
          <InputAdornment position="end">
            <Icon size={20} />
          </InputAdornment>
        ) : null,
      }}
      {...rest}
      label=""
    />
  );
  return control ? (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) =>
        renderInput(
          field.value,
          field.onChange,
          !!fieldState.error,
          fieldState.error?.message
        )
      }
    />
  ) : (
    renderInput(value, onChange)
  );
};

export default FormInput;

import { TextField, InputAdornment } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import { IFormDateProps } from "./FormDate.types";

const FormDate = ({
  name,
  control,
  icon: Icon,
  sx,
  onChange,
  value,
  id,
  ...rest
}: IFormDateProps) => {
  const today = new Date().toISOString().split("T")[0];
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
      onChange={onChange}
      className={"form-field"}
      sx={{ input: { color: "#595959", fontWeight: "100" }, ...sx }}
      error={error}
      helperText={errorMessage}
      inputProps={{
        max: today,
      }}
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

export default FormDate;

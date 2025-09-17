import {
  Box,
  Radio,
  RadioGroup,
  FormLabel,
  FormHelperText,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { FormRadioProps } from "./FormRadio.types";

export default function FormRadio({
  name,
  control,
  options,
  disabled = false,
  direction = "row",
}: FormRadioProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Box>
          <RadioGroup
            name={name}
            value={field.value ?? ""}
            onChange={(e) => field.onChange(e.target.value)}
            row={direction === "row"}
            sx={{
              width: "fit-content",
              display: direction === "row" ? "flex" : "",
              gap: direction === "row" ? "16px" : "",
            }}
          >
            {options?.map(({ value, label, disabled: optionDisabled, id }) => (
              <Box
                key={value}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  cursor: optionDisabled ? "not-allowed" : "pointer",
                  width: "fit-content",
                }}
              >
                <Radio
                  id={`radio-${value}-${id}`}
                  value={value}
                  disabled={optionDisabled || disabled}
                  className={"form-radio"}
                />
                <FormLabel
                  htmlFor={`radio-${value}-${id}`}
                  sx={{
                    cursor: optionDisabled ? "not-allowed" : "pointer",
                    fontSize: "14px !important",
                    fontWeight: 400,
                  }}
                >
                  {label}
                </FormLabel>
              </Box>
            ))}
          </RadioGroup>

          {!!fieldState.error && (
            <FormHelperText error>{fieldState.error?.message}</FormHelperText>
          )}
        </Box>
      )}
    />
  );
}

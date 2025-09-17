import { Box, FormHelperText } from "@mui/material";
import { ForwardRefExoticComponent } from "react";
import { Controller } from "react-hook-form";
import { FormOtpProps } from "./FormOtp.types";

import { MuiOtpInput } from "mui-one-time-password-input";


const OtpInput = MuiOtpInput as ForwardRefExoticComponent<any>;

const FormOtp = (props: FormOtpProps) => {
  const { name, control, length = 5, sx, disabled = false } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Box>
          <OtpInput
            type="text"
            sx={{ input: { color: "#595959", fontWeight: "100", ...sx } }}
            TextFieldsProps={{ placeholder: "-", disabled }}
            {...field}
            length={length}
            className={`form-otp ${fieldState.error ? "form-otp-error" : ""}`}
            disabled={disabled}
          />
          {!!fieldState.error && (
            <FormHelperText error>{fieldState.error?.message}</FormHelperText>
          )}
        </Box>
      )}
    />
  );
};

export default FormOtp;

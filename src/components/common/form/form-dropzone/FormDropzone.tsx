import { Controller } from "react-hook-form";
import Dropzone from "../../Dropzone";
import { IFormDropzoneProps } from "./FormDropzone.types";
import { Box, FormHelperText } from "@mui/material";

const FormDropzone = ({
  name,
  control,
  sx,
  className,
  ...rest
}: IFormDropzoneProps) => {
  return (
    <Box
      component={"div"}
      sx={{ width: "100%", ...sx }}
      className={`form-dropzone ${className}`}
    >
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <Dropzone
              {...rest}
              name={name}
              initialValues={value}
              onFilesSelected={(files) => {
                onChange(files);
              }}
            />
            {!!error?.message && (
              <FormHelperText
                variant="filled"
                sx={{ color: "#DC362E" }}
                error={!!error}
              >
                {error?.message}
              </FormHelperText>
            )}
          </>
        )}
      />
    </Box>
  );
};

export default FormDropzone;

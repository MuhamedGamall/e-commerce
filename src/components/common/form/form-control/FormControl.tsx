import { zodResolver } from "@hookform/resolvers/zod";
import { Box, FormLabel } from "@mui/material";
import { useForm } from "react-hook-form";
import { CustomButton } from "../../CustomButton";
import { IFormControlProps, IFormField } from "./FormControl.types";
import FormField from "../form-field/FormField";

export default function FormControl({
  initialValues,
  validationSchema,
  fields,
  isLoading,
  submitLabel,
  cancelLabel,
  onCancel,
  onSubmit,
  cancelIcon,
  submitIcon,
  cancelButtonIconPosition,
  submitButtonIconPosition,
  sx,
  size = "sm",
}: IFormControlProps) {
  const { control, handleSubmit, formState } = useForm({
    defaultValues: initialValues,
    ...(validationSchema ? { resolver: zodResolver(validationSchema) } : {}),
  });

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ display: "flex", flexDirection: "column", gap: "24px", ...sx }}
    >
      <div className={`form-box-${size}`}>
        {fields.length > 0 &&
          fields.map((field: IFormField, index: number) => {
            const { id, label, name, type, required, ...rest } = field;
            return (
              <Box key={name || index} className={`form-control ${type}`}>
                {label && (
                  <FormLabel
                    htmlFor={id || name}
                    className="form-control form-label"
                    sx={{
                      ...(!["switch", "checkbox"].includes(type)
                        ? {
                            marginBottom: "6px",
                            fontSize: "16px !important",
                            fontColor: "#667085",
                            fontWeight: 500,
                          }
                        : {}),
                      display: "block",
                    }}
                  >
                    {label}
                    {required && <span className="required">*</span>}
                  </FormLabel>
                )}

                <FormField
                  id={id || name}
                  disabled={isLoading || formState.isSubmitting}
                  control={control}
                  {...field}
                  type={type}
                />
              </Box>
            );
          })}
      </div>
      {(submitLabel || cancelLabel) && (
        <Box className="form-buttons">
          {cancelLabel && (
            <CustomButton
              name="cancel"
              type="button"
              variantStyle="outlined"
              size={submitLabel && cancelLabel ? "small" : "large"}
              disabled={isLoading || formState.isSubmitting}
              onClick={onCancel}
              buttonIcon={cancelIcon}
              buttonIconPosition={cancelButtonIconPosition}
            >
              {cancelLabel}
            </CustomButton>
          )}
          {submitLabel && (
            <CustomButton
              name="submit"
              type="submit"
              size={submitLabel && cancelLabel ? "small" : "large"}
              disabled={isLoading || formState.isSubmitting}
              buttonIcon={submitIcon}
              buttonIconPosition={submitButtonIconPosition}
            >
              {submitLabel}
            </CustomButton>
          )}
        </Box>
      )}
    </Box>
  );
}

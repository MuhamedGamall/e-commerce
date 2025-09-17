import React from "react";
import { Controller } from "react-hook-form";
import { TextField, InputLabel } from "@mui/material";

import { FormAttachmentProps } from "./FormAttachment.types";

export function FormAttachment({
  name,
  control,
  value,
  onChange,
  multiple = false,
  accept = "*",
  disabled = false,
  id,
}: FormAttachmentProps) {
  const renderUploader = (
    currentValue: File | File[] | null | undefined,
    setValue: (val: any) => void,
    error?: boolean,
    errorMessage?: string
  ) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files: FileList | null = e?.target?.files;
      if (!files) return;

      const selectedFiles = Array.from(files);

      if (multiple) {
        setValue(selectedFiles);
      } else {
        setValue(selectedFiles[0] || null);
      }
    };
    const handleRemove = (index?: number) => {
      if (multiple && Array.isArray(currentValue)) {
        const updated = [...currentValue];
        updated.splice(index!, 1);
        setValue(updated);
      } else {
        setValue(null);
      }
    };

    const handleRemoveAll = () => {
      setValue(multiple ? [] : null);
    };

    const filesToDisplay = multiple
      ? (currentValue as File[]) ?? []
      : currentValue
      ? [currentValue as File]
      : [];
    return (
      <div className="form-file">
        <TextField
          id={id}
          type="file"
          className={`form-attachment`}
          name={name}
          inputProps={{ accept, multiple }}
          // InputProps={{
          //   endAdornment: (
          //     <InputAdornment position="end">
          //       {filesToDisplay?.length > 0 && (
          //         <CustomButton
          //           variantStyle="text"
          //           type="button"
          //           name="remove-all"
          //           onClick={handleRemoveAll}
          //           sx={{ height: "0px !important" }}
          //         >
          //           Clear
          //         </CustomButton>
          //       )}
          //     </InputAdornment>
          //   ),
          // }}
          error={error}
          helperText={errorMessage}
          disabled={disabled}
          onChange={handleChange}
          label=""
        />

        {filesToDisplay.length > 0 && (
          <div>
            <ul className="attachment-list">
              <InputLabel>
                Selected: {filesToDisplay.length}{" "}
                {filesToDisplay.length === 1 ? "file" : "files"}
              </InputLabel>
              {filesToDisplay.map((file: File, index: number) => (
                <li
                  key={index}
                  style={{
                    marginBottom:
                      index !== filesToDisplay.length - 1 ? "8px" : "",
                    marginInlineStart: "20px",
                  }}
                >
                  {typeof file === "object" ? file.name : file}
                  {/* <IconButton
                    name="remove-one"
                    type="button"
                    onClick={() => handleRemove(index)}
                  >
                    <Image
                      src="/icons/x-icon.svg"
                      alt="x-icon"
                      width={14}
                      height={14}
                    />
                  </IconButton> */}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  return control ? (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) =>
        renderUploader(
          field.value,
          field.onChange,
          !!fieldState.error,
          fieldState.error?.message
        )
      }
    />
  ) : (
    renderUploader(value, onChange ?? (() => {}))
  );
}

export default FormAttachment;

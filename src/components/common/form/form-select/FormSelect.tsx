import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { FormLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { Controller } from "react-hook-form";
import { FormCheckbox } from "../form-checkbox";
import { IFormSelectProps } from "./FormSelect.types";
import { FormHelperText } from "@mui/material";

export default function FormSelect({
  name,
  control,
  options = [],
  disabled = false,
  placeholder,
  onChange,
  value,
  id,
  required = false,
  multiple = false,
}: IFormSelectProps) {
  const handleChange = (event: SelectChangeEvent<any>) => {
    const selectedValue = event.target.value;
    if (onChange) {
      onChange(
        multiple
          ? typeof selectedValue === "string"
            ? selectedValue.split(", ")
            : selectedValue
          : selectedValue
      );
    }
  };

  const renderSelect = (
    value?: string[] | string,
    onChange?: (...event: any[]) => void,
    error?: boolean,
    errorMessage?: string
  ) => {
    return (
      <>
        <Select
          id={id}
          name={name}
          displayEmpty
          value={multiple ? value ?? [] : value ?? ""}
          onChange={!!control ? onChange : handleChange}
          disabled={disabled}
          className={`form-select long-border`}
          multiple={multiple}
          renderValue={(selected) => {
            if (multiple && Array.isArray(selected)) {
              if (selected.length === 0 && placeholder) return placeholder;
              const displayValue = selected.join(", ");
              return displayValue.length > 30
                ? `${displayValue.slice(0, 30)}...`
                : displayValue;
            }
            return selected || placeholder || "None";
          }}
          error={!!control ? error : false}
          IconComponent={(props) => <KeyboardArrowDownIcon {...props} />}
        >
          {placeholder && (
            <MenuItem disabled value="" className="menu-title">
              {placeholder}
            </MenuItem>
          )}
          {!multiple && !required && options?.length > 0 && (
            <MenuItem value="">
              <FormLabel sx={{ cursor: "pointer" }}>None</FormLabel>
            </MenuItem>
          )}

          {options?.map(({ value: localVal, label, disabled, id }) => (
            <MenuItem
              key={localVal}
              value={localVal}
              disabled={disabled}
              id={id}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
              }}
            >
              <FormCheckbox
                name="checkbox"
                id={id}
                checked={
                  !!(multiple
                    ? (value as string[])?.includes(localVal)
                    : value === localVal)
                }
              />
              <FormLabel htmlFor={id} sx={{ cursor: "pointer" }}>
                {label}
              </FormLabel>
            </MenuItem>
          ))}
        </Select>

        {error && errorMessage && !!control && (
          <FormHelperText variant="filled" sx={{ color: "#DC362E" }}>
            {errorMessage}
          </FormHelperText>
        )}
      </>
    );
  };

  return control ? (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) =>
        renderSelect(
          field.value,
          field.onChange,
          !!fieldState.error,
          fieldState.error?.message
        )
      }
    />
  ) : (
    renderSelect(value, onChange)
  );
}

//@ts-nocheck
import { Box, Checkbox } from "@mui/material";
import { Controller } from "react-hook-form";
import { FormCheckboxProps } from "./FormCheckbox.types";
import CheckboxUnchecked from "../../../../assets/icons/CheckboxUnChecked.png";
import CheckboxChecked from "../../../../assets/icons/CheckboxChecked.png";
import { Image } from "../../Image";

export default function FormCheckbox({
  name,
  control,
  disabled = false,
  id,
  onChange,
  checked,
  checkboxIcon,
  sx,
}: FormCheckboxProps) {
  const renderCheckbox = (
    checked?: boolean,
    onChange?: (checked: boolean) => void
  ) => (
    <Box component="div" sx={{ ...sx }}>
      <Checkbox
        id={id}
        name={name}
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
        disabled={disabled}
        className="form-checkbox"
        icon={
          checkboxIcon || (
            <Image
              src={CheckboxUnchecked}
              alt="Unchecked"
              width={24}
              height={24}
              style={{
                backdropFilter: disabled ? "contrast(.7)" : "",
                borderRadius: "8px",
              }}
            />
          )
        }
        checkedIcon={
          <Image src={CheckboxChecked} alt="Checked" width={24} height={24} />
        }
      />
    </Box>
  );

  return control ? (
    <Controller
      name={name}
      control={control}
      render={({ field }) => renderCheckbox(field.value, field.onChange)}
    />
  ) : (
    renderCheckbox(checked, onChange)
  );
}

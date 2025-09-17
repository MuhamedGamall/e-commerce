import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import Switch, { SwitchProps } from "@mui/material/Switch";
import { Controller } from "react-hook-form";
import { FormSwitchProps } from "./FormSwitch.types";

const CustomSwitch = styled(
  ({ error, ...rest }: SwitchProps & { error?: boolean }) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...rest} />
  )
)(({ theme, error }) => ({
  width: 44,
  height: 24,
  padding: 0,
  borderRadius:'30px',
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",

    "&.Mui-checked": {
      transform: "translateX(20px)",
      color: "#fff",

      "& + .MuiSwitch-track": {
        backgroundColor: "#192a56",
        opacity: 1,
        border: 0,
        ...theme.applyStyles?.("dark", {
          backgroundColor: "#192a56",
        }),
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },

    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#192a56",
      border: "6px solid #fff",
    },

    "&.Mui-disabled .MuiSwitch-thumb": {
      color: theme.palette.grey[100],
      ...theme.applyStyles?.("dark", {
        color: theme.palette.grey[600],
      }),
    },

    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: 0.7,
      ...theme.applyStyles?.("dark", {
        opacity: 0.3,
      }),
    },
  },

  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 20,
    height: 20,
    boxShadow: '-4px 0px 7.7px 0px #401E0033',
    transition: theme.transitions.create(["background-color", "box-shadow"], {
      duration: 300,
    }),
  },

  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: "#E9E9EA",
    border: error ? "1px solid #DC362E" : "",

    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
    ...theme.applyStyles?.("dark", {
      backgroundColor: "#39393D",
    }),
  },
}));

export default function FormSwitch({
  name,
  control,
  disabled = false,
  id,
  onChange,
  checked,
}: FormSwitchProps) {
  const renderSwitch = (
    checked?: boolean,
    onChange?: (checked: boolean) => void,
    error?: boolean
  ) => (
    <Box component="div">
      <CustomSwitch
        id={id}
        name={name}
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
        disabled={disabled}
        error={error}
        className="form-switch"
      />
    </Box>
  );

  return control ? (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) =>
        renderSwitch(field.value, field.onChange, !!fieldState.error)
      }
    />
  ) : (
    renderSwitch(checked, onChange)
  );
}

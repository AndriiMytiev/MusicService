import { styled, TextField, TextFieldProps, useTheme } from "@mui/material";
import { useState } from "react";

const StyledTextField = styled(TextField)<TextFieldProps>(({ theme }) => ({
  "& label": {
    color: theme.palette.text.primary,
  },
  "& label.Mui-focused": {
    color: theme.palette.warning.main,
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderWidth: "0.01vmin",
      borderColor: theme.palette.warning.main,
    },
    "&:hover fieldset": {
      borderColor: theme.palette.warning.main,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.warning.main,
    },
  },
}));

const CustomTextField = (props: TextFieldProps) => {
  const {
    palette: {
      text: { primary: textPrimary },
    },
  } = useTheme();

  const [shouldDisplayIcon, setShouldDisplayIcon] = useState(false);

  const handleFocus = (
    e: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement, Element>,
  ) => {
    if (props.InputProps?.startAdornment) {
      setShouldDisplayIcon(true);
    }
    props.onFocus?.(e);
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement, Element>,
  ) => {
    if (props.InputProps?.startAdornment) {
      if (e.target.value === "") {
        setShouldDisplayIcon(false);
      }
    }
    props.onBlur?.(e);
  };

  return (
    <StyledTextField
      {...props}
      sx={{
        marginY: 1,
        "& :-webkit-autofill": {
          WebkitBoxShadow: `0 0 0 1000px black inset`,
          WebkitTextFillColor: textPrimary,
        },
      }}
      size="small"
      fullWidth
      autoComplete="off"
      onFocus={handleFocus}
      onBlur={handleBlur}
      InputProps={{
        ...props.InputProps,
        startAdornment: shouldDisplayIcon
          ? props.InputProps?.startAdornment
          : null,
      }}
    />
  );
};

export default CustomTextField;

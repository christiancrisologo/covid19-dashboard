import React from "react";
import { TextField } from "@material-ui/core";

export default ({
    name,
    value = "",
    label = "",
    helperText = "",
    error = false,
    required = false,
    margin = "normal",
    fullWidth = true,
    variant = "outlined",
    InputLabelProps = null,
    ...rest
}) => (
    <TextField
        {...rest}
        InputLabelProps={{ ...InputLabelProps }} // remove * in required label
        label={label}
        name={name}
        value={value}
        fullWidth={fullWidth}
        error={!!error}
        helperText={helperText || error} // show Required label in helperText by default
        margin={margin}
        required={required}
        variant={variant}
    />
);

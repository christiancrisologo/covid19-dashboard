import React from "react";
import { Tooltip, IconButton } from "@material-ui/core";

export default function ({ onClick, hasToolTip, children, ...rest }) {
    return hasToolTip ? (
        <Tooltip {...rest}>
            <IconButton onClick={onClick}>{children}</IconButton>
        </Tooltip>
    ) : (
        <IconButton onClick={onClick} {...rest}>
            {children}
        </IconButton>
    );
}

import React from "react";
import { CircularProgress, Box } from "@material-ui/core";

export default function ({ ...props }) {
    return (
        <Box display="flex" justifyContent="center" mt={8} mb={4} {...props}>
            <CircularProgress size={52} color="primary" />
        </Box>
    );
}

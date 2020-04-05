import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";
import Dashboard from "Dashboard";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Dashboard />
        </ThemeProvider>
    );
}

export default App;

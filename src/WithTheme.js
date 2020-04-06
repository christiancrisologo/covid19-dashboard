import React from "react";
import { MuiThemeProvider, createMuiTheme, CssBaseline, colors } from "@material-ui/core";

// default MUI colors
import { colors as muiColors } from "@material-ui/core";

// global colors with application primary and secondary colors setup
export const commonColors = {
    ...muiColors,
    tint5: "rgba(255, 255, 255, 0.95)",
    tint10: "rgba(255, 255, 255, 0.9)",
    tint20: "rgba(255, 255, 255, 0.8)",
    tint30: "rgba(255, 255, 255, 0.7)",
    tint40: "rgba(255, 255, 255, 0.6)",
    tint50: "rgba(255, 255, 255, 0.5)",
    tint60: "rgba(255, 255, 255, 0.4)",
    tint70: "rgba(255, 255, 255, 0.3)",
    tint80: "rgba(255, 255, 255, 0.2)",
    tint90: "rgba(255, 255, 255, 0.1)",
    tint100: "rgba(255, 255, 255, 0)",
    shade2: "rgba(0, 0, 0, 0.02)",
    shade5: "rgba(0, 0, 0, 0.05)",
    shade10: "rgba(0, 0, 0, 0.1)",
    shade20: "rgba(0, 0, 0, 0.2)",
    shade30: "rgba(0, 0, 0, 0.3)",
    shade40: "rgba(0, 0, 0, 0.4)",
    shade50: "rgba(0, 0, 0, 0.5)",
    shade60: "rgba(0, 0, 0, 0.6)",
    shade70: "rgba(0, 0, 0, 0.7)",
    shade80: "rgba(0, 0, 0, 0.8)",
    shade90: "rgba(0, 0, 0, 0.9)",
    shade100: "rgba(0, 0, 0, 1)",
    errorColor: "#F5222D",
    warningColor: "#FAAD14",
    successColor: "#4CAF50",
    infoColor: "#2979FF",
    textPrimaryColor: "rgba(0, 0, 0, 0.9)",
    textSecondaryColor: "rgba(0, 0, 0, 0.6)",
    textDisabledColor: "rgba(0, 0, 0, 0.3)",
    borderColor: "rgba(0, 0, 0, 0.3)",
    primaryColors: colors.red,
    secondaryColors: colors.amber,
    invertedTextColor: "#fff",
    errorBackgroundColor: "rgba(245, 34, 45, 0.1)",
    warningBackgroundColor: "rgba(250, 173, 20, 0.1)",
    successBackgroundColor: "rgba(76, 175, 80, 0.1)",
    infoBackgroundColor: "rgba(41, 121, 255, 0.1)",
};

const buttonStyle = {
    textTransform: "uppercase",
    fontWeight: 600,
    letterSpacing: "0.75px",
};

const fontFamily = [
    "Raleway",
    "Roboto",
    "-apple-system",
    "BlinkMacSystemFont",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
];

export const defaultTheme = {
    palette: {
        ...commonColors,
        primary: {
            ...colors.red,
            light: colors.red[200],
            main: colors.red[500],
            dark: colors.red[700],
        },
        secondary: {
            ...colors.yellow,
            light: colors.yellow[200],
            main: colors.yellow[500],
            dark: colors.yellow[700],
        },
        divider: colors.shade10,
        errorColors: colors.red,
        warningColors: colors.orange,
        successColors: colors.green,
        infoColors: colors.blue,
    },
    overrides: {
        MuiFormControl: {
            marginNormal: {
                marginBottom: 8,
                marginTop: 14,
            },
        },
        MuiInputBase: {
            root: {
                background: colors.grey[50],
                "&.Mui-focused": {
                    background: colors.red[50],
                },
            },
        },
        MuiAppBar: {
            root: {
                boxShadow: "unset",
            },
            colorPrimary: {
                color: colors.common.white,
                backgroundColor: colors.red[400],
            },
        },
        MuiButton: {
            root: buttonStyle,
            contained: {
                boxShadow: "none",
                "&$focusVisible": {
                    boxShadow: "none",
                },
                "&:active": {
                    boxShadow: "none",
                },
                "&$disabled": {
                    boxShadow: "none",
                },
            },
            textPrimary: {
                backgroundColor: colors.common.white,
                "&:hover": {
                    backgroundColor: colors.red[50],
                },
            },
        },
        MuiTable: {
            root: {
                backgroundColor: colors.grey[50],
            },
        },
        MuiTableHead: {
            root: {
                backgroundColor: colors.shade10,
                height: 56,
            },
        },
        MuiTableRow: {
            root: {
                height: 56,
                "&:nth-of-type(odd)": {
                    backgroundColor: "rgba(0,0,0,0.02)",
                },
                "&$selected": {
                    backgroundColor: colors.red[50],
                    cursor: "pointer",
                },
                "&$hover:hover": {
                    backgroundColor: colors.red[50],
                    cursor: "pointer",
                },
            },
        },
        MuiTableCell: {
            root: {
                padding: "0 16px",
            },
            head: {
                fontSize: 14,
                fontWeight: "normal",
                color: colors.shade90,
            },
            body: {
                fontSize: 14,
                fontWeight: "normal",
            },
        },
        MuiMenuItem: {
            root: {
                "&$selected": {
                    backgroundColor: `${colors.red[50]}`,
                },
            },
        },
        MuiSelect: {
            selectMenu: {
                height: 19,
            },
            icon: {
                marginRight: 8,
                color: colors.red,
                fill: colors.red,
            },
        },
        MuiTablePagination: {
            select: {
                height: "auto",
            },
            selectIcon: {
                marginRight: 0,
            },
        },
        MuiCard: {
            root: {
                boxShadow:
                    "0px 1px 3px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.12), 0px 0px 2px rgba(0, 0, 0, 0.14)",
                backgroundColor: colors.grey[50],
                padding: "0 16px",
                margin: 1,
            },
        },
        MuiTab: {
            root: {
                "&$selected": {
                    backgroundColor: `${colors.red[50]}`,
                },
            },
        },
        MuiTabs: {
            scrollButtons: {
                color: colors.red[500],
            },
            indicator: {
                borderRadius: "2px",
                height: 3,
                color: colors.red,
            },
            flexContainer: {
                paddingBottom: 1,
            },
        },
        MuiDialogTitle: {
            root: {
                fontSize: 14,
                lineHeight: "20px",
                fontWeight: 600,
                letterSpacing: "0.25px",
            },
        },
        MuiCardHeader: {
            root: {
                minHeight: 56,
                borderBottom: `1px solid ${colors.shade10}`,
                alignItems: "center",
                padding: "4px 0",
            },
            title: {
                fontSize: 14,
                lineHeight: "20px",
                fontWeight: 600,
                letterSpacing: "0.25px",
            },
            subheader: {
                fontSize: 14,
            },
            action: {
                margin: "0 !important",
                alignSelf: "unset",
            },
        },
        MuiCardContent: {
            root: {
                margin: "0 -16px",
            },
        },
        MuiCardActions: {
            root: {
                height: 56,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: colors.common.white,
                borderTop: `1px solid ${colors.shade10}`,
                margin: "0 -16px",
            },
        },
        MuiOutlinedInput: {
            root: {
                borderColor: colors.borderColor,
                background: colors.shade2,
            },
        },
        MuiFormHelperText: {
            root: {
                color: colors.shade30,
            },
        },
        MuiListItem: {
            button: {
                "&:hover": {
                    backgroundColor: colors.red[100],
                },
            },
        },
        MuiCheckbox: {
            colorPrimary: {
                color: colors.red[500],
                "&$checked": {
                    color: colors.red[600],
                },
            },
        },
        MuiRadio: {
            colorPrimary: {
                color: colors.red[500],
                "&$checked": {
                    color: colors.red[500],
                },
            },
        },
        MuiTypography: {
            body1: {
                fontSize: 18,
                lineHeight: "28px",
                letterSpacing: "0.5px",
            },
            body2: {
                fontSize: 14,
                lineHeight: "20px",
                letterSpacing: "0.25px",
            },
            caption: {
                fontSize: 12,
                lineHeight: "16px",
                letterSpacing: "0.4px",
            },
            button: buttonStyle,
            h1: {
                fontFamily: ["'Baloo Paaji 2'", ...fontFamily].join(","),
                fontSize: 96,
                fontWeight: 600,
                lineHeight: "115px",
                letterSpacing: "-1.5px",
            },
            h2: {
                fontFamily: ["Baloo Paaji 2", ...fontFamily].join(","),
                fontSize: 60,
                fontWeight: 400,
                lineHeight: "72px",
                letterSpacing: "-0.5px",
            },
            h3: {
                fontFamily: ["Baloo Paaji 2", ...fontFamily].join(","),
                fontSize: 48,
                fontWeight: 400,
                lineHeight: "58px",
                letterSpacing: 0,
            },
            h4: {
                fontFamily: ["Baloo Paaji 2", ...fontFamily].join(","),
                fontSize: 34,
                fontWeight: 400,
                lineHeight: "41px",
                letterSpacing: "0.25px",
            },
            h5: {
                fontFamily: ["Baloo Paaji 2", ...fontFamily].join(","),
                fontSize: 24,
                fontWeight: 400,
                lineHeight: "29px",
                letterSpacing: 0,
            },
            h6: {
                fontFamily: ["'Baloo Paaji 2'", ...fontFamily].join(","),
                fontSize: 20,
                fontWeight: 400,
                lineHeight: "24px",
                letterSpacing: "0.15px",
            },
        },
    },
    typography: {
        useNextVariants: true,
        fontFamily: fontFamily.join(","),
    },
};

export default function ({ children, theme = defaultTheme }) {
    return (
        <MuiThemeProvider theme={createMuiTheme(theme)}>
            <CssBaseline />
            {children}
        </MuiThemeProvider>
    );
}

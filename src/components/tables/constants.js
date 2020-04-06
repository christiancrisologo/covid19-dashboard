export const OPERATOR = {
    NONE: "None",
    EQUALS: "Equals",
    NOT_EQUALS: "Not Equals",
    CONTAINS: "Contains",
    NOT_CONTAINS: "Not contains",
    STARTS_WITH: "Starts with",
    NOT_STARTS_WITH: "Not starts with",
    ENDS_WITH: "Ends with",
    NOT_ENDS_WITH: "Not ends with"
};

export const OPERATORS = Object.values(OPERATOR).map(item => ({
    label: item,
    value: item
}));

export const EXPORT_ACTION = {
    CSV: "csv",
    PRINT: "print"
};

export const EXPORT_ACTION_SELECTION = {
    ALL: "all",
    CURRENT: "current"
};

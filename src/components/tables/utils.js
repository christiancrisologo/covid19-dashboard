import { makeStyles } from "@material-ui/core";
import { formatDate } from "utils/dateHelper";
import { OPERATOR } from "./constants";
import { escapeRegExpString, searchTest } from "utils/regex";

export function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

export function getLabel(value, dataType, fomatterFunc = null) {
    if (fomatterFunc) {
        return fomatterFunc(value);
    }
    if (dataType === "date") {
        return formatDate(value, false);
    }
    if (dataType === "number") {
        return value || 0;
    }
    return value || "";
}

export function getSorting(order, orderBy) {
    return order === "desc"
        ? (a, b) => desc(a, b, orderBy)
        : (a, b) => -desc(a, b, orderBy);
}

export const useTableStyles = makeStyles((theme) => ({
    tableWrapper: {
        width: "100%",
        height: "auto",
        overflowX: "auto",
    },
    table: {
        tableLayout: "auto",
        overflow: "auto",
        width: "100%",
        "& .MuiTableCell-stickyHeader": {
            background: theme.palette.secondaryColors[300],
        },
    },
    tableBody: {
        minHeight: theme.spacing(15),
    },
    visuallyHidden: {
        border: 0,
        clip: "rect(0 0 0 0)",
        height: 1,
        margin: -1,
        overflow: "hidden",
        padding: 0,
        position: "absolute",
        top: 20,
        width: 1,
    },
    tableRow: {
        color: theme.palette.shade30,

        "&:last-child": { paddingBottom: "0px !Important" },
        "&:hover": {
            boxShadow: "0px 2px 5px #ccc",
            zIndex: 2,
            backgroundColor: theme.palette.primaryColors[50] + "!important",
            "& .MuiTypography-root  ": {
                color: theme.palette.shade90 + "!important",
            },
        },
        "&.Mui-selected": {
            backgroundColor: theme.palette.primaryColors[50] + "!important",
            color: theme.palette.shade90 + "!important",
        },
    },
    tableText: {
        whiteSpace: "pre-wrap",
        textTransform: "capitalize",
        color: theme.palette.shade60,
    },
    footer: {
        height: theme.spacing(7),
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        paddingTop: theme.spacing(1),
    },
    input: {
        "& > .MuiOutlinedInput-root": {
            background: theme.palette.white,
        },
    },
    tableHeaderCell: {
        fontSize: theme.typography.caption.fontSize,
        paddingTop: 4,
        paddingBottom: 4,
    },
    published: {
        borderLeft: "solid 4px " + theme.palette.successColor,
    },
    unpublished: {
        borderLeft: "solid 4px " + theme.palette.errorColor,
    },
    draft: {
        borderLeft: "solid 4px " + theme.palette.primary.main,
    },
    defaultEmptyRow: {
        height: theme.spacing(30),
    },
    pointer: {
        cursor: "pointer",
    },
}));

export function getKey({ config, row, index = 0 }, prefix = "table-col-") {
    return `${prefix}-${config ? config.id : "-"}-${row ? row.id : "row"}-${index}`;
}

export function filterBySearchInput(array, searchValue, columns) {
    const searchInput = escapeRegExpString(searchValue);
    const searchables = columns.filter((item) => item.searchable);
    return searchInput.trim() // for search input filters
        ? array.filter((item) =>
              searchables.some(
                  (col) => item[col.id] && searchTest(searchInput, item[col.id])
              )
          )
        : array;
}

export function filterByOperators(items, columnFilters) {
    if (!columnFilters || !Object.keys(columnFilters).length) {
        return items;
    }
    let newItems = [...items];
    for (const key in columnFilters) {
        newItems = newItems.filter((item) => {
            const { operator, value } = columnFilters[key];
            const itemValue = item[key] ? item[key].toString().toLowerCase() : "";
            const filterValue = value.toString().toLowerCase() || "";

            if (!operator) {
                return true;
            }

            switch (operator) {
                case OPERATOR.CONTAINS: {
                    return itemValue.indexOf(filterValue) > -1;
                }
                case OPERATOR.NOT_CONTAINS: {
                    return itemValue.indexOf(filterValue) < 0;
                }
                case OPERATOR.EQUALS: {
                    return itemValue === filterValue;
                }
                case OPERATOR.NOT_EQUALS: {
                    return itemValue !== filterValue;
                }
                case OPERATOR.STARTS_WITH: {
                    return new RegExp("^" + filterValue, "ig").test(itemValue);
                }
                case OPERATOR.NOT_STARTS_WITH: {
                    return !new RegExp("^" + filterValue, "ig").test(itemValue);
                }
                case OPERATOR.ENDS_WITH: {
                    return new RegExp(filterValue + "$", "ig").test(itemValue);
                }
                case OPERATOR.NOT_ENDS_WITH: {
                    return !new RegExp(filterValue + "$", "ig").test(itemValue);
                }
                default: {
                    return true;
                }
            }
        });
    }
    return newItems;
}

const safeString = (str) => (str && `\"${str} \"`) || ""; //eslint-disable-line

export function exportToCSV(rows = [], columns, fileName) {
    const header = columns.map(({ label }) => safeString(label));
    const tableRows = rows.map((item) => {
        return columns.map((col) => {
            return safeString(item[col.id]);
        });
    });
    const blob = [header, ...tableRows].join("\n");
    const fileURL = URL.createObjectURL(
        new Blob([`\uFEFF${blob}`], {
            type: "text/csv;charset=utf-8;",
        })
    );
    const downloadLink = document.createElement("a");
    downloadLink.setAttribute("href", fileURL);
    downloadLink.setAttribute("id", "download");
    downloadLink.setAttribute("download", fileName);
    document.body.appendChild(downloadLink);
    downloadLink.click();
    URL.revokeObjectURL(fileURL);
}

const FIELD_HEIGHT = 56;

export const scrollToRef = (ref, el = null) => {
    const element = el || (ref && ref.current && ref.current);
    if (element && element.scrollIntoView) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
        window.scrollTo({
            top: element ? element.offsetTop - FIELD_HEIGHT : 0,
            behavior: "smooth",
        });
    }
};

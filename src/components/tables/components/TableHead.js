import React, { useCallback } from "react";
import cx from "clsx";
import {
    TableCell,
    TableHead as TableHeadBase,
    TableRow,
    TableSortLabel,
    Tooltip,
    makeStyles,
    Typography,
} from "@material-ui/core";
import ColumnFilterOptions from "./ColumnFilterOptions";

const useStyles = makeStyles((theme) => ({
    headerLabel: {
        overflow: "hidden",
        display: "-webkit-box",
        WebkitLineClamp: "3",
        WebkitBoxOrient: "vertical",
        maxWidth: "30ch",
        minWidth: "20ch",
    },
    th: {
        paddingTop: theme.spacing(2),
        verticalAlign: "top",
    },
}));

export default (props) => {
    const {
        order,
        orderBy,
        onRequestSort,
        columns,
        onColumnFilterChange,
        values,
    } = props;
    const classes = useStyles();
    const createSortHandler = useCallback(
        (property) => (event) => {
            onRequestSort(event, property);
        },
        [onRequestSort]
    );
    return (
        <TableHeadBase>
            <TableRow>
                {(columns || []).map((column, index) => (
                    <TableCell
                        key={`${column.id}-${index}`}
                        sortDirection={orderBy === column.id ? order : false}
                        width={column.width}
                        style={{
                            width: column.width,
                            ...column.style,
                        }}
                        className={cx(classes.th, column.className)}
                    >
                        {column.label && (
                            <>
                                <Tooltip
                                    title={
                                        (column.label || "").length > 50
                                            ? column.label
                                            : ""
                                    }
                                >
                                    <TableSortLabel
                                        active={orderBy === column.id}
                                        direction={order}
                                        onClick={createSortHandler(column.id)}
                                    >
                                        <Typography
                                            className={classes.headerLabel}
                                            variant="body2"
                                        >
                                            {column.label}
                                        </Typography>
                                    </TableSortLabel>
                                </Tooltip>
                                {column.filterOptions && (
                                    <ColumnFilterOptions
                                        name={column.id}
                                        values={
                                            (values[column.id] && values[column.id]) ||
                                            column.filterOptions.value
                                        }
                                        onChange={onColumnFilterChange}
                                        {...column.filterOptions}
                                    />
                                )}
                            </>
                        )}
                    </TableCell>
                ))}
            </TableRow>
        </TableHeadBase>
    );
};

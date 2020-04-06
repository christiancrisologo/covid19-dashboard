import React from "react";
import { TableCell, Typography } from "@material-ui/core";
import TableIcon from "./TableIcon";
import { getLabel, getKey } from "../utils";
import TextField from "components/TextField";

function Icon({ icon, column, ...rest }) {
    return (
        <TableIcon
            hasToolTip={column.hasToolTip}
            title={icon.label || ""}
            onClick={column.onClick}
            {...rest}
        >
            {icon.component}
        </TableIcon>
    );
}

export function TableCellIcon({ column, row, hoverItem, tableCellProps, index }) {
    return (
        <TableCell {...tableCellProps}>
            {column.icon &&
            ((column.showOnHoverFunc && column.showOnHoverFunc(hoverItem, row)) ||
                !column.showOnHoverFunc) ? (
                <Icon icon={column.icon} column={column} />
            ) : (
                <div></div>
            )}

            {((column.icons || []).length ? column.icons[row[column.id]] : []).map(
                (item, index) => (
                    <Icon
                        icon={item}
                        column={column}
                        key={getKey({ column, row, index }, "icon")}
                    />
                )
            )}

            {column.renderFunc &&
                column
                    .renderFunc(row)
                    .map((item, index) => (
                        <Icon
                            icon={item}
                            column={column}
                            key={getKey({ column, row, index }, "icon")}
                        />
                    ))}
        </TableCell>
    );
}

export function TableCellInput({
    column,
    row,
    errorRefs,
    classes,
    errors,
    onInputChange,
    tableCellProps,
    index,
}) {
    return (
        <TableCell {...tableCellProps}>
            <div ref={errorRefs && errorRefs.current[`${column.id}-${row.id}`]}></div>

            <TextField
                className={classes.input}
                label={(column.labelFunc && column.labelFunc(row)) || column.label || ""}
                value={getLabel(row[column.id], column.dataType, column.formatterFunc)}
                error={errors && errors[`${column.id}-${row.id}`]}
                name={`${column.id}-${row.id}`}
                required={!!column.required}
                onChange={(e) => onInputChange && onInputChange(e, column.id, row)}
            />
        </TableCell>
    );
}

export function TableCellCustom({ column, row, hoverItem, tableCellProps }) {
    return (
        <TableCell {...tableCellProps}>
            {(column.showCondition ? column.showCondition(row) : true) &&
            ((column.showOnHoverFunc && column.showOnHoverFunc(hoverItem, row)) ||
                !column.showOnHoverFunc) &&
            column.component ? (
                <column.component data={row} />
            ) : (
                <div />
            )}
            {column.renderFunc && column.renderFunc(row)}
        </TableCell>
    );
}

export default function ({ column, row, classes, tableCellProps }) {
    return (
        <TableCell {...tableCellProps}>
            <Typography variant="body2" className={classes.tableText}>
                {(column.labelFunc && column.labelFunc(row)) ||
                    getLabel(row[column.id], column.dataType, column.formatterFunc)}
            </Typography>
        </TableCell>
    );
}

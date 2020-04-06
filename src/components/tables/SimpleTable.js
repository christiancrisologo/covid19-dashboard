import React, {
    useCallback,
    useState,
    useEffect,
    useRef,
    createRef,
    useMemo,
} from "react";
import { Table, TableBody, TableRow, Paper } from "@material-ui/core";
import cx from "clsx";
import { stableSort, getSorting, useTableStyles, getKey, scrollToRef } from "./utils";
import {
    TableHead,
    TableCell,
    TableCellCustom,
    TableCellIcon,
    TableCellInput,
} from "./components";

export default ({
    columns,
    data = [],
    sortType = "asc",
    sortyBy,
    tableFooter,
    errors,
    errorRefs,
    onInputChange,
    className,
    tableClassName,
    tableWrapperClassName,
    rowClassName = "",
    rowIndicatorClassName = "",
    tableProps,
    onRowClick,
    selectedRow,
    sortFunc,
    emptyTableComponent,
}) => {
    const classes = useTableStyles();
    const rowRef = useRef(null);
    const tempRef = useRef(null);
    const [order, setOrder] = useState(sortType);
    const [orderBy, setOrderBy] = useState(sortyBy);
    const [hoverItem, setHoverItem] = useState(null);

    const onRequestSort = useCallback(
        (event, property) => {
            const isDesc = orderBy === property && order === "desc";
            setOrder(isDesc ? "asc" : "desc");
            setOrderBy(property);
        },
        [order, orderBy]
    );

    const sortedData = useMemo(() => {
        return (
            (sortFunc && sortFunc(data, order, orderBy)) ||
            stableSort(data, getSorting(order, orderBy))
        );
    }, [data, order, orderBy, sortFunc]);

    const onMouseOverHandler = useCallback((e, row) => {
        e.preventDefault();
        e.stopPropagation();
        setHoverItem(row);
    }, []);

    const rowClickHandler = useCallback(
        (e, row) => {
            e.preventDefault();
            e.stopPropagation();
            onRowClick && onRowClick(row);
        },
        [onRowClick]
    );

    useEffect(() => {
        if (selectedRow && selectedRow.id && rowRef.current) {
            scrollToRef(rowRef.current);
        }
    }, [selectedRow, rowRef.current]); // eslint-disable-line

    useEffect(() => {
        rowRef.current = createRef();
        tempRef.current = createRef();
        return function () {
            tempRef.current = null;
            rowRef.current = null;
        };
    }, []);

    return (
        <Paper className={cx(classes.root, className)}>
            <div className={cx(classes.tableWrapper, tableWrapperClassName)}>
                <Table
                    className={cx(classes.table, tableClassName)}
                    aria-labelledby="tableTitle"
                    size={"medium"}
                    {...tableProps}
                >
                    <TableHead
                        columns={columns}
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={onRequestSort}
                    />
                    <TableBody>
                        {(!data || !data.length) && (
                            <TableRow className={classes.defaultEmptyRow}>
                                {emptyTableComponent}
                            </TableRow>
                        )}
                        {sortedData.map((row, index) => {
                            return (
                                <TableRow
                                    ref={
                                        selectedRow && selectedRow.id === row.id
                                            ? rowRef.current
                                            : tempRef.current
                                    }
                                    tabIndex={-1}
                                    key={`table-id-${row.id}-${index}`}
                                    className={cx(
                                        classes.tableRow,
                                        classes[
                                            row[rowIndicatorClassName] || rowClassName
                                        ],
                                        !!onRowClick && classes.pointer
                                    )}
                                    onClick={(e) => rowClickHandler(e, row)}
                                    onMouseOver={(e) => onMouseOverHandler(e, row)}
                                    selected={selectedRow && selectedRow.id === row.id}
                                >
                                    {columns.map((column, columnIndex) => {
                                        const tableCellProps = {
                                            column,
                                            row,
                                            hoverItem,
                                            classes,
                                            index: columnIndex,
                                            errorRefs,
                                            onInputChange,
                                            errors,
                                        };
                                        if (column.cellRenderFunc) {
                                            return column.cellRenderFunc(tableCellProps);
                                        }
                                        const TableCellComponent =
                                            {
                                                input: TableCellInput,
                                                icon: TableCellIcon,
                                                custom: TableCellCustom,
                                            }[column.type] || TableCell;

                                        return (
                                            <TableCellComponent
                                                {...tableCellProps}
                                                key={getKey({ column, row, columnIndex })}
                                            />
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
            {tableFooter && <div className={classes.footer}>{tableFooter}</div>}
        </Paper>
    );
};

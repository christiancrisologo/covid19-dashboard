import React, { useCallback, useState, useEffect, useMemo, useRef } from "react";
import { Table, TableBody, TableRow, Paper, TablePagination } from "@material-ui/core";
import cx from "clsx";

import {
    stableSort,
    getSorting,
    useTableStyles,
    getKey,
    filterBySearchInput,
    filterByOperators,
    exportToCSV,
} from "./utils";
import {
    TableHead,
    TableCell,
    TableCellCustom,
    TableCellIcon,
    TableCellInput,
} from "./components";
import TableFilter from "./components/TableFilter";
import { EXPORT_ACTION_SELECTION } from "./constants";

const INIT_PAGINATION = { rowsPerPage: [50, 100, "All"], component: "div" };

export default ({
    defaultColumns,
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
    paginationComponent,
    filterComponent,
    pagination = INIT_PAGINATION,
    csvFileName = "",
}) => {
    const classes = useTableStyles();
    const [order, setOrder] = useState(sortType);
    const [orderBy, setOrderBy] = useState(sortyBy);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(INIT_PAGINATION.rowsPerPage[0]);
    const [searchValue, setSearchValue] = useState("");
    const [columnFilters, setColumnFilters] = useState({});
    const [isPrintActive, setPrintActive] = useState(false);
    // ref to count the current rendered rows
    let renderedRowsCountRef = useRef(0);

    const onRequestSort = useCallback(
        (event, property) => {
            const isDesc = orderBy === property && order === "desc";
            setOrder(isDesc ? "asc" : "desc");
            setOrderBy(property);
        },
        [order, orderBy]
    );

    const sortedData = useMemo(() => {
        // filtered by search input
        const filteredBySearch = filterBySearchInput(data, searchValue, columns);
        // filtered by column filters
        const filteredByColumns = filterByOperators(filteredBySearch, columnFilters);

        return (
            (sortFunc && sortFunc(filteredByColumns, order, orderBy)) ||
            stableSort(filteredByColumns, getSorting(order, orderBy))
        );
    }, [columnFilters, columns, data, order, orderBy, searchValue, sortFunc]);

    const rowClickHandler = useCallback(
        (e, row) => {
            e.preventDefault();
            e.stopPropagation();
            onRowClick && onRowClick(row);
        },
        [onRowClick]
    );

    const handleChangePage = useCallback((event, newPage) => {
        setPage(newPage);
    }, []);

    const handleChangeRowsPerPage = useCallback(
        (e) => {
            setRowsPerPage(
                e.target.value === "All" ? data.length : parseInt(e.target.value, 10)
            );
            setPage(0);
        },
        [data.length]
    );

    const csvHandler = useCallback(
        (selections) => {
            let rows = [...data];
            const cols =
                selections === EXPORT_ACTION_SELECTION.ALL ? defaultColumns : columns;

            if (selections === EXPORT_ACTION_SELECTION.CURRENT) {
                // filtered by search input
                const filteredBySearch = filterBySearchInput(data, searchValue, columns);
                // filtered by column filters
                const filteredByColumns = filterByOperators(
                    filteredBySearch,
                    columnFilters
                );
                rows =
                    (sortFunc && sortFunc(filteredByColumns, order, orderBy)) ||
                    stableSort(filteredByColumns, getSorting(order, orderBy));
            }

            exportToCSV(rows, cols, `${csvFileName}-${new Date().getTime()}.csv`);
        },
        [
            columnFilters,
            columns,
            csvFileName,
            data,
            defaultColumns,
            order,
            orderBy,
            searchValue,
            sortFunc,
        ]
    );

    const printHandler = useCallback(
        (selections) => {
            if (selections === EXPORT_ACTION_SELECTION.ALL) {
                setRowsPerPage(data.length);
                setPrintActive(true);
            } else {
                window.print();
            }
        },
        [data.length]
    );

    const searchHandler = useCallback((newValue) => {
        setSearchValue(newValue);
    }, []);

    const columnFilterChangeHandler = useCallback(
        (newColFilters) => {
            setColumnFilters({ ...columnFilters, ...newColFilters });
        },
        [columnFilters]
    );

    // This will handle if rows are all rendered and needs to be printed
    useEffect(() => {
        if (renderedRowsCountRef.current === data.length - 1 && isPrintActive) {
            window.print();
            setPrintActive(false);
        }
    }, [data.length, isPrintActive, renderedRowsCountRef]);

    return (
        <Paper className={cx(classes.root, className)} elevation={0}>
            {filterComponent || (
                <TableFilter
                    onCSVexport={csvHandler}
                    onPrint={printHandler}
                    onSearch={searchHandler}
                    value={searchValue}
                />
            )}
            <div
                className={cx(classes.tableWrapper, tableWrapperClassName)}
                id="printable"
            >
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
                        values={columnFilters}
                        onColumnFilterChange={columnFilterChangeHandler}
                    />
                    <TableBody>
                        {(!data || !data.length) && (
                            <TableRow className={classes.defaultEmptyRow}>
                                {emptyTableComponent}
                            </TableRow>
                        )}
                        {sortedData
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                                renderedRowsCountRef.current = index;
                                return (
                                    <TableRow
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
                                        selected={
                                            selectedRow && selectedRow.id === row.id
                                        }
                                    >
                                        {columns.map((column, columnIndex) => {
                                            const tableCellProps = {
                                                column,
                                                row,
                                                classes,
                                                index: columnIndex,
                                                errorRefs,
                                                onInputChange,
                                                errors,
                                            };
                                            if (column.cellRenderFunc) {
                                                return column.cellRenderFunc(
                                                    tableCellProps
                                                );
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
                                                    key={getKey({
                                                        column,
                                                        row,
                                                        columnIndex,
                                                    })}
                                                />
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </div>
            {sortedData.length &&
                (paginationComponent || (
                    <TablePagination
                        rowsPerPageOptions={pagination.rowsPerPage}
                        component={pagination.component}
                        count={sortedData.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                ))}
            {tableFooter && <div className={classes.footer}>{tableFooter}</div>}
        </Paper>
    );
};

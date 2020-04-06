import React, { useCallback, useState, useEffect, useMemo } from "react";
import { makeStyles, Button, Typography } from "@material-ui/core";
import { TubularTable } from "components/tables";
import Panel from "components/Panel";
import ColumnMenuOptions from "components/tables/components/ColumnMenuOptions";
//import { OPERATORS } from "components/tables/constants";
import PageCircularProgress from "components/PageCircularProgress";
// import { formatDate } from "utils/dateHelper";
// import { DATE_TIME_FORMAT } from "appConstants";
import ColumnIcon from "@material-ui/icons/ViewColumn";

const useStyles = makeStyles((theme) => ({
    panel: {
        backgroundColor: "#FAFAFA",
    },
}));

export default function () {
    const classes = useStyles();
    const [isPageReady, setPageReady] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState([]);
    const [result, setResult] = useState([]);

    useEffect(() => {
        setPageReady(false);
        // api
    }, []);

    const selectColumnHandler = useCallback(
        (item) => {
            // const newItems = selectedColumns.includes(item)
            //     ? selectedColumns.filter((filterItem) => filterItem !== item)
            //     : selectedColumns.concat(item);
            // setSelectedColumns(newItems);
        },
        [selectedColumns]
    );

    const { columns, defaultColumns } = useMemo(() => {
        // const defaultColumns = analysis.columns.map((col) => {
        //     return {
        //         ...col,
        //         type: "text",
        //         style: {
        //             maxWidth: 320,
        //         },
        //         filterOptions: {
        //             operators: OPERATORS,
        //             value: { operator: "", value: "" },
        //         },
        //         searchable: true,
        //         formatterFunc:
        //             col.id === "updatedAt"
        //                 ? (value) => formatDate(value, false, DATE_TIME_FORMAT)
        //                 : null,
        //     };
        // });
        // return {
        //     defaultColumns,
        //     columns: defaultColumns.filter((col) => selectedColumns.includes(col.id)),
        // };
        return [];
    }, [selectedColumns]);

    const filterColumns = useMemo(() => {
        return [];
        // return analysis.columns.filter(
        //     ({ id }) => !["updatedBy", "updatedAt"].includes(id)
        // );
    }, []);

    return (
        <Panel
            title="Results"
            headerActionComponent={
                <Button color="primary">
                    <Typography variant="caption">COLUMNS</Typography>
                    <ColumnIcon />
                </Button>
            }
            className={classes.panel}
        >
            {isPageReady ? (
                <TubularTable
                    columns={columns}
                    defaultColumns={defaultColumns}
                    data={result}
                    csvFileName="result-analysis"
                />
            ) : (
                <PageCircularProgress mt={0} mb={8} />
            )}
        </Panel>
    );
}

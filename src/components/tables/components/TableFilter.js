import React, { useCallback, useState } from "react";
import {
    IconButton,
    Tooltip,
    InputAdornment,
    makeStyles,
    Menu,
    MenuItem,
} from "@material-ui/core";
import TextField from "components/TextField";
import DownCSVIcon from "@material-ui/icons/CloudDownload";
// import PrintIcon from "@material-ui/icons/Print";
import SearchIcon from "@material-ui/icons/Search";
import { EXPORT_ACTION, EXPORT_ACTION_SELECTION } from "../constants";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexWrap: "wrap",
        flexDirectin: "row",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    margin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    search: {
        marginLeft: theme.spacing(2),
        minWidth: theme.spacing(40),
    },
    searchIcon: {
        color: theme.palette.shade30,
    },
    icon: {
        color: theme.palette.shade50,
    },
}));

export default ({ onCSVexport, onPrint, value, onSearch }) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState();
    const [type, setType] = useState("");

    function setDefaultEvent(e) {
        e.preventDefault();
        e.stopPropagation();
        setAnchorEl(null);
    }

    const csvHandler = useCallback((e) => {
        setDefaultEvent(e);
        setAnchorEl(e.currentTarget);
        setType(EXPORT_ACTION.CSV);
    }, []);

    // TODO: Print is unavailable for the meantime, will be shown in the future
    // const printHandler = useCallback(e => {
    //     setDefaultEvent(e);
    //     setAnchorEl(e.currentTarget);
    //     setType(EXPORT_ACTION.PRINT);
    // }, []);

    const onMenuClose = useCallback((e) => {
        setDefaultEvent(e);
    }, []);

    const onSearchChange = useCallback(
        (e) => {
            onSearch(e.target.value);
        },
        [onSearch]
    );

    const currentRowHandler = useCallback(
        (e) => {
            if (type === EXPORT_ACTION.CSV) {
                onCSVexport(EXPORT_ACTION_SELECTION.CURRENT);
            } else {
                onPrint(EXPORT_ACTION_SELECTION.CURRENT);
            }
            setDefaultEvent(e);
        },
        [onCSVexport, onPrint, type]
    );

    const allRowsHandler = useCallback(
        (e) => {
            if (type === EXPORT_ACTION.CSV) {
                onCSVexport(EXPORT_ACTION_SELECTION.ALL);
            } else {
                onPrint(EXPORT_ACTION_SELECTION.ALL);
            }
            setDefaultEvent(e);
        },
        [onCSVexport, onPrint, type]
    );

    return (
        <div className={classes.root}>
            <Tooltip title="Export to CSV">
                <IconButton onClick={csvHandler} className={classes.icon}>
                    <DownCSVIcon />
                </IconButton>
            </Tooltip>
            {/*
                 // TODO : Print is not fully supported at the meantime, hide it for now
                 <Tooltip title="Print ">
                <IconButton onClick={printHandler} className={classes.icon}>
                    <PrintIcon />
                </IconButton>
            </Tooltip> */}
            <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={onMenuClose}>
                <MenuItem onClick={currentRowHandler}>Current fields</MenuItem>
                <MenuItem onClick={allRowsHandler}>All fields</MenuItem>
            </Menu>
            <TextField
                className={classes.search}
                placeholder="Search"
                name="search"
                value={value}
                onChange={onSearchChange}
                fullWidth={false}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon className={classes.searchIcon} />
                        </InputAdornment>
                    ),
                }}
            />
        </div>
    );
};

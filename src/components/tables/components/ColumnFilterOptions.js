import React, { useCallback, useState, useEffect } from "react";
import { Popover, makeStyles, IconButton, Button, Badge } from "@material-ui/core";
import TextField from "components/TextField";
import SelectField from "components/SelectField";

import FilterListIcon from "@material-ui/icons/FilterList";

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        flexDirection: "column",
        padding: theme.spacing(2),
        paddingBottom: theme.spacing(1),
    },
    buttons: {
        marginBottom: theme.spacing(1),
        marginTop: theme.spacing(2),
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    filterIcon: {
        color: theme.palette.shade30,
    },
}));

export default ({ name, values, operators = [], onChange }) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    const [fieldValues, setFieldValues] = useState({});

    useEffect(() => {
        setFieldValues({ ...values });
    }, [values]);

    function setDefaultEvent(e) {
        e.preventDefault();
        e.stopPropagation();
        setAnchorEl(null);
    }

    const closeHandler = useCallback((e) => {
        setDefaultEvent(e);
        setOpen(false);
    }, []);

    const changeValueHandler = useCallback(
        (e) => {
            setFieldValues({ ...fieldValues, [e.target.name]: e.target.value });
        },
        [fieldValues]
    );

    const popperHandler = useCallback(
        (e) => {
            setDefaultEvent(e);
            setAnchorEl(e.currentTarget);
            setOpen(!open);
        },
        [open]
    );

    const clearHandler = useCallback(
        (e) => {
            setDefaultEvent(e);
            setFieldValues({ value: "", operator: "" });
            onChange({ [name]: { value: "", operator: "" } });
            setOpen(false);
        },
        [name, onChange]
    );

    const applyHandler = useCallback(
        (e) => {
            onChange({ [name]: fieldValues });
            setDefaultEvent(e);
            setOpen(false);
        },
        [fieldValues, name, onChange]
    );

    return (
        <>
            <IconButton onClick={popperHandler} className={classes.filterIcon}>
                <Badge
                    color="error"
                    variant={fieldValues.value && fieldValues.operator ? "dot" : ""}
                >
                    <FilterListIcon />
                </Badge>
            </IconButton>
            <Popover
                id={open ? "column-popover" : undefined}
                open={open}
                onClose={closeHandler}
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
                keepMounted
            >
                <div className={classes.container}>
                    <SelectField
                        label="Operator"
                        name="operator"
                        value={fieldValues.operator}
                        onChange={changeValueHandler}
                        placeholder="Operator"
                        items={operators}
                    />
                    <TextField
                        label="Value"
                        name="value"
                        value={fieldValues.value}
                        onChange={changeValueHandler}
                        placeholder="Value"
                        fullWidth
                    />
                    <div className={classes.buttons}>
                        <Button color="secondary" onClick={clearHandler}>
                            CLEAR
                        </Button>
                        <Button color="primary" onClick={applyHandler}>
                            APPLY
                        </Button>
                    </div>
                </div>
            </Popover>
        </>
    );
};

import React, { useCallback } from "react";
import classNames from "clsx";
import TextField from "./TextField";
import { MenuItem, Typography, withStyles } from "@material-ui/core";
import ArrowDropDown from "@material-ui/icons/KeyboardArrowDownOutlined";

const SELECT_ADD_NEW_VALUE = "add-new-item";

export default withStyles((theme) => ({
    addNewLabel: {
        color: theme.palette.primary.main,
        paddingBottom: theme.spacing(2),
        paddingLeft: theme.spacing(2),
    },
    menuItem: {
        paddingLeft: theme.spacing(2),
        "&:hover": {
            backgroundColor: `${theme.palette.primaryColors[50]} !important`,
        },
        "&:active": {
            backgroundColor: `${theme.palette.primaryColors[50]} !important`,
        },
    },
    textField: {
        marginTop: 0,
        marginBottom: 0,
    },
    fieldContainer: {
        marginBottom: theme.spacing(1),
        marginTop: theme.spacing(2),
    },
    fieldWithHelp: {
        marginBottom: -10,
    },
}))(
    ({
        classes,
        children,
        items,
        icon,
        multiple,
        onOpen,
        onClose,
        onChange,
        onAddNew,
        addNewLabel = "Add new item",
        value,
        className,
        textFieldClassName,
        onHelpClick,
        ...rest
    }) => {
        const onChangeHandler = useCallback(
            (evt) => {
                const val = evt.target.value;
                if (val === SELECT_ADD_NEW_VALUE) {
                    onAddNew && onAddNew();
                } else {
                    onChange && onChange(evt);
                }
            },
            [onAddNew, onChange]
        );

        return (
            <div
                className={classNames(className, classes.fieldContainer, {
                    fieldWithHelp: !!onHelpClick,
                })}
            >
                <TextField
                    {...rest}
                    className={classNames(textFieldClassName, classes.textField)}
                    value={value === SELECT_ADD_NEW_VALUE ? "" : value}
                    onChange={onChangeHandler}
                    SelectProps={{
                        IconComponent: icon || ArrowDropDown,
                        multiple,
                        onOpen,
                        onClose,
                    }}
                    select
                >
                    <MenuItem key="dummy-first-item" style={{ display: "none" }} />

                    {onAddNew && (
                        <MenuItem
                            key={SELECT_ADD_NEW_VALUE}
                            value={SELECT_ADD_NEW_VALUE}
                            className={classes.addNewLabel}
                        >
                            {addNewLabel}
                        </MenuItem>
                    )}
                    {(items &&
                        items.length &&
                        items.map(({ value, label }, index) => (
                            <MenuItem
                                key={index}
                                value={value}
                                className={classes.menuItem}
                            >
                                <Typography variant="body2" gutterBottom>
                                    {label}
                                </Typography>
                            </MenuItem>
                        ))) ||
                        children}
                </TextField>
            </div>
        );
    }
);

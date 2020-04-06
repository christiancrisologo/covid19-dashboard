import React, { useCallback, useState } from "react";
import {
    ListItemIcon,
    Popover,
    ListItem as ListItemBase,
    ListItemText,
    makeStyles,
    Typography,
    Button,
    Checkbox,
    List,
    IconButton,
} from "@material-ui/core";
import Panel from "components/Panel";
import ColumnIcon from "@material-ui/icons/ViewColumn";
import CloseIcon from "@material-ui/icons/CloseOutlined";

const useStyles = makeStyles((theme) => ({
    panel: {
        minWidth: theme.spacing(22),
        maxWidth: theme.spacing(70),
        [theme.breakpoints.down("sm")]: {
            width: "100%",
            minWidth: "100%",
        },
        margin: 0,
    },
    icon: {
        color: theme.palette.primary.main,
    },
}));

const ListItem = ({ icon, primaryText, checked, ...props }) => {
    const classes = useStyles();
    return (
        <ListItemBase {...props}>
            <ListItemIcon className={classes.icon}>
                <Checkbox edge="start" checked={checked} tabIndex={-1} color="primary" />
            </ListItemIcon>
            <ListItemText
                primary={<Typography variant="body2">{primaryText}</Typography>}
            />
        </ListItemBase>
    );
};

export default ({ data, disabled, selectedColumns, onSelectColumn }) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);

    function setDefaultEvent(e) {
        e.preventDefault();
        e.stopPropagation();
        setAnchorEl(null);
    }

    const closeHandler = useCallback((e) => {
        setDefaultEvent(e);
        setOpen(false);
    }, []);

    const popperHandler = useCallback((e) => {
        setDefaultEvent(e);
        setAnchorEl(e.currentTarget);
        setOpen(true);
    }, []);

    return (
        <>
            {/* <Button color="primary" onClick={popperHandler} disabled={disabled}>
                <Typography>COLUMNS</Typography>
                <ColumnIcon />
            </Button> */}
            <Popover
                id={open ? "column-popover" : undefined}
                open={open}
                onClose={closeHandler}
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
                keepMounted
            >
                <Panel
                    title="Results"
                    className={classes.panel}
                    headerActionComponent={
                        <IconButton color="primary" onClick={closeHandler}>
                            <CloseIcon />
                        </IconButton>
                    }
                >
                    <List className={classes.root}>
                        {(data || []).map((item, index) => {
                            return (
                                <ListItem
                                    button
                                    key={index}
                                    checked={selectedColumns.includes(item.id)}
                                    primaryText={item.label}
                                    value={item.id}
                                    dense
                                    onClick={() => onSelectColumn(item.id)}
                                />
                            );
                        })}
                    </List>
                </Panel>
            </Popover>
        </>
    );
};

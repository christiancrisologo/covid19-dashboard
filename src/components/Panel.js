import React from "react";
import HelpOutLineIcon from "@material-ui/icons/HelpOutline";
import {
    Card,
    CardContent,
    CardHeader,
    CardActions,
    IconButton,
    makeStyles,
    Hidden,
} from "@material-ui/core";

import cx from "clsx";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(0.5),
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        backgroundColor: theme.palette.common.white,
        "&.highlighted": {
            backgroundColor: theme.palette.primaryColors[50],
        },
    },
    content: {
        flexGrow: 1,
    },
    flexRow: {
        [theme.breakpoints.up("md")]: {
            display: "flex",
            flexDirection: "row",
        },
    },
    avatar: {
        width: theme.spacing(5),
        height: theme.spacing(5),
        color: theme.palette.common.white,
    },
    avatarContainer: {
        marginRight: 0,
        display: "flex",
    },
    checkbox: {
        marginRight: 0,
        verticalAlign: "top",
    },
    helpIcon: {
        color: theme.palette.infoColor,
    },
}));

export default ({
    children,
    highlighted,
    className,
    onActionClick,
    actionIcon,
    hideIconInDesktop,
    title,
    headerProps,
    cardActions,
    contentProps,
    headerActionComponent,
    titleComponent,
    headerComponent,
    contentComponent,
    ...props
}) => {
    const classes = useStyles();

    return (
        <Card className={cx(classes.root, { highlighted }, className)} {...props}>
            {headerComponent || (
                <CardHeader
                    title={titleComponent || title}
                    action={
                        headerActionComponent ||
                        (onActionClick && (
                            <Hidden mdUp={hideIconInDesktop}>
                                <IconButton
                                    className={classes.helpIcon}
                                    aria-label="help"
                                    onClick={onActionClick}
                                >
                                    {actionIcon || <HelpOutLineIcon />}
                                </IconButton>
                            </Hidden>
                        ))
                    }
                    {...headerProps}
                />
            )}
            {contentComponent || (
                <CardContent {...contentProps} className={classes.content}>
                    {" "}
                    {children}{" "}
                </CardContent>
            )}
            {cardActions && <CardActions>{cardActions}</CardActions>}
        </Card>
    );
};

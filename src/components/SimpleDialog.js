import React, { useState, useCallback, useEffect } from "react";
import {
    withMobileDialog,
    withStyles,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Slide,
    Typography,
    IconButton,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const SimpleDialog = ({
    classes,
    fullScreen,
    fullWidth = true,
    actionButtons,
    open,
    disableBackdropClick = true,
    disableEscapeKeyDown = false,
    onClose,
    title,
    children,
    message,
    onSecondaryClick,
    onPrimaryClick,
    secondaryLabel = "CANCEL",
    primaryLabel = "OK",
    maxWidth = "md",
    headerComponent,
    dialogActionComponent,
    leftHeaderComponent,
    rightHeaderComponent,

    ...rest
}) => {
    const [isOpen, setOpen] = useState(false);

    useEffect(() => {
        setOpen(open);
    }, [open]);

    const closePopup = useCallback(function (e) {
        e.stopPropagation();
        e.preventDefault();
        setOpen(false);
        onClose && onClose(e);
    });

    const onCloseHandler = useCallback(closePopup);

    const onSecondaryClickHandler = useCallback(
        (e) => {
            onSecondaryClick && onSecondaryClick(e);
            closePopup(e);
        },
        [closePopup, onSecondaryClick]
    );

    return (
        <Dialog
            {...rest}
            disableBackdropClick={disableBackdropClick}
            disableEscapeKeyDown={disableEscapeKeyDown}
            fullWidth={fullWidth}
            maxWidth={maxWidth}
            fullScreen={fullScreen}
            open={isOpen}
            TransitionComponent={Transition}
            onClose={onCloseHandler}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            {headerComponent || (
                <DialogTitle
                    id="alert-dialog-slide-title"
                    className={classes.dialogTitle}
                >
                    {leftHeaderComponent || (
                        <Typography variant="body2" className={classes.dialogTitleText}>
                            {title}
                        </Typography>
                    )}
                    {rightHeaderComponent || (
                        <IconButton color="primary" onClick={onCloseHandler}>
                            <CloseIcon />
                        </IconButton>
                    )}
                </DialogTitle>
            )}
            <DialogContent className={classes.dialogContent}>
                {children || (
                    <Typography variant="body2" gutterBottom>
                        {message}
                    </Typography>
                )}
            </DialogContent>
            {dialogActionComponent || (
                <DialogActions className={classes.dialogAction}>
                    {actionButtons || (
                        <React.Fragment>
                            <Button
                                onClick={onSecondaryClickHandler}
                                variant="text"
                                color="primary"
                            >
                                {secondaryLabel}
                            </Button>
                            <Button
                                onClick={onPrimaryClick}
                                variant="contained"
                                color="primary"
                            >
                                {primaryLabel}
                            </Button>
                        </React.Fragment>
                    )}
                </DialogActions>
            )}
        </Dialog>
    );
};

export default withMobileDialog()(
    withStyles((theme) => ({
        dialogAction: {
            justifyContent: "space-between",
            alignItems: "center",
            overflow: "hidden",
            display: "flex",
            borderTop: `1px solid ${theme.palette.divider}`,
            paddingLeft: theme.spacing(2),
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(1),
            paddingRight: theme.spacing(2),
        },
        dialogTitle: {
            padding: 0,
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
            "& > *": {
                padding: 0,
                minHeight: theme.spacing(7),
                paddingTop: theme.spacing(0.5),
                paddingBottom: theme.spacing(0.5),
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: `1px solid ${theme.palette.divider}`,
            },
        },
        dialogTitleText: {
            fontSize: 14,
            lineHeight: "20px",
            fontWeight: 600,
            letterSpacing: "0.25px",
        },
        dialogContent: {
            padding: theme.spacing(2),
        },
    }))(SimpleDialog)
);

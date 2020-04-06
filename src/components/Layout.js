import React from "react";
import cls from "clsx";
import { Typography, Hidden, styled, makeStyles } from "@material-ui/core";
import AppBar from "./AppBar";
import { ReactComponent as Logo } from "assets/covid19-logo.svg";

export const ContentWrapper = styled("div")(({ theme }) => ({
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    marginBottom: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
        width: "96%",
        minWidth: theme.spacing(128),
        margin: "0 auto",
        marginBottom: 0,
    },
}));

export const FullscreenLayout = styled("div")({
    flexGrow: 1,
    minHeight: "100vh",
    display: "flex",
});

export const BackgroundLayout = styled("div")(({ theme }) => ({
    // background: theme.palette.secondaryColors[300],
    width: "100%",
}));

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    appBar: {},

    pageTitleText: {
        textAlign: "center",
        padding: "0 48px",
    },
    headerSection: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "112px",
        position: "relative",

        margin: "0 auto",
        marginTop: theme.spacing(3),
        [theme.breakpoints.down("sm")]: {
            height: "56px",
        },
    },
    backLink: {
        display: "flex",
        alignItems: "center",
        position: "absolute",
        left: theme.spacing(2),
        [theme.breakpoints.down("sm")]: {
            display: "none",
        },
    },
    action: {
        position: "absolute",
        right: theme.spacing(2),
        [theme.breakpoints.down("sm")]: {
            right: theme.spacing(1),
        },
    },
    titleContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        flexGrow: 1,
        textAlign: "center",
        padding: theme.spacing(1),
    },
    titleSideContainer: {
        [theme.breakpoints.up("md")]: {
            width: "25%",
            minWidth: theme.spacing(26),
            flex: 0,
            display: "flex",
        },
        paddingBottom: theme.spacing(1),
        paddingTop: theme.spacing(1),
    },
    subTitle: {
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        textAlign: "center",
    },
    titleMainContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flexGrow: 1,

        "&>*:last-child": {
            justifyContent: "flex-end",
        },
    },
}));

export const Layout = ({
    title,
    subTitle,
    pageTitle,
    children,
    onBack,
    backLinkText,
    appBarComponent,
    secondaryBar,
    pageTitleComponent,
    leftTitleComponent,
    rightTitleComponent,
    action,
    appBarProps,
    ...rest
}) => {
    const classes = useStyles();
    return (
        <FullscreenLayout>
            <BackgroundLayout>
                {appBarComponent || (
                    <AppBar
                        title="COVID19"
                        logo={<Logo width={24} height={24} color="#FFF" />}
                        className={classes.appBar}
                        menuList={[{ label: "Home" }]}
                        {...rest}
                        {...appBarProps}
                    />
                )}
                {secondaryBar}
                {
                    <div className={classes.headerSection}>
                        {pageTitleComponent ||
                            ((pageTitle || title) && (
                                <div className={classes.titleMainContainer}>
                                    <div className={classes.titleSideContainer}>
                                        {leftTitleComponent && leftTitleComponent}
                                    </div>
                                    <div className={classes.titleContainer}>
                                        <Hidden smDown>
                                            <Typography variant="h5">
                                                {pageTitle || title}
                                            </Typography>
                                            {subTitle && (
                                                <Typography
                                                    variant="body1"
                                                    className={classes.subTitle}
                                                >
                                                    {subTitle}
                                                </Typography>
                                            )}
                                        </Hidden>
                                        <Hidden mdUp>
                                            <Typography
                                                variant="h6"
                                                className={classes.title}
                                            >
                                                {pageTitle || title}
                                            </Typography>
                                            {subTitle && (
                                                <Typography
                                                    variant="caption"
                                                    className={classes.subTitle}
                                                >
                                                    {subTitle}
                                                </Typography>
                                            )}
                                        </Hidden>
                                    </div>
                                    <div className={classes.titleSideContainer}>
                                        {rightTitleComponent && rightTitleComponent}
                                    </div>
                                    {action && (
                                        <div className={classes.action}>{action}</div>
                                    )}
                                </div>
                            ))}
                    </div>
                }
                <ContentWrapper>{children}</ContentWrapper>
            </BackgroundLayout>
        </FullscreenLayout>
    );
};

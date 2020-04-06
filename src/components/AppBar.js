import React, { useState, useCallback, useEffect } from "react";
import cx from "clsx";
import {
    AppBar as AppBarBase,
    MenuList,
    MenuItem,
    Toolbar,
    Typography,
    IconButton,
    Hidden,
    Drawer,
    makeStyles,
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import AppIcon from "@material-ui/icons/Apps";
import ArrowBack from "@material-ui/icons/ArrowBack";
import NotificationsNone from "@material-ui/icons/NotificationImportant";
import MenuIcon from "@material-ui/icons/Menu";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {},
    menuButton: {
        marginLeft: theme.spacing(-2),
        marginRight: theme.spacing(1),
        color: theme.palette.tint30,
        [theme.breakpoints.up("md")]: {
            display: "none",
        },
    },
    backButton: {
        marginLeft: theme.spacing(-2),
        marginRight: theme.spacing(1),
        color: theme.palette.primary.main,
        [theme.breakpoints.up("md")]: {
            display: "none",
        },
    },
    toolbar: {
        borderTop: `2px solid ${theme.palette.primary.main}`,
        [theme.breakpoints.up("md")]: {
            minWidth: theme.spacing(128),
            width: "94%",
            margin: "0 auto",
            padding: `0 ${theme.spacing(2)}px`,
        },
    },
    menu: {
        "& > li, & > a": {
            color: theme.palette.primaryColors[500],
            padding: theme.spacing(1),
        },
        "& > li:hover, & > a:hover": {
            color: theme.palette.secondary.main,
            background: theme.palette.shade20,
        },
        "& > li.active, & > a.active": {
            color: theme.palette.primary.main,
        },
    },
    menuLabel: {
        textTransform: "uppercase !important",
    },
    menuList: {
        flexDirection: "row",
        display: "flex",
        "& > li, & > a": {
            borderRadius: "4px",
            color: theme.palette.secondary.main,
            margin: `0 ${theme.spacing(1)}px`,
            padding: theme.spacing(1),
        },
    },
    notifcationIcon: {
        color: theme.palette.tint30,
    },
    appIcon: {
        color: theme.palette.tint30,
    },
    accountIcon: {
        color: theme.palette.tint30,
    },
    leftSection: {
        display: "flex",
        alignItems: "center",
        marginRight: theme.spacing(1),
    },
    middleSection: {
        flexGrow: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    rightSection: {
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
    },
    drawer: {
        [theme.breakpoints.up("sm")]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: theme.palette.primary.dark,
    },
    title: {
        color: theme.palette.common.white,
    },
    logo: {
        paddingRight: theme.spacing(1),
    },
}));

export default function ({
    rootStyles,
    menuStyles,
    leftComponent,
    rightComponent,
    onBack,
    logo,
    title,
    menuComponent,
    menuList,
    notificationIcon,
    appIcon,
    accountIcon,
    activeLink,
    middleComponent,
    onPrimaryMenuChange,
    container,
}) {
    const classes = useStyles();
    const [selectedLink, setLink] = useState();
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        setLink(activeLink);
    }, [activeLink]);

    const onMenuClick = useCallback(
        (menu) => {
            setLink(menu.label);
            onPrimaryMenuChange && onPrimaryMenuChange({ ...menu });
        },
        [onPrimaryMenuChange]
    );

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const menu = React.useMemo(
        () =>
            menuComponent ||
            (menuList && menuList.length && (
                <MenuList
                    className={cx(menuStyles, classes.menu, {
                        [classes.menuList]: !mobileOpen,
                    })}
                >
                    {menuList.map(({ label, onClick, ...rest }, key) => (
                        <MenuItem
                            key={key}
                            {...rest}
                            onClick={() => {
                                onClick && onClick(label, { ...rest });
                                onMenuClick({ label, ...rest });
                            }}
                            className={cx({
                                active: [label || key].includes(selectedLink),
                            })}
                        >
                            <Typography
                                variant="button"
                                color="inherit"
                                className={classes.menuLabel}
                            >
                                {label}
                            </Typography>
                        </MenuItem>
                    ))}
                </MenuList>
            )),
        []
    );

    return (
        <React.Fragment>
            <AppBarBase position="sticky" className={cx(rootStyles, classes.root)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        aria-label={onBack ? "Go back" : "Open menu"}
                        onClick={onBack ? onBack : handleDrawerToggle}
                        className={onBack ? classes.backButton : classes.menuButton}
                    >
                        {onBack ? (
                            <ArrowBack color="inherit" />
                        ) : (
                            <MenuIcon color="inherit" />
                        )}
                    </IconButton>
                    <div className={classes.leftSection}>
                        {leftComponent || (
                            <>
                                {logo && <div className={classes.logo}>{logo}</div>}
                                {title && (
                                    <Typography
                                        variant="h6"
                                        color="inherit"
                                        className={classes.title}
                                    >
                                        {title}
                                    </Typography>
                                )}
                            </>
                        )}
                    </div>
                    <div className={classes.middleSection}>
                        <Hidden smDown>{middleComponent || menu}</Hidden>
                    </div>
                    <div className={classes.rightSection}>
                        {rightComponent || (
                            <React.Fragment>
                                <IconButton
                                    className={classes.notifcationIcon}
                                    {...notificationIcon}
                                >
                                    <NotificationsNone color="inherit" />
                                </IconButton>
                                <IconButton className={classes.appIcon} {...appIcon}>
                                    <AppIcon color="inherit" />
                                </IconButton>
                                <IconButton
                                    className={classes.accountIcon}
                                    {...accountIcon}
                                >
                                    <AccountCircle color="inherit" />
                                </IconButton>
                            </React.Fragment>
                        )}
                    </div>
                </Toolbar>
            </AppBarBase>

            <nav className={classes.drawer}>
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        className={classes.drawer}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {menu}
                    </Drawer>
                </Hidden>
            </nav>
        </React.Fragment>
    );
}

import React from "react";
import { Layout } from "components/Layout";

export default ({ appBarProps, children, ...rest }) => {
    return <Layout {...rest}>{children}</Layout>;
};

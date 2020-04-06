import React from "react";
import { Layout } from "components/Layout";
import ResultTable from "components/ResulTable";
export default ({ appBarProps, ...rest }) => {
    return (
        <Layout {...rest} title="COVID19" subTitle="by Christian Crisologo">
            <ResultTable />
        </Layout>
    );
};

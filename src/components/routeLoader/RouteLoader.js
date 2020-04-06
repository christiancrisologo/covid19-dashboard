import React from "react";
import "./preloader.css";

const RouteLoader = ({ isLoading, error }) => {
    // Handle the loading state
    if (isLoading) {
        return (
            <div
                style={{
                    display: "flex",
                    width: "100%",
                    height: "100vh",
                    paddingTop: "15%",
                    flexDirection: "column",
                    alignItems: "center",
                    background: "#fff"
                }}
            >
                <div className="spinner">&nbsp;</div>
                <span>Loading...</span>
            </div>
        );
    }
    // Handle the error state
    else if (error) {
        return <div>Sorry, there was a problem loading the page.</div>;
    } else {
        return null;
    }
};

export default RouteLoader;

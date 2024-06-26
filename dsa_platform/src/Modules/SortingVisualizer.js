import React from "react";
import SortingChart from "../components/SortingCharts";
import SortingProvider from "../contexts/SortingContext";
import Header from "../components/header";

function SortingVisualizer() {
    return (
        <div style={{backgroundColor: "#222", marginTop: "0px"}}>
            <Header />
            <SortingProvider>
            <div className="container mx-auto px-4" style={{backgroundColor: "#222"}}>
                <SortingChart />
            </div>
            </SortingProvider>
        </div>
    );
}

export default SortingVisualizer;

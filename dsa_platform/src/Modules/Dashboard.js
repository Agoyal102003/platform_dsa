import React from "react";
import Header from '../components/header';
import Part1 from '../components/Part1';
import Part2 from '../components/Part2';
import Part3 from '../components/Part3';
import Part4 from '../components/Part4';
import Part5 from '../components/Part5';
import Footer from '../components/Footer';

function Dashboard() {
    return (
        <div style={{backgroundColor: "#0a0e0f"}}>
            <Header />
            <Part1 />
            <Part2 />
            <Part3 />
            <Part4 />
            <Part5 />
            <Footer />
        </div>
    );
}
export default Dashboard;
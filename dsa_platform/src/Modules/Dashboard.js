import React from "react";
import Header from '../components/header';
import Background from "../components/Background";
// import Part1 from '../components/Part1';
import Part2 from '../components/Part2';
import Part3 from '../components/Part3';
import Part4 from '../components/Part4';
import Part5 from '../components/Part5';
import Footer from '../components/Footer';
import './Dashboard.css';

function Dashboard() {
    return (
        <div style={{backgroundColor: "white"}}>
            <Header />
            <Background />
            {/* <Part1 /> */}
            <Part2 />
            <Part3 />
            <Part4 />
            <Part5 />
            <Footer />
        </div>
    );
}
export default Dashboard;

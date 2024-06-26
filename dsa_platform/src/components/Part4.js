import React from "react";
import './Part4.css';
import { useNavigate } from "react-router-dom";

function Part4() {
    const navigate = useNavigate();
    return (
        <div className="part4">
            <div className="headerpart4">
                <div className="heading">Data Structures</div>
                <button onClick={() => navigate('/DataStructures')} className="view-all">View All</button>
            </div>
            <div className="content">
                <div className="item one" onClick={() => navigate('/data-structure/Arrays')}>Array</div>
                <div className="item two"onClick={() => navigate('/data-structure/Linked%20List')}>Linked List</div>
                <div className="item three"onClick={() => navigate('/data-structure/Stack')}>Stack</div>
                <div className="item four"onClick={() => navigate('/data-structure/Queue')}>Queue</div>
            </div>
        </div>
    );
}

export default Part4;

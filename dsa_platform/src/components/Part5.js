import React from "react";
import { useNavigate } from "react-router-dom";
import './Part5.css';

function Part5() {
    const navigate= useNavigate();
    return (
        <div className="part4">
            <div className="headerpart4">
                <div className="heading">Algorithms</div>
                <button onClick={()=> navigate('/Algorithms')} className="view-all">View All</button>
            </div>
            <div className="content">
                <div className="item one" onClick={()=> navigate('/algorithm/Analysis%20of%20Algorithms')}>Analysis of Algo</div>
                <div className="item two" onClick={()=> navigate('/algorithm/Searching%20Algorithms')}>Searching Algo</div>
                <div className="item three" onClick={()=> navigate('/algorithm/Sorting%20Algorithms')}>Sorting Algo</div>
                <div className="item four" onClick={()=> navigate('/algorithm/Graph%20Algorithms')}>Graph Algo</div>
            </div>
        </div>
    );
}

export default Part5;

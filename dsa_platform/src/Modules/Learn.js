import React from 'react';
import '../components/DSviewall.css';
import { useNavigate } from 'react-router-dom';

function Read() {
    const navigate = useNavigate();
    return (
        <div className="flowchart-container" style={{ backgroundColor: "#0a0e0f", zIndex: "0"}}>
            <div style={{ fontSize: "50px", fontWeight: "700", marginBottom: "30px"}}>Visualize!!!</div>
            <div style={{display: "flex"}}>
                <div onClick={() => navigate('/sorting-visualizer')} style={{backgroundColor: "#171b1d", fontSize: "30px", fontWeight: "600", padding: "15px 67px", marginRight: "20px", borderRadius: "30px"}}>
                    Sorting Visualizer
                </div>
                <div onClick={() => navigate('/pathfinding-visualizer')} style={{backgroundColor: "#171b1d", fontSize: "30px", fontWeight: "600", padding: "15px 30px", borderRadius: "30px"}}>
                    Path Finding Visualizer
                </div>
            </div>
        </div>
    );
}

export default Read;

import React from 'react';
import '../components/DSviewall.css';
import { useNavigate } from 'react-router-dom';

function Read() {
    const navigate = useNavigate();
    return (
        <div className="flowchart-container" style={{ backgroundColor: "#0a0e0f", zIndex: "0"}}>
            <div style={{ fontSize: "45px", fontWeight: "700", marginBottom: "30px"}}>Read Concepts!!</div>
            <div style={{display: "flex"}}>
                <div onClick={() => navigate('/Algorithms')} style={{backgroundColor: "#171b1d", fontSize: "30px", fontWeight: "600", padding: "10px 67px", marginRight: "20px", borderRadius: "30px"}}>
                    Algorithms
                </div>
                <div onClick={() => navigate('/DataStructures')} style={{backgroundColor: "#171b1d", fontSize: "30px", fontWeight: "600", padding: "10px 30px", borderRadius: "30px"}}>
                    Data Structures
                </div>
            </div>
        </div>
    );
}

export default Read;

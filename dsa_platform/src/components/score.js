import React from 'react';
import './profile.css'; // Make sure to import your CSS

const Score = () => {
    return (
        <div className="boxe box1" style={{background: "rgb(37, 43, 46)"}}>
            <div>
                <div className="boxtitle" style={{color: "whitesmoke"}}>Overall coding <br /> score</div>
                <div className="txt" style={{color: "#c2c8cf"}}>19</div>
            </div>
            <div className="img-container">
                <span style={{
                    boxSizing: 'border-box',
                    display: 'inline-block',
                    overflow: 'hidden',
                    width: 'initial',
                    height: 'initial',
                    background: 'none',
                    opacity: 1,
                    border: 0,
                    margin: 0,
                    padding: 0,
                    position: 'relative',
                    maxWidth: '100%'
                }}>
                    <span style={{
                        boxSizing: 'border-box',
                        display: 'block',
                        width: 'initial',
                        height: 'initial',
                        background: 'none',
                        opacity: 1,
                        border: 0,
                        margin: 0,
                        padding: 0,
                        maxWidth: '100%'
                    }}>
                        <img 
                            style={{
                                display: 'block',
                                maxWidth: '100%',
                                width: 'initial',
                                height: 'initial',
                                background: 'none',
                                opacity: 1,
                                border: 0,
                                margin: 0,
                                padding: 0
                            }} 
                            alt="" 
                            aria-hidden="true" 
                            src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%2760%27%20height=%2760%27/%3e" 
                        />
                    </span>
                    <img 
                        className="overlay-img"
                        alt="icon" 
                        src="https://media.geeksforgeeks.org/auth-dashboard-uploads/Group-96.svg" 
                        decoding="async" 
                        data-nimg="intrinsic" 
                        srcSet="https://media.geeksforgeeks.org/auth-dashboard-uploads/Group-96.svg 1x, https://media.geeksforgeeks.org/auth-dashboard-uploads/Group-96.svg 2x" 
                    />
                </span>
            </div>
        </div>
    );
};

export default Score;

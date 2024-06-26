import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Card({ title, description, navigateTo, imageSource }) {
    const navigate = useNavigate();

    const handleClick = () => {
        if (navigateTo) {
        navigate(navigateTo);
        }
    };
    return (
        <div className="card" onClick={handleClick} style={{ width: '18rem', cursor: 'pointer', border: 'none'}}>
            <img className="card-img-top" src={imageSource} alt="" />
            <div className="card-body" style={{backgroundColor: "#202426"}} >
                <h5 className="card-title" style={{color: 'white'}}>{title}</h5>
                <p className="card-text" style={{color: 'white'}}>{description}</p>
                {/* <a href="#!" className="btn btn-primary">{buttonText}</a> */}
            </div>
        </div>
    );
}

export default Card;

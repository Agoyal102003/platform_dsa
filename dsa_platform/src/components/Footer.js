import React from "react";
import './Footer.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Footer() {
    return (
        <div className="container" style={{background: "black", maxWidth: "1700px"}}>
            <footer className="row row-cols-1 row-cols-sm-2 row-cols-md-5 py-5 my-5 border-top ft">
                <div className="col mb-3">
                    <a href="/" className="d-flex align-items-center mb-3 link-body-emphasis text-decoration-none">
                        <svg className="bi me-2" width="40" height="32"><use xlinkHref="#bootstrap"></use></svg>
                    </a>
                    <p className="text-body-secondary">© 2024</p>
                </div>

                <div className="col mb-3"></div>

                <div className="col mb-3">
                    <h5 className="section-title">Section</h5>
                    <ul className="nav flex-column">
                        <li className="nav-item mb-2"><button className="nav-link p-0 text-body-secondary">Home</button></li>
                        <li className="nav-item mb-2"><button className="nav-link p-0 text-body-secondary">Features</button></li>
                        <li className="nav-item mb-2"><button className="nav-link p-0 text-body-secondary">Pricing</button></li>
                        <li className="nav-item mb-2"><button className="nav-link p-0 text-body-secondary">FAQs</button></li>
                        <li className="nav-item mb-2"><button className="nav-link p-0 text-body-secondary">About</button></li>
                    </ul>
                </div>

                <div className="col mb-3">
                    <h5 className="section-title">Section</h5>
                    <ul className="nav flex-column">
                        <li className="nav-item mb-2"><button className="nav-link p-0 text-body-secondary">Home</button></li>
                        <li className="nav-item mb-2"><button className="nav-link p-0 text-body-secondary">Features</button></li>
                        <li className="nav-item mb-2"><button className="nav-link p-0 text-body-secondary">Pricing</button></li>
                        <li className="nav-item mb-2"><button className="nav-link p-0 text-body-secondary">FAQs</button></li>
                        <li className="nav-item mb-2"><button className="nav-link p-0 text-body-secondary">About</button></li>
                    </ul>
                </div>

                <div className="col mb-3">
                    <h5 className="section-title">Section</h5>
                    <ul className="nav flex-column">
                        <li className="nav-item mb-2"><button className="nav-link p-0 text-body-secondary">Home</button></li>
                        <li className="nav-item mb-2"><button className="nav-link p-0 text-body-secondary">Features</button></li>
                        <li className="nav-item mb-2"><button className="nav-link p-0 text-body-secondary">Pricing</button></li>
                        <li className="nav-item mb-2"><button className="nav-link p-0 text-body-secondary">FAQs</button></li>
                        <li className="nav-item mb-2"><button className="nav-link p-0 text-body-secondary">About</button></li>
                    </ul>
                </div>
            </footer>
        </div>
    );
};

export default Footer;

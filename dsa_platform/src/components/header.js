import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../redux/authSlice';
import './header.css';
import { AccountCircle, Person, FormatListNumbered, Explore, Edit, Logout } from '@mui/icons-material'; // Import icons

const Header = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const dispatch = useDispatch();
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [isTutorialDropdownOpen, setIsTutorialDropdownOpen] = useState(false);
    const [isVisualizerDropdownOpen, setIsVisualizerDropdownOpen] = useState(false);


    const handleLogout = () => {
        dispatch(logout());
    };

    const toggleProfileDropdown = (e) => {
        e.preventDefault();
        setIsProfileDropdownOpen(!isProfileDropdownOpen);
    };

    const toggleTutorialDropdown = (e) => {
        e.preventDefault();
        setIsTutorialDropdownOpen(!isTutorialDropdownOpen);
    };

    const toggleVisualizerDropdown = (e) => {
        e.preventDefault();
        setIsVisualizerDropdownOpen(!isVisualizerDropdownOpen);
    };

    const closeDropdowns = () => {
        setIsProfileDropdownOpen(false);
        setIsTutorialDropdownOpen(false);
        setIsVisualizerDropdownOpen(false);
    };

    return (
        <header>
            <nav className="navbar navbar-expand-lg" style={{background: "#1f1f1f"}}>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{marginLeft: "20px"}}>
                        <li className="nav-item" style={{marginRight: "10px", fontWeight: "500"}}>
                            <Link style={{color: "white"}} className="nav-link" to="/" onClick={closeDropdowns}>Home</Link>
                        </li>
                        <li className="nav-item dropdown" style={{marginRight: "10px", fontWeight: "500"}}>
                            <a style={{color: "white"}} className="nav-link dropdown-toggle" href="#!" role="button" onClick={toggleVisualizerDropdown} aria-expanded={isVisualizerDropdownOpen ? "true" : "false"}>
                                Visualizers
                            </a>
                            <ul className={`dropdown-menu ${isVisualizerDropdownOpen ? 'show' : ''}`}>
                                <li><Link className="dropdown-item" to="/pathfinding-visualizer" onClick={closeDropdowns}>Path Finding Visualizer</Link></li>
                                <li><Link className="dropdown-item" to="/sorting-visualizer" onClick={closeDropdowns}>Sorting Visualizer</Link></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown" style={{marginRight: "10px", fontWeight: "500"}}>
                            <a style={{color: "white"}} className="nav-link dropdown-toggle" href="#!" role="button" onClick={toggleTutorialDropdown} aria-expanded={isTutorialDropdownOpen ? "true" : "false"}>
                                Tutorials
                            </a>
                            <ul className={`dropdown-menu ${isTutorialDropdownOpen ? 'show' : ''}`}>
                                <li><Link className="dropdown-item" to="/DataStructures" onClick={closeDropdowns}>Data Structures</Link></li>
                                <li><Link className="dropdown-item" to="/Algorithms" onClick={closeDropdowns}>Algorithms</Link></li>
                            </ul>
                        </li>
                        <li className="nav-item" style={{marginRight: "10px", fontWeight: "500"}}>
                            <Link style={{color: "white"}} className="nav-link" to="/problems" onClick={closeDropdowns}>Practice</Link>
                        </li>
                    </ul>
                </div>

                {isAuthenticated ? (
                    <div className="profile-section">
                        <AccountCircle style={{color: "white"}} className="icon" onClick={toggleProfileDropdown} aria-expanded={isProfileDropdownOpen ? "true" : "false"} />
                        <ul className={`menuprofile dropdown-menu ${isProfileDropdownOpen ? 'show' : ''}`}>
                            <li><Link to="/profile"><Person /><span className='list'>My Profile</span></Link></li>
                            <li><Link to="/leaderboard"><FormatListNumbered /><span className='list'>Leaderboard</span></Link></li>
                            <li><Link to="/Community"><Explore /><span className='list'>Explore Community</span></Link></li>
                            <li><Link to="/EditProfile"><Edit /><span className='list'>Edit Profile</span></Link></li>
                            <li onClick={handleLogout}><Logout /><span className='list'>Logout</span></li>
                        </ul>
                    </div>
                ) : (
                    <Link style={{color: "white"}} className="navbar-brand" to="/form">Get Started</Link>
                )}
            </nav>
        </header>
    );
};

export default Header;

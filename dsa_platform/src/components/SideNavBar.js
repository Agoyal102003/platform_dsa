import React from "react";
import './SideNavBar.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/authSlice';
import { AccountCircle, Bookmark, Group, Edit, ExitToApp, EmojiEvents } from "@mui/icons-material";

function SideNavBar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };
    return(
        <div className="button-container">
            <button className="profile-button" onClick={() => navigate('/profile')}>
                <AccountCircle className="icon" />
                Profile
            </button>
            <button>
                <Bookmark className="icon" />
                Saved Items
            </button>
            <button onClick={() => navigate('/Community')}>
                <Group className="icon" />
                Community
            </button>
            <button onClick={() => navigate('/leaderboard')}>
                <EmojiEvents className="icon" />
                Leaderboard
            </button>
            <button onClick={() => navigate('/EditProfile')}>
                <Edit className="icon" />
                Edit Profile
            </button>
            <button onClick={handleLogout}>
                <ExitToApp className="icon" />
                Logout
            </button>
        </div>
    )
}

export default SideNavBar;

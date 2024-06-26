import React from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/authSlice';
import { AccountCircle, Home, Group, Edit, ExitToApp, EmojiEvents } from "@mui/icons-material";

function SideNavBar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };
    return(
        <div className="button-containerc">
            <button className="profile-buttonc" onClick={() => navigate('/')}>
                <Home className="icon" />
                Home
            </button>
            <button className="profile-buttonc" onClick={() => navigate('/profile')}>
                <AccountCircle className="icon" />
                Profile
            </button>
            <button onClick={() => navigate('/Community')}>
                <Group className="icon" />
                Community
            </button>
            <button onClick={() => navigate('/leaderboard')}>
                <EmojiEvents className="icon" />
                Leaderboard
            </button>
            <button onClick={() => navigate('/Editprofile')}>
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

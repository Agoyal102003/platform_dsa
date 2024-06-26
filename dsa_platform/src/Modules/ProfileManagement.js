import React from "react";
import Header from "../components/header";
import SideNavBar from "../components/SideNavBar";
import Profile from "../components/profile";

function ProfileManagement() {
    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "#0a0e0f" }}>
            <Header />
            <div style={{ display: "flex", flexGrow: 1 }}>
                <SideNavBar />
                <div style={{ flex: 1 }}> {/* Profile */}
                    <Profile style={{ height: "100%" }} /> {/* Or set a specific height */}
                </div>
            </div>
        </div>
    )
};
export default ProfileManagement;

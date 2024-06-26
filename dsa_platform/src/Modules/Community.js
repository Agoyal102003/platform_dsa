import React from "react";
import Header from "../components/header";
import { Provider } from 'react-redux';
import store from '../redux/store';
import Feed from "../components/Feed";
import CommunityProfile from "../components/CommunityProfile";
import SideNavBarCommunity from "../components/SideNavBarCommunity";

function Community() {
    return (
        <Provider store={store}>
        <div style={{ backgroundColor: "#0a0e0f" }}>
            <Header />
            <div className="container" style={{ display: "flex", alignItems: "flex-start", margin: "0px" }}>
                <div className="community-profile" style={{ flex: "0 0 auto", position: "sticky", top: "0px", overflow: "auto" }}>
                    <div className="comtyprofile">
                        <CommunityProfile />
                    </div>
                    <div className="sidebar" style={{marginBottom: "100px", marginLeft: "80px"}}>
                        <SideNavBarCommunity />
                    </div>
                </div>
                <div className="feed" style={{ flex: "1", minWidth: "300px" }}>
                    <Feed />
                </div>
            </div>
        </div>
        </Provider>
    );
};

export default Community;

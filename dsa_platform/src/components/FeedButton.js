import React, { useState } from "react";
import './CommunityInput.css';

function FeedButton() {
    const [activeTab, setActiveTab] = useState('feed'); // Default to 'feed'

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="FeedPosts_explore_main_div__RAH3I">
            <div className="FeedPosts_tabs__5fPBJ">
                <div 
                    data-tab="/"
                    className={`FeedPosts_tabs_single__RgPBG ${activeTab === 'feed' ? 'FeedPosts_tabs_single--active__4hCmy' : ''}`} 
                    onClick={() => handleTabClick('feed')}
                >
                    Feed
                </div>
                {/* <div 
                    data-tab="/recent-posts/"
                    className={`FeedPosts_tabs_single__RgPBG ${activeTab === 'recent' ? 'FeedPosts_tabs_single--active__4hCmy' : ''}`} 
                    onClick={() => handleTabClick('recent')}
                >
                    Recent
                </div> */}
            </div>
        </div>
    );
}

export default FeedButton;

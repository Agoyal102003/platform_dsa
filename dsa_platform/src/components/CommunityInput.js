import React, { useState } from "react";
import './CommunityInput.css';
import MovingTextPlaceholder from './MovingTextPlaceholder';
import ExpandedInputBox from './ExpandedInputBox';

function CommunityInput({ addPost }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const handlePlaceholderClick = () => {
        setIsExpanded(true);
    };

    const handleClose = () => {
        setIsExpanded(false);
    };

    return (
        <div className="EditorModal_card-wrapper__YXtlV">
            <div style={{ display: 'flex', paddingTop: '10px', alignItems: 'center' }}>
                <div className="EditorModal_placeholder-wrapper__WGN9O">
                    <div style={{ cursor: 'pointer', display: 'flex' }}>
                        <p className="EditorModal_profile-picture-as-initials__ikBpQ"
                            style={{ backgroundColor: 'rgb(231, 231, 231)', fontWeight: 600 }}>A</p>
                    </div>
                    <div className="EditorModal_placeholder__4bO1W">
                        {isExpanded ? (
                            <ExpandedInputBox onClose={handleClose} addPost={addPost} />
                        ) : (
                            <MovingTextPlaceholder onClick={handlePlaceholderClick}/>
                        )}
                    </div>
                </div>
            </div>
            <div className="ant-divider css-1xg9z9n ant-divider-horizontal editorFeedDivider"
                role="separator" style={{ margin: '16px 0px' }}>
            </div>
        </div>
    );
}

export default CommunityInput;

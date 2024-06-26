import React, { useState, useEffect } from 'react';

function MovingTextPlaceholder({ onClick }) {
    const [displayText, setDisplayText] = useState("");
    const [index, setIndex] = useState(0);
    const text = "Write a post...";

    useEffect(() => {
        let timeout;
        if (index < text.length) {
            timeout = setTimeout(() => {
                setDisplayText(prev => prev + text.charAt(index));
                setIndex(prev => prev + 1);
            }, 200); // Typing speed
        } else {
            timeout = setTimeout(() => {
                setDisplayText("");
                setIndex(0);
            }, 1000); // Delay before starting again
        }

        return () => clearTimeout(timeout);
    }, [index, text]);

    return (
        <div className="moving-text-placeholder" onClick={onClick}>
            {displayText}
        </div>
    );
}

export default MovingTextPlaceholder;

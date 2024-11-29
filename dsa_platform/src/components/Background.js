import React from 'react';

function background() {
    return (
        <header
                data-poster-url="https://cdn.prod.website-files.com/60890f6ac44206aef9237eb4/61bbac22591d544192a9acb2_bg-video-poster-00001.jpg"
                data-video-urls="https://cdn.prod.website-files.com/60890f6ac44206aef9237eb4/61bbac22591d544192a9acb2_bg-video-transcode.mp4,
                    https://cdn.prod.website-files.com/60890f6ac44206aef9237eb4/61bbac22591d544192a9acb2_bg-video-transcode.webm"
                className="background-video-14 w-background-video w-background-video-atom"
            >
                <div className="video-wrapper">
                    <video
                        id="dff4ef8e-fad1-7bdf-57f7-40c60a9eddf3-video"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="responsive-video"
                    >
                        <source src="https://cdn.prod.website-files.com/60890f6ac44206aef9237eb4/61bbac22591d544192a9acb2_bg-video-transcode.mp4" />
                        <source src="https://cdn.prod.website-files.com/60890f6ac44206aef9237eb4/61bbac22591d544192a9acb2_bg-video-transcode.webm" />
                    </video>
                    <div className="columns-41 w-row">
                        <div className="header-column w-col w-col-6 w-col-stack w-col-tiny-tiny-stack">
                            <h1 data-w-id="3912c424-a1ff-0e62-f9f1-a9b3d002fea2" className="h1-st">
                                <strong>Meet, chat, and study with students from all over the world 🌍</strong>
                            </h1>
                            <h2 className="hero-description white">
                                Join the largest <strong>global student community</strong><br/> online and say goodbye to lack of motivation.
                            </h2>
                        </div>
                    </div>
                </div>
            </header>
    );
}

export default background;

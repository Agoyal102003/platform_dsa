import React, { useState, useEffect } from 'react';
import './Part3.css';

function Part3() {
  const [currentGifIndex, setCurrentGifIndex] = useState(0);
  const [gifs, setGifs] = useState([]);

  useEffect(() => {
    const importGifs = async () => {
      try {
        const gif1 = process.env.PUBLIC_URL + '/Gifs/inorder-traversal_360.gif';
        const gif2 = process.env.PUBLIC_URL + '/Gifs/preorder-traversal_360.gif';
        // Add more GIFs if needed

        const gifArray = [gif1, gif2];

        // Preload GIFs
        await Promise.all(
          gifArray.map((gif) =>
            new Promise((resolve, reject) => {
              const img = new Image();
              img.src = gif;
              img.onload = resolve;
              img.onerror = reject;
            })
          )
        );

        setGifs(gifArray);
      } catch (error) {
        console.error('Error loading GIFs:', error);
      }
    };

    importGifs();
  }, []);

  useEffect(() => {
    if (gifs.length === 0) return;

    const interval = setInterval(() => {
      setCurrentGifIndex((prevIndex) => (prevIndex + 1) % gifs.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [gifs.length]);

  return (
    <div className="Part3">
      <div className="P3">
        {gifs.length > 0 && (
          <img src={gifs[currentGifIndex]} alt="GIF" />
        )}
      </div>
      <div className="P3-description">
        <div className="part3-title" >Preorder Traversal of Binary Tree</div>
        <div className="part3-description">
          Preorder traversal is defined as a type of tree traversal that follows<br />
          the Root-Left-Right Policy where: The root node of the subtree is<br />
          visited first. Then the left subtree is...
        </div>
      </div>
    </div>
  );
}

export default Part3;

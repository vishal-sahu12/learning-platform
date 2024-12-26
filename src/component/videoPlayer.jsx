import React from 'react';

const VideoPlayer = ({ videoSrc }) => {
  return (
    <div className="w-full h-96 bg-black flex justify-center items-center rounded-lg shadow-lg overflow-hidden">
      <iframe
        className="w-full h-full"
        src={videoSrc}
        title="Video Player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoPlayer;

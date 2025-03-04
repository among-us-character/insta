import React, { useState, useEffect } from 'react';
import axios from 'axios';



const App = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [videoData, setVideoData] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [imageData, setImageData] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [selectedQuality, setSelectedQuality] = useState('');

  useEffect(() => {
    if (videoUrl) {
      fetchVideo();
    }
  }, [videoUrl]);

  const fetchVideo = async () => {
    setIsLoading(true);
    setVideoData(null);
    const options = {
      method: 'GET',
      url: 'https://social-media-video-downloader.p.rapidapi.com/smvd/get/all',
      params: { url: videoUrl, filename: 'download' },
      headers: {
        'X-RapidAPI-Key': 'b1cb257190msh5367e49168e7b56p158ad1jsna3f9cc0b1319',

        'X-RapidAPI-Host': 'social-media-video-downloader.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      const videoLinks = response.data.links.filter(link => !link.quality.includes('audio_0'));

      if (videoLinks.length > 0) {
        setVideoData(videoLinks[0].link);
        setSelectedQuality(videoLinks[0].link);
      }
    } catch (error) {
      console.error("Error fetching video:", error);
    }
    
    setIsLoading(false);
  };

  const handleDownload = async () => {
    if (!selectedQuality) return;
    
    try {
      const response = await fetch(selectedQuality);
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "Instagram_Reel.mp4";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading video:", error);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="bg-[#8B43F2] pb-8">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-8 pt-8">
          <div className="mainbuttons">
  <button className="btn-icon">
    <i className="fas fa-video"></i> Video
  </button>
  <button className="btn-icon">
    <i className="fas fa-image"></i> Photo
  </button>
  <button className="btn-icon">
    <i className="fas fa-book-open"></i> Story
  </button>
  <button className="btn-icon">
    <i className="fas fa-play-circle"></i> Reel
  </button>
  
</div>

            <h1 className="text-2xl font-bold text-white mb-2">
              Instagram Reels Video Download
            </h1>
            <p className="text-white text-sm opacity-90">
              Instagram - Reels Video Downloader
            </p>
          </div>

          <div className="flex gap-2 justify-center">
            <div className="relative flex-1 max-w-xl">
              <input
                type="text"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="Paste URL Instagram"
                className="w-full px-4 py-2 rounded-lg border border-purple-200 focus:outline-none focus:border-purple-300"
              />
            </div>
            <button
              onClick={handleDownload}
              disabled={!videoData || isLoading}
              className="px-4 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download
            </button>
          </div>

          {isLoading && (
            <div className="mt-8 text-center text-white">
              Fetching video...
            </div>
          )}
        </div>
      </div>

      {videoData && (
        <div className="mt-8 max-w-sm mx-auto px-12 pb-12">
          <div className="bg-white overflow-hidden shadow-lg videobox ">
            <video 
              controls 
              className="w-full max-w-[415px] max-h-[415px]"
            >
              <source src={videoData} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <button 
              onClick={handleDownload}
              className="w-full py-3 bg-blue-500 text-white text-center hover:bg-blue-600 transition-colors "
            >
              Download Video
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;


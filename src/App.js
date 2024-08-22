import React, { useState } from 'react';
import axios from 'axios';

const API_KEY = 'AIzaSyBhCi8s_qHtlwf3qiZwrqh1mgIfycqPTcw'; // Replace with your YouTube API key

const App = () => {
  const [query, setQuery] = useState('');
  const [videos, setVideos] = useState([]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          part: 'snippet',
          type: 'video',
          q: query,
          key: API_KEY,
          maxResults: 10,
        },
      });

      setVideos(response.data.items);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  return (
    <div>
      <h1>YouTube Video Downloader</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={query} onChange={handleChange} />
        <button type="submit">Search</button>
      </form>
      <ul>
        {videos.map((video) => (
          <li key={video.id.videoId}>
            <div>
              <img src={video.snippet.thumbnails.default.url} alt={video.snippet.title} />
            </div>
            <div>
              <p>{video.snippet.title}</p>
              {/* Provide a link to the YouTube video */}
              <a
                href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Watch on YouTube
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

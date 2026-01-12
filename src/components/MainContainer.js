import React from 'react'
import VideoTitle from './VideoTitle'
import VideoBackground from './VideoBackground';
import {useSelector} from "react-redux";

const MainContainer = () => {
    const movie = useSelector(store => store.movie);
    const { nowPlayingMovies, popularMovie, topRatedMovies, upcomingMovies, id } = movie;

    if (!nowPlayingMovies) return null;

    // Combine all movies to find the featured one by ID
    const allMovies = [
        ...(nowPlayingMovies || []),
        ...(popularMovie || []),
        ...(topRatedMovies || []),
        ...(upcomingMovies || [])
    ];

    // If 'id' exists (from click), use it. Otherwise, default to 4th movie of nowPlaying
    const featuredMovie = allMovies.find(m => m.id === id) || nowPlayingMovies[4];
    const { overview, id: featuredId, title } = featuredMovie;

    return (
        <div className="relative w-full h-[550px] lg:h-[800px] overflow-hidden bg-black">
            <VideoBackground movieId={featuredId} />
            <VideoTitle title={title} overview={overview} />
        </div>
    );
};

export default MainContainer
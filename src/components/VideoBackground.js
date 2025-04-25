import React from 'react'
import useMovieById from '../hooks/useMovieById';
import {useSelector} from "react-redux";

const VideoBackground = ({movieId,bool}) => {
    const trailerMovie = useSelector(store=>store.movie.trailerMovie);
    
    useMovieById(movieId);

    return (
        <div className="w-full overflow-hidden">
          <iframe
            className={`${
              bool
                ? "w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px]"
                : "w-screen aspect-video"
            }`}
            src={`https://www.youtube.com/embed/${trailerMovie?.key}?si=HorxQfzFY2_TAO1W&autoplay=1&mute=1`}
            title="YouTube video player"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      );
      
}

export default VideoBackground
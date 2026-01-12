import React from 'react'
import useMovieById from '../hooks/useMovieById';
import {useSelector} from "react-redux";

const VideoBackground = ({movieId,bool}) => {
    const trailerMovie = useSelector(store=>store.movie.trailerMovie);
    
    useMovieById(movieId);

    return (
        <div className="w-full h-full overflow-hidden relative">
          <iframe
            className="w-full h-full object-cover scale-[1.3] lg:scale-[1.5]"
            src={`https://www.youtube.com/embed/${trailerMovie?.key}?si=HorxQfzFY2_TAO1W&autoplay=1&loop=1&playlist=${trailerMovie?.key}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
          <div className='absolute top-0 left-0 w-full h-full bg-black/20 pointer-events-none'></div>
          <div className='absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-netflixDark to-transparent pointer-events-none'></div>
        </div>
      );
      
}

export default VideoBackground
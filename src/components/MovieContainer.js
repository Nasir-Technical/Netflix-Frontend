import React from 'react'
import MovieList from './MovieList';
import {useSelector} from "react-redux";

const MovieContainer = () => {
  const movie = useSelector(store=>store.movie);
  
  return (
    <div className="bg-black px-2 sm:px-4 md:px-8 lg:px-12">
      <div className="-mt-52 relative z-10 space-y-6 sm:space-y-8 md:space-y-10">
        <MovieList title={"Popular Movies"} movies={movie.popularMovie} />
        <MovieList title={"Now Playing Movies"} movies={movie.nowPlayingMovies} />
        <MovieList title={"Top Tated Movies"} movies={movie.topRatedMovies} />
        <MovieList title={"Upcoming Movies"} movies={movie.upcomingMovies} />
      </div>
    </div>
  )
  
}

export default MovieContainer
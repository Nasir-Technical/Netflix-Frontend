import React from 'react'
import { TMDB_IMG_URL } from '../utils/constant';
import { useDispatch } from "react-redux";
import { getId, setOpen } from '../redux/movieSlice';

const MovieCard = ({ posterPath,movieId}) => {
  const dispatch = useDispatch();

  if (posterPath === null) return null;

  

  const handleOpen = () => {
    dispatch(getId(movieId));
    dispatch(setOpen(true));
  }

  return (
    <div
      className="relative flex-none w-[140px] sm:w-[160px] md:w-[180px] lg:w-[200px] cursor-pointer transition-all duration-300 hover:scale-105 hover:z-20 group"
      onClick={handleOpen}
    >
      <img
        src={`${TMDB_IMG_URL}/${posterPath}`}
        alt="movie-banner"
        className="w-full h-auto object-cover rounded-md shadow-lg group-hover:shadow-2xl transition-all duration-300"
      />
    </div>
  )
  
}

export default MovieCard;
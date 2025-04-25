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
      className="w-48 pr-2 sm:w-36 sm:pr-1 md:w-44 lg:w-48 cursor-pointer"
      onClick={handleOpen}
    >
      <img
        src={`${TMDB_IMG_URL}/${posterPath}`}
        alt="movie-banner"
        className="w-full h-auto object-cover"
      />
    </div>
  )
  
}

export default MovieCard;
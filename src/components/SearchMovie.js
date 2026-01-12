import React, { useState } from 'react';
import axios from "axios";
import { SEARCH_MOVIE_URL, options } from '../utils/constant';
import { useDispatch, useSelector } from "react-redux";
import { setSearchMovieDetails } from '../redux/searchSlice';
import { setLoading } from '../redux/userSlice';
import MovieList from './MovieList';

const SearchMovie = () => {
    const [searchMovie, setSearchMovie] = useState("");
    const dispatch = useDispatch();
    const isLoading = useSelector(store => store.app.isLoading);
    const { movieName, searchedMovie } = useSelector(store => store.searchMovie);

    const submitHandler = async (e) => {
        e.preventDefault();
        dispatch(setLoading(true));
        try {
            const res = await axios.get(`${SEARCH_MOVIE_URL}${searchMovie}&include_adult=false&language=en-US&page=1`, options);
            const movies = res?.data?.results;
            dispatch(setSearchMovieDetails({ searchMovie, movies }));
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(setLoading(false));
        }
        setSearchMovie("");
    }

    return (
        <div className='min-h-screen bg-netflixDark pt-[100px]'>
            <div className="flex justify-center w-full px-4">
                <form
                    onSubmit={submitHandler}
                    className="w-full sm:w-[80%] md:w-[60%] lg:w-[50%]"
                >
                    <div className="flex items-center bg-[#333] p-1 rounded-sm shadow-xl transition-all duration-300 focus-within:bg-[#444]">
                        <input
                            value={searchMovie}
                            onChange={(e) => {
                                setSearchMovie(e.target.value);
                            }}
                            className="bg-transparent w-full outline-none text-white text-sm sm:text-base px-2 sm:px-4 py-2 placeholder:text-netflixLight/50"
                            type="text"
                            placeholder="What do you want to watch?"
                        />
                        <button className="bg-netflixRed text-white px-4 sm:px-8 py-2 font-bold hover:bg-red-700 transition-colors whitespace-nowrap text-sm sm:text-base">
                            {isLoading ? "..." : "Search"}
                        </button>
                    </div>
                </form>
            </div>

            {searchedMovie ? (
                <MovieList title={movieName} searchMovie={true} movies={searchedMovie} />
            ) : (
                <h1 className="text-center text-red-600 mt-4 text-base sm:text-lg">
                    Movie Not Found!!
                </h1>
            )}
        </div>
    );

}

export default SearchMovie
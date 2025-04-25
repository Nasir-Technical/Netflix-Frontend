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
        <>
            <div className="flex justify-center pt-[10%] w-full px-2 sm:px-4">
                <form
                    onSubmit={submitHandler}
                    className="w-full sm:w-[80%] md:w-[60%] lg:w-[50%]"
                >
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-4 shadow-md border-2 p-2 border-gray-200 rounded-lg w-full">
                        <input
                            value={searchMovie}
                            onChange={(e) => {
                                setSearchMovie(e.target.value);
                            }}
                            className="w-full outline-none text-black rounded-md text-base sm:text-lg px-2 py-2"
                            type="text"
                            placeholder="Search Movies..."
                        />
                        <button className="bg-red-800 text-white rounded-md px-4 py-2 text-sm sm:text-base">
                            {isLoading ? "loading..." : "Search"}
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
        </>
    );

}

export default SearchMovie
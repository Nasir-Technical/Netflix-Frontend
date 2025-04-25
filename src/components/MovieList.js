import React from 'react'
import MovieCard from './MovieCard'

const MovieList = ({ title, movies, searchMovie = false }) => {

    return (
        <div className="px-2 sm:px-4 md:px-6 lg:px-8">
            <h1
                className={`${searchMovie ? "text-black" : "text-white"
                    } text-xl sm:text-2xl md:text-3xl py-2 sm:py-3`}
            >
                {title}
            </h1>
            <div className="flex overflow-x-auto no-scrollbar cursor-pointer">
                <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
                    {movies?.map((movie) => {
                        return (
                            <MovieCard
                                key={movie.id}
                                movieId={movie.id}
                                posterPath={movie.poster_path}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );

}

export default MovieList
import React from 'react'
import MovieCard from './MovieCard'

const MovieList = ({ title, movies, searchMovie = false }) => {

    return (
        <div className="movie-list-container px-2 sm:px-4 md:px-6 lg:px-8">
            <h1
                className={`${searchMovie ? "text-black" : "text-white"
                    } text-xl sm:text-2xl md:text-3xl py-2 sm:py-3`}
            >
                {title}
            </h1>
            <div className="flex overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory">
                <div className="flex items-center gap-4 py-4">
                    {movies?.map((movie) => {
                        return (
                            <div key={movie.id} className="snap-start">
                                <MovieCard
                                    movieId={movie.id}
                                    posterPath={movie.poster_path}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );

}

export default MovieList
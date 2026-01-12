import MovieList from './MovieList';
import MovieCard from './MovieCard';
import {useSelector} from "react-redux";
import { gsap } from "gsap";
import { useLayoutEffect } from 'react';

const MovieContainer = () => {
  const movie = useSelector(store=>store.movie);

  useLayoutEffect(() => {
    if (movie.nowPlayingMovies) {
      gsap.fromTo(".movie-list-container", 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          stagger: 0.2, 
          ease: "power2.out",
          overwrite: "auto"
        }
      );
    }
  }, [movie.nowPlayingMovies]);
  
  return (
    <div className="bg-netflixDark px-4 sm:px-12 relative">
      <div className="-mt-8 sm:-mt-20 lg:-mt-40 relative z-30 space-y-8 lg:space-y-16 pb-20">
        <div id="home"><MovieList title={"Now Playing Movies"} movies={movie.nowPlayingMovies} /></div>
        <div id="popular"><MovieList title={"Popular Movies"} movies={movie.popularMovie} /></div>
        <div id="top-rated"><MovieList title={"Top Rated Movies"} movies={movie.topRatedMovies} /></div>
        <div id="upcoming"><MovieList title={"Upcoming Movies"} movies={movie.upcomingMovies} /></div>
        
        {/* Responsive Grid Section */}
        <div id="recommended" className="pt-10">
          <h1 className="text-white text-xl sm:text-2xl md:text-3xl font-bold mb-6">Recommended for You</h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {movie.popularMovie?.slice(0, 10).map((m) => (
              <div key={m.id} className="w-full">
                <MovieCard posterPath={m.poster_path} movieId={m.id} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="border-top border-white/10 pt-20 pb-10 text-netflixLight">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
            <div className="flex flex-col gap-3">
              <span className="hover:underline cursor-pointer">FAQ</span>
              <span className="hover:underline cursor-pointer">Investor Relations</span>
              <span className="hover:underline cursor-pointer">Privacy</span>
              <span className="hover:underline cursor-pointer">Speed Test</span>
            </div>
            <div className="flex flex-col gap-3">
              <span className="hover:underline cursor-pointer">Help Center</span>
              <span className="hover:underline cursor-pointer">Jobs</span>
              <span className="hover:underline cursor-pointer">Cookie Preferences</span>
              <span className="hover:underline cursor-pointer">Legal Notices</span>
            </div>
            <div className="flex flex-col gap-3">
              <span className="hover:underline cursor-pointer">Account</span>
              <span className="hover:underline cursor-pointer">Ways to Watch</span>
              <span className="hover:underline cursor-pointer">Corporate Information</span>
              <span className="hover:underline cursor-pointer">Only on Netflix</span>
            </div>
            <div className="flex flex-col gap-3">
              <span className="hover:underline cursor-pointer">Media Center</span>
              <span className="hover:underline cursor-pointer">Terms of Use</span>
              <span className="hover:underline cursor-pointer">Contact Us</span>
            </div>
          </div>
          <div className="mt-10 border border-netflixLight/20 inline-block px-4 py-2 text-xs cursor-pointer hover:text-white transition-colors">
            Service Code
          </div>
          <p className="mt-6 text-xs">&copy; 1997-2026 Netflix, Inc.</p>
        </div>
      </footer>
    </div>
  )
}

export default MovieContainer
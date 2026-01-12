import React, { useState } from 'react'
import { IoIosArrowDropdown } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom";
import { API_END_POINT, SEARCH_MOVIE_URL, options } from '../utils/constant';
import axios from "axios";
import { setUser, setLoading } from '../redux/userSlice';
import toast from "react-hot-toast";
import { setToggle } from '../redux/movieSlice';
import { setSearchMovieDetails } from '../redux/searchSlice';

const Header = () => {
    const user = useSelector((store) => store.app.user);
    const toggle = useSelector(store => store.movie.toggle);
    const [searchQuery, setSearchQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const searchHandler = async () => {
        if (!searchQuery) return;
        dispatch(setLoading(true));
        try {
            const res = await axios.get(`${SEARCH_MOVIE_URL}${searchQuery}&include_adult=false&language=en-US&page=1`, options);
            const movies = res?.data?.results;
            dispatch(setSearchMovieDetails({ searchMovie: searchQuery, movies }));
            if (!toggle) dispatch(setToggle(true));
            setSearchQuery("");
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(setLoading(false));
        }
    }

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${API_END_POINT}/logout`);
            if (res.data.success) {
                toast.success(res.data.message);
            }
            dispatch(setUser(null));
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }

    const toggleHandler = () => {
        dispatch(setToggle());
    }

    const isLoginPage = location.pathname === "/";

    const handleNavigation = (sectionId) => {
        if (isLoginPage) {
            navigate("/browse");
            return;
        }

        // Reset search view if active
        if (toggle) {
            dispatch(setToggle(false));
            // Small timeout to allow content to render before scrolling
            setTimeout(() => {
                const element = document.getElementById(sectionId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        } else {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else if (sectionId === 'home') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                toast("Feature coming soon!");
            }
        }
    };

    return (
        <div className={`fixed top-0 z-50 flex h-[60px] w-full items-center justify-between px-4 sm:px-12 ${isLoginPage ? "bg-transparent" : "bg-netflixDark"} transition-all duration-300`}>
            <div className='flex items-center gap-4 sm:gap-10'>
                <img
                    className='w-24 sm:w-28 cursor-pointer'
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1198px-Netflix_2015_logo.svg.png"
                    alt="netflix-logo"
                    onClick={() => handleNavigation('home')}
                />
                {user && !isLoginPage && (
                    <ul className='hidden lg:flex items-center gap-5 text-sm font-light text-white'>
                        <li onClick={() => handleNavigation('home')} className='cursor-pointer hover:text-netflixLight transition-colors'>Home</li>
                        <li onClick={() => handleNavigation('popular')} className='cursor-pointer hover:text-netflixLight transition-colors'>TV Shows</li>
                        <li onClick={() => handleNavigation('top-rated')} className='cursor-pointer hover:text-netflixLight transition-colors'>Movies</li>
                        <li onClick={() => handleNavigation('upcoming')} className='cursor-pointer hover:text-netflixLight transition-colors'>New & Popular</li>
                        <li onClick={() => handleNavigation('recommended')} className='cursor-pointer hover:text-netflixLight transition-colors'>My List</li>
                    </ul>
                )}
            </div>
            
            <div className='flex items-center gap-3 sm:gap-6'>
                {user && !isLoginPage && (
                    <>
                        <div className='flex items-center bg-black/40 border border-white/20 px-2 py-1 rounded-sm focus-within:bg-black/60 transition-all'>
                            <input 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && searchHandler()}
                                type="text" 
                                placeholder="Titles, people, genres" 
                                className='bg-transparent text-xs text-white outline-none w-24 sm:w-48 placeholder:text-netflixLight'
                            />
                        </div>
                        
                        <div className='group relative flex items-center gap-1 cursor-pointer py-2'>
                            <div className='w-8 h-8 rounded-sm bg-netflixRed flex items-center justify-center overflow-hidden'>
                                <FaUser className='text-white text-xl mt-1' />
                            </div>
                            <IoIosArrowDropdown className="text-white group-hover:rotate-180 transition-transform duration-300" />
                            
                            <div className='absolute top-[48px] right-0 hidden group-hover:block bg-black/90 border border-white/10 p-4 min-w-[170px] shadow-2xl pt-6'>
                                <div className='absolute -top-4 right-0 w-full h-4 bg-transparent'></div>
                                <p className='text-sm text-white mb-3 hover:underline'>{user.fullName}</p>
                                <hr className='border-white/10 mb-3' />
                                <button
                                    onClick={toggleHandler}
                                    className='w-full text-left text-sm text-white hover:underline mb-2'
                                >
                                    {toggle ? "Browse Home" : "Search Movie"}
                                </button>
                                <button
                                    onClick={logoutHandler}
                                    className='w-full text-left text-sm text-white hover:underline'
                                >
                                    Sign out of Netflix
                                </button>
                            </div>
                        </div>
                    </>
                )}
                {!user && !isLoginPage && (
                    <button 
                        onClick={() => navigate("/")}
                        className='bg-netflixRed text-white px-4 py-1 rounded-sm text-sm font-medium hover:bg-red-700 transition-colors'
                    >
                        Sign In
                    </button>
                )}
            </div>
        </div>
    )
}

export default Header
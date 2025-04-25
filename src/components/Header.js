import React from 'react'
import { IoIosArrowDropdown } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux"
import { API_END_POINT } from '../utils/constant';
import axios from "axios";
import { setUser } from '../redux/userSlice';
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { setToggle } from '../redux/movieSlice';

const Header = () => {
    const user = useSelector((store) => store.app.user);
    const toggle = useSelector(store => store.movie.toggle);
    const dispatch = useDispatch();
    const navigate = useNavigate();

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

    return (
        <div className='absolute z-10 flex w-full items-center justify-between px-4 sm:px-6 md:px-8 bg-gradient-to-b from-black/80 via-black/50 to-transparent'>
            <img
                className='w-40 sm:w-48 md:w-56 transition-all duration-200'
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1198px-Netflix_2015_logo.svg.png"
                alt="netflix-logo"
            />
            {
                user && (
                    <div className='flex items-center gap-2 sm:gap-4'>
                        <div className='hidden sm:flex items-center'>
                            <IoIosArrowDropdown className="text-white text-xl" />
                            <h1 className='text-sm md:text-base lg:text-lg font-medium text-white ml-1'>
                                {user.fullName}
                            </h1>
                        </div>
                        <div className='flex gap-1 sm:gap-2'>
                            <button
                                onClick={logoutHandler}
                                className='bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm px-3 sm:px-4 py-1 sm:py-2 rounded transition-colors duration-200'
                            >
                                Logout
                            </button>
                            <button
                                onClick={toggleHandler}
                                className='bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm px-3 sm:px-4 py-1 sm:py-2 rounded transition-colors duration-200'
                            >
                                {toggle ? "Home" : "Search Movie"}
                            </button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Header
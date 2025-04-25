import React, { useState } from 'react';
import Header from './Header';
import axios from 'axios';
import { API_END_POINT } from '../utils/constant';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '../redux/userSlice';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true); // Default to login
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoading = useSelector(store => store.app.isLoading);

    const loginHandler = () => {
        setIsLogin(!isLogin);
    };

    const getInputData = async (e) => {
        e.preventDefault();
        dispatch(setLoading(true));

        const user = isLogin ? { email, password } : { fullName, email, password };
        const endpoint = isLogin ? "/login" : "/register";

        try {
            const response = await axios.post(`${API_END_POINT}${endpoint}`, user, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            console.log("API Response: ", response);

            if (response.data && response.data.success) {
                toast.success(response.data.message);

                if (isLogin) {
                    dispatch(setUser(response.data.user));
                    navigate("/browse");
                } else {
                    setIsLogin(true);
                }
            } else {
                toast.error("Unexpected response format");
            }
        } catch (error) {
            console.error("API Error: ", error);
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("An unknown error occurred");
            }
        } finally {
            dispatch(setLoading(false));
            setFullName("");
            setEmail("");
            setPassword("");
        }
    };


    return (
        <div className="relative">
            <Header />
            <div className="fixed inset-0 -z-10">
                <img 
                    className="w-full h-full object-cover" 
                    src="https://assets.nflxext.com/ffe/siteui/vlv3/dc1cf82d-97c9-409f-b7c8-6ac1718946d6/14a8fe85-b6f4-4c06-8eaf-eccf3276d557/IN-en-20230911-popsignuptwoweeks-perspective_alpha_website_medium.jpg" 
                    alt="banner" 
                />
                <div className="absolute inset-0 bg-black/50"></div>
            </div>
    
            <form 
                onSubmit={getInputData} 
                className="flex flex-col w-11/12 sm:w-3/4 md:w-1/2 lg:w-2/5 xl:w-1/3 p-6 sm:p-8 md:p-10 my-16 sm:my-24 md:my-36 mx-auto absolute inset-x-0 items-center justify-center rounded-md bg-black/90"
            >
                <h1 className="text-2xl sm:text-3xl md:text-4xl text-white mb-4 sm:mb-6 font-bold">
                    {isLogin ? "Login" : "Signup"}
                </h1>
                
                <div className="flex flex-col w-full">
                    {!isLogin && (
                        <input 
                            value={fullName} 
                            onChange={(e) => setFullName(e.target.value)} 
                            type="text" 
                            placeholder="Fullname" 
                            className="outline-none p-2 sm:p-3 my-1 sm:my-2 rounded-sm bg-gray-700 text-white w-full"
                        />
                    )}
                    <input 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        type="email" 
                        required 
                        placeholder="Email" 
                        className="outline-none p-2 sm:p-3 my-1 sm:my-2 rounded-sm bg-gray-700 text-white w-full"
                    />
                    <input 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        type="password" 
                        required 
                        placeholder="Password" 
                        className="outline-none p-2 sm:p-3 my-1 sm:my-2 rounded-sm bg-gray-700 text-white w-full"
                    />
                    <button 
                        type="submit" 
                        className="bg-red-600 hover:bg-red-700 mt-4 sm:mt-6 p-2 sm:p-3 text-white rounded-sm font-medium transition-colors duration-200 w-full"
                    >
                        {isLoading ? "Loading..." : (isLogin ? "Login" : "Signup")}
                    </button>
                    <p className="text-white mt-2 sm:mt-3 text-center text-sm sm:text-base">
                        {isLogin ? "New to Netflix?" : "Already have an account?"}
                        <span 
                            onClick={loginHandler} 
                            className="ml-1 text-blue-400 hover:underline font-medium cursor-pointer"
                        >
                            {isLogin ? "Signup" : "Login"}
                        </span>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Login;

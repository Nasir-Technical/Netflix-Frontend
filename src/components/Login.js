import React, { useState, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import Header from './Header';
import axios from 'axios';
import { API_END_POINT } from '../utils/constant';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '../redux/userSlice';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector(store => store.app.isLoading);

  const toggleAuthMode = () => setIsLogin(!isLogin);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));

    const userPayload = isLogin ? { email, password } : { fullName, email, password };
    const endpoint = isLogin ? "login" : "register";

    try {
      const { data } = await axios.post(`${API_END_POINT}/${endpoint}`, userPayload, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true, // Important for cookies
      });

      if (data.success) {
        toast.success(data.message);

        if (isLogin) {
          dispatch(setUser(data.user));
          navigate("/browse");
        } else {
          setIsLogin(true); // switch to login after successful signup
        }
      } else {
        toast.error(data.message || "Something went wrong.");
      }

    } catch (error) {
      const msg = error.response?.data?.message || "Something went wrong!";
      toast.error(msg);
    } finally {
      dispatch(setLoading(false));
      setFullName('');
      setEmail('');
      setPassword('');
    }
  };

  useLayoutEffect(() => {
    gsap.fromTo(".login-form", 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
    );
  }, []);

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <div className="absolute top-0 left-0 w-full z-50">
        <Header />
      </div>
      <div className="absolute inset-0">
        <img 
          className="w-full h-full object-cover scale-110" 
          src="https://assets.nflxext.com/ffe/siteui/vlv3/dc1cf82d-97c9-409f-b7c8-6ac1718946d6/14a8fe85-b6f4-4c06-8eaf-eccf3276d557/IN-en-20230911-popsignuptwoweeks-perspective_alpha_website_medium.jpg" 
          alt="banner"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative flex items-center justify-center min-h-screen px-4 pt-20">
        <form 
          onSubmit={handleSubmit}
          className="login-form flex flex-col w-full max-w-[450px] p-8 sm:p-16 bg-black/95 rounded-md shadow-[0_0_40px_rgba(0,0,0,0.8)] border border-white/5"
          style={{ backgroundColor: 'rgba(0,0,0,0.95)' }}
        >
          <h1 className="text-3xl text-white mb-8 font-bold">
            {isLogin ? "Sign In" : "Sign Up"}
          </h1>

          <div className="flex flex-col w-full gap-5">
            {!isLogin && (
              <input 
                value={fullName} 
                onChange={(e) => setFullName(e.target.value)} 
                type="text" 
                placeholder="Full Name" 
                className="outline-none p-4 rounded-md bg-[#555] text-white w-full border-b-2 border-transparent focus:border-netflixRed transition-all duration-300 placeholder:text-gray-300 font-semibold"
                required
              />
            )}
            <input 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              type="email" 
              placeholder="Email or phone number" 
              className="outline-none p-4 rounded-md bg-[#555] text-white w-full border-b-2 border-transparent focus:border-netflixRed transition-all duration-300 placeholder:text-gray-300 font-semibold"
              required
            />
            <input 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              type="password" 
              placeholder="Password" 
              className="outline-none p-4 rounded-md bg-[#555] text-white w-full border-b-2 border-transparent focus:border-netflixRed transition-all duration-300 placeholder:text-gray-300 font-semibold"
              required
            />
            <button 
              type="submit" 
              className="bg-netflixRed hover:bg-[#c11119] mt-6 p-4 text-white rounded-md font-bold transition duration-300 text-lg shadow-lg active:scale-95"
            >
              {isLoading ? "Loading..." : (isLogin ? "Sign In" : "Sign Up")}
            </button>

            <div className="flex items-center justify-between text-xs text-[#b3b3b3] mt-2">
              <div className="flex items-center gap-1">
                <input type="checkbox" id="remember" className="accent-[#737373]" />
                <label htmlFor="remember">Remember me</label>
              </div>
              <span className="hover:underline cursor-pointer">Need help?</span>
            </div>

            <p className="text-[#737373] mt-10 text-base">
              {isLogin ? "New to Netflix?" : "Already have an account?"}
              <span 
                onClick={toggleAuthMode}
                className="ml-2 text-white hover:underline cursor-pointer font-medium"
              >
                {isLogin ? "Sign up now" : "Sign in now"}
              </span>
            </p>
            
            <p className="text-[#737373] text-xs mt-4 leading-normal">
              This page is protected by Google reCAPTCHA to ensure you're not a bot. <span className="text-[#0071eb] hover:underline cursor-pointer ml-1">Learn more.</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

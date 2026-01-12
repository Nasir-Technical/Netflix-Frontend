import React, { useLayoutEffect, useRef } from 'react';
import { CiPlay1 } from "react-icons/ci";
import { CiCircleInfo } from "react-icons/ci";
import { gsap } from "gsap";

const VideoTitle = ({title, overview}) => {
    const titleRef = useRef(null);
    const descRef = useRef(null);
    const btnsRef = useRef(null);

    useLayoutEffect(() => {
      const ctx = gsap.context(() => {
        gsap.from([titleRef.current, descRef.current, btnsRef.current], {
          opacity: 0,
          y: 20,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out"
        });
      });
      return () => ctx.revert();
    }, [title]);

    return (
        <div className="w-full h-full absolute top-0 left-0 flex flex-col justify-center text-white px-6 sm:px-12 z-10 bg-gradient-to-r from-black/80 via-black/30 to-transparent">
          <h1 
            ref={titleRef}
            className="text-xl sm:text-4xl md:text-5xl lg:text-7xl font-bold max-w-2xl leading-[1.1]"
          >
            {title}
          </h1>
          <p 
            ref={descRef}
            className="hidden md:block w-full md:w-1/2 lg:w-1/3 mt-4 lg:mt-6 text-sm lg:text-lg text-netflixLight line-clamp-2 lg:line-clamp-3 leading-normal"
          >
            {overview}
          </p>
          <div ref={btnsRef} className="flex items-center mt-6 lg:mt-10 gap-3 sm:gap-4">
            <button className="flex items-center justify-center px-4 sm:px-8 py-2 sm:py-3 bg-white text-black rounded-md hover:bg-white/80 transition-all duration-300 transform active:scale-95 group">
              <CiPlay1 size="28px" className='fill-black' />
              <span className="ml-2 font-bold text-base sm:text-xl">Play</span>
            </button>
            <button className="flex items-center justify-center px-4 sm:px-8 py-2 sm:py-3 bg-gray-500/50 text-white rounded-md hover:bg-gray-500/70 transition-all duration-300">
              <CiCircleInfo size="28px" className='text-white' />
              <span className="ml-2 font-bold text-base sm:text-xl">More Info</span>
            </button>
          </div>
        </div>
      );
      
}

export default VideoTitle
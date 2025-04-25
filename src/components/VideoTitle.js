import React from 'react';
import { CiPlay1 } from "react-icons/ci";
import { CiCircleInfo } from "react-icons/ci";

const VideoTitle = ({title, overview}) => {
    
    return (
        <div className="w-full absolute text-white pt-[30%] sm:pt-[25%] md:pt-[18%] px-4 sm:px-8 md:px-12">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">{title}</h1>
          <p className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 mt-4 text-sm sm:text-base">
            {overview}
          </p>
          <div className="flex flex-col sm:flex-row mt-6 sm:mt-8 gap-3 sm:gap-4">
            <button className="flex items-center justify-center px-5 py-2 bg-white text-black rounded-md hover:bg-opacity-80 text-sm sm:text-base">
              <CiPlay1 size="24px" />
              <span className="ml-2">Play</span>
            </button>
            <button className="flex items-center justify-center px-5 py-2 bg-gray-500 bg-opacity-50 text-black rounded-md text-sm sm:text-base">
              <CiCircleInfo size="24px" />
              <span className="ml-2">Watch more</span>
            </button>
          </div>
        </div>
      );
      
}

export default VideoTitle
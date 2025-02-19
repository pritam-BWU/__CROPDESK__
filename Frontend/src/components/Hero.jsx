import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <>
      {/* Prevent scrolling */}
      <style>
        {`
          html, body {
            overflow: hidden;
            height: 100%;
          }
        `}
      </style>

      <div className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
        
        {/* 🔹 Main Content */}
        <div className="absolute top-40 md:static md:-translate-y-10 -mt-20 md:mt-0 bg-white bg-opacity-20 p-4 rounded-2xl shadow-lg text-center text-white backdrop-blur-md w-[90%] md:w-auto">
          <h2 className="text-5xl font-bold md:text-5xl lg:text-6xl">
            <span className="text-white" style={{ textShadow: '2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000' }}>Crop</span>
            <span className="text-green-500 text-4xl" style={{ textShadow: '2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000' }}>desk</span>
          </h2>

          <h1 className="text-lg text-black max-w-lg mx-auto mt-4 md:text-base md:max-w-md lg:text-lg lg:max-w-lg">
            Recommendation of optimal fertilizer types and quantities based on soil health, crop types, and weather conditions.
          </h1>

          {/* Buttons */}
          <div className="mt-6 space-x-4">
            <Link to="/services" className="bg-gradient-to-r from-yellow-400 to-lime-400 bg-[length:300%_300%] animate-movingGradient text-black font-bold px-6 py-2 rounded-full shadow-lg transition-all duration-300 active:scale-90 hover:opacity-90">
              Get Started
            </Link>
          </div>
        </div>

        {/* 🔹 Background Slider (Absolutely Positioned) */}
        <div className="absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-60 mt-40 md:mt-0 w-[90vw] md:w-[70vw] h-[25vh] md:h-[60vh] overflow-hidden -z-10 rounded-xl shadow-lg">
          <div className="flex w-[200%] h-full animate-slide">
            <img src="/slider/slide1.png" className="w-1/4 object-cover h-full" alt="Slide 1" />
            <img src="/slider/slide2.png" className="w-1/4 object-cover h-full" alt="Slide 2" />
            <img src="/slider/slide3.png" className="w-1/4 object-cover h-full" alt="Slide 3" />
            <img src="/slider/slide4.png" className="w-1/4 object-cover h-full" alt="Slide 4" />
            {/* Duplicate images for infinite loop effect */}
            <img src="/slider/slide1.png" className="w-1/4 object-cover h-full" alt="Slide 1" />
            <img src="/slider/slide2.png" className="w-1/4 object-cover h-full" alt="Slide 2" />
            <img src="/slider/slide3.png" className="w-1/4 object-cover h-full" alt="Slide 3" />
            <img src="/slider/slide4.png" className="w-1/4 object-cover h-full" alt="Slide 4" />
          </div>
        </div>

        {/* 🔹 Tailwind Keyframe Animation */}
        <style>
          {`
            @keyframes slide {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .animate-slide {
              animation: slide 20s linear infinite;
            }
          `}
        </style>
      </div>
    </>
  );
};

export default Hero;

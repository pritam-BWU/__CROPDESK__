import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";

const Weather = () => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  const slideInLeftVariant = {
    hidden: { x: "-100%", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
    exit: { x: "-100%", opacity: 0, transition: { duration: 0.6 } },
  };

  const slideInRightVariant = {
    hidden: { x: "100%", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
    exit: { x: "100%", opacity: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="flex items-center justify-center p-4 md:p-6">
      <div
        ref={ref}
        className="w-full max-w-5xl mx-auto flex flex-col-reverse md:flex-row items-center gap-6 md:gap-40 p-6 md:p-10"
      >
        {/* Text Section with Background Image in Mobile */}
        <motion.div
          className="w-full md:w-1/2 text-center md:text-left bg-white bg-opacity-20 p-6 rounded-xl shadow-lg border-4 border-green-400 
          bg-[url('/image/wth.jpeg')] bg-cover bg-center md:bg-none"
          variants={slideInLeftVariant}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          exit="exit"
        >
          <h2
            className="text-2xl md:text-4xl font-bold text-green-500 mb-4 text-center md:text-left"
            style={{
              textShadow:
                "2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000",
            }}
          >
            Weather Forecast
          </h2>

          <p className="text-white leading-relaxed text-sm md:text-lg mb-6">
            Weather reports which will help to plan your day.
          </p>

          {/* Centered Button */}
          <div className="flex justify-center">
            <Link
              to="/wpr"
              className="bg-gradient-to-r from-yellow-400 to-lime-400 bg-[length:300%_300%] animate-movingGradient text-black font-bold px-6 py-2 rounded-full shadow-lg transition-all duration-300 active:scale-90 hover:opacity-90"
            >
              Click Here
            </Link>
          </div>
        </motion.div>

        {/* Image Section (Hidden in Mobile) */}
        <motion.div
          className="w-full md:w-1/2 overflow-hidden rounded-2xl shadow-lg border-4 border-green-400 p-2 hidden md:block"
          variants={slideInRightVariant}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          exit="exit"
        >
          <img
            src="/image/wth.jpeg"
            alt="Weather Forecast"
            className="w-full h-auto md:h-56 object-cover rounded-xl"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Weather;

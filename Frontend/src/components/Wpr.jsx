import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const WPr = () => {
  const navigate = useNavigate();
  const locations = ["North India", "South India", "East India", "West India"];

  const openWeatherForecast = (location) => {
    const url = `https://www.google.com/search?q=weather+${encodeURIComponent(location)}+next+7+days`;
    window.open(url, "_blank");
  };

  useEffect(() => {
    // Disable scrolling when the component mounts
    document.body.style.overflow = "hidden";

    return () => {
      // Re-enable scrolling when the component unmounts
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center relative bg-white bg-opacity-10 overflow-hidden"
      style={{
        backgroundImage: `url('/static/image/farmer2.jpeg')`,
        backgroundAttachment: "fixed",
      }}
    >
      <div className="bg-white bg-opacity-30 p-10 rounded-xl shadow-lg border-4 border-gray-300 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-black mb-6">
          Weather Forecast for Fertilization
        </h1>

        <div className="grid grid-cols-1 gap-4">
          {locations.map((location, index) => (
            <button
              key={index}
              onClick={() => openWeatherForecast(location)}
              className="w-full py-3 px-6 font-semibold text-white rounded-lg shadow-md transition-all
              border-4 bg-gradient-to-r from-green-400 to-lime-500 border-transparent
              hover:from-lime-500 hover:to-green-400 active:scale-95"
            >
              {location}
            </button>
          ))}
        </div>

        <button
          onClick={() => navigate(-1)}
          className="mt-6 px-6 py-2 bg-red-500 text-white font-bold rounded-lg shadow-md hover:bg-red-600 transition-all"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default WPr;

import React, { useState, useEffect } from "react";

const F_detection = () => {
  const [formData, setFormData] = useState({
    temperature: "",
    humidity: "",
    moisture: "",
    nitrogen: "",
    potassium: "",
    phosphorous: "",
    soil_type: "",
    crop_type: "",
  });

  const [prediction, setPrediction] = useState("Predicted Fertilizer");

  useEffect(() => {
   
    window.scrollTo(0, 0);
    
    // Disable scrolling only for desktop view
    if (window.innerWidth >= 768) {
      document.body.style.overflow = "hidden"; 
    }

    return () => {
      document.body.style.overflow = "auto"; // Re-enable scrolling when unmounting
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);

    try {
      const response = await fetch("http://127.0.0.1:5000/fertilizer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.predicted_fertilizer) {
        setPrediction(data.predicted_fertilizer);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error("Error fetching prediction:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center bg-white bg-opacity-5 sm:h-[90vh] sm:overflow-auto md:h-screen md:overflow-hidden bg-cover bg-center">
      <div className="bg-white bg-opacity-40 p-6 sm:p-4 rounded-lg shadow-lg w-full sm:max-w-md md:max-w-2xl">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Predict Fertilizer
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Two Column Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Column 1 */}
            <div>
              <label className="block">
                <span className="text-gray-700 font-semibold">Temperature:</span>
                <input
                  type="number"
                  name="temperature"
                  value={formData.temperature}
                  onChange={handleChange}
                  placeholder="Enter temperature in °C"
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  required
                />
              </label>

              <label className="block">
                <span className="text-gray-700 font-semibold">Moisture:</span>
                <input
                  type="number"
                  name="moisture"
                  value={formData.moisture}
                  onChange={handleChange}
                  placeholder="Enter moisture in %"
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  required
                />
              </label>

              <label className="block">
                <span className="text-gray-700 font-semibold">Potassium:</span>
                <input
                  type="number"
                  name="potassium"
                  value={formData.potassium}
                  onChange={handleChange}
                  placeholder="Enter potassium level in ppm"
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  required
                />
              </label>

              <label className="block">
                <span className="text-gray-700 font-semibold">Soil Type:</span>
                <select
                  name="soil_type"
                  value={formData.soil_type}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  required
                >
                  <option value="" disabled>
                    Select Soil type
                  </option>
                  <option value="0">Sandy</option>
                  <option value="1">Loamy</option>
                  <option value="2">Clayey</option>
                  <option value="3">Black</option>
                  <option value="4">Red</option>
                </select>
              </label>
            </div>

            {/* Column 2 */}
            <div>
              <label className="block">
                <span className="text-gray-700 font-semibold">Humidity:</span>
                <input
                  type="number"
                  name="humidity"
                  value={formData.humidity}
                  onChange={handleChange}
                  placeholder="Enter humidity in %"
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  required
                />
              </label>

              <label className="block">
                <span className="text-gray-700 font-semibold">Nitrogen:</span>
                <input
                  type="number"
                  name="nitrogen"
                  value={formData.nitrogen}
                  onChange={handleChange}
                  placeholder="Enter nitrogen level in ppm"
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  required
                />
              </label>

              <label className="block">
                <span className="text-gray-700 font-semibold">Phosphorus:</span>
                <input
                  type="number"
                  name="phosphorous"
                  value={formData.phosphorous}
                  onChange={handleChange}
                  placeholder="Enter phosphorus level in ppm"
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  required
                />
              </label>

              <label className="block">
                <span className="text-gray-700 font-semibold">Crop Type:</span>
                <select
                  name="crop_type"
                  value={formData.crop_type}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  required
                >
                  <option value="" disabled>
                    Select crop type
                  </option>
                  <option value="0">Maize</option>
                  <option value="1">Sugarcane</option>
                  <option value="2">Cotton</option>
                  <option value="3">Tobacco</option>
                  <option value="4">Paddy</option>
                  <option value="5">Barley</option>
                </select>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-gradient-to-r from-yellow-400 to-lime-400 bg-[length:300%_300%] animate-movingGradient text-black font-bold px-4 py-2 rounded-full shadow-lg transition-all duration-300 active:scale-90"
            >
              ENTER
            </button>
          </div>
        </form>

        {/* Prediction Output Box */}
      </div>

      <div className="mt-6 flex justify-center">
        <div className="w-64 p-3 bg-yellow-200 text-center rounded-lg shadow-md">
          <p className="text-lg font-bold text-gray-800">{prediction}</p>
        </div>
      </div>
    </div>
  );
};

export default F_detection;

import React, { useState, useEffect } from "react";

const CropYieldPrediction = () => {
  const [formData, setFormData] = useState({
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    temperature: "",
    humidity: "",
    ph: "",
    rainfall: "",
  });

  const [prediction, setPrediction] = useState("Predicted Crop Yield");
  const [imagePath, setImagePath] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);

    if (window.innerWidth >= 768) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);

    try {
      const response = await fetch("http://127.0.0.1:5000/cropyield", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          N: formData.nitrogen,
          P: formData.phosphorus,
          K: formData.potassium,
          temperature: formData.temperature,
          humidity: formData.humidity,
          ph: formData.ph,
          rainfall: formData.rainfall,
        }),
      });

      const data = await response.json();
      if (data.predicted_crop_yield) {
        const predictedCrop = data.predicted_crop_yield
          .toLowerCase()
          .replace(/\s+/g, "_");
        setPrediction(`Predicted Yield: ${data.predicted_crop_yield}`);
        setImagePath(`/crops/${predictedCrop}.jpg`);

        setTimeout(() => {
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth",
          });
        }, 300);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error("Error fetching prediction:", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center min-h-screen bg-white bg-opacity-5 bg-cover bg-center overflow-auto md:overflow-hidden md:-translate-y-8">
      <div className="bg-white bg-opacity-40 p-8 rounded-lg shadow-lg w-full md:w-2/3 max-w-2xl md:mr-4">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Crop Yield Prediction
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold">Nitrogen (N):</label>
              <input
                type="number"
                name="nitrogen"
                value={formData.nitrogen}
                onChange={handleChange}
                placeholder="Enter Nitrogen Content"
                className="w-full p-2 border border-gray-300 rounded mt-1"
                required
              />

              <label className="block font-semibold">Potassium (K):</label>
              <input
                type="number"
                name="potassium"
                value={formData.potassium}
                onChange={handleChange}
                placeholder="Enter Potassium Content"
                className="w-full p-2 border border-gray-300 rounded mt-1"
                required
              />

              <label className="block font-semibold">Humidity (%):</label>
              <input
                type="number"
                name="humidity"
                value={formData.humidity}
                onChange={handleChange}
                placeholder="Enter Humidity"
                className="w-full p-2 border border-gray-300 rounded mt-1"
                required
              />

              <label className="block font-semibold">Rainfall (mm):</label>
              <input
                type="number"
                name="rainfall"
                value={formData.rainfall}
                onChange={handleChange}
                placeholder="Enter Rainfall"
                className="w-full p-2 border border-gray-300 rounded mt-1"
                required
              />
            </div>

            <div>
              <label className="block font-semibold">Phosphorus (P):</label>
              <input
                type="number"
                name="phosphorus"
                value={formData.phosphorus}
                onChange={handleChange}
                placeholder="Enter Phosphorus Content"
                className="w-full p-2 border border-gray-300 rounded mt-1"
                required
              />

              <label className="block font-semibold">Temperature:</label>
              <input
                type="number"
                name="temperature"
                value={formData.temperature}
                onChange={handleChange}
                placeholder="Enter Temperature"
                className="w-full p-2 border border-gray-300 rounded mt-1"
                required
              />

              <label className="block font-semibold">pH:</label>
              <input
                type="number"
                name="ph"
                value={formData.ph}
                onChange={handleChange}
                placeholder="Enter pH Value"
                className="w-full p-2 border border-gray-300 rounded mt-1"
                min="0"
                max="14"
                required
              />
            </div>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-700 transition-all"
            >
              ENTER
            </button>
          </div>
        </form>
      </div>

      <div className="result-zone flex justify-center items-center w-64 h-64 border-4 border-dashed border-black md:translate-x-32 md:-translate-y-20 rounded-lg p-4 translate-y-3 text-center">
        {imagePath && (
          <img
            src={imagePath}
            alt="Predicted Crop"
            className="w-56 h-56 object-cover rounded-lg shadow-lg"
          />
        )}
      </div>

      <div className="mt-6 md:mt-4 md:w-64 p-3 bg-yellow-200 text-center rounded-lg shadow-md md:-translate-x-32 md:translate-y-28 translate-y-2">
        <p className="text-lg font-bold text-gray-800">{prediction}</p>
      </div>
    </div>
  );
};

export default CropYieldPrediction;

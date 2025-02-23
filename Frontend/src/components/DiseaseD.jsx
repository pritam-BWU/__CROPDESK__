import React, { useState, useEffect } from "react";

const DiseaseD = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [diseaseName, setDiseaseName] = useState("Disease Name");
  const [precautions, setPrecautions] = useState("Precautions will be displayed here.");
  const [fertilizers, setFertilizers] = useState("Suggested Fertilizers will be displayed here.");

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!selectedImage) return;
    const formData = new FormData();
    formData.append("image", selectedImage);
    try {
      const response = await fetch("http://127.0.0.1:5000/disease-detection", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setDiseaseName(data.disease_name || "No disease detected");
      setPrecautions(data.precautions || "No precautions available");
      setFertilizers(data.fertilizers || "No fertilizers suggested");

      // Scroll to result section in mobile view
      if (window.innerWidth < 768) {
        document.getElementById("result-section").scrollIntoView({ behavior: "smooth" });
      }
    } catch (error) {
      console.error("Error fetching disease data:", error);
    }
  };

  // Freeze screen on desktop view
  useEffect(() => {
    if (window.innerWidth >= 768) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen p-8 md:mt-12 md:overflow-hidden overflow-auto">
      {/* Drop Zone with Dotted Border */}
      <div className="w-full md:w-1/3 h-80 md:h-96 flex flex-col items-center justify-center p-4 md:p-8 border-4 border-dotted border-black rounded-lg md:ml-64 mb-8 md:mb-0">
        <h2 className="text-xl md:text-2xl font-bold mb-4">Upload Image for Disease Detection</h2>

        <div className="flex flex-col items-center justify-center w-full h-48 md:h-64 border-4 border-dotted border-black rounded-lg p-4 mb-4 bg-white relative">
          {selectedImage ? (
            <img
              src={selectedImage}
              alt="Selected"
              className="max-h-full max-w-full object-contain mb-4"
            />
          ) : (
            <p className="text-gray-500 mb-4">Drag & drop an image, or click to select</p>
          )}

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="absolute w-full h-full opacity-0 cursor-pointer"
          />
        </div>

        {/* Button Container for Parallel Alignment */}
        <div className="flex w-full justify-between gap-2 ">
          <button className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Choose File
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Detect Disease
          </button>
        </div>
      </div>

      {/* Display Results */}
      <div
        id="result-section"
        className="w-full md:w-1/3 h-80 md:h-96 flex flex-col items-center justify-center p-4 md:p-8 border-4 border-amber-200 rounded-lg md:ml-12"
      >
        <h2 className="text-lg md:text-xl font-bold text-green-700 mb-2">{diseaseName}</h2>
        <p className="mb-4 text-gray-800 text-sm md:text-base">{precautions}</p>
        <p className="text-gray-600 text-sm md:text-base">{fertilizers}</p>
      </div>
    </div>
  );
};

export default DiseaseD;

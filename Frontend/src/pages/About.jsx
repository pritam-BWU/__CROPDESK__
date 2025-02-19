import React from "react";

const About = () => {
  return (
    <section id="/about">
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center relative px-4 overflow-hidden"
      style={{ backgroundImage: "url('/static/image/farmer2.jpeg')", backgroundAttachment: "fixed" }}
    >
      <div className="w-full max-w-4xl bg-white bg-opacity-80 p-10 rounded-2xl shadow-2xl text-center border border-green-500">
        <h1 className="text-5xl font-extrabold text-green-700 border-4 border-green-600 rounded-lg px-8 py-3 inline-block mb-8 shadow-md">
          About
        </h1>
        
        <div className="text-left text-lg font-semibold text-gray-900 mb-8">
          <h2 className="text-2xl text-green-700 font-bold mb-3">Description</h2>
          <p className="text-gray-800 text-lg leading-relaxed">
            <strong className="text-green-600">Background:</strong> Excessive and improper use of fertilizers leads to soil degradation and reduced agricultural productivity, negatively impacting farmers’ income.
            <br /><br />
            <strong className="text-green-600">Description:</strong> This application provides data-driven recommendations for optimal fertilizer use based on soil health, crop type, and weather conditions. It ensures sustainable agricultural practices and enhances farming efficiency.
            <br /><br />
            <strong className="text-green-600">Expected Solution:</strong> A smart agricultural tool that analyzes soil data to provide tailored fertilizer recommendations, leading to sustainable farming, improved crop yield, and higher farmer income.
          </p>
        </div>

        <div className="text-left text-lg font-semibold text-gray-900">
          <h2 className="text-2xl text-green-700 font-bold mb-3">Objective</h2>
          <p className="text-gray-800 text-lg leading-relaxed">
            Sustainable Fertilizer Usage Optimizer for Higher Yield.
          </p>
        </div>
      </div>
    </div>
    </section>
  );
};

export default About;

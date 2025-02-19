import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Diseasedetection from "../components/Diseasedetection";
import { useLocation } from "react-router-dom";
import Fertilizer from "../components/Fertilizer";
import Cropyield from "../components/Cropyield";
import Weather from "../components/weather";
import Ecommerce from "../components/Ecommerce";


function Services() {
  const { ref, inView: isVisible } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Detect page navigation from Hero.jsx
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/services") {
      window.scrollTo(0, 0); // Ensure page loads from top
    }
  }, [location]);

  // Scroll animation handling
  const handleScroll = () => {
    const elements = document.querySelectorAll(".project-title");
    elements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
        element.classList.add("opacity-100", "scale-105", "translate-y-0");
        element.classList.remove("opacity-0", "scale-95", "translate-y-20");
      } else {
        element.classList.add("opacity-0", "scale-95", "translate-y-20");
        element.classList.remove("opacity-100", "scale-105", "translate-y-0");
      }
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <section id="projects">
        <div className=" bg-white bg-opacity-20 w-full min-h-screen  items-center justify-center overflow-hidden">
      <div className="my-16">
        <h1
                ref={ref}
                className={`project-title text-xl md:text-4xl bg-green-600 text-amber-300 font-bold text-center rounded-xl p-2 w-2/6 md:w-1/6 mx-auto transform transition-transform duration-500 border-2 ${
                 isVisible
                  ? "opacity-100 scale-105 translate-y-0"
                 : "opacity-0 scale-95 translate-y-20"
             }`}
              style={{ textShadow: '2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000' }}>
               Services
        </h1>

        </div>
        
        <div className="-translate-y-72 md:-translate-y-60 -space-y-64 md:-space-y-48">
             <Diseasedetection />
             <Fertilizer />
             <Cropyield />
             <Weather />
             <Ecommerce />
         </div>

        </div>
      </section>
    </>
  );
}

export default Services;

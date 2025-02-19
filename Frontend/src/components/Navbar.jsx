import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const cartItemCount = 8;

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Collection", href: "/collection" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contactMe" },

  ];

  return (
    <>
      {/* Transparent Navbar */}
      <div className=" fixed top-0 left-0 w-full z-50 bg-green-900 bg-opacity-95 p-3">
        <div className="flex justify-between items-center max-w-7xl mx-auto px-4">
          {/* Logo */}
          <div className="flex items-center ">
            <img
              src="/logo/Logo.jpeg"
              alt="Brand Logo"
              className="h-8 w-8 mr-3 rounded-full"
            />
            <span className="text-white font-bold text-xl">Cropdesk</span>
          </div>

          {/* Navigation Items - Centered */}
          <div className="hidden md:flex md:space-x-12 text-lg flex-1 justify-center">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.href}
                className={({ isActive }) =>
                  isActive
                    ? "text-green-400 transition-colors"
                    : "text-white hover:text-green-400 transition-colors"
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* Right Icons - Desktop */}
          <div className="hidden md:flex items-center space-x-6 text-white">
            <img
              src="/logo/search.png"
              alt="Search"
              className="h-6 w-6 cursor-pointer rounded-full hover:opacity-75 transition-opacity"
            />
            <div className="relative cursor-pointer">
              <img
                src="/logo/cart.png"
                alt="Cart"
                className="h-6 w-6 rounded-full hover:opacity-75 transition-opacity"
              />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
                  {cartItemCount}
                </span>
              )}
            </div>
            <button className="bg-gradient-to-r from-yellow-400 to-lime-400 bg-[length:300%_300%] animate-movingGradient text-black font-bold px-4 py-2 rounded-full shadow-lg transition-all duration-300 active:scale-90">
              Login
            </button>
          </div>

          {/* Mobile View - Icons & Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            {/* Search Icon */}
            <img
              src="/logo/search.png"
              alt="Search"
              className="h-6 w-6 cursor-pointer rounded-full hover:opacity-75 transition-opacity"
            />
            
            {/* Cart Icon */}
            <div className="relative cursor-pointer">
              <img
                src="/logo/cart.png"
                alt="Cart"
                className="h-6 w-6 rounded-full hover:opacity-75 transition-opacity"
              />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
                  {cartItemCount}
                </span>
              )}
            </div>

            {/* Menu Button */}
            <button
              ref={buttonRef}
              onClick={toggleMenu}
              className="bg-gradient-to-r from-yellow-400 to-lime-400 bg-[length:300%_300%] animate-movingGradient text-black font-bold px-4 py-2 rounded-full shadow-lg transition-all duration-300 active:scale-90"
            >
              Menu
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            ref={menuRef}
            className="absolute top-16 right-4 w-[50%] bg-black bg-opacity-70 p-4 flex flex-col items-center space-y-4 md:hidden z-50 transition-transform duration-300 ease-in-out rounded-xl shadow-lg"
          >
            <img
              src="/logo/User.png"
              alt="User Profile"
              className="h-16 w-16 rounded-full border-2 border-white mb-4"
            />
            <ul className="flex flex-col space-y-4 w-full text-center">
              {navItems.map((item) => (
                <li
                  key={item.label}
                  className="text-white hover:text-green-400 cursor-pointer p-2 rounded-lg transition duration-300 hover:bg-gray-800"
                >
                  <NavLink
                    to={item.href}
                    className="text-white hover:text-green-400 relative"
                    onClick={toggleMenu}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
              <hr className="w-full border-t border-gray-700" />
              <button className="bg-green-500 text-white px-4 py-2 rounded-full shadow-lg transition-all duration-300 active:scale-90">
                Login
              </button>
            </ul>
          </div>
        )}
      </div>

      {/* Padding for Content */}
      <div className="pt-16"></div>
    </>
  );
};

export default Navbar;

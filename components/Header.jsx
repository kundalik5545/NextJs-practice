import React from "react";

const Header = () => {
  return (
    <div className="fixed top-0 flex items-center justify-between px-8 py-4 bg-white/80 border-b backdrop-blur-md z-50 w-full">
      <div className="logo-section">
        <a href="/" className="gradient-title text-4xl">
          Logo
        </a>
      </div>
      <div className="Menu-section">
        <ul className="flex gap-3">
          <li>
            <a href="/" className="hover:underline hover:text-blue-500">
              Home
            </a>
          </li>
          <li>
            <a href="/about" className="hover:underline hover:text-blue-500">
              About
            </a>
          </li>
          <li>
            <a href="/services" className="hover:underline hover:text-blue-500">
              Services
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;

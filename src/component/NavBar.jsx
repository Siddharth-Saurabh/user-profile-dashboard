import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white/60 dark:bg-slate-900/60 backdrop-blur sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-xl font-bold text-blue-600">
              User<span className="text-gray-800">Dash</span>
            </Link>
            <span className="hidden sm:inline text-sm text-gray-500">Analytics & Profiles</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Desktop actions */}
            <div className="hidden sm:flex items-center gap-2">
              <button className="px-3 py-1 rounded-lg bg-white border border-gray-200 text-sm hover:bg-gray-50">Filter</button>
              <button className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700">+ Add User</button>
            </div>

            {/* Simple hamburger icon for mobile  */}
            <button className="sm:hidden p-2 rounded-md hover:bg-gray-100">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

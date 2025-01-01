import React, { useContext, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/shopContext";
import { Menu, X, Search, ShoppingCart, User } from "lucide-react";
import { assets } from "../assets/assets";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const { token, setToken, setShowSearch, getCartCount, logoutUser  } = useContext(ShopContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser()
    setIsProfileDropdownOpen(false);
  };

  const navLinks = [
    { path: "/home", label: "HOME" },
    { path: "/collection", label: "COLLECTION" },
    { path: "/about", label: "ABOUT" },
    { path: "/contact", label: "CONTACT" }
  ];

  return (
    <nav className="relative px-4 py-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/home" className="flex-shrink-0">
          <img src={assets.logo} className="w-36 h-auto" alt="Company Logo" />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center space-x-8">
          {navLinks.map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) => `
                group flex flex-col items-center transition-colors
                ${isActive ? 'text-black' : 'text-gray-600 hover:text-black'}
              `}
            >
              <span className="text-sm font-medium">{label}</span>
              <div className="h-0.5 w-0 group-hover:w-1/2 bg-black transition-all duration-300" />
            </NavLink>
          ))}
        </ul>

        {/* Right Side Icons */}
        <div className="flex items-center space-x-6">
          <button
            onClick={() => setShowSearch(true)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          <div className="relative">
            <button
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Profile"
              aria-expanded={isProfileDropdownOpen}
            >
              <User className="w-5 h-5" />
            </button>

            {/* Profile Dropdown */}
            {isProfileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                {token ? (
                  <>
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      My Profile
                    </Link>
                    <Link to="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Orders
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Login
                  </Link>
                )}
              </div>
            )}
          </div>

          <Link
            to="/cart"
            className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label={`Cart (${getCartCount()} items)`}
          >
            <ShoppingCart className="w-5 h-5" />
            {getCartCount() > 0 && (
              <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {getCartCount()}
              </span>
            )}
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-t shadow-lg md:hidden z-50">
            {navLinks.map(({ path, label }) => (
              <NavLink
                key={path}
                to={path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) => `
                  block px-4 py-3 text-sm font-medium border-b
                  ${isActive ? 'text-black bg-gray-50' : 'text-gray-600 hover:bg-gray-50'}
                `}
              >
                {label}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
      {/* Logo and Description Section */}
      <div>
        <img src={assets.logo} className="mb-5 w-32" alt="Logo" />
        <p className="w-full md:w-2/3 text-gray-600">
          This is the text for the footer
        </p>
      </div>

      {/* Company Links Section */}
      <div>
        <p className="text-xl font-medium mb-5">COMPANY</p>
        <ul className="flex flex-col gap-1 text-gray-600">
          <li>Home</li>
          <li>About Us</li>
          <li>Delivery</li>
          <li>Privacy Policy</li>
        </ul>
      </div>

      {/* Get in Touch Section */}
      <div>
        <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
        <ul className="flex flex-col gap-1 text-gray-600">
          <li>+91 7350520555</li>
          <li>nirmalabag@gmail.com</li>
        </ul>
      </div>

      {/* Copyright Section */}
      <div className="col-span-full">
        <hr className="border-t border-gray-300" />
        <p className="py-5 text-sm text-center text-gray-600">
          Copyright 2025 @ Nirmlabag.com - All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;

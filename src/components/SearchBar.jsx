import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/shopContext";
import { assets } from "../assets/assets";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const [visible, setVisiblle] = useState(false);
 const location = useLocation();
 useEffect(()=>{
 if(location.pathname.includes('collection')){
 setVisiblle(true);
 }else{
    setVisiblle(false);
 }
 },[location])
  return showSearch && visible ? (
    <div className="border-t border-b bg-gray-50 text-center py-5">
      <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 mx-3 rounded-full w-3/4 sm:w-1/2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 outline-none bg-inherit text-sm"
          type="text"
          placeholder="Search here..."
        />
        <img className="w-4 ml-2 cursor-pointer" src={assets.search_icon} alt="search" />
      </div>
      <img
        onClick={() => setShowSearch(false)} // Fixed onClick handler
        className="inline w-3 mt-2 cursor-pointer"
        src={assets.cross_icon}
        alt="close"
      />
    </div>
  ) : null;
};

export default SearchBar;

import React, { createContext, useState , useCallback } from "react";
// import { products } from "../assets/assets";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {environment} from "../environment.jsx"
// Create the context
export const ShopContext = createContext();

const BASE_URL = `${environment.API_URL}/api`;

// ShopContextProvider Component
const ShopContextProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();


  const getProducts = async () => {
  try {
      const response = await axios.get(`${BASE_URL}/product/list`);
      if(response.data.success){
        setProducts(response.data.data || [])
      } // Return the data from the API response
  } catch (error) {
      console.error("Error fetching product list:", error.message);
      throw error; // Throw error to handle it in your component
  }
};

const logoutUser = () => {
  setToken(null);
  setCartItems({}); // Clear cart items
  localStorage.removeItem("token"); // Remove token from local storage
  localStorage.removeItem("userId"); 
  navigate("/login"); // Redirect to login page
};

  const addToCart = async (itemId, size) =>{

    if(!size){
      toast.error('Select Product Size');
      return;

    }
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
   if (cartData[itemId][size]) {
     cartData[itemId][size] +=1;
   }else{
    cartData[itemId][size] = 1;   } 
    }else{
      cartData[itemId]= {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData)

    if (token) {
      try {
        await axios.post(
          `${BASE_URL}/cart/add`,
          { itemId, size },
          { headers: { Authorization: `Bearer ${token}` } } 
        );
        toast.success("Item added to cart successfully!");
        navigate('/cart');
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.message || "Something went wrong on the server!");
        } else if (error.request) {
          toast.error("No response from the server. Please try again.");
        } else {
          toast.error(error.message || "An unexpected error occurred.");
        }
      }
    } else {
      toast.error("You must be logged in to add items to the cart.");
    }
    
   }


  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {
          toast.error(error.message || "An unexpected error occurred.");
        }
      }
    }
    return totalCount;
  };
  
  const updateQuantity = async (itemId,size, quantity) => {
  let cartData = structuredClone(cartItems);
  cartData[itemId][size] = quantity;
  setCartItems(cartData);

  if (token) {
    try {
      await axios.put(
        `${BASE_URL}/cart/updateCart`, // Use template literal for URL
        { itemId, size, quantity }, // Payload for the POST request
        { headers: { Authorization: `Bearer ${token}` } } // Token in Authorization header
      );
      toast.success("Item added to cart successfully!");
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 2xx
        toast.error(error.response.data.message || "Something went wrong on the server!");
      } else if (error.request) {
        // Request was made but no response received
        toast.error("No response from the server. Please try again.");
      } else {
        // Something happened in setting up the request
        toast.error(error.message || "An unexpected error occurred.");
      }
    }
  } else {
    toast.error("You must be logged in to add items to the cart.");
  }
  }
  const getUserCart = useCallback(async () => {
    if (!token) return;

    try {
      setIsLoading(true);
      const response = await axios.get(`${BASE_URL}/cart/getData`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.success) {
        setCartItems(response.data.cartData || {});
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      if (error.response?.status === 401) {
        logoutUser();
      }
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
   let itemInfo = products.find((e)=>e._id === items);
   for(let item in cartItems[items]){
    try {
      if (cartItems[items][item] > 0) {
        totalAmount += itemInfo.price * cartItems[items][item];
      }
    } catch (error) {
      
    }

   }
      
    }
    return totalAmount;
  }


  const value = {
    products,
    currency: "$",
    delivery_fee: 10, // Fixed typo from 'delivery_free' to 'delivery_fee' for clarity
    search,
    token,
    showSearch,
    cartItems,
    BASE_URL,
    setSearch,
    setShowSearch,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    setToken,
    navigate,
    setCartItems,
    logoutUser
  };


  useEffect(() => {
    getProducts();
  },[])
  
  useEffect(() => {
    if (token) {
      getUserCart();
    }
  }, [token, getUserCart]);
  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;

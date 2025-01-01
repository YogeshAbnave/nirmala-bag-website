import React, { useState, useContext } from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/shopContext";
import axios from "axios";
import { toast } from 'react-toastify';

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});
  const {
    cartItems,
    BASE_URL,
    getCartAmount,
    setCartItems,
    products,
    delivery_fee,
    token
  } = useContext(ShopContext);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  // Form Validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.street.trim()) newErrors.street = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.zipcode.trim()) newErrors.zipcode = "Zipcode is required";
    if (!formData.country.trim()) newErrors.country = "Country is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
        userId: localStorage.getItem('userId')
      };

      // API Call for Order Placement
      switch (method) {
        case "cod":
          const response = await axios.post(BASE_URL + "/order/placeUserOrders", orderData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.data.success) {
            setCartItems({});
            toast.success("Order placed successfully!");
            navigate("/orders");
          } else {
            toast.error(response.data.message || "Something went wrong");
          }
          break;
        // Add other payment methods here (stripe, razorpay) if needed
        default:
          toast.error("Payment method is not supported");
          break;
      }
    } catch (error) {
      console.error("Error in order submission:", error);
      toast.error("An error occurred while placing the order");
    }
  };

  const navigate = useNavigate();

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      {/* Left Section */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>

        {/* First and Last Name */}
        <div className="flex gap-3">
          <div className="w-full">
            <input
              onChange={onChangeHandler}
              name="firstName"
              value={formData.firstName}
              type="text"
              className={`border border-gray-300 rounded py-1.5 px-3.5 w-full ${errors.firstName ? "border-red-500" : ""}`}
              placeholder="First name"
            />
            {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
          </div>
          <div className="w-full">
            <input
              onChange={onChangeHandler}
              name="lastName"
              value={formData.lastName}
              type="text"
              className={`border border-gray-300 rounded py-1.5 px-3.5 w-full ${errors.lastName ? "border-red-500" : ""}`}
              placeholder="Last name"
            />
            {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
          </div>
        </div>

        {/* Email */}
        <div>
          <input
            onChange={onChangeHandler}
            name="email"
            value={formData.email}
            type="email"
            className={`border border-gray-300 rounded py-1.5 px-3.5 w-full ${errors.email ? "border-red-500" : ""}`}
            placeholder="Email"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Address */}
        <div>
          <input
            onChange={onChangeHandler}
            name="street"
            value={formData.street}
            type="text"
            className={`border border-gray-300 rounded py-1.5 px-3.5 w-full ${errors.street ? "border-red-500" : ""}`}
            placeholder="Address"
          />
          {errors.street && <p className="text-red-500 text-sm mt-1">{errors.street}</p>}
        </div>

        {/* City and State */}
        <div className="flex gap-3">
          <div className="w-full">
            <input
              onChange={onChangeHandler}
              name="city"
              value={formData.city}
              type="text"
              className={`border border-gray-300 rounded py-1.5 px-3.5 w-full ${errors.city ? "border-red-500" : ""}`}
              placeholder="City"
            />
            {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
          </div>
          <div className="w-full">
            <input
              onChange={onChangeHandler}
              name="state"
              value={formData.state}
              type="text"
              className={`border border-gray-300 rounded py-1.5 px-3.5 w-full ${errors.state ? "border-red-500" : ""}`}
              placeholder="State"
            />
            {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
          </div>
        </div>

        {/* Zipcode and Country */}
        <div className="flex gap-3">
          <div className="w-full">
            <input
              onChange={onChangeHandler}
              name="zipcode"
              value={formData.zipcode}
              type="text"
              className={`border border-gray-300 rounded py-1.5 px-3.5 w-full ${errors.zipcode ? "border-red-500" : ""}`}
              placeholder="Zipcode"
            />
            {errors.zipcode && <p className="text-red-500 text-sm mt-1">{errors.zipcode}</p>}
          </div>
          <div className="w-full">
            <input
              onChange={onChangeHandler}
              name="country"
              value={formData.country}
              type="text"
              className={`border border-gray-300 rounded py-1.5 px-3.5 w-full ${errors.country ? "border-red-500" : ""}`}
              placeholder="Country"
            />
            {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
          </div>
        </div>

        {/* Phone */}
        <div>
          <input
            onChange={onChangeHandler}
            name="phone"
            value={formData.phone}
            type="text"
            className={`border border-gray-300 rounded py-1.5 px-3.5 w-full ${errors.phone ? "border-red-500" : ""}`}
            placeholder="Phone"
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>
      </div>

      {/* Right Section */}
      <div className="mt-8">
        <CartTotal />
        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() => setMethod("stripe")}
              className={`flex items-center gap-3 border p-2 px-3 cursor-pointer ${method === "stripe" ? "border-green-400" : ""}`}
            >
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "stripe" ? "bg-green-400" : ""}`}></p>
              <img className="h-5 mx-4" src={assets.stripe_logo} alt="" />
            </div>
            <div
              onClick={() => setMethod("razorepay")}
              className={`flex items-center gap-3 border p-2 px-3 cursor-pointer ${method === "razorepay" ? "border-green-400" : ""}`}
            >
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "razorepay" ? "bg-green-400" : ""}`}></p>
              <img className="h-5 mx-4" src={assets.razorpay_logo} alt="" />
            </div>
            <div
              onClick={() => setMethod("cod")}
              className={`flex items-center gap-3 border p-2 px-3 cursor-pointer ${method === "cod" ? "border-green-400" : ""}`}
            >
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "cod" ? "bg-green-400" : ""}`}></p>
              <p className="text-gray-500 text-sm font-medium mx-4">CASH ON DELIVERY</p>
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button
              onClick={handleSubmit}
              className="bg-black text-white px-16 py-3 text-sm"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;

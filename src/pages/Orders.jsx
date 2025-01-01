import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ShopContext } from '../context/shopContext';
import Title from '../components/Title';

const Orders = () => {
  const { BASE_URL, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load order data
  const loadOrderData = async () => {
    try {
      if (!token) {
        setError('No token found');
        setLoading(false);
        return;
      }
      const response = await axios.post(
        BASE_URL + "/order/userOrders",
        { userId: localStorage.getItem('userId') },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        const allOrdersItem = [];
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            allOrdersItem.push({
              ...item,
              status: order.status,
              payment: order.paid,
              paymentMethod: order.paymentMethod,
              date: new Date(order.createdAt).toLocaleDateString(),
            });
          });
        });
        setOrderData(allOrdersItem);
      } else {
        setError('No order founds.');
      }
    } catch (error) {
       setError('No order founds.');
    } finally {
      setLoading(false);
    }
  };

  // Load data on component mount
  useEffect(() => {
    loadOrderData();
  }, []);

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      {loading ? (
        <p className="text-center text-gray-500 mt-10">Loading orders...</p>
      ) : error ? (
        <p className="text-center text-red-500 mt-10">{error}</p>
      ) : (
        <div>
          {orderData.length > 0 ? (
            orderData.map((item, index) => {
              const imageSrc = item?.images?.[0] || '/path-to-default-image.jpg'; // Replace with a valid fallback image URL

              return (
                <div
                  key={index}
                  className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                >
                  <div className="flex items-start gap-6 text-sm">
                    <img className="w-16 sm:w-20" src={imageSrc} alt={item?.name} />
                    <div>
                      <p className="sm:text-base font-medium">{item.name}</p>
                      <div className="flex items-center gap-3 mt-2 text-base text-gray-500">
                        <p className="text-lg">
                          {currency}
                          {item.price}
                        </p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Size: {item.size}</p>
                      </div>
                      <p className="mt-2">
                        Date: <span className="text-gray-400">{item.date}</span>
                      </p>

                      <p className="mt-2">
                      Payment Method: <span className="text-gray-400">{item.paymentMethod}</span>
                      </p>
                    </div>
                  </div>
                  <div className="md:w-1/2 flex justify-between">
                    <div className="flex items-center gap-2">
                      <p
                        className={`min-w-2 h-2 rounded-full ${
                          item.status === 'Delivered' ? 'bg-green-500' : 'bg-yellow-500'
                        }`}
                      ></p>
                      <p className="text-sm md:text-base">{item.status}</p>
                    </div>
                    <button className="border px-4 py-2 text-sm font-medium rounded-sm">
                      Track Order
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-500 mt-10">No orders found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Orders;

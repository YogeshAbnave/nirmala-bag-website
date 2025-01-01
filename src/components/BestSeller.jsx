import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/shopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
    const {products} = useContext(ShopContext);
    const [bestseller, SetBestSeller] = useState([]);

    useEffect(()=>{
        const bestProducts = products.filter((item)=>(item.bestseller));
        SetBestSeller(bestProducts.slice(0,5))
    },[products])
  return (
    <div className='my-10'>
        <div className='text-center text-3xl py-8'>
        <Title text1="BEST" text2="SELLERS" />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          This is a React-based project
        </p>

        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 gap-y-6">
        {bestseller.map((item, i) => (
          <ProductItem
            key={i}
            id={item._id}
            image={item.images}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
      
    </div>
  )
}

export default BestSeller

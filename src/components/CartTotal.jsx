import React, { useContext } from 'react'
import { ShopContext } from '../context/shopContext'
import Title from './Title';

const CartTotal = () => {
    const {getCartAmount,  currency, delivery_fee} = useContext(ShopContext);
  return (
    <div className='w-full'>
        <div className='text-2x1'>
            <Title text1={'CART'} text2={'TOTALS'}/>
        </div>
        <div className='flex flex-col gap-2 mt-2 text-sm'>
            <div className='flex justify-between'>
                <p> Subtotal</p>
                <p>{currency}{getCartAmount()}.00</p>

            </div>
            <hr/>
            <div className='flex justify-between'>
               <p>Shipping Fee</p>
               <p> {currency} {delivery_fee}</p>
            </div>
            <hr/>
            <div className='flex justify-between'>
                <p>Total</p>
                <p>{currency} {getCartAmount() === 0 ? 0 :getCartAmount() + delivery_fee}</p>
            </div>

        </div>
      
    </div>
  )
}

export default CartTotal

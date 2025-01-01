import React from 'react';
import NewsLetterBox from '../components/NewsLetterBox';
import { assets } from '../assets/assets';
import Title from '../components/Title';

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="Contact Us" />
        <div className='flex flex-col justify-center items-center gap-6'>
          <p className='font-semibold text-xl text-gray-600'>Our Store</p>
          <p className='text-gray-500'>Shop No 3, A 4 Survey No19/2/1, Sai Nagar, Pune Saswad Road <br /> Hadapsar, Pune - 411028 (Near Satavwadi, Opposite Gliding Center)</p>
          <p className='text-gray-500'>Tel: 7350520555 <br /> Email: nirmalabagpune@gmail.com</p>
          <p className='font-semibold text-xl text-gray-600'>Careers at Forever</p>
          <p className='text-gray-500'>Learn more about our teams and job openings.</p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white'>
            Learn More
          </button>
        </div>
      </div>

      <NewsLetterBox />
    </div>
  );
};

export default Contact;

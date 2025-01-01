import React from 'react';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import NewsLetterBox from '../components/NewsLetterBox';

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="About Us" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae, possimus tempora provident ab dicta maiores tenetur soluta dolor, tempore corporis ad labore itaque! Ipsam, voluptatibus cum. Reiciendis consectetur autem est? Forever was born out of a passion for innovation and a desire to revolution</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, molestiae sed modi debitis porro aut consectetur at unde molestias atque, mollitia cumque blanditiis optio? Praesentium molestiae mollitia animi expedita totam! Since our inception, we've worked tirelessly to curate a diverse selection</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Our mission at Forever is to empower customers with choice, convenience, and</p>
        </div>
      </div>

      <div className='text-4xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurence:</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo expedita laudantium optio officiis tempore ducimus? Magnam non fuga rem fugiat ipsa sint esse. Natus libero, animi incidunt at iusto similique?</p>
        </div>

        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo expedita laudantium optio officiis tempore ducimus? Magnam non fuga rem fugiat ipsa sint esse. Natus libero, animi incidunt at iusto similique?</p>
        </div>

        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exeptional Customer Service:</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo expedita laudantium optio officiis tempore ducimus? Magnam non fuga rem fugiat ipsa sint esse. Natus libero, animi incidunt at iusto similique?</p>
        </div>


      </div>
 <NewsLetterBox/>
    </div>
  );
};

export default About;

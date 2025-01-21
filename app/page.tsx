// import Image from "next/image";
import React from 'react';
import { Card, CardContent } from "../components/ui/card";
import { MapPin, QrCode, Bike } from "lucide-react";
import Header from "../components/Header/Header"
interface Step {
  icon: React.ReactNode;
  title: string;
  description: string;
}
export default function Home() {


  return (
  <>
  <Header buttonState='signup' links={true}></Header>
   <main className='py-4 bg-gray-50 dark:bg-[#121212] lg:pt-12 lg:pb-16 transition-colors duration-300 overflow-x-hidden'>
      
      {/* Hero Section */}
      <div className='px-4 mx-auto max-w-8xl lg:px-4 lg:text-center'>
  <a href="#" className='inline-flex items-center justify-between px-1 py-1 pr-4 mb-5 text-sm text-gray-700 bg-gray-100 dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-all ease-linear rounded-full' aria-hidden="true">
    <span className='text-xs bg-emerald-500 rounded-full text-white px-4 py-1.5 mr-3'>Deals</span>
    <span className='mr-2 text-xs sm:text-sm font-medium'>Discover our new Plans for the next Month With 35% off</span>
    <i className="fa-solid fa-angle-right"></i>
  </a>
  
  <h1 className='hidden xl:block mb-4 text-4xl font-extrabold tracking-tight text-emerald-400  lg:font-extrabold lg:text-6xl lg:leading-none dark:text-white lg:text-center lg:mb-7'>
    Proshift  Connecting Visionaries with Skilled <br /> Freelancers to Shape the Future of Work
  </h1>
  <h1 className='hidden md:block xl:hidden mb-4 text-5xl font-extrabold tracking-tight text-emerald-400  lg:font-extrabold lg:text-6xl lg:leading-none dark:text-white lg:text-center lg:mb-7'>
    Proshift  Connecting Visionaries with Skilled Freelancers to Shape the Future of Work
  </h1>
  
  <h1 className='md:hidden mb-4 text-5xl tracking-tight text-emerald-400 font-extrabold lg:text-6xl lg:leading-none dark:text-white lg:text-center xl:px-36 lg:mb-7'>
    Proshift Connecting Visionaries with Skilled Freelancers to Shape the Future of Work
  </h1>
  
  <p className='mb-10 text-lg font-normal text-gray-500 dark:text-gray-400 leading-5 lg:text-center lg:text-xl  lg:hidden  xl:px-80'>
  Every project is an opportunity to create something amazing. Join us in connecting with skilled freelancers to bring your ideas to life while achieving your goals. Hire today and turn your vision into reality!
  </p>
  <p className='hidden lg:block mb-10 text-lg font-normal text-gray-500 dark:text-gray-400 lg:text-center lg:text-xl '>
  Every project is an opportunity to create something amazing. Join us in connecting with skilled freelancers to <br /> bring your ideas to life while achieving your goals. Hire today and turn your vision into reality!
  </p>
  
  <div className='flex flex-col mb-8 md:flex-row lg:justify-center'>
    <a href="#" className='text-white bg-emerald-500 hover:bg-emerald-600 hover:text-white/90 font-medium rounded-lg text-base px-6 py-2.5 text-center md:mr-5 mb-3 md:mb-0 inline-flex items-center justify-center transition-colors duration-300'>
    Services
    </a>
    <a href="#" className='text-gray-900 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white border border-gray-200 dark:border-gray-600 font-medium rounded-lg text-base px-6 py-2.5 text-center inline-flex justify-center items-center transition-colors duration-300'>
       Sell On Proshift
    </a>
  </div>
</div>

      {/* End Hero Section */}
      
      {/* How to Use Section */}
      <div className=" bg-emerald-400 dark:bg-emerald-700 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold text-white text-center mb-10 pt-20">
          </h2>
          
        </div>
      </div>
    </main>
  </>
  );
}

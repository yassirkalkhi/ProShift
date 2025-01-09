"use client";
import React, { useEffect, useState } from 'react';
import { auth } from "../../../firebase/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import firebase from 'firebase/compat/app';

interface HeaderProps {
  categories: boolean;
}

const Header: React.FC<HeaderProps> = (props) => {
  const [isClient, setIsClient] = useState(false);
  const [user, setUser] = useState<firebase.User | null>(null); //authenticated user
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user as firebase.User | null); 
    });
    setIsClient(true);
    return () => unsubscribe(); 
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth); 
      router.push("/login"); 
    } catch (error) {
      console.error("Logout Error: ", error);
    }
  };

  if (!isClient) {
    return null; 
  }

  return (
    <header>
      <div className="flex justify-between items- w-full  px-10 md:px-10 lg:px-28 xl:px-36 2xl:px-44 py-6">
          <div className="logo text-2xl sm:text-3xl text-textPrimary font-bold font-sans ">
            ProShift<span className='text-primary font-bold text-4xl ms-[1px]'>.</span>
        </div>
        <div className="search md:w-[45%] xl:w-[60%] ">
            <input type="text" placeholder='Search...' defaultValue=""  className='hidden sm:block w-full p-2 ps-2 border border-button rounded-md text-textPrimary'/>
        </div>

        <div className="links flex gap-2 md:gap-4 2xl:gap-24  items-center justify-between">
            <div className='flex items-center sm:gap-4 xl:gap-6 2xl:gap-10'>
                <a href=""  className='text-textPrimary hidden sm:block text-[0.9rem] md:text-[1rem]'>Sell on ProShift</a>
              { !user ? (<button className='bg-primary text-textPrimary text-sm font-semibold rounded-md py-2 px-5  hover:bg-primary/70 hover:text-textPrimary/70'>
                Login
                 </button>) :(<button onClick={handleLogout}>Logout</button>) }
            </div>
          
            <i className="fa-solid fa-cart-shopping text-xl text-button"></i>
        </div>
       </div>
       <div className="secondsearchbar mx-10 -mt-2">
       <input type="text" placeholder='Search...' defaultValue=""  className='sm:hidden w-full p-2 ps-2 border border-button rounded-md text-textPrimary'/>
       </div>
     { props.categories &&  <div className="bottonNavigation hidden  sm:flex bg-button h-[50px] gap-4 items-center w-full text-[0.8rem] lg:text-sm  px-10 md:px-10 lg:px-28 xl:px-36 2xl:px-44 py-6">
               <a href=""  className='hover:text-white/80 transition-all  hidden sm:block '>Graphics & Design</a>
               <a href="" className='hover:text-white/80 transition-all hidden sm:block '>Programming & Tech</a>
               <a href="" className='hover:text-white/80 transition-all  hidden sm:block'>Digital Marketing</a>
               <a href="" className='hover:text-white/80 transition-all  hidden sm:block'>Video & Animation</a>
               <a href="" className='hover:text-white/80 transition-all  hidden md:hidden'>More..</a>
               <a href="" className='hover:text-white/80 transition-all  hidden md:block'>Writing & Translation</a>
               <a href="" className='hover:text-white/80 transition-all  hidden sm:block lg:hidden '>More..</a>
               <a href="" className='hover:text-white/80 transition-all  hidden lg:block'>Music & Audio</a>
               <a href="" className='hover:text-white/80 transition-all  hidden xl:block'>Business</a>
               <a href="" className='hover:text-white/80 transition-all  hidden xl:block'>Finance</a>
               <a href="" className='hover:text-white/80 transition-all  hidden xl:block'>AI Services</a>
      </div>}
    </header>
  )
}

export default Header
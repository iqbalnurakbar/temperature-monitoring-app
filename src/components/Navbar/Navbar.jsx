import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import Newlogo from "/icons/pwa-192x192.png";

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className="absolute z-10 flex h-24 w-full max-w-[1490px] items-center justify-between px-10 text-black">
      <img src={Newlogo} alt="logo" className="w-14 md:ml-24" />
      <h1 className="w-full px-4 text-2xl font-bold text-white mt-1">MONSU.</h1>

      <ul className="mr-24 hidden text-lg font-bold text-white md:flex">
        <li className="cursor-pointer px-8 transition hover:text-emerald-900">
          <Link to="/">Home</Link>
        </li>
        <li className="mx-5 cursor-pointer px-8 transition hover:text-emerald-900">
          <Link to="/about">About</Link>
        </li>
        <li className="cursor-pointer px-8 transition hover:text-emerald-900">
          <Link to="/login">Login</Link>
        </li>
      </ul>

      <div onClick={handleNav} className="block md:hidden">
        {nav ? <AiOutlineClose size={25} /> : <AiOutlineMenu size={25} />}
      </div>
      <div className="text-center text-xl font-bold text-white">
      <ul
        className={
          nav
            ? "fixed right-8 top-20 h-56 w-[35%] rounded-2xl bg-gradient-to-b from-emerald-500 to-emerald-400"
            : "fixed left-[-100%] duration-500 ease-in-out"
        }
      >
          <li className="md:text-md mx-6 mt-5 cursor-pointer px-4 py-3 text-sm transition hover:text-emerald-900">
            <Link to="/">Home</Link>
          </li>
          <li className="md:text-md mx-6 my-3 cursor-pointer px-4 py-3 text-sm transition hover:text-emerald-900">
            <Link to="/about">About</Link>
          </li>
          <li className="md:text-md mx-6 cursor-pointer px-4 py-3 text-sm transition hover:text-emerald-900">
            <Link to="/login">Login</Link>
          </li>
      </ul>
        </div>
    </div>
  );
};

export default Navbar;

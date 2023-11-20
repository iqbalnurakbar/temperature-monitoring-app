import React from "react";
import img from "../../assets/Bg-lp-fix.png";
import Navbar from "../../Components/Navbar/Navbar";

const About = () => {
  return (
    <>
    <Navbar/>
    <div className="w-full h-screen relative bg-[url('/src/assets/Bg-lp-fix.png')]">
      <div className="bg-black/30 absolute top-0 w-full h-full flex flex-col justify-center text-white">
        <div className="md:left-[10%] max-w-[1100px] m-auto absolute p-10">
          <h2 className="text-5xl font-semibold leading-tight">About</h2>
          <p className="text-xl text-lightText my-6 text-start mr-28">
            Ini tentang kita
          </p>
        </div>
      </div>
      {/* <div className="md:w-2/4 text-center  min-h-[70vh] flex flex-col md:flex-row md:justify-around items-center md:mx-44 mx-5 mt-8">
        
      // </div>

      // <div className=" w-56 md:w-1/4 ">
      //   <img src={img} alt="img" />
      // </div> */}
    </div>
    </>
  );
};

export default About;

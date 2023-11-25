import React from "react";
import img from "../../assets/Bg-lp-fix.png";
import Navbar from "../../components/Navbar/Navbar";
const Home = () => {
  return (
    <>
      <Navbar />
      <div className="h-screen relative">
        <img
          className="h-full w-full object-cover"
          src={img}
          alt="Background"
        />
        <div className="bg-black/30 absolute top-0 w-full h-full flex flex-col justify-center text-white">
          <div className="md:left-[10%] max-w-[1100px] m-auto absolute p-10">
            <h2 className="text-5xl font-semibold leading-tight">
              Monitoring Suhu
            </h2>
            <p className="text-xl text-lightText my-6 text-start mr-28">
              Monitoring suhu multi sensor multi stasiun pada mesin ball tea
              dalam proses pengeringan daun teh berbasis Internet of Things
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

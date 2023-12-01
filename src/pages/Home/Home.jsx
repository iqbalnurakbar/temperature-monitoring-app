import React from "react";
import { useSpring, animated } from "react-spring";
import img from "../../assets/Bg-lp-fix.png";
import Navbar from "../../components/Navbar/Navbar";

const Home = () => {
  const fadeInAnimation = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 500 },
  });

  return (
    <>
      <Navbar />
      <div className="h-screen relative">
        <img className="h-full w-full object-cover" src={img} alt="Background" />
        <div
          className="bg-black/30 absolute top-0 w-full h-full flex flex-col justify-center text-white"
        >
          <animated.div className="md:left-[10%] max-w-[1100px] m-auto absolute p-10" style={fadeInAnimation}>
            <h2 className="text-5xl font-semibold leading-tight">Monitoring Suhu</h2>
            <p className="text-xl my-6 text-justify">
              Monitoring suhu multi sensor multi stasiun pada mesin ball tea dalam proses pengeringan daun teh berbasis Internet of Things
            </p>
          </animated.div>
        </div>
      </div>
    </>
  );
};

export default Home;

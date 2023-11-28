import React from "react";
import img from "../../assets/Bg-lp-fix.png";
import Navbar from "../../components/Navbar/Navbar";
import { useSpring, animated } from "react-spring";

const About = () => {
  const fadeInAnimation = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 500 },
  });

  return (
    <>
      <Navbar />
      <div className="relative h-screen">
        <img
          className="h-full w-full object-cover"
          src={img}
          alt="Background"
        />
        <div className="absolute top-0 flex h-full w-full flex-col justify-center bg-black/30 text-white">
          <animated.div className="absolute m-auto max-w-[1100px] p-10 md:left-[10%]" style={fadeInAnimation}>
            <h2 className="text-5xl font-semibold leading-tight">About</h2>
            <p className="text-lightText my-6 mr-28 text-start text-xl">
              Ini tentang kita
            </p>
          </animated.div>
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

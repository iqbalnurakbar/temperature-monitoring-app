import React, { useState, useEffect } from "react";
import Sidebar2 from "../../components/Sidebar/Sidebar2";
import HeaderIcon from "../../components/HeaderIcon/HeaderIcon";
import UserPict from "/icons/user.webp";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../pages/Auth/FirebaseAuth";
import BottomNavigationBar from "../../components/BottomNavBar/BottomNavBar";
import { useSpring, animated } from "react-spring";

const NewProfile = () => {
  const [user, setUser] = useState(null);
  const [additionalInfo, setAdditionalInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (userData) => {
      if (userData) {
        setUser(userData);

        try {
          const docRef = doc(db, "userInfo", userData.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setAdditionalInfo(docSnap.data());
          } else {
            console.log("Dokumen tidak ditemukan!");
          }
        } catch (error) {
          console.error("Error fetching additional info:", error);
        }
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const fadeInAnimation = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 500 },
  });

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="grid h-full w-full grid-cols-sensormobile gap-4 overflow-y-scroll bg-[#f0f4f8] scrollbar-thin scrollbar-thumb-[#3ebd93]  scrollbar-thumb-rounded-full md:h-[97%] md:w-[97%] md:grid-cols-sensortablet md:rounded-xl xl:grid-cols-sensorpc ">
        <div className="hidden md:flex">
          <Sidebar2 />
        </div>
        <div className="flex md:hidden">
          <BottomNavigationBar/>
        </div>
        <div className="absolute mx-auto flex w-[95%] flex-col md:static">
          <div className="flex items-center justify-between">
            <animated.h1 className="mb-10 mt-4 pl-4 text-3xl font-bold" style={fadeInAnimation}>Profil</animated.h1>
            <span className="w-1/2">
              <HeaderIcon />
            </span>
          </div>
          <div className="flex h-[60%]  justify-center">
            <animated.div className="ml-4 w-[95%] max-w-md rounded-xl border bg-white px-10 py-4 shadow-lg md:ml-0" style={fadeInAnimation}>
              <h1 className="mb-2 text-center text-xl font-bold">
                Profil Pengguna
              </h1>
              <img
                src={UserPict}
                alt="user"
                className="mx-auto h-24 w-24 rounded-full object-cover"
              />
              {user && additionalInfo && (
                <div className="text-left">
                  <p className="mb-3">
                    <span className="text-left text-sm font-bold">
                      Nama Lengkap :
                    </span>
                    <span className="text-m mt-2 flex justify-center rounded-xl border border-teal-600 bg-white p-1">
                      {additionalInfo.NamaLengkap}
                    </span>
                  </p>
                  <p className="mb-3">
                    <span className="text-sm font-bold">No Hp :</span>
                    <span className="text-m mt-2 flex justify-center rounded-xl border border-teal-600 bg-white p-1">
                      {additionalInfo.NoHp}
                    </span>
                  </p>
                  <p className="mb-3">
                    <span className="text-sm font-bold">Email :</span>
                    <span className="text-m mt-2 flex justify-center rounded-xl border border-teal-600 bg-white p-1">
                      {user.email}
                    </span>
                  </p>
                </div>
              )}
            </animated.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProfile;

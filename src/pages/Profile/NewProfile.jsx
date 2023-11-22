import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import HeaderIcon from "../../components/HeaderIcon/HeaderIcon";
import UserPict from "../../assets/Iqbal.png";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../pages/Auth/FirebaseAuth";
import BottomNavigationBar from "../../components/BottomNavBar/BottomNavBar";

const NewProfile = ({ data }) => {
  const [user, setUser] = useState(null);
  const [additionalInfo, setAdditionalInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (userData) => {
      if (userData) {
        setUser(userData);

        try {
          // Mengambil data tambahan dari Firestore
          const docRef = doc(db, "userInfo", userData.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            // Jika dokumen ada, atur informasi tambahan ke dalam state
            setAdditionalInfo(docSnap.data());
          } else {
            console.log("Dokumen tidak ditemukan!");
          }
        } catch (error) {
          console.error("Error fetching additional info:", error);
        }
      } else {
        // Pengguna tidak masuk, arahkan ke halaman login
        navigate("temperature-monitoring-app/login");
      }
    });

    // Bersihkan langganan saat komponen dibongkar
    return () => unsubscribe();
  }, [navigate]);
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="grid h-full w-full grid-cols-sensormobile gap-4 overflow-y-scroll bg-[#f0f4f8] scrollbar-thin scrollbar-thumb-[#3ebd93]  scrollbar-thumb-rounded-full md:h-[97%] md:w-[97%] md:grid-cols-sensortablet md:rounded-xl xl:grid-cols-sensorpc ">
        <div className="hidden md:flex">
          <Sidebar data={data} />
        </div>
        <div className="flex md:hidden">
          <BottomNavigationBar data={data} />
        </div>
        <div className="absolute mx-auto flex w-[95%] flex-col md:static">
          <div className="flex items-center justify-between">
            <h1 className="mb-10 mt-4 pl-4 text-3xl font-bold">Profil</h1>
            <span className="w-1/2">
              <HeaderIcon />
            </span>
          </div>
          <div className="flex h-1/2 justify-center">
            <div className="w-[95%] max-w-md rounded-xl border bg-white px-10 py-4 shadow-lg ml-4 md:ml-0">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProfile;

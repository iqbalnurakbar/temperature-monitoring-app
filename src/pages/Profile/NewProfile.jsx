import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import HeaderIcon from "../../components/HeaderIcon/HeaderIcon";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../components/Auth/FirebaseAuth";
import UserPict from "../../assets/Iqbal.png";

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
        navigate("/temperature-monitoring-app/login");
      }
    });

    // Bersihkan langganan saat komponen dibongkar
    return () => unsubscribe();
  }, [navigate]);
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="grid h-[97%] w-[97%] grid-cols-sensormobile gap-4 overflow-y-scroll rounded-xl bg-[#f0f4f8] scrollbar-thin scrollbar-thumb-[#3ebd93] scrollbar-thumb-rounded-full md:grid-cols-sensortablet xl:grid-cols-sensorpc">
        <div className="flex flex-col">
          <Sidebar data={data} />
        </div>
        <div className="flex w-[95%] flex-col">
          <div className="flex justify-between">
            <h1 className="mb-10 mt-4 pl-4 text-3xl font-bold">Profil</h1>
            <span className="w-1/2">
              <HeaderIcon />
            </span>
          </div>
          <div className="flex justify-center">
            <div className="mx-auto w-full max-w-md rounded-xl bg-white border px-10 py-4 shadow-lg">
              <h1 className="text-center text-xl font-bold mb-2">
                Profil Pengguna
              </h1>
              <img
                src={UserPict}
                alt="user"
                className="mx-auto h-24 w-24 rounded-full object-cover "
              />
              {user && additionalInfo && (
                <div className="text-left">
                  <p className="mb-3 ">
                    <span className="text-left text-sm font-bold ">
                      Nama Lengkap :
                    </span>
                    <span className="text-m mt-2 flex justify-center rounded-xl bg-white border border-teal-600 p-1">
                      {" "}
                      {additionalInfo.NamaLengkap}
                    </span>
                  </p>
                  <p className="mb-3">
                    <span className="text-sm font-bold">No Hp :</span>
                    <span className="text-m mt-2 flex justify-center rounded-xl bg-white border border-teal-600 p-1">
                      {" "}
                      {additionalInfo.NoHp}
                    </span>
                  </p>
                  <p className="mb-3">
                    <span className="text-sm font-bold">Email :</span>
                    <span className="text-m mt-2 flex justify-center rounded-xl bg-white border border-teal-600 p-1">
                      {" "}
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

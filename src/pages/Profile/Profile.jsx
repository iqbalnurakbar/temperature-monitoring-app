import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../components/Auth/FirebaseAuth";

const Profile = () => {
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

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      navigate("/temperature-monitoring-app/");
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="mx-auto w-full max-w-md rounded-xl bg-emerald-300 p-10">
        <h1 className="mb-12 text-center text-xl font-bold">Profile Page</h1>
        {user && additionalInfo && (
          <div className="text-left">
            {/* <p>UID: {user.uid}</p> */}
            <p className="mb-3 ">
              <span className="text-left text-sm font-bold ">
                Nama Lengkap :
              </span>
              <span className="text-m mt-2 flex justify-center rounded-xl bg-emerald-200 p-1">
                {" "}
                {additionalInfo.NamaLengkap}
              </span>
            </p>
            <p className="mb-3">
              <span className="text-sm font-bold">No Hp :</span>
              <span className="text-m mt-2 flex justify-center rounded-xl bg-emerald-200 p-1">
                {" "}
                {additionalInfo.NoHp}
              </span>
            </p>
            <p className="mb-3">
              <span className="text-sm font-bold">Email :</span>
              <span className="text-m mt-2 flex justify-center rounded-xl bg-emerald-200 p-1">
                {" "}
                {user.email}
              </span>
            </p>
            {/* Tambahkan informasi profil lainnya sesuai kebutuhan */}
            <button
              className="relative mx-2 mt-8 w-full cursor-pointer rounded-2xl bg-emerald-500 py-3 font-bold text-black transition hover:text-white"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

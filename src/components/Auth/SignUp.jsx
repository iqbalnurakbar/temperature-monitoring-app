import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "./FirebaseAuth";
import { doc, setDoc } from "firebase/firestore";

const SignUp = () => {
  const [namaLengkap, setNamaLengkap] = useState("");
  const [noHp, setNoHp] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // console.log(userCredential);
      const user = userCredential.user;
      const dbref = doc(db, "userInfo", user.uid);

      await setDoc(dbref, {
        NamaLengkap: namaLengkap,
        NoHp: noHp,
        Email: email,
        Password: password,
      });
      alert("Sign In Successfully");

      // localStorage.setItem("token", user.accessToken);
      // localStorage.setItem("user", JSON.stringify(user));
      navigate("/Login");
    } catch (error) {
      setError(error.message);
      console.error("Error signing up:", error);
    }
    setEmail("");
    setNamaLengkap("");
    setNoHp("");
    setPassword("");
  };

  return (
    <>
      <Navbar />
      <div className="w-full h-screen relative bg-[url('/src/assets/Bg-lp-fix.png')]">
        <div className="flex justify-center items-center h-full text-white bg-black/30">
          <form
            onSubmit={handleSubmit}
            className="max-w-[400px] w-full mx-auto bg-black/40 rounded-xl p-10"
          >
            <h1 className="text-xl font-bold text-center mb-8">Sign Up</h1>

            <div className="flex flex-col mb-4">
              <label>Nama Lengkap</label>
              <input
                className="text-center text-black rounded-xl bg-gray-100 p-1"
                type="namaLengkap"
                placeholder="Nama Lengkap"
                required
                value={namaLengkap}
                onChange={(e) => setNamaLengkap(e.target.value)}
              />
              <label className="mt-4">No Hp</label>
              <input
                className="text-center text-black rounded-xl bg-gray-100 p-1"
                type="noHp"
                placeholder="No Hp"
                required
                value={noHp}
                onChange={(e) => setNoHp(e.target.value)}
              />
              <label className="mt-4">Email</label>
              <input
                className="text-center text-black rounded-xl bg-gray-100 p-1"
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="mt-4">Password</label>
              <input
                type="password"
                className="text-center text-black rounded-xl bg-gray-100 p-1"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button className="w-full py-3 mt-8 relative rounded-2xl bg-emerald-500">
              Sign Up
            </button>

            <p className="text-center mt-8">
              Need to Sign In?
              <button className="mx-2 text-emerald-400 font-bold hover:text-white transition cursor-pointer">
                <Link to="/temperature-monitoring-app/login">Login</Link>
              </button>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;

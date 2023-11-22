import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "./FirebaseAuth";
import { doc, setDoc } from "firebase/firestore";
import Navbar from "../../components/Navbar/Navbar";
import img from "../../assets/Bg-lp-fix.png";

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
        password,
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
      <div className="relative h-screen">
        <img
          className="h-full w-full object-cover"
          src={img}
          alt="Background"
        />
        <div className="absolute top-0 flex h-full w-full items-center justify-center bg-black/30 text-white">
          <form
            onSubmit={handleSubmit}
            className="mx-auto w-full max-w-[400px] rounded-xl bg-black/40 p-10"
          >
            <h1 className="mb-8 text-center text-xl font-bold">Sign Up</h1>

            <div className="mb-4 flex flex-col">
              <label>Nama Lengkap</label>
              <input
                className="rounded-xl bg-gray-100 p-1 text-center text-black"
                type="namaLengkap"
                placeholder="Nama Lengkap"
                required
                value={namaLengkap}
                onChange={(e) => setNamaLengkap(e.target.value)}
              />
              <label className="mt-4">No Hp</label>
              <input
                className="rounded-xl bg-gray-100 p-1 text-center text-black"
                type="noHp"
                placeholder="No Hp"
                required
                value={noHp}
                onChange={(e) => setNoHp(e.target.value)}
              />
              <label className="mt-4">Email</label>
              <input
                className="rounded-xl bg-gray-100 p-1 text-center text-black"
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="mt-4">Password</label>
              <input
                type="password"
                className="rounded-xl bg-gray-100 p-1 text-center text-black"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button className="relative mt-8 w-full rounded-2xl bg-emerald-500 py-3">
              Sign Up
            </button>

            <p className="mt-8 text-center">
              Need to Sign In?
              <button className="mx-2 cursor-pointer font-bold text-emerald-400 transition hover:text-white">
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

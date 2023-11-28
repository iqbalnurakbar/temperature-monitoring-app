import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "./FirebaseAuth";
import { doc, setDoc } from "firebase/firestore";
import Navbar from "../../components/Navbar/Navbar";
import img from "../../assets/Bg-lp-fix.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSpring, animated } from "react-spring";

const SignUp = () => {
  const [namaLengkap, setNamaLengkap] = useState("");
  const [noHp, setNoHp] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      alert("Registrasi berhasil!");

      navigate("/login");
    } catch (error) {
      console.error("Error signing up:", error);
      toast.error('Terjadi kesalahan saat registrasi, coba lagi!')
    }
    setEmail("");
    setNamaLengkap("");
    setNoHp("");
    setPassword("");
  };

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
        <div className="absolute top-0 flex h-full w-full items-center justify-center bg-black/30 text-white">
          <animated.form
            onSubmit={handleSubmit}
            className="mx-auto w-full max-w-[400px] rounded-xl bg-black/40 py-4 px-10"
          style={fadeInAnimation}>
            <h1 className="mb-4 text-center text-xl font-bold">Sign Up</h1>

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
                <Link to="/login">Login</Link>
              </button>
            </p>
          </animated.form>
        </div>
      </div>
    </>
  );
};

export default SignUp;

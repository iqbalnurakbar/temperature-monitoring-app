import { signInWithEmailAndPassword} from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "./FirebaseAuth";
import Navbar from "../../components/Navbar/Navbar";
import img from "../../assets/Bg-lp-fix.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSpring, animated } from "react-spring";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const fadeInAnimation = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 500 },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      localStorage.setItem("token", user.accessToken);
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/dashboard", { replace: true });
      // Pengecekan apakah email pengguna telah diverifikasi
      if (user.emailVerified) {
        
      } else {
        // Tampilkan pesan bahwa email belum diverifikasi
        toast.warning("Silakan verifikasi email Anda sebelum login.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Email atau password kamu salah");
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="colored"
      ></ToastContainer>
      <Navbar />
      <div className="relative h-screen">
        <img
          className="h-full w-full object-cover"
          src={img}
          alt="Background"
        />
        <div className="absolute top-0 flex h-full w-full items-center justify-center bg-black/30 text-white px-3">
          <animated.form
            onSubmit={handleSubmit}
            className="mx-auto w-full max-w-[400px] rounded-xl bg-black/40 p-10"
            style={fadeInAnimation}
          >
            <h1 className="mb-8 text-center text-xl font-bold">Login</h1>

            <div className="mb-4 flex flex-col">
              <label>Email</label>
              <input
                type="email"
                className="rounded-xl bg-gray-100 p-1 text-center text-black"
                placeholder="Your Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label>Password</label>
              <input
                type="password"
                className="rounded-xl bg-gray-100 p-1 text-center text-black"
                placeholder="Your Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="relative mt-8 w-full rounded-2xl bg-emerald-500 py-3"
            >
              Login
            </button>

            <p className="mt-8 text-center">
              Need to Sign Up?
              <button className="mx-2 cursor-pointer font-bold text-emerald-400 transition hover:text-white">
                <Link to="/signup">Create Account</Link>
              </button>
            </p>
          </animated.form>
        </div>
      </div>
    </>
  );
};

export default Login;

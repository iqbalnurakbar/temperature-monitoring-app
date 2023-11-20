import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "./FirebaseAuth";
import Navbar from "../Navbar/Navbar";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      localStorage.setItem("token", user.accessToken);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/temperature-monitoring-app/dashboard");
    } catch (error) {
      setError("Email atau password kamu salah");
    }
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
            <h1 className="text-xl font-bold text-center mb-8">Login</h1>

            <div className="flex flex-col mb-4">
              <label>Email</label>
              <input
                type="email"
                className="text-center text-black rounded-xl bg-gray-100 p-1"
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
                className="text-center text-black rounded-xl bg-gray-100 p-1"
                placeholder="Your Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 mt-8 relative rounded-2xl bg-emerald-500"
            >
              Login
            </button>

            <p className="text-center mt-8">
              Need to Sign Up?
              <button className="mx-2 text-emerald-400 font-bold hover:text-white transition cursor-pointer">
                <Link to="/temperature-monitoring-app/signup">Create Account</Link>
              </button>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;

import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    // Cek apakah token dan user ada di local storage
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    // Jika tidak ada token atau user, arahkan pengguna ke halaman login
    if (!token || !user) {
      navigate("/login");
    }

    // Jika pengguna sudah login dan berada di halaman login atau landing page,
    // arahkan ke halaman lain (misalnya, "/dashboard") tanpa menambahkan entri ke dalam sejarah
    if (token && user && (location.pathname === "/login" || location.pathname === "/" || location.pathname === "/signup" || location.pathname === "/home" || location.pathname === "/about")) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate, location.pathname]);

  return element;
};

export default ProtectedRoute;

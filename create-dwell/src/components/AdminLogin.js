import React, { useState } from "react";
import { auth, db } from "../js/firebase"; // Import Firebase config
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import * as styles from "./AdminLogin.module.scss";
import { useNavigate } from "react-router-dom"; // For navigation
import logo from '../img/logo.svg';

import "../scss/base.scss";
import "../scss/admin-base.scss";

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    try {
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      console.log("Logged in:", user.email);

      // Check user role from Firestore
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userRole = userDoc.data().role;

        if (userRole === "admin") {
          console.log("User is an admin");
          navigate("/admin"); // Redirect to admin dashboard
        } else {
          setError("You do not have permission to access the admin dashboard.");
        }
      } else {
        setError("No user document found in Firestore.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <img src={logo} alt="Logo" width="250" id="logo" />
      </header>

      <main className={styles.main}>
        <div className={styles.loginContainer}>
          <h2 className={styles.h2}>Admin Login</h2>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {error && <p className={styles.error}>{error}</p>}
            <button type="submit">Login</button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AdminLogin;
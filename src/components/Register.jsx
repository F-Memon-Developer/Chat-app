import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr(false);

    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(res.user, {
        displayName,
      });

      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        displayName,
        email,
        photoURL: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y", // default avatar
      });

      await setDoc(doc(db, "userChats", res.user.uid), {});

      navigate("/");
    } catch (error) {
      console.error("Signup error:", error);
      setErr(true);
    }

    setLoading(false);
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Simple Chat</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input required type="text" placeholder="Display name" />
          <input required type="email" placeholder="Email" />
          <input required type="password" placeholder="Password" />
          <button disabled={loading}>
            {loading ? "Creating..." : "Sign up"}
          </button>
          {err && <span style={{ color: "red" }}>Something went wrong</span>}
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

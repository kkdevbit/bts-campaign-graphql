import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import { AuthContext } from "../../context/AuthContext";
const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  let navigate = useNavigate();
  const onLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <div className="navbar">
      <h1>
        <Link to="/" className="heading">
          BTS Project
        </Link>
      </h1>

      <div className="button-container">
        <button className="btn" onClick={() => navigate("campaign")}>
          Campaign
        </button>
        {user ? (
          <button className="btn" onClick={onLogout}>
            Logout
          </button>
        ) : (
          <>
            <button className="btn" onClick={() => navigate("login")}>
              Login
            </button>
            <button className="btn" onClick={() => navigate("/")}>
              Register
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;

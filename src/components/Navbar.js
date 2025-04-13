import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Navbar() {
  let navigate = useNavigate();
  let location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          NoteNest
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/about" ? "active" : ""
                }`}
                to="/about"
              >
                About
              </Link>
            </li>
          </ul>
          {!localStorage.getItem("token") ? (
            <>
              <Link className="btn btn-primary ms-2" to="/logIn" role="button">
                <i className="fa-solid fa-arrow-right-to-bracket"></i> Login
              </Link>
              <Link className="btn btn-primary ms-2" to="/signUp" role="button">
                <i className="fa-solid fa-user-plus"></i> Signup
              </Link>
            </>
          ) : (
            <button
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login"); // or navigate to login page
              }}
              className="btn btn-primary ms-2"
            >
              <i className="fa-solid fa-right-from-bracket"></i> Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

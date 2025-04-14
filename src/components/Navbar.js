import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Navbar() {
  let navigate = useNavigate();
  let location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" style={{color:"#FF0000"}}>
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
                className={`nav-link`}
                aria-current="page"
                to="/"
                style={{
                  color: location.pathname === "/" ? "#FF0000" : "#9B1C1C",
                }}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link bout`}
                to="/about"
                style={{
                  color: location.pathname === "/about" ? "#FF0000" : "#9B1C1C",
                }}
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
            <div
              className="d-flex ms-auto user-profile"
              onClick={() => {
                navigate("/userProfile");
              }}
            >
              <i className="fa-duotone fa-solid fa-user"></i>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

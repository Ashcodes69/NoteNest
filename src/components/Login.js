import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


function Login(props) {
  const [credentials, swtCredentials] = useState({ email: "", password: "" });
  const onchange = (e) => {
    swtCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  let navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();
    console.log(json);
    if (json.success === true) {
      //redirect
      localStorage.setItem("token", json.authToken);
      navigate("/")
      props.showAlert("You LoggedIn","success")
    } else {
      props.showAlert("failed to Login","danger")
    }
  };
  return (
    <div className="mt-2">
      <h2>Log-in to use NoteNest</h2>
      <form className="mt-2">
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            value={credentials.email}
            onChange={onchange}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credentials.password}
            onChange={onchange}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Log in
        </button>
      </form>
    </div>
  );
}

export default Login;

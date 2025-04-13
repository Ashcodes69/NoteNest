import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


function Signup(props) {
  const [credentials, swtCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cPassword: "",
  });
  const onchange = (e) => {
    swtCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, cPassword } = credentials;
    if(password!==cPassword){
      props.showAlert("please conform your password","danger")
      return;
    }
    const response = await fetch(`http://localhost:5000/api/auth/createUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const json = await response.json();

    if (json.success === true) {
      //redirect
      localStorage.setItem("token", json.authToken);
      navigate("/");
      props.showAlert("Your account has been created successfully","success")
    } else {
     props.showAlert("failed to SignUp","danger")
    }
  }


  return (
    <div className="container">
      <h2>Create an acount on NoteNest</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            aria-describedby="emailHelp"
            onChange={onchange}
            value={credentials.name}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            onChange={onchange}
            value={credentials.email}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={onchange}
            value={credentials.password}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cPassword" className="form-label">
            Conform Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cPassword"
            name="cPassword"
            onChange={onchange}
            value={credentials.cPassword}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
          disabled={credentials.name.length < 3 || credentials.password.length < 7}
        >
          Signup
        </button>
      </form>
    </div>
  );
}

export default Signup;

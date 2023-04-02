import React from "react";
import "./register.scss";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="register">
      <div className="card">
        <h1>Beings Social</h1>
        <form>
          <input placeholder="username" name="username" />
          <input placeholder="name" name="name" />
          <input placeholder="email" name="email" />
          <input placeholder="password" name="password" />
          <button>Sign in</button>
        </form>
        <p>
          Already have account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

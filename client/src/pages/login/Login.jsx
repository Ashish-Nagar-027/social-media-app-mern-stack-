import React from "react";
import "./login.scss";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="login">
      <div className="card">
        <h1>Beings Social</h1>
        <form>
          <input placeholder="email" name="email" />
          <input placeholder="password" name="password" />
          <button>Log in</button>
        </form>
        <p>
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

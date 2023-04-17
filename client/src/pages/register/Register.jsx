import React, { useState, useEffect } from "react";
import "./register.scss";
import { Link } from "react-router-dom";
import { useFormik } from "formik";

const Register = () => {
  function validateEmail(email) {
    return email.match(
      '/^(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/'
    );
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      console.log(values);
    },
  });

  return (
    <div className="register">
      <div className="card">
        <h1>Beings Social</h1>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <input
              placeholder="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            <p className="form-warning"></p>
          </div>
          <div>
            <input
              placeholder="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            <p className="form-warning"></p>
          </div>
          <div>
            <input
              placeholder="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            <p className="form-warning"></p>
          </div>

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

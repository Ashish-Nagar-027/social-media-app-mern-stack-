import React, { useState } from "react";
import "./login.scss";
import { Link } from "react-router-dom";
import { useFormik } from "formik";

// for formik errors
const validate = (values) => {
  const errors = {};

  if (!values.password) {
    errors.password = "Required";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  return errors;
};

const Register = () => {
  const [serverError, setServerError] = useState(null);

  const submitFunction = async (values) => {
    try {
      setServerError(null);
      const data = await fetch("http://localhost:3000/api/v1/user/login", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "same-origin"
      });
      const jsonData = await data.json();
      if (data.ok) {
        console.log(jsonData);
      } else {
        setServerError(jsonData.message);
      }
      formik.setSubmitting(false);
      formik.resetForm();
    } catch (error) {
      setServerError(error.message);
    }
  };

  // formik here
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      return submitFunction(values);
    },
  });

  return (
    <div className="login">
      <div className="card">
        <h1>Beings Social</h1>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <input
              placeholder="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            <p className="form-warning">
              {formik.errors.email && formik.touched.email && (
                <span> * {formik.errors.email} </span>
              )}
            </p>
          </div>
          <div>
            <input
              placeholder="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            <p className="form-warning">
              {formik.errors.password && formik.touched.password && (
                <span> * {formik.errors.password} </span>
              )}
            </p>
          </div>

          <button
            type="submit"
            className={formik.isSubmitting ? "form-submitting" : ""}
          >
            {formik.isSubmitting ? "Submitting" : "Login"}
          </button>
          {serverError && (
            <span className="form-warning center">{serverError}</span>
          )}
        </form>
        <p>
          Already have account? <Link to="/register">sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

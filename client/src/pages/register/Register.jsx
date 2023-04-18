import React from "react";
import "./register.scss";
import { Link } from "react-router-dom";
import { useFormik } from "formik";

// for formik errors
const validate = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = "Required";
  }

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
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // formik here
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validate,
    onSubmit: async (values) => {
      setIsSubmitting(true);

      console.log(values);
      setIsSubmitting(false);
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
            <p className="form-warning">
              {formik.errors.name && <span> * {formik.errors.name} </span>}
            </p>
          </div>
          <div>
            <input
              placeholder="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            <p className="form-warning">
              {formik.errors.email && <span> * {formik.errors.email} </span>}
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
              {formik.errors.password && (
                <span> * {formik.errors.password} </span>
              )}
            </p>
          </div>

          <button className={isSubmitting ? "form-submitting" : ""}>
            {isSubmitting ? "Submitting" : "Sign up"}
          </button>
        </form>
        <p>
          Already have account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

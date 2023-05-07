import React from "react";
import "./editUserInfo.scss";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  selectUser,
  setEditProfile,
} from "../../features/userSlice";

import { useFormik } from "formik";
import axios from "axios";

// for formik errors
const validate = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = "Required";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  return errors;
};

const EditUserInfo = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectUser);

  const submitFunction = async (values) => {
    try {
      const updateCurrentUser = await axios(
        "http://localhost:3000/api/v1/user/" + currentUser._id,
        {
          method: "PUT",
          withCredentials: true,
          data: values,
        }
      ).then((updatedData) => {
        dispatch(loginUser(updatedData.data));
      });

      formik.setSubmitting(false);
      formik.resetForm();
    } catch (error) {
      console.log(error);
    }
  };

  // formik here
  const formik = useFormik({
    initialValues: {
      name: currentUser?.name,
      email: currentUser?.email,
    },
    validate,
    onSubmit: (values) => {
      return submitFunction(values);
    },
  });

  return (
    <div
      className="edit-currentuser"
      onClick={(e) =>
        e.target.className === "edit-currentuser" && dispatch(setEditProfile())
      }
    >
      <div className="edit-model">
        <div className="model-header">
          <h2>Edit your information</h2>
          <MdClose
            className="close-model"
            size={24}
            onClick={() => dispatch(setEditProfile())}
          />
        </div>
        <div className="user-info-card">
          <div className="card">
            <h3>Beings Social</h3>
            <form onSubmit={formik.handleSubmit}>
              <div>
                <input
                  placeholder="name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
                <p className="form-warning">
                  {formik.errors.name && formik.touched.name && (
                    <span> * {formik.errors.name} </span>
                  )}
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
                  {formik.errors.email && formik.touched.email && (
                    <span> * {formik.errors.email} </span>
                  )}
                </p>
              </div>

              <button
                type="submit"
                className={formik.isSubmitting ? "form-submitting" : ""}
              >
                {formik.isSubmitting ? "saving" : "save info"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUserInfo;

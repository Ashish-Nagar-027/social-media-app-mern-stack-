import React, { useRef, useState } from "react";
import "./editUserInfo.scss";
import { MdClose, MdAddAPhoto } from "react-icons/md";
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

//===========================
//      main component
// ==========================

const EditUserInfo = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectUser);

  const submitFunction = async (values) => {
    const { name, email, cover, profilePic } = values;

    const formData = new FormData();
    if (name) {
      formData.append("name", name);
    }
    if (email) {
      formData.append("email", email);
    }
    if (cover) {
      formData.append("cover", cover);
    }
    if (profilePic) {
      formData.append("profilePic", profilePic);
    }

    try {
      const updateCurrentUser = await axios(
        "http://localhost:3000/api/v1/user/" + currentUser._id,
        {
          method: "PUT",
          withCredentials: true,
          data: formData,
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
      cover: currentUser?.coverPic?.url,
      profilePic: currentUser?.profilePic?.url,
    },
    validate,
    onSubmit: (values) => {
      return submitFunction(values);
    },
  });

  const coverPicInputRef = useRef(null);
  const profilePicInputRef = useRef(null);

  return (
    <div
      className="edit-currentuser"
      onClick={(e) =>
        e.target.className === "edit-currentuser" && dispatch(setEditProfile())
      }
    >
      <div className="edit-model">
        <div className="model-header">
          <h2>Edit Profile</h2>
          <MdClose
            className="close-model"
            size={24}
            onClick={() => dispatch(setEditProfile())}
          />
        </div>
        <div className="user-info-card">
          <div className="card">
            <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
              <div className="images">
                <div
                  className="image-div"
                  onClick={() => coverPicInputRef.current.click()}
                >
                  <img
                    src={
                      formik.values.cover
                        ? typeof formik.values.cover === "object"
                          ? URL.createObjectURL(formik.values.cover)
                          : formik.values.cover
                        : "https://images.pexels.com/photos/15953937/pexels-photo-15953937.jpeg?cs=srgb&dl=pexels-jaime-reimer-15953937.jpg&fm=jpg&_gl=1*srqdvs*_ga*MTk5NDIxNjk4Ni4xNjc1NjU4Mzkw*_ga_8JE65Q40S6*MTY4MDQ5MjAzMi41LjEuMTY4MDQ5MzQ1Ny4wLjAuMA"
                    }
                    alt=""
                    className="cover"
                  />
                  <MdAddAPhoto className="add-photo-icon add-photo-icon-top" />
                </div>
                <div
                  className="image-div"
                  onClick={() => profilePicInputRef.current.click()}
                >
                  <img
                    src={
                      formik.values.profilePic
                        ? typeof formik.values.profilePic === "object"
                          ? URL.createObjectURL(formik.values.profilePic)
                          : formik.values.profilePic
                        : "https://images.pexels.com/photos/15656117/pexels-photo-15656117.jpeg?cs=srgb&dl=pexels-aliakbar-nosrati-15656117.jpg&fm=jpg&w=640&h=760&_gl=1*rixznq*_ga*MTk5NDIxNjk4Ni4xNjc1NjU4Mzkw*_ga_8JE65Q40S6*MTY4MDkyNzY2NC42LjEuMTY4MDkyNzc1My4wLjAuMA.."
                    }
                    alt=""
                    className="profilePic"
                  />
                  <MdAddAPhoto className="add-photo-icon add-photo-icon-bottom" />
                </div>
              </div>
              <input
                hidden
                ref={coverPicInputRef}
                type="file"
                onChange={(event) => {
                  formik.setFieldValue("cover", event.target.files[0]);
                }}
              />
              <input
                hidden
                ref={profilePicInputRef}
                type="file"
                onChange={(event) => {
                  formik.setFieldValue("profilePic", event.target.files[0]);
                }}
              />
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
                disabled={formik.isSubmitting ? true : false}
                className={formik.isSubmitting ? "form-submitting" : ""}
              >
                {formik.isSubmitting ? "saving..." : "save info"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUserInfo;

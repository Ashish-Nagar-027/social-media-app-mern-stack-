import React, { useRef } from "react";
import "./editUserInfo.scss";
import { MdClose, MdAddAPhoto } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  logoutOut,
  selectUser,
  setEditProfile,
} from "../../features/userSlice";
import { CgProfile } from "react-icons/cg";

import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getBaseUrl } from "../../utility/utility";
import { toast } from "sonner";

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
  const navigate = useNavigate();

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
      await axios(getBaseUrl + "/api/v1/user/" + currentUser._id, {
        method: "PUT",
        withCredentials: true,
        data: formData,
      }).then((updatedData) => {
        dispatch(loginUser(updatedData.data));
        dispatch(setEditProfile());
        toast.success("Your Profile Updated", {
          className: "my-classname",
          duration: 3000,
        });
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

  async function logoutUserFunction() {
    if (window.confirm("Are you sure you wanna logout ?")) {
      await axios(getBaseUrl + "/api/v1/auth/logout/", {
        method: "POST",
        withCredentials: true,
      }).then(() => {
        dispatch(logoutOut);
        navigate("/login");
      });
    }
  }

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
                  className="image-div-1 image-div"
                  onClick={() => coverPicInputRef.current.click()}
                >
                  {formik.values.cover ? (
                    <img
                      src={
                        typeof formik.values.cover === "object"
                          ? URL.createObjectURL(formik.values.cover)
                          : formik.values.cover
                      }
                      alt=""
                      className="cover"
                    />
                  ) : (
                    <div className="cover bg-blank-img"></div>
                  )}
                  <MdAddAPhoto className="add-photo-icon add-photo-icon-top" />
                </div>
                <div
                  className=" image-div-2 image-div"
                  onClick={() => profilePicInputRef.current.click()}
                >
                  {formik.values.profilePic ? (
                    <img
                      src={
                        typeof formik.values.profilePic === "object"
                          ? URL.createObjectURL(formik.values.profilePic)
                          : formik.values.profilePic
                      }
                      alt=""
                      className="profilePic"
                    />
                  ) : (
                    <CgProfile className="profilePic profile-blank-img" />
                  )}
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
              <p>or</p>
            </form>
            <button onClick={logoutUserFunction}>Logout User</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUserInfo;

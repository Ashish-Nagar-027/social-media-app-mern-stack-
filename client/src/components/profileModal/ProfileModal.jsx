import React from "react";
import "./profileModal.scss";
import { Link } from "react-router-dom";

import { MdLogout, MdBookmarks } from "react-icons/md";

const ProfileModal = () => {
  return (
    <div className="profileModal">
      <div className="links">
        <Link className="view-profile-link">View your profile</Link>
        <Link>
          Logout <MdLogout />
        </Link>
        <Link>
          BookMarks <MdBookmarks />
        </Link>
      </div>
    </div>
  );
};

export default ProfileModal;

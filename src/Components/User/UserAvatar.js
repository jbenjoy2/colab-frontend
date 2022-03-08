import React from "react";
import "./UserAvatar.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
function UserAvatar({ user, updateProfilePicture }) {
  return (
    <div className="mr-2">
      {user.imageURL ? (
        <img
          width={48}
          src={user.imageURL}
          alt="profile pic"
          className="Avatar-picture"
        />
      ) : (
        <div>
          <FontAwesomeIcon icon={faCircleUser} color="grey" size="3x" />
        </div>
      )}
    </div>
  );
}

export default UserAvatar;

import React from "react";
import { useSelector } from "react-redux";

import UserAvatar from "./UserAvatar";
import "./UserDetailsCard.css";
function UserDetailsCard(props) {
  const currentUser = useSelector((st) => st.user.currentUser);
  const { projects } = currentUser;

  return (
    <div className={props.className}>
      <div className="UserDetailsCard">
        <div className="UserDetailsCard-card">
          <div className="UserDetailsCard-top d-flex align-items-center p-2">
            <UserAvatar user={currentUser} />
            <div className="d-flex flex-grow-1">
              <div className=" UserDetailsCard-fullname mr-0">
                {currentUser.firstName} {currentUser.lastName}
              </div>
              <div className="UserDetailsCard-username ml-0">
                (@{currentUser.username})
              </div>
            </div>
          </div>
          <div className="UserDetailsCard-details pl-2">
            <div className="UserDetailsCard-email">
              Email: {currentUser.email}
            </div>
            <div>Song Credits: {projects.length}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetailsCard;

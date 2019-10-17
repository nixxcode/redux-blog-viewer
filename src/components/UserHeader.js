import React from "react";

const UserHeader = ({ user }) => {
  return user ? <div className="header">{user.name}</div> : null;
};

export default UserHeader;

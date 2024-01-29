import React from "react";
import "./UserItem.css";

const UserItem = ({ user }) => {
  const { name } = user;
  return (
    <div>
      <p>name: {name}</p>
    </div>
  );
};

export default UserItem;

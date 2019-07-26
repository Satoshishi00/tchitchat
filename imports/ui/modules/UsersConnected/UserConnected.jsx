import React from "react";
import { Link } from "react-router-dom";

const UserConnected = ({ user }) => (
  <h4>
    <i className="fas fa-wifi" style={{ marginRight: "0.4em" }} />
    <Link to={`/users/${user._id}`}>{user.username}</Link>
  </h4>
);

export default UserConnected;

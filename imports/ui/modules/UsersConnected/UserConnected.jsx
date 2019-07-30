import React from "react";
import { Link } from "react-router-dom";

const UserConnected = ({ user }) => (
  <h4 className="users-item">
    {typeof user.status !== "undefined" && user.status.online === true && (
      <i
        className="fas fa-wifi"
        style={{ margin: "0 0.9em", color: "#4cd137" }}
      />
    )}
    {(typeof user.status === "undefined" || user.status.online !== true) && (
      <i
        className="fas fa-wifi"
        style={{ margin: "0 0.9em", color: "#718093" }}
      />
    )}

    <Link
      to={{
        pathname: "/user/" + user._id
      }}
    >
      {user.username}
    </Link>
  </h4>
);

export default UserConnected;

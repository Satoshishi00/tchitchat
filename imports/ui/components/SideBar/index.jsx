import React from "react";
import { slide as Menu } from "react-burger-menu";

export default props => {
  return (
    <Menu>
      <a className="menu-item" href="/signin" id="logout">
        <i className="fas fa-power-off" />
      </a>

      <a className="menu-item" href="/settings">
        <i className="fas fa-user-cog"> Profil</i>
      </a>

      <a className="menu-item" href="/users">
        <i className="fas fa-users"> Users</i>
      </a>

      <a className="menu-item" href="/rooms">
        <i className="fas fa-comment"> Chat Rooms</i>
      </a>
    </Menu>
  );
};

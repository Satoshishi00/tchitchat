import React from "react";
import { slide as Menu } from "react-burger-menu";

class Sidebar extends React.Component {
  showSettings(event) {
    event.preventDefault();
  }

  render() {
    return (
      <Menu>
        <a id="home" className="menu-item" href="/">
          Home
        </a>
        <a id="about" className="menu-item" href="/about">
          About
        </a>
        <a id="contact" className="menu-item" href="/contact">
          Contact
        </a>
        <a onClick={this.showSettings} className="menu-item--small" href="">
          Settings
        </a>
        <ul class="list-group">
          <li id="logout">
            <a href="/signin">
              <i class="fas fa-power-off" />
            </a>
          </li>
          <li>
            <a href="/settings">
              <i class="fas fa-user-cog"> Profil</i>
            </a>
          </li>
          <li>
            <a href="/users">
              <i class="fas fa-users"> Users</i>
            </a>
          </li>
          <li>
            <a href="/rooms">
              <i class="fas fa-comment"> Chat Rooms</i>
            </a>
          </li>
        </ul>
      </Menu>
    );
  }
}
export default Sidebar;

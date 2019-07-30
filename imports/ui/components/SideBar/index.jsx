import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import { slide as Menu } from "react-burger-menu";
import { Link } from "react-router-dom";

class SideBar extends Component {
  state = {};

  handleStateChange(state) {
    this.setState({ menuOpen: state.isOpen });
  }

  closeMenu() {
    this.setState({ menuOpen: false });
  }

  toggleMenu() {
    this.setState(state => ({ menuOpen: !state.menuOpen }));
  }

  disconnect() {
    this.setState({ menuOpen: false });
    Meteor.logout();
  }

  render() {
    return (
      <Menu
        isOpen={this.state.menuOpen}
        onStateChange={state => this.handleStateChange(state)}
      >
        <Link
          onClick={() => this.disconnect()}
          className="menu-item"
          to="signin"
          id="logout"
        >
          <i className="fas fa-power-off" />
        </Link>

        <Link
          onClick={() => this.closeMenu()}
          className="menu-item"
          to="../settings"
        >
          <i className="fas fa-user-cog"> Profil</i>
        </Link>

        <Link
          onClick={() => this.closeMenu()}
          className="menu-item"
          to="../users"
        >
          <i className="fas fa-users"> Users</i>
        </Link>

        <Link
          onClick={() => this.closeMenu()}
          className="menu-item"
          to="../rooms"
        >
          <i className="fas fa-comment"> Chat Rooms</i>
        </Link>
      </Menu>
    );
  }
}

export default SideBar;

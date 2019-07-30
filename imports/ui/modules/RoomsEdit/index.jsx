import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import CustomInput from "/imports/ui/components/CustomInput";
import { withTracker } from "meteor/react-meteor-data";
import Link from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Rooms from "/imports/api/Rooms";

class RoomsEdit extends Component {
  state = {
    title: Rooms.findOne(this.props.location.pathname.split("/")[3]).title
  };

  static getDerivedStateFromProps(props) {
    if (!props.userId) {
      props.history.push("/singnin");
    }
    return {};
  }

  update = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  send = () => {
    const { title } = this.state;
    const { history } = this.props;

    let id = this.props.location.pathname.split("/")[3];

    Meteor.call("rooms.update", { id, title }, err => {
      if (err) {
        toast.error(err.reason);
      } else {
        toast.success("La chatroom est devenue : " + title);
        history.push("/rooms");
      }
    });
  };

  render() {
    const { title } = this.state;
    return (
      <div id="wrapper">
        <div id="topbar">
          <h1>Room Edition</h1>
        </div>
        <CustomInput
          placeholder="Title"
          name="title"
          value={title}
          update={this.update}
        />
        <button className="btn btn-primary" onClick={this.send}>
          Update Room
        </button>
      </div>
    );
  }
}

export default withTracker(() => ({
  userId: Meteor.userId()
}))(RoomsEdit);

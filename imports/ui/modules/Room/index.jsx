import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import CustomInput from "../../components/CustomInput";
import { withTracker } from "meteor/react-meteor-data";
import Link from "react-router-dom";

import Rooms from "/imports/api/Rooms";

class Room extends Component {
  state = {
    content: ""
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
    const { content } = this.state;
    const { history } = this.props;

    let roomId = this.props.location.pathname.split("/")[2];

    Meteor.call("messages.create", { roomId, content }, err => {
      if (err) console.log(err);
      else {
        history.push(history.location.pathname);
        console.log("Message ajouté ;)");
      }
    });
  };

  render() {
    const { content } = this.state;
    let roomName = Rooms.findOne(this.props.location.pathname.split("/")[2])
      .title;
    return (
      <div>
        <h2>{roomName}</h2>
        <CustomInput
          placeholder="message"
          name="content"
          value={content}
          update={this.update}
        />
        <button className="btn btn-primary" onClick={this.send}>
          Send
        </button>
      </div>
    );
  }
}

export default withTracker(() => ({
  userId: Meteor.userId()
}))(Room);

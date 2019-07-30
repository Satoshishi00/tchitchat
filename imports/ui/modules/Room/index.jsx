import React, { Component, useCallback } from "react";
import { Meteor } from "meteor/meteor";
import LittleInput from "/imports/ui/components/LittleInput";
import CustomInput from "/imports/ui/components/CustomInput";
import LittleButton from "/imports/ui/components/LittleButton";
import { withTracker } from "meteor/react-meteor-data";
import Link from "react-router-dom";

import Rooms from "/imports/api/Rooms";
import Messages from "/imports/api/Messages";

import Loader from "/imports/ui/components/Loader";
import Message from "./Message";

import formatTime from "/imports/utils/formatTime";

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

  send = e => {
    e.preventDefault();
    const { content } = this.state;
    const { roomId } = this.props;

    Meteor.call("messages.create", { roomId, content }, err => {
      if (err) console.log(err);
      else {
        this.setState({ content: "" });
        console.log("Message ajouté ;)");
      }
    });
  };

  render() {
    const { content } = this.state;
    const { loading, messages, userId, roomId, room } = this.props;

    let roomName = "";
    if (typeof room != "undefined") {
      roomName = room.title;
    }

    return (
      <div id="wrapper">
        <div id="topbar-msg">
          <h1>{roomName}</h1>
        </div>
        <div id="chatbox">
          <div id="messages">
            <Loader
              loading={loading}
              render={messages.map(message => (
                <Message
                  key={message._id}
                  message={message}
                  roomId={roomId}
                  userId={userId}
                />
              ))}
            />
          </div>

          <form onSubmit={this.send} id="messageInput">
            <LittleInput
              placeholder="message"
              type="text"
              name="content"
              value={content}
              update={this.update}
            />
            <LittleButton>
              <i className="fas fa-paper-plane" />
            </LittleButton>
          </form>
        </div>
      </div>
    );
  }
}

export default withTracker(({ match: { params: { id } } }) => {
  const messagesPublication = Meteor.subscribe("messages.lasts", id);
  const loading = !messagesPublication.ready();
  const messages = Messages.find(
    { roomId: id },
    { sort: { createdAt: 1 } }
  ).fetch();
  const room = Rooms.findOne(id);
  return {
    userId: Meteor.userId(),
    user: Meteor.user() || {},
    roomId: id,
    loading,
    messages,
    room
  };
})(Room);

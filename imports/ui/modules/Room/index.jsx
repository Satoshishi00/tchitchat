import React, { Component } from "react";
import { Meteor } from "meteor/meteor";

import { withTracker } from "meteor/react-meteor-data";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LittleInput from "/imports/ui/components/LittleInput";
import LittleButton from "/imports/ui/components/LittleButton";
import Loader from "/imports/ui/components/Loader";

import Rooms from "/imports/api/Rooms";
import Messages from "/imports/api/Messages";

import Message from "./Message";

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
    const { loading, messages, userId, roomId, roomName } = this.props;

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
  console.log(id);
  const roomName = Meteor.call("rooms.name.by.id", { id }, err => {
    if (err) toast.error(err.reason);
  });
  console.log(roomName);
  return {
    userId: Meteor.userId(),
    user: Meteor.user() || {},
    roomId: id,
    loading,
    messages,
    roomName
  };
})(Room);

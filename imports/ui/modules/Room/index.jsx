import React, { Component, useCallback } from "react";
import { Meteor } from "meteor/meteor";
import CustomInput from "../../components/CustomInput";
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

  static getDerivedStateFromProps(props, loading) {
    if (!props.userId) {
      props.history.push("/singnin");
    }
    console.log(props);
    return {};
  }

  update = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  send = () => {
    const { content } = this.state;
    const { history } = this.props;

    let roomId = this.props.location.pathname.split("/")[2];
    let userName = Meteor.user().username;

    Meteor.call("messages.create", { roomId, content, userName }, err => {
      if (err) console.log(err);
      else {
        history.push(history.location.pathname);
        console.log("Message ajouté ;)");
      }
    });
  };

  render() {
    const { content } = this.state;
    // let loading = this.props.loading;
    // let messages = this.props.messages;
    const { loading, messages, user, userId } = this.props;
    let roomId = this.props.location.pathname.split("/")[2];
    let roomName = Rooms.findOne(roomId).title;
    console.log(formatTime(messages[0].createdAt));
    console.log(messages[0].createdAt);

    return (
      <div>
        <h2>{roomName}</h2>
        <Loader
          loading={loading}
          // TODO : ajouter la condition que le message appartienne à la room
          render={messages.map(message => (
            <Message
              key={message._id}
              message={message}
              roomId={roomId}
              userId={userId}
            />
          ))}
        />

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

export default withTracker(({ match: { params: { id } } }) => {
  const messagesPublication = Meteor.subscribe("messages.lasts", id);
  const loading = !messagesPublication.ready();
  const messages = Messages.find(
    { roomId: id },
    { sort: { createdAt: 1 } }
  ).fetch();
  return {
    userId: Meteor.userId(),
    user: Meteor.user() || {},
    loading,
    messages
  };
})(Room);

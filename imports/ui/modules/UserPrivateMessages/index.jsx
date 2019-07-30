import React, { Component, useCallback } from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import { Link } from "react-router-dom";

import Messages from "/imports/api/Messages";

import LittleInput from "/imports/ui/components/LittleInput";
import LittleButton from "/imports/ui/components/LittleButton";
import Loader from "/imports/ui/components/Loader";
import Message from "./Message";

class UserPrivateMessages extends Component {
  state = {
    content: ""
  };

  update = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  send = e => {
    e.preventDefault();
    const { content } = this.state;
    const { contactUser } = this.props;
    let listIds = [Meteor.userId(), contactUser._id];
    listIds.sort();
    let usersIds = listIds[0] + "/" + listIds[1];

    Meteor.call("messages_private.create", { content, usersIds }, err => {
      if (err) console.log(err);
      else {
        this.setState({ content: "" });
        console.log("Message ajouté ;)");
      }
    });
  };

  render() {
    const { content } = this.state;
    const { loading, messages, contactUser } = this.props;
    return (
      <div>
        {typeof contactUser != "undefined" && (
          <div id="wrapper">
            <div id="topbar-msg">
              <h1>{contactUser.username}</h1>
              <Link to="/users" id="close">
                <i className="fas fa-times fa-3x" />
              </Link>
            </div>

            {loading === false && (
              <div id="chatbox">
                <div id="messages">
                  <Loader
                    loading={loading}
                    render={messages.map(message => (
                      <Message
                        key={message._id}
                        message={message}
                        userId={Meteor.userId()}
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
            )}
          </div>
        )}
      </div>
    );
  }
}

export default withTracker(({ match: { params: { id } } }) => {
  let loading = true;
  let messages = [];
  let contactUser = Meteor.users.findOne(id);
  if (typeof contactUser != "undefined") {
    let listIds = [Meteor.userId(), contactUser._id];
    listIds.sort();
    let usersIds = listIds[0] + "/" + listIds[1];
    let messagesPublication = Meteor.subscribe(
      "messages.privates.lasts",
      usersIds
    );
    loading = !messagesPublication.ready();

    messages = Messages.find(
      { usersIds: usersIds },
      { sort: { createdAt: -1 } }
    ).fetch();
  }

  return {
    loading,
    contactUser,
    messages
  };
})(UserPrivateMessages);

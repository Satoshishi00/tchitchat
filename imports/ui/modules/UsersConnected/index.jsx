import React, { Component, useCallback } from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import Loader from "/imports/ui/components/Loader";
import UserConnected from "./UserConnected";
import LittleInput from "/imports/ui/components/LittleInput";
import LittleButton from "/imports/ui/components/LittleButton";
import Message from "./Message";
import Messages from "/imports/api/Messages";

class UsersConnected extends Component {
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
    console.log(usersIds);

    Meteor.call("messages_private.create", { content, usersIds }, err => {
      if (err) console.log(err);
      else {
        this.setState({ content: "" });
        console.log("Message ajouté ;)");
      }
    });
  };

  render() {
    console.log(this.props);
    const { content } = this.state;
    const { users, contactUser, loading, messages } = this.props;
    return (
      <div id="wrapper">
        <div id="topbar">
          <h1>Users</h1>
        </div>
        <div id="rooms">
          {users.map(user => (
            <UserConnected key={user._id} user={user} />
          ))}
        </div>
        {typeof contactUser != "undefined" && (
          <div>
            <h2>{contactUser.username}</h2>
            {console.log("Messages : " + messages)}
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
            <form
              onSubmit={this.send}
              style={{ display: "flex" }}
              id="messageInput"
            >
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
    );
  }
}

export default withTracker(({ match: { params: { id } } }) => {
  // let users = Meteor.users.find({ "status.online": true }).fetch();
  let users = Meteor.users.find({}, { sort: { username: 1 } }).fetch();
  users.map(user => {
    if (typeof user.status !== "undefined") {
      console.log(user.status.online);
    }
  });
  // users = Meteor.subscribe("userStatus");
  let loading = false;
  // if (!loading) {
  //   console.log(users.fetch());
  // }

  let messages = [];
  let contactUser = Meteor.users.findOne(id);
  if (typeof contactUser != "undefined") {
    let listIds = [Meteor.userId(), contactUser._id];
    listIds.sort();
    let usersIds = listIds[0] + "/" + listIds[1];

    messages = Messages.find(
      { usersIds: usersIds },
      { sort: { createdAt: 1 } }
    ).fetch();
  }

  return {
    userId: Meteor.userId(),
    users,
    loading,
    contactUser,
    messages
  };
})(UsersConnected);

import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import CustomInput from "/imports/ui/components/CustomInput";
import { withTracker } from "meteor/react-meteor-data";
import Link from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class RoomsAdd extends Component {
  state = {
    title: ""
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

    Meteor.call("rooms.create", { title }, err => {
      if (err) {
        toast.error(err.reason);
      } else {
        toast.success("La chatroom " + title + " a bien été créée !");
        history.push("/rooms");
      }
    });
  };

  render() {
    const { title } = this.state;
    return (
      <div>
        <h1>Add Room</h1>
        <CustomInput
          placeholder="Title"
          name="title"
          value={title}
          update={this.update}
        />
        <button className="btn btn-primary" onClick={this.send}>
          Build Room
        </button>
      </div>
    );
  }
}

export default withTracker(() => ({
  userId: Meteor.userId()
}))(RoomsAdd);

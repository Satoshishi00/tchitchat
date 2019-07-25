import { Meteor } from "meteor/meteor";
import React, { useState, useCallback } from "react";
import { Accounts } from "meteor/accounts-base";
import { Link } from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data";
import Fields from "./Fields";

const Settings = ({ username, email, id }) => {
  return (
    <div>
      <h1>Account</h1>
      <ul className="list-group">
        <li className="list-group-item">
          <span className="col-md-1">Username :</span>
          <span>{username}</span>
        </li>
        <li className="list-group-item">
          <span className="col-md-1">Email :</span>
          {email}
        </li>
        <li className="list-group-item">
          <span className="col-md-1">Id :</span>
          {id}
        </li>
      </ul>
    </div>
  );
};

const SettingsWithTracker = withTracker(() => {
  const user = Meteor.user() || {};
  return {
    username: user.username,
    email: user.emails[0].address,
    id: user._id
  };
})(Settings);

export default SettingsWithTracker;

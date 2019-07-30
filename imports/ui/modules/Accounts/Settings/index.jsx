import { Meteor } from "meteor/meteor";
import React from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Link } from "react-router-dom";
import formatTime from "/imports/utils/formatTime";

const Settings = ({ user }) => {
  return (
    <div id="wrapper">
      <div id="topbar">
        <h1>Account</h1>
      </div>

      {typeof user !== null && (
        <div>
          <Link className="btn-update" to={`../../settings/edit`}>
            Editer
          </Link>
          <div className="item-center">
            <ul className="list-group">
              <li className="list-group-item">
                <span className="col-md-1">Username :</span>
                <span>{user.username}</span>
              </li>
              <li className="list-group-item">
                <span className="col-md-1">Email :</span>
                {user.emails[0].address}
              </li>
              <li className="list-group-item">
                <span className="col-md-1">City :</span>
                {user.city}
              </li>
              <li className="list-group-item">
                <span className="col-md-1">Birthdate :</span>
                {user.birthdate ? formatTime(user.birthdate) : ""}
              </li>
              <li className="list-group-item">
                <span className="col-md-1">Gender :</span>
                {user.gender}
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

const SettingsWithTracker = withTracker(() => {
  let user = Meteor.user() || null;
  return {
    user
  };
})(Settings);

export default SettingsWithTracker;

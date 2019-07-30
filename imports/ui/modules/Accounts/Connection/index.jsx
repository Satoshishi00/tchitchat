import React, { useState, useCallback } from "react";
import { Meteor } from "meteor/meteor";
import { Link } from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Fields from "./Fields";

const Connection = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const update = useCallback(
    (e, { name, value }) => {
      switch (name) {
        case "password":
          setPassword(value);
          break;
        case "username":
          setUsername(value);
          break;
      }
    },
    [setPassword, setUsername]
  );

  const signin = useCallback(
    e => {
      e.preventDefault();
      Meteor.loginWithPassword(username, password, err => {
        if (err) {
          toast.error(err.reason);
        } else {
          toast.success(
            "Bienvenue " + Meteor.users.findOne(Meteor.userId()).username + " !"
          );
        }
      });
    },
    [username, password]
  );

  return (
    <div className="container">
      <div id="topbar">
        <h1>Connection</h1>
      </div>
      <form onSubmit={signin}>
        <Fields update={update} state={{ username, password }} />
        <div className="btn-container">
          <Link className="btn btn-info" to="/signup">
            Inscription
          </Link>
          <button className="btn btn-success" onClick={signin}>
            Se connecter
          </button>
        </div>
      </form>
      <Link className="text-center item-center" to="/missing_pwd">
        Mot de passe oublié
      </Link>
    </div>
  );
};

export default Connection;

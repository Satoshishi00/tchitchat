import React, { useState, useCallback } from "react";
import { Meteor } from "meteor/meteor";
import { Link } from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data";
import { Button } from "react-bootstrap";

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

  const signin = useCallback(() => {
    Meteor.loginWithPassword(username, password, err => {
      if (err) console.log(err);
    });
  }, [username, password]);

  return (
    <div className="container">
      <h1>Connection</h1>
      <Fields update={update} state={{ username, password }} />
      <div>
        <button className="btn btn-primary mr-3" onClick={signin}>
          Connection
        </button>
        <Link className="btn btn-primary" to="/signup">
          Inscription
        </Link>
      </div>
      <Link to="/missing_pwd">Mot de passe oublié</Link>
    </div>
  );
};

export default Connection;

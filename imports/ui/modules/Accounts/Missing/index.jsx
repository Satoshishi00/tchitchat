import React, { useState, useCallback } from "react";
import { Accounts } from "meteor/accounts-base";
import { Link } from "react-router-dom";

import Fields from "./Fields";

const Missing = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const update = useCallback(
    (e, { name, value }) => {
      switch (name) {
        case "email":
          setEmail(value);
          break;
        case "password":
          setPassword(value);
          break;
        case "username":
          setUsername(value);
          break;
      }
    },
    [setEmail, setPassword, setUsername]
  );

  const signup = useCallback(() => {
    Accounts.createUser({ email, password, username }, err => {
      if (err) console.log(err);
    });
  }, [email, password, username]);

  return (
    <div>
      <div id="topbar">
        <h1>Missing</h1>
      </div>
      <h2 className="rooms-title">Entre votre adresse mail</h2>
      <Fields
        update={update}
        state={{
          email
        }}
      />
      <div className="btn-container">
        <Link className="btn btn-info" to="signin">
          Se connecter
        </Link>
        <button className="btn btn-success" onClick={signup}>
          Envoyer
        </button>
      </div>
    </div>
  );
};

export default Missing;

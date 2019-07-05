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
      <h1>Missing</h1>
      <p>Entre votre adresse mail</p>
      <Fields
        update={update}
        state={{
          email
        }}
      />
      <div>
        <button className="btn btn-primary ml-5 ml-lg-0" onClick={signup}>
          Envoyer
        </button>
      </div>
      <Link to="signin">Se connecter</Link>
    </div>
  );
};

export default Missing;

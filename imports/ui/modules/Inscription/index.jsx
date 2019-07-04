import React, { useState, useCallback } from "react";
import { Accounts } from "meteor/accounts-base";
import { Link } from "react-router-dom";

import Fields from "./Fields";

const Inscription = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const update = useCallback(
    (e, { name, value }) => {
      switch (name) {
        case "email":
          setEmail(value);
          break;
        case "username":
          setUsername(value);
          break;
        case "password":
          setPassword(value);
          break;
      }
    },
    [setEmail, setUsername, setPassword]
  );

  const signup = useCallback(() => {
    Accounts.createUser({ email, password, username }, err => {
      if (err) console.log(err);
    });
  }, [email, password, username]);

  return (
    <div>
      <h1>Inscription</h1>
      <Fields
        update={update}
        state={{
          email,
          username,
          password
        }}
      />
      <button onClick={signup}>Signup</button>
      <Link to="signin">Connection</Link>
    </div>
  );
};

import React, { useState, useCallback } from "react";
import { Accounts } from "meteor/accounts-base";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Fields from "./Fields";

const Inscription = () => {
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
      if (err) {
        toast.error(err.reason);
      } else {
        toast.success(
          "Félicitation pour votre inscription " +
            Meteor.users.findOne(Meteor.userId()).username +
            " !"
        );
      }
    });
  }, [email, password, username]);

  return (
    <div>
      <h1>Inscription</h1>
      <Fields
        update={update}
        state={{
          password,
          username,
          email
        }}
      />
      <button className="btn btn-primary" onClick={signup}>
        S'inscrire
      </button>
      <Link className="btn btn-primary" to="signin">
        Connection
      </Link>
    </div>
  );
};

export default Inscription;

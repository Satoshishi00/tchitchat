import { Meteor } from "meteor/meteor";
import React, { useState, useCallback, Component } from "react";
import { Accounts } from "meteor/accounts-base";
import { Link } from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data";
import CustomSelect from "/imports/ui/components/CustomSelect";
import Fields from "./Fields";
import Select from "./Select";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import formatDate from "/imports/utils/formatDate";

const SettingsEdit = ({ user: propsUser }) => {
  const [user, setUser] = useState(propsUser);

  const update = useCallback(
    (e, { name, value, type }) => {
      console.log("aaa");
      console.log(name, value, type);
      console.log("aaa");
      setUser({
        ...user,
        [name]: value
      });
      if (name == "gender") {
        console.log("ok gender");
        setUser({
          ...user,
          [type]: "text"
        });
        console.log(name, value, type);
      }
    },
    [user]
  );

  const send = useCallback(() => {
    const { username, email, gender, city, birthdate } = user;
    console.log("user : ");
    console.log(user);
    Meteor.call(
      "users.infos.update",
      { username, email, gender, city, birthdate },
      err => {
        if (err) {
          toast.error(err.reason);
        } else {
          toast.success("Votre profil a bien été modifié ! ");
        }
      }
    );
  }, [user]);

  return (
    <div id="wrapper">
      <div id="topbar">
        <h1>Account</h1>
      </div>
      <div>
        <Fields update={update} state={user} />
        <CustomSelect
          name="gender"
          update={update}
          selected={user.gender}
          options={["", "Homme", "Femme", "Autre"]}
        />
        <Link to="../settings">
          <button className="btn btn-primary item-center" onClick={send}>
            Update Profile
          </button>
        </Link>
      </div>
    </div>
  );
};

const SettingsWithTracker = withTracker(() => {
  const user = Meteor.user() || { emails: [{}] };
  user.email = user.emails[0].address;
  user.birthdate = user.birthdate ? formatDate(user.birthdate) : user.birthdate;
  user.genre = user.genre || "";
  delete user.emails;
  return {
    user
  };
})(SettingsEdit);

export default SettingsWithTracker;

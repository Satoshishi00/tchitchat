import { Meteor } from "meteor/meteor";
import React, { useState, useCallback } from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import CustomSelect from "/imports/ui/components/CustomSelect";
import formatDate from "/imports/utils/formatDate";
import Fields from "./Fields";

const SettingsEdit = ({ user: propsUser }) => {
  const [user, setUser] = useState(propsUser);

  const update = useCallback(
    (e, { name, value, type }) => {
      setUser({
        ...user,
        [name]: value
      });
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
          value={user.gender}
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
  user.gender = user.gender || "";
  delete user.emails;
  return {
    user
  };
})(SettingsEdit);

export default SettingsWithTracker;

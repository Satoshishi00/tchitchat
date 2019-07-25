import React from "react";
import { Meteor } from "meteor/meteor";
import { hydrate } from "react-dom";
import App from "./App";

Meteor.startup(() => {
  document.getElementById("logout").addEventListener("click", () => {
    Meteor.logout();
  });
  Meteor.subscribe("userStatus");
  hydrate(<App />, document.getElementById("react-target"));
});

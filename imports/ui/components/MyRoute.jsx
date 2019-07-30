import React from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import { Route, Redirect } from "react-router-dom";

const MyRoute = ({ logged, path, component, userId }) => {
  if (userId) {
    if (logged) {
      if (path === "/") {
        return <Redirect to="/rooms" />;
      }
      return <Route path={path} component={component} />;
    }
    return <Redirect to="/rooms" />;
  }
  if (logged) {
    return <Redirect to="/signin" />;
  }
  return <Route path={path} component={component} />;
};

export default withTracker(() => ({
  userId: Meteor.userId()
}))(MyRoute);

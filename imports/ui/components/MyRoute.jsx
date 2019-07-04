import React from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import { Route } from "react-router-dom";

const MyRoute = ({ path, component }) => {
  return <Route path={path} component={component} />;
};

export default withTracker(() => ({
  userId: Meteor.userId()
}))(MyRoute);

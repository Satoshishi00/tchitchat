import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import MyRoute from "/imports/ui/components/MyRoute";
import Inscription from "/imports/ui/modules/Accounts/Inscription";
import Connection from "/imports/ui/modules/Accounts/Connection";
import Missing from "/imports/ui/modules/Accounts/Missing";
import Rooms from "/imports/ui/modules/Rooms";
import Users from "/imports/ui/modules/Users";
import Settings from "/imports/ui/modules/Accounts/Settings";
import Verify from "/imports/ui/modules/Accounts/Verify";
import Tchatbox from "/imports/ui/modules/Tchatbox";
import Errors from "/imports/ui/modules/Errors";
import Landing from "/imports/ui/modules/Landing";

const App = () => (
  <Router>
    <Switch>
      <MyRoute path="/signup" component={Inscription} />
      <MyRoute path="/signin" component={Connection} />
      <MyRoute path="/missing_pwd" component={Missing} />
      <MyRoute path="/rooms/:id?" component={Rooms} />
      <MyRoute path="/users/:id?" component={Users} />
      <MyRoute path="/settings" component={Settings} />
      <MyRoute path="/verify" component={Verify} />
      <MyRoute path="/tchatbox" component={Tchatbox} />
      <MyRoute path="/errors" component={Errors} />
      <MyRoute path="/" component={Landing} />
    </Switch>
  </Router>
);

export default App;

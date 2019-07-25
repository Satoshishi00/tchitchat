import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import MyRoute from "/imports/ui/components/MyRoute";
import Inscription from "/imports/ui/modules/Accounts/Inscription";
import Connection from "/imports/ui/modules/Accounts/Connection";
import Missing from "/imports/ui/modules/Accounts/Missing";
import Room from "/imports/ui/modules/Room";
import Rooms from "/imports/ui/modules/Rooms";
import RoomsAdd from "/imports/ui/modules/RoomsAdd";
import RoomsEdit from "/imports/ui/modules/RoomsEdit";
import UsersConnected from "/imports/ui/modules/UsersConnected";
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

      <MyRoute path="/room/:id?" component={Room} logged />
      <MyRoute path="/rooms/add" component={RoomsAdd} logged />
      <MyRoute path="/rooms/edit/:id?" component={RoomsEdit} logged />
      <MyRoute path="/rooms/:id?" component={Rooms} logged />
      <MyRoute path="/users/:id?" component={UsersConnected} logged />
      <MyRoute path="/settings" component={Settings} logged />
      <MyRoute path="/verify" component={Verify} logged />
      <MyRoute path="/tchatbox" component={Tchatbox} logged />
      <MyRoute path="/errors" component={Errors} logged />
      <MyRoute path="/" component={Landing} logged />
    </Switch>
    <ToastContainer />
  </Router>
);

export default App;

import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import MyRoute from "/imports/ui/components/MyRoute";
import Inscription from "/imports/ui/modules/Inscription";
import Connection from "/imports/ui/modules/Connection";

const App = () => (
  <Router>
    <Switch>
      <MyRoute path="/signup" component={Inscription} />
      <MyRoute path="/signin" component={Connection} />
    </Switch>
  </Router>
);

export default App;

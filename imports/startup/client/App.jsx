import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import MyRoute from "/imports/ui/components/MyRoute";
import Inscription from "/imports/ui/modules/Inscription";

const App = () => (
  <Router>
    <Switch>
      <MyRoute path="/signup" component={Inscription} />
    </Switch>
  </Router>
);

export default App;

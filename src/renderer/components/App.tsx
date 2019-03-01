import { jsx } from "@emotion/core";
import { inject, observer } from "mobx-react";
import { FC } from "react";
import { Route, Router, Switch } from "react-router-dom";

import Injected from "../interfaces/Injected";

import Home from "./Home";
import NotFound from "./NotFound";
import Page1 from "./Page1";
import Page2 from "./Page2";
import Page3 from "./Page3";

const App: FC<Injected.Router> = ({ router }) => (
  <Router history={router!.history}>
    <Switch>
      <Route path="/" exact={true} strict={true} component={Home} />
      <Route path="/page1" exact={true} strict={true} component={Page1} />
      <Route path="/page2" exact={true} strict={true} component={Page2} />
      <Route path="/page3" exact={true} strict={true} component={Page3} />
      <Route path="*" component={NotFound} />
    </Switch>
  </Router>
);

export default inject("router")(observer(App));

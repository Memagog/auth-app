import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Authorization from "./Authorization";
import { Profile } from "./Profile";

export default function Navbar() {
  return (
    <Router>
      <div>              
        <Switch>
          <Route path="/home">
           <Profile></Profile>
          </Route>
          <Route path="/">
          <Authorization ></Authorization>
          </Route>         
        </Switch>
      </div>
    </Router>
  );
}
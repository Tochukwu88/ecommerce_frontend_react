import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
  
} from "react-router-dom";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import Home from "./Home";





export default function Routes() {
    return (
      <Router>
        
          
          <Switch>
            <Route path="/signin" exact component={Signin }/>
              
            <Route path="/signup" exact component={Signup }/>
            <Route path="/" exact component={Home }/>
           
           
          </Switch>
        
      </Router>
    );
  }
  
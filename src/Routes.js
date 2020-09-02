import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
  
} from "react-router-dom";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import Home from "./Home";
import Dashboard from "./user/UserDashboard";
import AdminDashboard from "./user/AdminDashboard";
import Private from "./actions/privateRoute";
import AdminPrivate from "./actions/AdminRoutes";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import Shop from "./component/Shop";
import SingleProductPage from "./component/SingleProductPage";
import Cart from "./component/Cart";








export default function Routes() {
    return (
      <Router>
        
          
          <Switch>
            <Route path="/signin" exact component={Signin }/>
            <Route path="/cart" exact component={Cart }/>
              
            <Route path="/signup" exact component={Signup }/>
            <Route path="/product/:productId" exact component={SingleProductPage }/>
            <Route path="/" exact component={Home }/>
            <Route path="/shop" exact component={Shop }/>
            <Private path="/user/dashboard" exact component={Dashboard }/>
            <AdminPrivate path="/admin/dashboard" exact component={AdminDashboard }/>
            <AdminPrivate path="/create/category" exact component={AddCategory }/>
            <AdminPrivate path="/create/product" exact component={AddProduct }/>
           
           
           
          </Switch>
        
      </Router>
    );
  }
  
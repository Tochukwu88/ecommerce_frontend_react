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
import Profile from "./user/Profile";
import AdminDashboard from "./user/AdminDashboard";
import Private from "./actions/privateRoute";
import AdminPrivate from "./actions/AdminRoutes";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import Shop from "./component/Shop";
import SingleProductPage from "./component/SingleProductPage";
import Cart from "./component/Cart";
import AllOrders from "./admin/orders";
import ManageProducts from "./admin/ManageProducts";
import UpdateProduct from "./admin/updateProduct";



// SKIP_PREFLIGHT_CHECK=true







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
            <Private path="/profile/:userId" exact component={Profile }/>
            <AdminPrivate path="/admin/dashboard" exact component={AdminDashboard }/>
            <AdminPrivate path="/create/category" exact component={AddCategory }/>
            <AdminPrivate path="/create/product" exact component={AddProduct }/>
            <AdminPrivate path="/admin/orders" exact component={AllOrders }/>
            <AdminPrivate path="/admin/products" exact component={ManageProducts }/>
            <AdminPrivate path="/admin/product/update/:productId" exact component={UpdateProduct }/>
           
           
            
           
          </Switch>
        
      </Router>
    );
  }
  
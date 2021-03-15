import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { LoginAction } from "./redux/actions";
import { connect } from "react-redux";
import { API_URL } from "./helper";
import ProductDetail from "./pages/ProductDetail";
import Transaction from './pages/Transaction';
// import SignUp from "./pages/User_SignUp";
import Home from './pages/Home';
import Cart from './pages/Cart';
// import ManageProduct from './pages/Admin_ManageProduct';
// import NotFound from './pages/ErrorNotFound404';
import axios from "axios";
import './App.css';

class App extends Component {
  state = {
    isLoading: true,
  };

  componentDidMount() {
    let id = localStorage.getItem("id");
    axios
      .get(`${API_URL}/users/${id}`)
      .then((res) => {
        this.props.LoginAction(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  render(){
    return(
      <div>
        <Switch>
          <Route path='/' exact component={Home} />
          {/* <Route path='/user_signup' exact component={SignUp} /> */}
          {/* <Route path='/admin_manage_product' exact component={ManageProduct} /> */}
          <Route path="/cart" exact component={Cart} />
          <Route path="/transaction" exact component={Transaction} />
          <Route path="/product/:idprod" exact component={ProductDetail} />
          {/* <Route path='*' component={NotFound} /> */}
        </Switch>
      </div>
    )
  }
}

const MaptstatetoProps = (state) => {
  return {
    dataUser: state.Auth,
  };
};
export default connect(MaptstatetoProps, { LoginAction })(App);
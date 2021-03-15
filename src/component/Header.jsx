import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
} from "reactstrap";
import { logoutAction } from "../redux/actions";
import { IoMdCart } from "react-icons/io";
import { withStyles } from "@material-ui/core/styles";
import { BiSearch } from "react-icons/bi";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import Login from './Login';
// import logo from '../assets/webShoes-01.jpg';
import './style/header.css';

const Style = {
  root: {
    "& label.Mui-focused": {
      color: "#fbab7e",
    },
  },
};

class Header extends Component {
  state = {
    isOpen: false,
    isLogin: false,
  };

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  toggleLogin = () => {
    this.setState({ isLogin: !this.state.isLogin })
    // console.log(this.props.dataUser.cart.length)
  }

  onLogoutClick = () => {
    localStorage.removeItem('id');
    this.props.logoutAction();
  }

  render() {
    return (
      <div>
        {this.state.isLogin ? (<Login />) : (console.log('1'))}

        <Navbar className="header-bg px-5 py-5" expand="md">

          <div className="d-flex justify-content-start col-6">
            <NavbarBrand href="/" width="100px">Logo</NavbarBrand>
          </div>

          <div className="d-flex col-6" >
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar className="search">
              <Nav className="ml-auto" navbar>
                {this.props.dataUser.islogin ? (
                  <>
                    <NavItem className="py-2 mx-2" >
                      <>
                        <Link to="/cart" style={{ textDecoration: 'none', color: 'white' }}>
                          <IoMdCart className="cart mb-2" style={{ fontSize: "27px", color: "rgb(133, 133, 133)" }} />
                        </Link>
                        {this.props.dataUser.cart.length ? (
                          <Badge
                            style={{
                              position: "relative",
                              fontSize: "12px",
                              height: '22px',
                              width: '22px',
                              paddingTop: '3px',
                              fontWeight: "bold",
                              bottom: 11,
                              right: 9,
                              backgroundColor: "rgb(231, 24, 24)",
                              borderRadius: "50%",
                              border: "3px solid white"
                            }}
                          > {this.props.dataUser.cart.length} </Badge>
                        ) : (
                          <Badge
                            style={{
                              height: '23px',
                              width: '23px',
                              bottom: 11,
                              right: 5,
                              backgroundColor: "transparent",
                            }}
                          >  </Badge>
                        )}
                      </>
                    </NavItem>
                    <NavItem className="py-2 mr-4">
                      <Link to="/transaction" style={{ textDecoration: 'none', color: 'rgb(50, 50, 50)' }}>
                        Transaction
                      </Link>
                    </NavItem>
                    <UncontrolledDropdown nav inNavbar>
                      <DropdownToggle
                        nav
                        className='d-flex ml-2'
                        style={{
                          color: 'rgb(50, 50, 50)',
                          textDecoration: 'none',
                          textTransform: 'uppercase',
                          fontWeight: '600'
                        }}>
                        <div>
                          <img
                            src="https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
                            alt="profile"
                            style={{
                              position: "relative",
                              width: '23px',
                              height: '23px',
                              bottom: 1,
                              right: 14,
                              borderRadius: '50%',
                            }} />
                        </div>
                        {this.props.dataUser.email}
                        <div>
                          <button className="header-login ml-3" style={{ borderRadius: "8px" }} onClick={this.onLogoutClick}>
                            Logout
                        </button>
                        </div>
                      </DropdownToggle>
                      <NavItem className="mx-2">

                      </NavItem>
                    </UncontrolledDropdown>
                  </>
                ) : (
                  <>
                    <NavItem className="mx-2">
                      <button className="header-login px-4 py-2" style={{ borderRadius: "8px" }} onClick={this.toggleLogin}>
                        Login
                      </button>
                    </NavItem>

                  </>
                )}
              </Nav>
            </Collapse>
          </div>
        </Navbar>
      </div>
    )
  }
}

const MaptstatetoProps = (state) => {
  return {
    dataUser: state.Auth,
  };
};

export default withStyles(Style)(
  connect(MaptstatetoProps, { logoutAction })(Header)
);
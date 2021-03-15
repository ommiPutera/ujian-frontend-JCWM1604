import React, { Component } from 'react';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Button,
} from "reactstrap";
import {
  LoginActionThunk,
  RegActionThunk,
  ResetActionthunk,
  ResetAction,
} from "../redux/actions";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { withStyles } from "@material-ui/core/styles";
import { Alert } from "reactstrap";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import './style/header.css';

const Style = {
  root: {
    "& label.Mui-focused": {
      color: "#fbab7e",
    },
  },
};

class Login extends Component {
  state = {
    isOpen: true,
    isVisible: false,
    password: "",
    email: "",
  }


  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  visToggle = () => {
    this.setState({ isVisible: !this.state.isVisible })
  }

  onLoginClickYes = () => {
    if (this.props.dataUser.islogin) {
      if (this.state.isOpen) {
        this.setState({ isOpen: false, email: '', password: '' })
      } else {
        return null
      }
    } else {
      return null
    }
  }

  onInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onLoginSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    var data = {
      email: email,
      password: password,
    };
    this.props.RegActionThunk(data);
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Modal size="md" isOpen={this.state.isOpen} toggle={this.toggle} className="modal-login">
          <ModalHeader toggle={this.toggle} className="login-header">
            <h2 className="title-login">Login</h2>
          </ModalHeader>
          <ModalBody>
            <form onSubmit={this.onLoginSubmit} >
              <span style={{ fontSize: '15px', fontWeight: "600" }}>Email</span>
              <FormControl className={classes.root} style={{ width: '100%', paddingBottom: '15px', paddingTop: '5px' }}>
                <OutlinedInput
                  type="email"
                  style={{ height: '40px' }}
                  value={this.state.email}
                  onChange={this.onInputChange}
                  name="email"
                />
              </FormControl>
              <span style={{ fontSize: '15px', fontWeight: "600" }}>Password</span>
              <FormControl className={classes.root} style={{ width: '100%', paddingBottom: '10px', paddingTop: '5px' }}>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={this.state.isVisible ? "text" : "password"}
                  value={this.state.password}
                  style={{ height: '40px' }}
                  onChange={this.onInputChange}
                  name="password"
                  endAdornment={
                    <InputAdornment position="start">
                      <IconButton
                        className="ml-2"
                        aria-label="toggle password visibility"
                        onClick={this.visToggle}
                      >
                        {this.state.isVisible ? (
                          <AiFillEye
                            style={{ color: "rgb(74, 116, 255)", fontSize: "23px" }}
                            onClick={this.visToggle}
                          />
                        ) : (
                          <AiFillEyeInvisible
                            style={{ color: "#9f9f9f", fontSize: "23px" }}
                            onClick={this.visToggle}
                          />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <Button className="px-4 py-2 tombol-login" submit={true} onChange={this.onLoginClickYes()} >
                Login
              </Button>
              {this.props.dataUser.error ? (
                <Alert color="danger mt-2">
                  {this.props.dataUser.error}{" "}
                  <span
                    className="float-right errorr"
                    onClick={this.props.ResetActionthunk}
                  >
                    x
                    </span>
                </Alert>
              ) : null}
            </form>
          </ModalBody>
          <ModalFooter className="modal-footer">
            <p className="mr-4" style={{ fontSize: '13px' }}> Belum punya akun?
                <span
                style={{ color: 'blue' }}>
                <Link
                  to="/user_signup"
                  style={{ textDecoration: 'none', color: 'blue', marginLeft: '5px' }}
                >Create Account</Link>
              </span>
            </p>
          </ModalFooter>
        </Modal>
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
  connect(MaptstatetoProps, {
    LoginActionThunk,
    RegActionThunk,
    ResetActionthunk,
    ResetAction,
  })(Login)
);
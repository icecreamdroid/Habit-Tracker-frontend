import React from "react";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import { Navigate } from "react-router-dom";
import {client} from "../helpers/axiosConfig";

class SignIn extends React.Component {
  constructor() {
    super();
    this.state = {
      contact_number: "",
      password: "",
      redirect: null,
    };
  }
  handleSubmit = async (e) => {
    // var _this = this;
    e.preventDefault();
    try {
      const data = await client.post(
        "/api/v1/users/login",
        {
          contact_number: this.state.contact_number,
          password: this.state.password,
        }
      );
      if (data.status == 200) {
        console.log(data.data.data.token);
        localStorage.setItem("token", data.data.data.token);
        this.setState({ redirect: true });
      }
    } catch (error) {
      this.setState({ redirect: false });
    }
  };
  handleContact = (e) => {
    this.setState({ contact_number: e.target.value });
  };
  handlePassword = (e) => {
    this.setState({ password: e.target.value });
  };

  render() {
    return (
      <div className="container">
        <div className="form-container">
          <form action="" onSubmit={this.handleSubmit}>
            <TextField
              variant="filled"
              name="contact_number"
              onChange={this.handleContact}
              type="text"
            />
            <label htmlFor="contact_number">Contact Number</label>
            <TextField
              variant="filled"
              name="password"
              type="password"
              onChange={this.handlePassword}
            />
            <label htmlFor="password">Password</label>
            <Button type="submit">Log in</Button>
          </form>
          {this.state.redirect == true && <Navigate to="/dashboard" />}
          {this.state.redirect == false && <div>Wrong password brotha</div>}
        </div>
      </div>
    );
  }
}
export default SignIn;

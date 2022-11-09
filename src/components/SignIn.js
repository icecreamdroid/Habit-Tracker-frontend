import React from "react";
import { Button, TextField } from "@mui/material";
import Inputfield from "./Inputfield";
import { Navigate } from "react-router-dom";
import { client } from "../helpers/axiosConfig";

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
      const data = await client.post("/api/v1/users/login", {
        contact_number: this.state.contact_number,
        password: this.state.password,
      });
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
            <Inputfield
              text="Contact Number"
              name="contact_number"
              handleChange={this.handleContact}
            />
            <Inputfield
              text="Password"
              name="password"
              handleChange={this.handlePassword}
              type="password"
            />
            <Button variant="contained" color="success" type="submit">
              Log in
            </Button>
          </form>
          {this.state.redirect == true && <Navigate to="/dashboard" />}
          {this.state.redirect == false && <div>Wrong password brotha</div>}
        </div>
      </div>
    );
  }
}
export default SignIn;

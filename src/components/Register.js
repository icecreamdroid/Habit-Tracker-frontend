import React from "react";
import { Button, TextField } from "@mui/material";
import { Navigate } from "react-router-dom";
import { client } from "../helpers/axiosConfig";
import Inputfield from "./Inputfield";

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      contact_number: "",
      password: "",
      passwordConfirm: "",
      redirect: null,
      error: "",
      name: "",
      email: "",
    };
  }
  handleContact = (e) => {
    this.setState({ contact_number: e.target.value });
  };
  handlePassword = (e) => {
    this.setState({ password: e.target.value });
  };
  handlePasswordConfirm = (e) => {
    this.setState({ passwordConfirm: e.target.value });
  };
  handleName = (e) => {
    this.setState({ name: e.target.value });
  };
  handleEmail = (e) => {
    this.setState({ email: e.target.value });
  };
  handleSubmit = async (e) => {
    console.log("error", this.state.error);
    if (this.state.error) {
      return;
    }
    try {
      const data = await client.post("/api/v1/users/signup", {
        name: this.state.name,
        contact_number: this.state.contact_number,
        password: this.state.password,
        passwordConfirm: this.state.passwordConfirm,
      });
      if (data.status == 200) {
        console.log(data);
        // localStorage.setItem("token", data.data.data.token);
        this.setState({ redirect: true });
      }
    } catch (error) {
      this.setState({ redirect: false });
    }
  };
  checkPassword = async (e) => {
    e.preventDefault();
    if (this.state.password !== this.state.passwordConfirm) {
      this.setState({ error: "Passwords do not match" }, () => {
        return;
      });
    } else {
      await this.handleSubmit();
      return;
    }
  };

  render() {
    return (
      <div className="container">
        <div className="form-container">
          <h1>Sign Up</h1>
          <form action="" onSubmit={this.checkPassword}>
            <Inputfield
              handleChange={this.handleName}
              name="name"
              text="Enter Your Name"
            />
            <Inputfield
              handleChange={this.handleEmail}
              name="email"
              text="Enter your Email id"
            />
            <Inputfield
              handleChange={this.handleContact}
              name="contact_number"
              text="Contact Number"
            />
            <Inputfield
              handleChange={this.handlePassword}
              type="password"
              name="password"
              text="Enter Your Password"
            />
            <Inputfield
              handleChange={this.handlePasswordConfirm}
              type="password"
              name="passwordConfirm"
              text="Confirm Password"
            />
            <Button variant="contained" color="success" type="submit">Log in</Button>
          </form>
          {this.state.redirect === true && <Navigate to="/dashboard" />}
          {this.state.redirect === false && <div>Wrong password brotha</div>}
          {this.state.error && <div>Passwords do not match</div>}
        </div>
      </div>
    );
  }
}
export default Register;

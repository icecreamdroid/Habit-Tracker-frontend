import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.scss";
import {Button} from '@mui/material/'

//components
import SignIn from "../components/SignIn.js";
class Home extends React.Component {
  //   constructor(props) {
  //     super(props);
  //   }

  render() {
    return (
      <div className="container">
        <div className="title">WELCOME TO TRACC</div>
        <div className="button-row">
          <div className="button-container">
            <Button size="large"  color="primary" variant="contained">
              <Link to="/Register">Register </Link>
            </Button>
          </div>
          <div className="button-container">
            <Button size="large" color="secondary" variant="contained">
              <Link to="/SignIn">Sign in </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;

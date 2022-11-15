import axios from "axios";
import React from "react";
import { redirect, Navigate } from "react-router-dom";
import "../styles/Dashboard.scss";
import { Button } from "@mui/material";
import { client } from "../helpers/axiosConfig";
import Chart from "../components/Chart";

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null,
      redirect: null,
      habits: null,
    };
  }
  getUser() {
    client
      .get("/api/v1/users", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        this.setState({ user: res.data.user });
      })
      .catch(() => {
        this.setState({ redirect: true });
      });
  }
  getUserData() {
    client
      .get("/api/v1/habits", {
        params: {
          habit_id: this.state.user.habit,
        },
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data.data);
        this.setState({ habits: res.data.data });
      })
      .catch((e) => {
        console.log(e);
      });
  }
  handleAdd = () => {
    client
      .patch(
        "/api/v1/habits/update",
        {
          habit_id: this.state.habits._id,
          amount:
            this.state.habits.log[this.state.habits.log.length - 1].amount + 1,
        },
        {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        console.log("added data", res);
        this.setState({ habits: res.data.result });
      })
      .catch((e) => {
        console.log(e);
      });
  };
  componentDidMount() {
    this.getUser();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.user != prevState.user) {
      this.getUserData();
    }
    // if(this.state.habits.log[0].amount)
  }
  render() {
    return (
      <>
        <div className="container">
          {this.state.user && (
            <p>WELCOME To Your Dashboard {this.state.user?.name}</p>
          )}
          {/* {this.state.redirect && <Navigate to="/SignIn" />} */}

          {this.state.habits && (
            <>
              <h1>{this.state.habits.name.toUpperCase()}</h1>
              <div className="large">
                {this.state.habits.log[this.state.habits.log.length - 1].amount}
              </div>
              <Button
                onClick={this.handleAdd}
                size="large"
                color="primary"
                variant="contained"
              >
                Add
              </Button>
              <Chart log={this.state.habits.log}></Chart>
            </>
          )}
        </div>
      </>
    );
  }
}

export default Dashboard;

import React from "react";
import "../styles/Home.css";
import dollar from "../images/dollar.png";
import chart from "../images/chart.jpeg";

const Home = () => {
  return (
    <div className="home-body">
      <div className="row">
        <div className="col-lg-4 col-sm-12 d-flex align-items-center justify-content-center">
          <img className="dollar-image" src={dollar} alt="expense-pic" />
        </div>
        <div className="col-lg-8 col-sm-12 d-flex align-items-center">
          <div class="about-div">
            <h1 className="home-title">Expense Tracker</h1>
            <h6 className="home-description">
              Welcome to Expense Tracker - track and analyze your personal
              expenses!
            </h6>
          </div>
        </div>
      </div>
      <div className="chart-div row">
        <img className="chart-image" src={chart} alt="chart pic"></img>
      </div>
    </div>
  );
};

export default Home;

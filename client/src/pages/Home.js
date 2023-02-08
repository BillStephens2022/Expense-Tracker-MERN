import React from "react";
import dollar from "../images/dollar.png";

const Home = () => {
  return (
    <div className="home-body row">
      <div className="col-lg-4 col-sm-12 d-flex align-items-center justify-content-center">
        <img className="home-image" src={dollar} alt="expense-pic" />
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
  );
};

export default Home;

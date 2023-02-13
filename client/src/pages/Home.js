import React from "react";
import "../styles/Home.css";
import dollar from "../images/dollar.png";
import chart from "../images/chart.png";
import budgetpie from "../images/budgetpie.png";

const Home = () => {
  return (
    <div className="home-body">
      <div className="row">
        <div className="col-lg-4 col-sm-12 d-flex align-items-center justify-content-center">
          <img className="dollar-image" src={dollar} alt="expense-pic" />
        </div>
        <div className="col-lg-8 col-sm-12 d-flex align-items-center">
          <div className="about-div">
            <h1 className="home-title">Expense Tracker</h1>
            <h6 className="home-description">
              Welcome to Expense Tracker - track and analyze your personal
              expenses!
            </h6>
          </div>
        </div>
        <div className="col-lg-8 col-sm-12 d-flex justify-content-center">
          <div className="about-div">
            <h2 className="placeholder-1">Preview of app functionality, reel user in</h2>
            <h6 className="placeholder-t1">
             
              <img className="chart-image" src={chart} alt="chart pic"></img>
            </h6>
          </div>
        </div>
        <div className="col-lg-8 col-sm-12 d-flex justify-content-center">
          <div className="about-div">
            <h2 className="placeholder-2">User Tesimonials</h2>
            <h6 className="placeholder-t2">
            Will be seeding in data for user testimonials and reviews of the application
            </h6>
          </div>
        </div>
        <div className="col-lg-8 col-sm-12 d-flex justify-content-center">
          <div className="about-div">
      
            <h2 className="placeholder-3">Placeholder 3</h2>
            <h6 className="placeholder-t3">
            <div className="col-lg-4 col-sm-12 d-flex align-items-center justify-content-center">
          <img className="budget-image" src={budgetpie} alt="expense-pic" />
        </div>
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

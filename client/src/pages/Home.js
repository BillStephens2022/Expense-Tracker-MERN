import React from "react";
import "../styles/Home.css";
import dollar from "../images/dollar.png";
import chart from "../images/chart.png";

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
        <div className="col-lg-8 col-sm-12 d-flex align-items-center">
          <div class="about-div">
            <h1 className="placeholder-1">Preview of app functionality, reel user in</h1>
            <h6 className="placeholder-t1">
             
              <img className="chart-image" src={chart} alt="chart pic"></img>
            </h6>
          </div>
        </div>
        <div className="col-lg-8 col-sm-12 d-flex align-items-left">
          <div class="about-div">
            <h1 className="placeholder-2">Placeholder 2</h1>
            <h6 className="placeholder-t2">
              For content Joe will soon add, possibly a 
              example graph with another signup prompt
            </h6>
          </div>
        </div>
        <div className="col-lg-8 col-sm-12 d-flex align-items-center">
          <div class="about-div">
            <h1 className="placeholder-3">Placeholder 3</h1>
            <h6 className="placeholder-t3">
              For content Joe will soon add, think about list of financial institutions/
              section for tips on money management 50/30/20 graph or pic
            </h6>
          </div>
        </div>
        <div className="col-lg-8 col-sm-12 d-flex align-items-center">
          <div class="about-div">
            <h1 className="placeholder-4">Placeholder 3</h1>
            <h6 className="placeholder-t4">
              For content Joe will soon add, think about list of financial institutions/
              section for tips on money management 50/30/20 graph or pic
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

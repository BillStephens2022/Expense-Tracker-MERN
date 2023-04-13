import React from "react";
import "../styles/Home.css";
import trend from "../images/trend.png";
import transactions from "../images/transactions.png";
import chart from "../images/chart-cat.png";
import calcform from "../images/calcform.png";

const Home = () => {
  return (
    <div className="home-body mb-5">
      <div className="text-center">
        <h1 className="home-title">Expense Tracker</h1>
        <p className="home-subtitle">
          Keep your finances in check and reach your financial goals
        </p>
      </div>
      <div className="row d-flex justify-content-around">
        <div className="col col-sm-12 col-md-6 col-lg-6 d-flex justify-content-around">
          <div className="card card-features">
            <div className="card-header card-header-features">
              Track Expenses
            </div>
            <div className="card-body">
              <img
                className="budget-image img-fluid shadow mb-3"
                src={transactions}
                alt="expense-pic"
                style={{ maxWidth: "100%" }}
              />
            </div>
          </div>
        </div>
        <div className="col col-sm-12 col-md-6 col-lg-6 d-flex justify-content-around">
          <div className="card card-features">
            <div className="card-header card-header-features">View Trends</div>
            <div className="card-body">
              <img
                className="budget-image img-fluid shadow mb-3"
                src={trend}
                alt="expense-pic"
                style={{ maxWidth: "100%" }}
              />
            </div>
          </div>
        </div>
        <div className="col col-sm-12 col-md-6 col-lg-6 d-flex justify-content-around">
          <div className="card card-features">
            <div className="card-header card-header-features">
              Chart Expenses
            </div>
            <div className="card-body bg-white">
              <img
                className="budget-image img-fluid shadow mb-3"
                src={chart}
                alt="expense-pic"
                style={{ maxWidth: "100%" }}
              />
            </div>
          </div>
        </div>
        <div className="col col-sm-12 col-md-6 col-lg-6 d-flex justify-content-around">
          <div className="card card-features">
            <div className="card-header card-header-features">
              Calculate Savings
            </div>
            <div className="card-body">
              <img
                className="budget-image img-fluid shadow mb-3"
                src={calcform}
                alt="expense-pic"
                style={{ maxWidth: "100%" }}
              />
            </div>
          </div>
        </div>
      </div>

      <h2 className="testimonials-title text-center mb-4 mt-5">
        User Testimonials
      </h2>

      <div className="container-fluid">
        <div className="row text-center d-flex justify-content-between">
          <div className="col-lg-2 col-md-4 col-6 mb-4">
            <div className="card card-testimonials w-100">
              <div className="card-body card-testimonials">
                
                <p className="card-text">
                  "I love using Expense Tracker! It's so easy to use and helps
                  me keep track of my spending."
                </p>
                <p className="card-text">Sarah J.</p>
              </div>
            </div>
          </div>
          <div className="col-lg-2 col-md-4 col-6 mb-4">
            <div className="card card-testimonials w-100">
              <div className="card-body card-testimonials">
                
                <p className="card-text">
                  "This app has been a game-changer for me. I've been able to
                  save more money and reach my financial goals faster."
                </p>
                <p className="card-text">- Michael T.</p>
              </div>
            </div>
          </div>
          <div className="col-lg-2 col-md-4 col-6 mb-4">
            <div className="card card-testimonials w-100">
              <div className="card-body card-testimonials">             
                <p className="card-text">
                  "Expense Tracker has helped me identify areas where I can cut
                  back and save more money. It's a must-have for anyone looking
                  to get their finances in order."
                </p>
                <p className="card-text">- John D.</p>
              </div>
            </div>
          </div>
          <div className="col-lg-2 col-md-4 col-6 mb-4">
            <div className="card card-testimonials w-100">
              <div className="card-body card-testimonials">              
                <p className="card-text">
                  "I've tried other budgeting apps, but Expense Tracker is by
                  far the best. It's intuitive, user-friendly, and has all the
                  features I need."
                </p>
                <p className="card-text">- Mary R.</p>
              </div>
            </div>
          </div>
          <div className="col-lg-2 col-md-4 col-6 mb-4">
            <div className="card card-testimonials w-100">
              <div className="card-body card-testimonials">
                <p className="card-text">
                  "Expense Tracker has helped me identify my spending patterns
                  and make smarter financial decisions. I highly recommend it!"
                </p>
                <p className="card-text">- David L.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

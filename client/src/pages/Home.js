import React from "react";
import "../styles/Home.css";
import chart from "../images/chart.png";

const Home = () => {
  return (
    <div className="home-body">
      <div className="text-center">
        <h1 className="home-title">Expense Tracker</h1>
        <p className="home-subtitle">
          Keep your finances in check and reach your financial goals
        </p>
      </div>
      <div className="row d-flex justify-content-around">
        <div className="col col-sm-12 col-md-6 col-lg-3 d-flex justify-content-around">
          <div className="card">
            <div className="card-header">Track Expenses</div>
            <div className="card-body"></div>
          </div>
        </div>
        <div className="col col-sm-12 col-md-6 col-lg-3 d-flex justify-content-around">
          <div className="card">
            <div className="card-header">View Trends</div>
            <div className="card-body"></div>
          </div>
        </div>
        <div className="col col-sm-12 col-md-6 col-lg-3 d-flex justify-content-around">
          <div className="card">
            <div className="card-header">Chart Expenses</div>
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
        <div className="col col-sm-12 col-md-6 col-lg-3 d-flex justify-content-around">
          <div className="card">
            <div className="card-header">Calculate Savings</div>
            <div className="card-body"></div>
          </div>
        </div>

      
      </div>

      

      <div className="col-md-12 mt-5">
        <h2 className="testimonials-title text-center mb-4">
          User Testimonials
        </h2>

        <div className="row testimonial-row">
          <div className="col-md-2 mx-auto">
            <div className="testimonial text-center">
              <p className="testimonial-text pr-2 pl-2 pt-2">
                "I love using Expense Tracker! It's so easy to use and helps me
                keep track of my spending."
              </p>
              <p className="testimonial-author pb-2">- Sarah J.</p>
            </div>
          </div>
          <div className="col-md-2 mx-auto">
            <div className="testimonial text-center">
              <p className="testimonial-text pr-2 pl-2 pt-2">
                "This app has been a game-changer for me. I've been able to save
                more money and reach my financial goals faster."
              </p>
              <p className="testimonial-author pb-2">- Michael T.</p>
            </div>
          </div>
          <div className="col-md-2 mx-auto">
            <div className="testimonial text-center">
              <p className="testimonial-text pr-2 pl-2 pt-2">
                "Expense Tracker has helped me identify areas where I can cut
                back and save more money. It's a must-have for anyone looking to
                get their finances in order."
              </p>
              <p className="testimonial-author pb-2">- John D.</p>
            </div>
          </div>
          <div className="col-md-2 mx-auto">
            <div className="testimonial text-center">
              <p className="testimonial-text pr-2 pl-2 pt-2">
                "I've tried other budgeting apps, but Expense Tracker is by far
                the best. It's intuitive, user-friendly, and has all the
                features I need."
              </p>
              <p className="testimonial-author pb-2">- Mary R.</p>
            </div>
          </div>
          <div className="col-md-2 mx-auto">
            <div className="testimonial text-center">
              <p className="testimonial-text pr-2 pl-2 pt-2">
                "Expense Tracker has helped me identify my spending patterns and
                make smarter financial decisions. I highly recommend it!"
              </p>
              <p className="testimonial-author pb-2">- David L.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

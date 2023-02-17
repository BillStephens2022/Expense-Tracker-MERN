import React from "react";
import "../styles/Home.css";
import chart from "../images/chart.png";

const Home = () => {
  return (
    <div className="home-body">
      <ul className="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
            </ul>
      <div className="row align-items-center">
        <div className="col-md-12 text-center">
          <h1 className="home-title">Expense Tracker</h1>
          <p className="home-subtitle">
            Keep your finances in check and reach your financial goals
          </p>
        </div>

        <div className="col-md-6">
          <div className="about-div text-center">
            <h2 className="feature-title">Features</h2>
            <ul className="feature-list list-unstyled">
              <li>
                <i className="fas fa-check"></i> Track your expenses
              </li>
              <li>
                <i className="fas fa-check"></i> See the potential that you can save with our Compound
                Interest Calculator
              </li>
              <li>
                <i className="fas fa-check"></i> View spending trends daily,
                weekly, monthly
              </li>
              <li>
                <i className="fas fa-check"></i> See how much you spend in a
                category
              </li>
            </ul>
          </div>
        </div>

        <div className="col-md-6">
  <div className="about-div text-center">
    <h2 className="budget-title">Analyze your data</h2>
    <img className="budget-image img-fluid shadow mb-3" src={chart} alt="expense-pic" style={{ maxWidth: "100%" }} />
    <p className="budget-text">
      Visualize your spending by category and whether or not it's essential or non-essential.
    </p>
  </div>
</div>

        <div className="col-md-12 mt-5">
          <h2 className="testimonials-title text-center mb-4">User Testimonials</h2>

          <div className="row testimonial-row">
            <div className="col-md-2 mx-auto">
              <div className="testimonial text-center">
                <p className="testimonial-text pr-2 pl-2 pt-2">
                  "I love using Expense Tracker! It's so easy to use and helps
                  me keep track of my spending."
                </p>
                <p className="testimonial-author pb-2">- Sarah J.</p>
              </div>
            </div>
            <div className="col-md-2 mx-auto">
              <div className="testimonial text-center">
                <p className="testimonial-text pr-2 pl-2 pt-2">
                  "This app has been a game-changer for me. I've been able to
                  save more money and reach my financial goals faster."
                </p>
                <p className="testimonial-author pb-2">- Michael T.</p>
              </div>
            </div>
            <div className="col-md-2 mx-auto">
              <div className="testimonial text-center">
                <p className="testimonial-text pr-2 pl-2 pt-2">
                  "Expense Tracker has helped me identify areas where I can cut
                  back and save more money. It's a must-have for anyone looking
                  to get their finances in order."
                </p>
                <p className="testimonial-author pb-2">- John D.</p>
              </div>
            </div>
            <div className="col-md-2 mx-auto">
              <div className="testimonial text-center">
                <p className="testimonial-text pr-2 pl-2 pt-2">
                  "I've tried other budgeting apps, but Expense Tracker is by
                  far the best. It's intuitive, user-friendly, and has all the
                  features I need."
                </p>
                <p className="testimonial-author pb-2">- Mary R.</p>
              </div>
            </div>
            <div className="col-md-2 mx-auto">
              <div className="testimonial text-center">
                <p className="testimonial-text pr-2 pl-2 pt-2">
                  "Expense Tracker has helped me identify my spending patterns
                  and make smarter financial decisions. I highly recommend it!"
                </p>
                <p className="testimonial-author pb-2">- David L.</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Home;

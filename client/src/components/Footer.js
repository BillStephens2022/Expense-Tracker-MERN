import React from 'react';
import '../styles/Home.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="footer text-center mt-5 py-3 text-light">
            <div className="row">
              <div className="col-md-4">
                <a href="https://www.facebook.com">
                  <i className="fab fa-facebook fa-2x text-light mr-2"></i>
                </a>
                <a href="https://www.twitter.com">
                  <i className="fab fa-twitter fa-2x text-light mr-2"></i>
                </a>
                <a href="https://www.instagram.com">
                  <i className="fab fa-instagram fa-2x text-light"></i>
                </a>
              </div>
              <div className="col-md-4">
                <p className="m-0">Contact us: contact@expensetracker.com</p>

              </div>
            </div>
            <div className="mt-1">
              <h2 className="footer-text">
                &copy; {currentYear}. Created by Bill, Joe, Jon, and Marc
              </h2>
            </div>
          </div>
  )
}

export default Footer
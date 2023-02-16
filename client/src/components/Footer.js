import React from 'react'

const Footer = () => {
  return (
    <div className="footer text-center mt-5 py-3 bg-dark text-light">
            <div class="row">
              <div class="col-md-4">
                <a href="https://www.facebook.com">
                  <i class="fab fa-facebook fa-2x text-light mr-2"></i>
                </a>
                <a href="https://www.twitter.com">
                  <i class="fab fa-twitter fa-2x text-light mr-2"></i>
                </a>
                <a href="https://www.instagram.com">
                  <i class="fab fa-instagram fa-2x text-light"></i>
                </a>
              </div>
              <div class="col-md-4">
                <p class="m-0">Contact us:</p>
                <p class="m-0">contact@expensetracker.com</p>
                <p class="m-0">(123) 456-7890</p>
              </div>
            </div>
            <div className="mt-3">
              <h2 className="footer-text">
                Created by Bill, Joe, Jon, and Marc
              </h2>
            </div>
          </div>
  )
}

export default Footer
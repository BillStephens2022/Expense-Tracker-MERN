import React from "react";
import "../styles/Home.css";
import dollar from "../images/dollar.png";
import chart from "../images/chart.png";
import budgetpie from "../images/budgetpie.png";

const Home = () => {
  return (
    <div className="home-body">
      <div style= {{ display: 'flex', justifyContent: 'center'}}></div>
      <div className="row align-items-center">
        <div className="d-flex align-items-center">
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
            <h1 className="home-title">Expense Tracker</h1>
          </div>
        </div>
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
          <div className="about-div">
            <h2 className="placeholder-1">We offer</h2>
            <h6 className="placeholder-t1">
             
              <img className="chart-image" src={chart} alt="chart pic"></img>
            </h6>
          </div>
        </div>
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
          <div className="about-div">
            <h2 className="placeholder-2">User Tesimonials</h2>
            <h6 className="placeholder-t2">
            Will be seeding in data for user testimonials and reviews of the application
            </h6>
          </div>
        </div>
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
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
      <div className= "footer">
        <h2 className= "footer">Footer</h2>
      </div>
    </div>
  );
};

export default Home;

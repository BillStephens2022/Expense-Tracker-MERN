import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_TRANSACTIONS } from "../utils/queries";
import { Chart, ArcElement } from "chart.js/auto";
import { Pie } from "react-chartjs-2";
import "../styles/TransactionForm.css";
import Savings from "../components/Savings";
import TransactionTable from "../components/TransactionTable";

export default function Analysis() {
  Chart.register(ArcElement);
  const categoryData = {
    labels: [
      "Housing",
      "Food",
      "Transportation",
      "Utilities",
      "Cable/Streaming",
      "Insurance",
      "Medical/Health",
      "Entertainment",
      "Vacations",
      "Charity",
    ],
    datasets: [
      {
        label: "Spending by Category",
        data: [2000, 500, 250, 200, 200, 100, 200, 1000, 100],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "gray",
          "white",
          "purple",
          "yellow",
          "seagreen",
          "blue",
          "red",
          "green",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const highLevelCategoryData = {
    labels: ["Essential", "Non-Essential"],
    datasets: [
      {
        label: "Spending by Essential/Non-Essential",
        data: [3250, 1500],
        backgroundColor: ["#22a57a", "#FF4D4D"],
        hoverOffset: 4,
      },
    ],
  };

  const option = {
    plugins: {
      legend: {
        display: true,
        labels: {
          font: {
            size: 24,
          },
          color: "white",
        },
        position: "right",
      },
    },
  };

  return (
    <div className="row">
      <h1 id="charts-title">Your Spending Charts</h1>
      <h2 id="monthly-spending-title">Monthly Spending</h2>
      <div className="col col-lg-6 col-sm-12" id="pie-chart-1">
        <h3 className="chart-title text-center">Spending by Category</h3>
        <Pie className="chart" data={categoryData} options={option}></Pie>
      </div>
      <div className="col col-lg-6 col-sm-12" id="pie-chart-2">
        <h3 className="chart-title text-center">
          Essential vs Non-Essential Spending
        </h3>
        <Pie
          className="chart"
          data={highLevelCategoryData}
          options={option}
        ></Pie>
      </div>
      <div>
        <Savings />
      </div>
      <div>
        <TransactionTable
          // transactionTable={transactionTable}
          // setTransactionTable={setTransactionTable}
          // me={me}
          // title="All Transactions"
          // showTitle={true}
        />
      </div>
    </div>
  );
}

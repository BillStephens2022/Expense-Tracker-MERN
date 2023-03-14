import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import { Chart, ArcElement } from "chart.js/auto";
import { Pie } from "react-chartjs-2";
import "../styles/Analysis.css";
import Savings from "../components/Savings";

// import { getHighLevel, getEssentialTransactions, getUser } from "../utils/api";

export default function Analysis({ transactions, setTransactions }) {
  Chart.register(ArcElement);
  const { data, loading } = useQuery(QUERY_ME);

  useEffect(() => {
    if (data?.me?.transactions) {
      setTransactions(data?.me?.transactions);
    }
  }, [data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // const transactions = data?.me.transactions || [];
  const calcHighLevelCategory = (transactions) =>
    transactions.reduce((acc, cur) => {
      const { highLevelCategory, amount } = cur;
      const item = acc.find((it) => it.highLevelCategory === highLevelCategory);
      item ? (item.amount += amount) : acc.push({ highLevelCategory, amount });
      return acc;
    }, []);

  let sumHighLevel = calcHighLevelCategory(transactions);

  console.log("Essential vs NonEssential: ", sumHighLevel);

  const calcCategory = (transactions) =>
    transactions.reduce((acc, cur) => {
      const { category, amount } = cur;
      const item = acc.find((it) => it.category === category);
      item ? (item.amount += amount) : acc.push({ category, amount });
      return acc;
    }, []);

  let sumCategory = calcCategory(transactions);
  console.log("by Category: ", sumCategory);
  let sumAll = 0;
  for (let i = 0; i < transactions.length; i++) {
    sumAll += transactions[i].amount;
  }
  console.log("TOTAL SUM!! ", sumAll);

  const categoryData = {
    labels: [
      "Housing",
      "Food-Groceries",
      "Restaurants/Fast-Food",
      "Transportation",
      "Utilities - Gas, Electric, Water",
      "Cable/Streaming Services",
      "Insurance",
      "Medical/Health",
      "Entertainment",
      "Vacations",
      "Charity",
    ],
    datasets: [
      {
        label: "Spending by Category",
        data: [
          sumCategory.find((x) => x.category === "Housing")?.amount || 0,
          sumCategory.find((x) => x.category === "Food-Groceries")?.amount || 0,
          sumCategory.find((x) => x.category === "Restaurants/Fast-Food")
            ?.amount || 0,
          sumCategory.find((x) => x.category === "Transportation")?.amount || 0,
          sumCategory.find(
            (x) => x.category === "Utilities - Gas, Electric, Water"
          )?.amount || 0,
          sumCategory.find((x) => x.category === "Cable/Streaming Services")
            ?.amount || 0,
          sumCategory.find((x) => x.category === "Insurance")?.amount || 0,
          sumCategory.find((x) => x.category === "Medical/Health")?.amount || 0,
          sumCategory.find((x) => x.category === "Entertainment")?.amount || 0,
          sumCategory.find((x) => x.category === "Vacations")?.amount || 0,
          sumCategory.find((x) => x.category === "Charity")?.amount || 0,
        ],
        backgroundColor: [
          "coral",
          "lightblue",
          "gray",
          "white",
          "purple",
          "yellow",
          "lightgreen",
          "blue",
          "red",
          "green",
          "firebrick",
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
        data: [
          sumHighLevel.find((x) => x.highLevelCategory === "Essential")
            ?.amount || 0,
          sumHighLevel.find((x) => x.highLevelCategory === "Non-Essential")
            ?.amount || 0,
        ],
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
    <div>
      <h1 id="charts-title">Your Spending Charts</h1>
      <h2 className="monthly-spending-title mb-5">Monthly Spending</h2>
      <div className="row d-flex justify-content-around">
        <div className="col col-sm-12 col-lg-6" id="pie-chart-1">
        <div className="row">
            <div className="card card-chart ml-5">
              <div className="card-header card-chart-header">
                <h3 className="chart-title text-center text-dark">Spending</h3>
                <h3 className="chart-title text-center text-dark">
                  <span className="green-text">Essential</span> vs <span className="red-text">Non-Essential</span>
                </h3>
              </div>
              <div className="card-body card-chart-body m-5">
                <Pie
                  className="chart"
                  data={highLevelCategoryData}
                  options={{
                    plugins: {
                      legend: {
                        position: "right",
                        labels: { color: "black" },
                      },
                    },
                  }}
                ></Pie>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="card card-chart ml-5">
              <div className="card-header card-chart-header">
                <h3 className="chart-title text-center text-dark">Spending</h3>
                <h4 className="chart-title text-centermb-2 text-dark">
                  by Category
                </h4>
              </div>
              <div className="card-body card-chart-body m-5">
                <Pie
                  className="chart"
                  data={categoryData}
                  options={{
                    plugins: {
                      legend: {
                        position: "right",
                        labels: { color: "black" },
                      },
                    },
                  }}
                ></Pie>
              </div>
            </div>
          </div>
          
        </div>
        <div className="col col-sm-12 col-lg-6 mt-5">
          <Savings sumHighLevel={sumHighLevel} />
        </div>
        <div>{/* <TransactionTable/> */}</div>
      </div>
    </div>
  );
}

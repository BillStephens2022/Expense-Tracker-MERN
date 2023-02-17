import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_TRANSACTIONS } from "../utils/queries";
import { Chart, ArcElement } from "chart.js/auto";
import { Pie } from "react-chartjs-2";
import "../styles/TransactionForm.css";
import Savings from "../components/Savings";
import TransactionTable from "../components/TransactionTable";
// import { getHighLevel, getEssentialTransactions, getUser } from "../utils/api";

export default function Analysis() {
  Chart.register(ArcElement);
  const { data, loading } = useQuery(QUERY_ME);

  if (loading) {
    return <div>Loading...</div>;
  }

  const transactions = data?.me.transactions || [];
  console.log(transactions);
  const calcHighLevelCategory = (transactions) => transactions.reduce((acc, cur) => {
    const {highLevelCategory, amount} = cur;
    const item = acc.find(it => it.highLevelCategory === highLevelCategory);
    item ? item.amount += amount : acc.push({highLevelCategory, amount});
    return acc;

  }, []);

  let sumHighLevel = calcHighLevelCategory(transactions);

  console.log("Essential vs NonEssential: ", sumHighLevel);

  const calcCategory = (transactions) => transactions.reduce((acc, cur) => {
    const {category, amount} = cur;
    const item = acc.find(it => it.category === category);
    item ? item.amount += amount : acc.push({category, amount});
    return acc;

  }, []);

  let sumCategory = calcCategory(transactions);
  console.log("by Category: ", sumCategory);
  let sumAll=0;
  for (let i = 0; i < transactions.length; i++) {
    sumAll += transactions[i].amount;
  }
  console.log('TOTAL SUM!! ', sumAll);
  
  const categoryData = {
    labels: [
      "Housing",
      "Food",
      "Restaurants",
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
        data: [
          sumCategory.find((x) => x.category === "Housing")?.amount || 0,
          sumCategory.find((x) => x.category === "Food")?.amount || 0,
          sumCategory.find((x) => x.category === "Restaurants")?.amount || 0,
          sumCategory.find((x) => x.category === "Transportation")?.amount || 0,
          sumCategory.find((x) => x.category === "Utilities")?.amount || 0,
          sumCategory.find((x) => x.category === "Cable/Streaming")?.amount || 0,
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
          "firebrick"
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
          sumHighLevel.find((x) => x.highLevelCategory === "Essential")?.amount || 0,
          sumHighLevel.find((x) => x.highLevelCategory === "Non-Essential")?.amount || 0,
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
    <div className="row">
      <h1 id="charts-title">Your Spending Charts</h1>
      <h2 id="monthly-spending-title">Monthly Spending</h2>
      <div className="col col-lg-6 col-sm-12" id="pie-chart-1">
        <h3 className="chart-title text-center">Spending by Category</h3>
        <Pie className="chart" data={categoryData} options={{plugins: {
          legend: {
            position:'left'
          }
        }}}></Pie>
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
        <Savings 
          sumHighLevel={sumHighLevel} 
          />
      </div>
      <div>
        {/* <TransactionTable/> */}
      </div>
    </div>
  );
}

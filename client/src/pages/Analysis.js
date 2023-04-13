import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import { Chart, ArcElement } from "chart.js/auto";
import { Pie } from "react-chartjs-2";
import "../styles/Analysis.css";
import Savings from "../components/Savings";
import Dropdown from "../components/Dropdown";
import { formatAmount } from "../utils/helpers";

// import { getHighLevel, getEssentialTransactions, getUser } from "../utils/api";

export default function Analysis({ transactions, setTransactions }) {
  const [selectedOption, setSelectedOption] = useState('CurrentMTD');

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

  const handleOptionChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  }
  let selectedTransactions = [];
  let selectedTimePeriod = "";
  let selectedTotal;

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const priorMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const priorYear = currentYear - 1;
  console.log("**********PRIOR YEAR: ", priorYear);
  
  // Filter transactions for current month and year
  const currentMonthTransactions = transactions.filter(transaction => {
    const transactionDate = new Date(parseInt(transaction.date));
    return transactionDate.getMonth() === currentMonth && transactionDate.getFullYear() === currentYear;
  });
  
  // Sum transaction amounts for current month to date
  const currentMonthToDateSum = currentMonthTransactions.reduce((total, transaction) => {
    return total + transaction.amount;
  }, 0);
  
  // Filter transactions for current year
  const currentYearTransactions = transactions.filter(transaction => {
    const transactionDate = new Date(parseInt(transaction.date));
    return transactionDate.getFullYear() === currentYear;
  });
  
  // Sum transaction amounts for current year to date
  const currentYearToDateSum = currentYearTransactions.reduce((total, transaction) => {
    return total + transaction.amount;
  }, 0);
  
  // Filter transactions for prior month and year
  const priorMonthTransactions = transactions.filter(transaction => {
    const transactionDate = new Date(parseInt(transaction.date));
    return transactionDate.getMonth() === priorMonth && transactionDate.getFullYear() === currentYear;
  });
  
  // Sum transaction amounts for prior month to date
  const priorMonthToDateSum = priorMonthTransactions.reduce((total, transaction) => {
    return total + transaction.amount;
  }, 0);
  
  // Filter transactions for prior year
  const priorYearTransactions = transactions.filter(transaction => {
    const transactionDate = new Date(parseInt(transaction.date));
    return transactionDate.getFullYear() === priorYear;
  });
  
  // Sum transaction amounts for prior year to date
  const priorYearToDateSum = priorYearTransactions.reduce((total, transaction) => {
    return total + transaction.amount;
  }, 0);
  
  console.log("CURRENT MTD SUM: ", currentMonth, ": ", currentMonthToDateSum);
  console.log("CURRENT YTD SUM: ", currentYear, ": ", currentYearToDateSum);
  console.log("PRIOR MTD SUM: ", priorMonth, ": ", priorMonthToDateSum);
  console.log("PRIOR YTD SUM: ", priorYear, ": ", priorYearToDateSum);
  
  switch(selectedOption) {
    case "CurrentMTD":
      selectedTransactions = currentMonthTransactions;
      selectedTimePeriod = "Current Month to Date Spending";
      selectedTotal = currentMonthToDateSum;
      break
    case "CurrentYTD":
      selectedTransactions = currentYearTransactions;
      selectedTimePeriod = "Current Year to Date Spending";
      selectedTotal = currentYearToDateSum;
      break;
    case "PriorMTD":
      selectedTransactions = priorMonthTransactions;
      selectedTimePeriod = "Prior Month to Date Spending";
      selectedTotal = priorMonthToDateSum;
      break;
    case "PriorYTD":
      selectedTransactions = priorYearTransactions;
      selectedTimePeriod = "Prior Year to Date Spending";
      selectedTotal = priorYearToDateSum;
      break;
    default:
      selectedTransactions = currentMonthTransactions;
      selectedTimePeriod = "Current Month to Date Spending";
      selectedTotal = currentMonthToDateSum;
  }

  // const transactions = data?.me.transactions || [];
  const calcHighLevelCategory = (transactions) =>
    transactions.reduce((acc, cur) => {
      const { highLevelCategory, amount } = cur;
      const item = acc.find((it) => it.highLevelCategory === highLevelCategory);
      item ? (item.amount += amount) : acc.push({ highLevelCategory, amount });
      return acc;
    }, []);

  let sumHighLevel = calcHighLevelCategory(selectedTransactions);
  let currentMonthHighLevel = calcHighLevelCategory(currentMonthTransactions);

  console.log("Essential vs NonEssential: ", sumHighLevel);

  const calcCategory = (transactions) =>
    transactions.reduce((acc, cur) => {
      const { category, amount } = cur;
      const item = acc.find((it) => it.category === category);
      item ? (item.amount += amount) : acc.push({ category, amount });
      return acc;
    }, []);

  let sumCategory = calcCategory(selectedTransactions);
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
      "Restaurant/Fast-Food",
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
          sumCategory.find((x) => x.category === "Restaurant/Fast-Food")?.amount || 0,
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
    options: {
      responsive: true,
    },
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
        backgroundColor: ["#7583a7", "#FF4D4D"],
        hoverOffset: 4,
      },
    ],
    options: {
      responsive: true,
    },
  };

  return (
    <div>
      <h1 id="charts-title">Your Spending Charts</h1>
      <Dropdown onOptionChange={handleOptionChange} />
      <div className="row d-flex justify-content-around">
        <div className="col col-sm-12 col-lg-6" id="pie-chart-1">
        <div className="row">
            <div className="card card-chart ml-5">
              <div className="card-header card-chart-header">
                <h3 className="chart-title text-center text-light">{selectedTimePeriod}</h3>
                <h4>Total: ${formatAmount(selectedTotal)}</h4>
                <h3 className="chart-title text-center text-light">
                  <span className="blue-text">Essential</span> vs <span className="red-text">Non-Essential</span>
                </h3>
              </div>
              <div className="card-body card-chart-body m-5">
                
                <Pie
                  className="chart chartjs-render-monitor chart-legend"
                  data={highLevelCategoryData}
                  options={{
                    plugins: {
                      legend: {
                        position: "bottom",
                        labels: { color: "black", wordWrap: true, maxWidth: 150 },
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
                <h3 className="chart-title text-center text-light">{selectedTimePeriod}</h3>
                <h4>Total: ${formatAmount(selectedTotal)}</h4>
                <h4 className="chart-title text-centermb-2 text-light">
                  by Category
                </h4>
              </div>
              <div className="card-body card-chart-body m-5">
                <Pie
                  className="chart chartjs-render-monitor chart-legend"
                  data={categoryData}
                  options={{
                    plugins: {
                      legend: {
                        position: "bottom",
                        labels: { color: "black", wordWrap: true, maxWidth: 150, fontSize: 10 },
                      },
                    },
                  }}
                ></Pie>
              </div>
            </div>
          </div>
          
        </div>
        <div className="col col-sm-12 col-lg-6 mt-5">
          <Savings currentMonthHighLevel={currentMonthHighLevel} />
        </div>
        <div>{/* <TransactionTable/> */}</div>
      </div>
    </div>
  );
}

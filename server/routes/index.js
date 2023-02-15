const express = require("express");
const jwt = require('jsonwebtoken');
const { User, Transaction } = require("../models");
const { authMiddleware, signToken } = require("../utils/auth");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/sumHighLevel", async (req, res) => {
  let username = req.headers.username;
  console.log(username);
  // let x = Object.fromEntries(req.headers);
  // console.log(x);

 
  try {   
    let result = await User.aggregate([
      { $match: { username: username } },
      // replace your model name
      { $unwind: '$transactions' },
      { $match: { 'transactions.highLevelCategory': 'essential' } },
      {
        $group: {
          _id: 'essential',
          sum: { $sum: '$transaction.amount' },
        },
      },
    ]);
    
    console.log(result);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

app.get("/sumEssentialTransactions", async (req, res) => {
    try {
      
      let result = await Transaction.aggregate([
       
        { $match: { highLevelCategory: 'essential' } },
        {
          $group: {
            _id: 'essential',
            sum: { $sum: '$amount' },
          },
        },
      ]);
      console.log(result);
      res.json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  });

module.exports = app;

const express = require("express");
const jwt = require('jsonwebtoken');
const { User, Transaction } = require("../models");
const { authMiddleware, signToken } = require("../utils/auth");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/getUser", async (req, res) => {
    console.log('route hit!!');
    let user = req.headers.username;
  try {   
    let result = await User.findOne({username: user});
    console.log("getUser result: ", result);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

app.get("/sumHighLevel", async (req, res) => {
  let user = req.headers.username;
  console.log(user);

  try {   
    let result = await User.aggregate([
      { $match: { username: user } },
      // replace your model name
      { $unwind: '$transactions' },
      // { $match: { highLevelCategory } },
      {
        $group: {
          _id: '$transactions',
          count: { $sum: 1 },
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

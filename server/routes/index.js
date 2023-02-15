const express = require("express");
const { User, Transaction } = require("../models");

const app = express();

app.get("/sumHighLevel", async (req, res, context) => {
  try {
    
    let result = await User.aggregate([
      { $match: { username: context.username } },
      // replace your model name
      { $unwind: '$transactions' },
      { $match: { highLevelCategory: 'essential' } },
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

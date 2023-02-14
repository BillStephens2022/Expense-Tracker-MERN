const { Transaction } = require("../../../server/models");
const { Schema, model } = require('mongoose');

app.get('/sum-price', (req, res) => {
    // Call aggregate() on model, this is for the daily
    Transaction.aggregate(
      [
        {
          $group: {
            _id: null,
            sum_price: { $sum: '$amount , date' },
            
          },
        },
      ],
      (err, result) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).send(result);
        }
      }
    );
  });

  app.get('/sum-price-weekly', (req, res) => {
    // Call aggregate() on model, this is for the weekly
    Transaction.aggregate(
      [
        {
          $group: {
            _id: null,
            // Sum of all prices
            sum_price: { $sum: '$amount , date' },
          },
        },
      ],
      (err, result) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).send(result);
        }
      }
    );
  });

  app.get('/sum-price-monthly', (req, res) => {
    // Call aggregate() on model, this is for the monthly
    Transaction.aggregate(
      [
        {
          $group: {
            _id: null,
            // Sum of all prices
            sum_price: { $sum: '$amount' },
          },
        },
      ],
      (err, result) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).send(result);
        }
      }
    );
  });
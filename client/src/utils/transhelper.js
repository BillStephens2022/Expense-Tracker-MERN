const { Transaction } = require("../../../server/models");

app.get('/sum-price', (req, res) => {
    // Call aggregate() on model
    Transaction.aggregate(
      [
        // Where prices are less or equal to 5
        { $match: { price: { $lte: 5 } } },
        {
          $group: {
            // Group by null (no additional grouping by id)
            _id: null,
            // Sum of all prices
            sum_price: { $sum: '$price' },
            // Average of all prices
            avg_price: { $avg: '$price' },
            // Maximum price
            max_price: { $max: '$price' },
            // Minimum price
            min_price: { $min: '$price' },
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
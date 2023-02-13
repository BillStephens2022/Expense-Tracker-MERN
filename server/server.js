const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const {  authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas');

const db = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

  app.get('/sum-price', (req, res) => {
    // Call aggregate() on model
    Item.aggregate(
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
  
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
};
  
// Call the async function to start the server
startApolloServer(typeDefs, resolvers);

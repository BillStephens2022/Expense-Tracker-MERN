const db = require('../config/connection');
const { User, Transaction } = require('../models');
const userSeeds = require('./userSeeds.json');
const transactionSeeds = require('./transactionSeeds.json');

db.once('open', async () => {
  try {
    await Transaction.deleteMany({});
    await User.deleteMany({});

    await User.create(userSeeds);
    await Transaction.create(transactionSeeds);

  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});

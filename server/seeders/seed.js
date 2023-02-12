const db = require('../config/connection');
const { User, Transaction } = require('../models');
const userSeeds = require('./userSeeds.json');
const transactionSeeds = require('./transactionSeeds.json');

db.once('open', async () => {
  try {
    await Transaction.deleteMany({});
    await User.deleteMany({});

    await User.create(userSeeds);

    for (let i = 0; i < transactionSeeds.length; i++) {
      const { _id, username } = await Transaction.create(transactionSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: username },
        {
          $addToSet: {
            transactions: _id,
          },
        }
      );
    }

  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});

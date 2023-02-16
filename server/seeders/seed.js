const db = require('../config/connection');
const { User, Transaction, Testimonials } = require('../models');
const userSeeds = require('./userSeeds.json');
const transactionSeeds = require('./transactionSeeds.json');
const testimonialSeeds = require('./testimonialSeeds.json');

db.once('open', async () => {
  try {
    await Transaction.deleteMany({});
    await User.deleteMany({});
    await Testimonials.deleteMany({});

    const dbUsers = await User.create(userSeeds);
    await Testimonials.create(testimonialSeeds);

    for (let i = 0; i < transactionSeeds.length; i++) {
      const { _id: transId } = await Transaction.create(transactionSeeds[i]);

      console.log(transId);

      const randomIndex = Math.floor(Math.random() * dbUsers.length);

      const { _id: userId } = dbUsers[randomIndex];

      const user = await User.findOneAndUpdate(
        { _id: userId },
        { $addToSet: { transactions: transId } },
        { new: true }
      )
      console.log(user);
    } 

  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});


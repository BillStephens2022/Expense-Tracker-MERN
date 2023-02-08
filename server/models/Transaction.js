const { Schema, model } = require("mongoose");

const transactionSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  highLevelCategory: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String
  },
});

const Transaction = model('Transaction', transactionSchema);

module.exports = Transaction;

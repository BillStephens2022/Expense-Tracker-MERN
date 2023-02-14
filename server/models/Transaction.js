const { Schema, model } = require('mongoose');

const transactionSchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    highLevelCategory: {
      //essential vs non-essential
      type: String,
      required: true,
    },
    category: {
      // housing, transportation, utilities, etc
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true
    },
    // user: {
    //   type: Schema.Types.ObjectId,
    //   ref: "User",
    // }
  });

const Transaction = model("Transaction", transactionSchema);

module.exports = Transaction;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransactionsSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  transactions: [
    {
      amount: Number,
      currency: String,
      income: Boolean,
      who: String,
      date: String,
    },
  ],
});

const Transactions = mongoose.model("Transactions", TransactionsSchema);

module.exports.Transactions = Transactions;

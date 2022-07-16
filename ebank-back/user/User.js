const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  password: String,
  email: String,
  wallet: {
    currency: String,
    amount: Number,
  },
  contactsId: { type: mongoose.Schema.Types.ObjectId, ref: "Contacts" },

  transactionsId: { type: mongoose.Schema.Types.ObjectId, ref: "Transactions" },
});

const User = mongoose.model("User", UserSchema);

module.exports.User = User;

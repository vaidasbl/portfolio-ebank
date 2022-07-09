const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  password: String,
  wallet: {
    currency: String,
    amount: Number,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports.User = User;

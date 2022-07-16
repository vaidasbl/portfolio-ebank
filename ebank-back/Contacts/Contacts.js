const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ContactsSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  contacts: [{ _id: { type: mongoose.Schema.Types.ObjectId, ref: "User" } }],
});

const Contacts = mongoose.model("Contacts", ContactsSchema);

module.exports.Contacts = Contacts;

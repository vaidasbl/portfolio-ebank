const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MailSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  inbox: [
    {
      who: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      subject: String,
      contents: String,
      purpose: String,
      date: String,
      income: Boolean,
      seen: Boolean,
    },
  ],
  sent: [
    {
      who: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      subject: String,
      contents: String,
      purpose: String,
      date: String,
      income: Boolean,
    },
  ],
});

const Mail = mongoose.model("Mail", MailSchema);

module.exports.Mail = Mail;

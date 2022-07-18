const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MailSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  inbox: [
    {
      from: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      subject: String,
      contents: String,
    },
  ],
  sent: [
    {
      to: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      subject: String,
      contents: String,
    },
  ],
});

const Mail = mongoose.model("Mail", MailSchema);

module.exports.Mail = Mail;

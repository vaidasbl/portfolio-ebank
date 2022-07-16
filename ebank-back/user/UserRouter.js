const express = require("express");
const cors = require("cors");
const { User } = require("./User");
const { Transactions } = require("../transactions/Transactions");
const { Contacts } = require("../Contacts/Contacts");

const router = express.Router();

router.use(express.json());
router.use(cors({ origin: "*" }));

const exchange = (amount, from, to) => {
  const rates = {
    USD: {
      USD: 1,
      EUR: 0.9,
      RUB: 100,
    },

    EUR: {
      EUR: 1,
      USD: 1 / 0.9,
      RUB: 1 / (0.9 / 100),
    },

    RUB: {
      RUB: 1,
      USD: 1 / 100,
      EUR: 1 / (1 / (0.9 / 100)),
    },
  };

  const rate = rates[from][to];
  const money = (amount * rate).toFixed(2);
  return +money;
};

//Create new user
router.post("/new", async (req, res) => {
  try {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
      email: "",
      wallet: {
        currency: "USD",
        amount: 0,
      },
      transactionsId: null,
      contactsId: null,
    });

    const transactions = new Transactions({
      userId: user._id,
    });

    const contacts = new Contacts({
      userId: user._id,
    });

    if (req.body.password !== req.body.passwordRepeat) {
      res.status(400).send("Passwords must match");
      return;
    } else if (await User.findOne({ username: user.username })) {
      res.status(400).send("User with such username already exists");
      return;
    } else if (!req.body.password || !req.body.username) {
      res.status(400).send("Username or password cant be empty");
      return;
    } else {
      await contacts.save();
      await transactions.save();
      user.contactsId = contacts._id;
      user.transactionsId = transactions._id;
      await user.save();
      res.send(user);
    }
  } catch (err) {
    res.send(err.message);
  }
});

//Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
      password: req.body.password,
    });

    if (user) {
      res.send({
        success: true,
        user: user,
      });
      return;
    } else {
      res.send({ success: false });
      return;
    }
  } catch (err) {
    res.send(err);
  }
});

//Update info
router.put("/updateinfo", async (req, res) => {
  const passwordIfEmpty = (user) => {
    if (req.body.password === "" || req.body.passwordRepeat === "") {
      return user.password;
    } else {
      return req.body.password;
    }
  };
  try {
    const user = await User.findById(req.body.userid);

    const existsByUsername = await User.findOne({
      username: req.body.newUsername,
    });
    const existsByEmail = await User.findOne({ email: req.body.newEmail });

    if (existsByUsername && user.username != req.body.newUsername) {
      res.status(400).send("User with such username already exists");
    } else if (existsByEmail && user.email != req.body.newEmail) {
      res.status(400).send("User with such email already exists");
    } else if (req.body.password !== req.body.passwordRepeat) {
      res.status(400).send("Passwords must match");
    } else {
      user.username = req.body.newUsername;
      user.email = req.body.newEmail;
      user.password = passwordIfEmpty(user);

      await user.save();
      res.send(user);
    }
  } catch (err) {
    res.send(err);
  }
});

//Add money to wallet
router.put("/addtowallet", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    const request = { amount: req.body.amount, currency: req.body.currency };
    if (user) {
      user.wallet.amount += exchange(
        request.amount,
        request.currency,
        user.wallet.currency
      );

      await user.save();
      res.send(user);
    } else {
      res.status(400).send("user is not found");
    }
  } catch (err) {
    res.send(err.message);
  }
});

//Send money
router.put("/send", async (req, res) => {
  try {
    const sender = await User.findById(req.body.sender);
    const senderTransactionsObj = await Transactions.findOne({
      userId: sender._id,
    });
    const recipient = await User.findOne({ username: req.body.recipient });
    const recipientTransactionsObj = await Transactions.findOne({
      userId: recipient._id,
    });
    if (!recipient) {
      res
        .status(400)
        .send("Recipient with name '" + req.body.recipient + "' was not found");
    } else if (
      exchange(req.body.amount, req.body.currency, sender.wallet.currency) >
      sender.wallet.amount
    ) {
      res.status(400).send("Not enough money in the account");
    } else {
      const amountReceived = exchange(
        req.body.amount,
        req.body.currency,
        recipient.wallet.currency
      );
      recipient.wallet.amount += amountReceived;

      const amountSent = exchange(
        req.body.amount,
        req.body.currency,
        sender.wallet.currency
      );
      sender.wallet.amount -= amountSent;

      recipientTransactionsObj.transactions.push({
        amount: amountReceived,
        currency: recipient.wallet.currency,
        income: true,
        who: sender._id,
        date: new Date().toLocaleString("lt"),
      });
      senderTransactionsObj.transactions.push({
        amount: amountSent,
        currency: sender.wallet.currency,
        income: false,
        who: recipient._id,
        date: new Date().toLocaleString("lt"),
      });

      await sender.save();
      await recipient.save();
      await senderTransactionsObj.save();
      await recipientTransactionsObj.save();
      res.send({
        message: `Succesfully sent ${req.body.amount} ${req.body.currency} to ${req.body.recipient}`,
      });
    }
  } catch (err) {
    res.send(err.message);
  }
});

//Change currency
router.put("/changecurrency", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (user) {
      user.wallet.amount = exchange(
        user.wallet.amount,
        user.wallet.currency,
        req.body.currency
      );
      user.wallet.currency = req.body.currency;

      await user.save();
      res.send(user.wallet);
    } else {
      res.send("user was not found");
    }
  } catch (err) {
    res.send(err.message);
  }
});

//Get users currency
router.get("/getwallet/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });

    if (user) {
      res.send(user.wallet);
    } else {
      res.send("user was not found");
    }
  } catch (err) {
    res.send(err.message);
  }
});

//Add to contacts
router.put("/addtocontacts", async (req, res) => {
  try {
    const user = await User.findById(req.body.userid);
    const userContacts = await Contacts.findOne({ userId: req.body.userid });
    const userToAdd = await User.findOne({
      username: req.body.contactUsername,
    });
    console.log(userToAdd);
    // if (!userToAdd) {
    //   console.log("first ifs");
    //   res.status(400).send("user was not found");
    // } else if (user.contacts.some((c) => c.username === userToAdd.username)) {
    //   console.log("second ifs");
    //   res.status(400).send("already exists");
    // } else if (user.username === userToAdd.username) {
    //   console.log("third ifs");
    //   res.status(400).send("cant add yourself");
    // } else {
    //   console.log("else");

    userContacts.contacts.push(userToAdd);
    await userContacts.save();
    await user.save();
    res.send(userContacts);
  } catch (err) {
    res.send(err);
  }
});

//Remove from contacts
router.put("/removefromcontacts", async (req, res) => {
  try {
    const user = await User.findById(req.body.userid);
    const userContactsObj = await Contacts.findOne({ userId: req.body.userid });
    const userToRemove = await User.findById(req.body.contactId);

    if (user && userToRemove) {
      const index = await userContactsObj.contacts.findIndex(
        (c) => c.contactId == userToRemove._id
      );
      await userContactsObj.contacts.splice(index, 1);

      await userContactsObj.save();
      res.send(userContactsObj.contacts);
    } else if (!userToRemove) {
      res.status(400).send("not found");
    } else {
      res.send("error");
    }
  } catch (err) {
    res.send(err.message);
  }
});

//Get contacts names
router.get("/:userid/contacts", async (req, res) => {
  try {
    const user = await User.findById(req.params.userid);
    const userContactsObj = await Contacts.findOne({
      userId: req.params.userid,
    });
    if (user && userContactsObj) {
      const userContactsNames = [];

      for (const id of userContactsObj.contacts) {
        const contact = await User.findById(id);
        userContactsNames.push({
          _id: contact._id,
          username: contact.username,
        });
      }

      res.send(userContactsNames);
    }
  } catch (err) {
    res.send(err);
  }
});

//Get first five transactions
router.get("/:userid/recenttransactions", async (req, res) => {
  try {
    const user = await User.findById(req.params.userid);
    if (user) {
      const transactionsObj = await Transactions.findOne({ userId: user._id });
      if (transactionsObj) {
        const transactions = [];
        for (const transaction of transactionsObj.transactions) {
          const who = await User.findById(transaction.who);
          transactions.push({
            amount: transaction.amount,
            currency: transaction.currency,
            income: transaction.income,
            who: who.username,
            date: transaction.date,
          });
        }

        res.send(transactions.reverse().slice(0, 5));
      } else {
        res.send([]);
      }
    } else {
      res.send("no user???");
    }
  } catch (err) {
    res.send(err.message);
  }
});

//Get full transactions
router.get("/:userid/alltransactions", async (req, res) => {
  try {
    const user = await User.findById(req.params.userid);
    if (user) {
      const transactionsObj = await Transactions.findOne({ userId: user._id });

      if (transactionsObj) {
        const transactions = [];
        for (const transaction of transactionsObj.transactions) {
          const who = await User.findById(transaction.who);
          transactions.push({
            amount: transaction.amount,
            currency: transaction.currency,
            income: transaction.income,
            who: who.username,
            date: transaction.date,
          });
        }
        res.send(transactions.reverse());
      } else {
        res.send([]);
      }
    } else {
      res.send("no user???");
    }
  } catch (err) {
    res.send(err.message);
  }
});

//Get transactions page
router.get("/:userid/transactionspage=:page/size=:size", async (req, res) => {
  try {
    const user = await User.findById(req.params.userid);
    if (user) {
      const transactionsObj = await Transactions.findOne({ userId: user._id });
      if (transactionsObj) {
        const transactions = [];
        for (const transaction of transactionsObj.transactions) {
          const who = await User.findById(transaction.who);
          transactions.push({
            amount: transaction.amount,
            currency: transaction.currency,
            income: transaction.income,
            who: who.username,
            date: transaction.date,
          });
        }

        const allTransactions = transactionsObj.transactions.length;
        page = transactions;
        const pageNum = req.params.page;
        const pageSize = req.params.size;

        page = page
          .reverse()
          .slice(pageNum * pageSize - pageSize, pageNum * pageSize);

        res.send({ page: page, allTransactions: allTransactions });
      } else {
        res.send([]);
      }
    } else {
      res.send("no user???");
    }
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = router;

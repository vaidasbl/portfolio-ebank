const express = require("express");
const cors = require("cors");
const { User } = require("./User");

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
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    wallet: {
      currency: "USD",
      amount: 0,
    },
  });

  try {
    if (await User.findOne({ username: user.username })) {
      res.status(400).send("User with such username already exists");
      return;
    }

    if (!req.body.password || !req.body.username) {
      res.status(400).send("Username or password cant be empty");
      return;
    }

    await user.save();
    res.send(user);
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
      res.send({ amount: user.wallet.amount, currency: user.wallet.currency });
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
    const user = await User.findOne({ username: req.body.username });
    const userToAdd = await User.findOne({ username: req.body.usernameToAdd });

    if (user && userToAdd) {
      user.contacts.push({ username: userToAdd.username });
      await user.save();
      res.send(user.contacts);
    } else if (!userToAdd) {
      res.status(400).send("not found");
    } else {
      res.send("error");
    }
  } catch (err) {
    res.send(err.message);
  }
});

//Remove from contacts
router.put("/removefromcontacts", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    const userToRemove = await User.findOne({
      username: req.body.userToRemove,
    });

    if (user && userToRemove) {
      const index = await user.contacts.findIndex(
        (c) => c.username == userToRemove.username
      );
      await user.contacts.splice(index, 1);
      await user.save();
      res.send(user.contacts);
    } else if (!userToRemove) {
      res.status(400).send("not found");
    } else {
      res.send("error");
    }
  } catch (err) {
    res.send(err.message);
  }
});

//Get contacts
router.get("/:username/contacts", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (user) {
      res.send(user.contacts);
    } else {
      res.send("no user???");
    }
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = router;

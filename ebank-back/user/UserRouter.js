const express = require("express");
const cors = require("cors");
const { User } = require("./User");

const router = express.Router();

router.use(express.json());
router.use(cors({ origin: "*" }));

//Create new user
router.post("/new", async (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
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

module.exports = router;

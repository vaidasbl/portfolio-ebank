const mongoose = require("mongoose");
const express = require("express");
const app = express();

const userRouter = require("./user/UserRouter");

// const itemRouter = require("./Item/ItemRouter");
// app.use("/api/shop/items", itemRouter);
app.use("/api/bank/users", userRouter);

app.use(express.json());

const run = () => {
  const port = process.env.PORT || 3002;
  app.listen(port, () => {
    console.log(`listening on ${port}`);
  });

  mongoose
    .connect("mongodb://localhost/bankdb")
    .then(() => console.log("connected to bankdb"))
    .catch((err) => console.error("failed to connect to bankdb", err));
};

run();

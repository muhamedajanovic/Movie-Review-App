const express = require("express");
const { errorHandler } = require("./middlewares/error");
require("dotenv").config();
require("express-async-errors");
require("./db");
const cors = require("cors");
const { handleNotFound } = require("./utils/helper");

const userRouter = require("./routes/user");
const actorRouter = require("./routes/actor");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/actor", actorRouter);

app.use("/*", handleNotFound);

app.use(errorHandler);

// app.post(
//   "/sign-in",
//   (req, res, next) => {
//     const { email, password } = req.body;
//     if (!email || !password)
//       return res.json({ error: "email or password is missing" });
//     next();
//   },
//   (req, res) => {
//     res.send("<h1>Hello, I am from your backend about</h1>");
//   }
// );

app.listen(8000, () => {
  console.log("the port is listening on port 8000");
});

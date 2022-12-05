const express = require("express");
const { errorHandler } = require("./middlewares/error");
const userRouter = require("./routes/user");
require("dotenv").config();
require("express-async-errors");
require("./db");
const cors = require("cors");
const { handleNotFound } = require("./utils/helper");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/user", userRouter);

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

const express = require("express");
const userRouter = require("./routes/user");
require("./db");
const app = express();
app.use(express.json());
app.use("/api/user", userRouter);

app.get("/about", (req, res) => {
  res.send("<h1>Hello, I am from your backend about</h1>");
});

app.listen(8000, () => {
  console.log("the port is listening on port 8000");
});
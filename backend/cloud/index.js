const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "ddeixizf1",
  api_key: "574124421836938",
  api_secret: "IuSuqKagZcV6K-wp6XiPfh3apFY",
  secure: true,
});

module.exports = cloudinary;

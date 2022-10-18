const User = require("../models/user");
const EmailVerificationToken = require("../models/emailVerificationToken");
const nodemailer = require("nodemailer");
const { isValidObjectId } = require("mongoose");

exports.create = async (req, res) => {
  const { name, email, password } = req.body;
  const oldUser = await User.findOne({ email });
  if (oldUser)
    return res.status(401).json({ error: "This email is already in use" });
  const newUser = new User({ name, email, password });
  await newUser.save();

  let OTP = "";
  for (let i = 0; i < 6; i++) {
    OTP += Math.round(Math.random() * 9);
  }

  const newEmailVerificationToken = new EmailVerificationToken({
    owner: newUser._id,
    token: OTP,
  });

  await newEmailVerificationToken.save();

  var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "06d0900b82f733",
      pass: "e82d32db4c7118",
    },
  });

  transport.sendMail({
    from: "ayan@review.app",
    to: newUser.email,
    subject: "Verification",
    html: `
      <p>Your one time password is </p>
      <h1>${OTP}</h1>
    `,
  });

  res.status(201).json({
    message: "Please verify your email. OTP has been send to your email",
  });
};

exports.verifyEmail = async (req, res) => {
  const { userId, OTP } = req.body;

  if (!isValidObjectId(userId)) return res.json({ error: "Invalid user!" });

  const user = await User.findById(userId);
  if (!user) return res.json({ error: "User not found!" });
  if (user.isVerified) return res.json({ error: "User is already verified" });

  const token = await EmailVerificationToken.findOne({ owner: userId });
  if (!token) return res.json({ error: "Token not found" });
};

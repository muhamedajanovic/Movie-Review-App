const User = require("../models/user");
const EmailVerificationToken = require("../models/emailVerificationToken");
const nodemailer = require("nodemailer");

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

  res
    .status(201)
    .json({
      message: "Please verify your email. OTP has been send to your email",
    });
};

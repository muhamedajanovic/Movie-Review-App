const User = require("../models/user");
const EmailVerificationToken = require("../models/emailVerificationToken");
const PasswordResetToken = require("../models/passwordResetToken");
const crypto = require("crypto");
const { isValidObjectId } = require("mongoose");
const { generateOTP, generateMailTransporter } = require("../utils/mail");
const { sendError, generateRandomByte } = require("../utils/helper");
const jwt = require("jsonwebtoken");

exports.create = async (req, res) => {
  const { name, email, password } = req.body;
  const oldUser = await User.findOne({ email });
  if (oldUser) return sendError(res, "This email is already in use");
  const newUser = new User({ name, email, password });
  await newUser.save();

  let OTP = generateOTP();

  const newEmailVerificationToken = new EmailVerificationToken({
    owner: newUser._id,
    token: OTP,
  });

  await newEmailVerificationToken.save();

  var transport = generateMailTransporter();

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
    user: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    },
  });
};

exports.verifyEmail = async (req, res) => {
  const { userId, OTP } = req.body;

  if (!isValidObjectId(userId)) return res.json({ error: "Invalid user!" });

  const user = await User.findById(userId);
  if (!user) return sendError(res, "User not found!", 404);
  if (user.isVerified) return sendError(res, "User is already verified");

  const token = await EmailVerificationToken.findOne({ owner: userId });
  if (!token) return sendError(res, "Token not found");

  const isMatched = await token.compareToken(OTP);
  if (!isMatched) return sendError(res, "Please submit a valid OTP");

  user.isVerified = true;
  await user.save();

  await EmailVerificationToken.findByIdAndDelete(token._id);

  var transport = generateMailTransporter();

  transport.sendMail({
    from: "ayan@review.app",
    to: user.email,
    subject: "Welcome",
    html: `
      <h1>Thank you for choosing us.</h1>
    `,
  });

  const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
  res.json({
    user: { id: user._id, name: user.name, email: user.email, token: jwtToken },
    message: "Email is verified",
  });
};

exports.resendEmailVerificationToken = async (req, res) => {
  const { userId } = req.body;

  const user = await User.findById(userId);
  if (!user) return sendError(res, "User not found!");

  if (user.isVerified) return sendError(res, "User is already verified");

  const alreadyHasToken = await EmailVerificationToken.findOne({ userId });

  if (alreadyHasToken)
    return sendError(res, "You can ask for another token in an hour");

  let OTP = generateOTP();

  const newEmailVerificationToken = new EmailVerificationToken({
    owner: user._id,
    token: OTP,
  });

  await newEmailVerificationToken.save();

  var transport = generateMailTransporter();

  transport.sendMail({
    from: "ayan@review.app",
    to: user.email,
    subject: "Verification",
    html: `
        <p>Your one time password is </p>
        <h1>${OTP}</h1>
      `,
  });

  res.json({ message: "New OTP has been sent to email" });
};

exports.forgetPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) return sendError(res, "email is missing!");

  const user = await User.findOne({ email });

  if (!user) return sendError(res, "User not found", 404);

  const alreadyHasToken = await PasswordResetToken.findOne({ owner: user._id });
  if (alreadyHasToken)
    return sendError(
      res,
      "Only after one hour you can request for another token"
    );

  const token = await generateRandomByte();
  const newPasswordResetToken = await PasswordResetToken({
    owner: user._id,
    token,
  });
  await newPasswordResetToken.save();

  const resetPasswordUrl = `http://localhost:3000/reset-password?token=${token}&id=${user._id}`;

  var transport = generateMailTransporter();

  transport.sendMail({
    from: "security@review.app",
    to: user.email,
    subject: "Password reset",
    html: `
        <p>Click here to reset password</p>
        <a href='${resetPasswordUrl}'>Change password</a>
      `,
  });

  res.json({ message: "Link sent to your mail" });
};

exports.sendResetPasswordTokenStatus = (req, res) => {
  res.json({ valid: true });
};

exports.resetPassword = async (req, res) => {
  const { newPassword, userId } = req.body;

  const user = await User.findById(userId);
  const matched = await user.comparePassword(newPassword);
  if (matched)
    return sendError(
      res,
      "The new password must be different from the old one!"
    );

  user.password = newPassword;
  await user.save();

  await PasswordResetToken.findByIdAndDelete(req.resetToken._id);

  const transport = generateMailTransporter();

  transport.sendMail({
    from: "security@reviewapp.com",
    to: user.email,
    subject: "Password Reset Successfully",
    html: `
      <h1>Password Reset Successfully</h1>
      <p>Now you can use new password.</p>

    `,
  });

  res.json({
    message: "Password reset successfully, now you can use new password.",
  });
};

exports.signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return sendError(res, "Email or password is not correct");

    const matched = await user.comparePassword(password);
    if (!matched) return sendError(res, "Email or password is not correct");

    const { _id, name } = user;

    const jwtToken = jwt.sign({ userId: _id }, process.env.JWT_SECRET);

    res.json({ user: { id: _id, name, email, token: jwtToken } });
  } catch (error) {
    next(error);
  }
};

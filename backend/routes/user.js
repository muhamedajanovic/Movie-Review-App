const express = require("express");
const {
  create,
  verifyEmail,
  resendEmailVerificationToken,
  forgetPassword,
  sendResetPasswordTokenStatus,
  resetPassword,
} = require("../controllers/user");
const { isValidPassResetToken } = require("../middlewares/user");
const { userValidator, validate } = require("../middlewares/validator");

const router = express.Router();

router.post("/create", userValidator, validate, create);
router.post("/verify-email", verifyEmail);
router.post("/resend-email-verification-token", resendEmailVerificationToken);
router.post("/forget-password", forgetPassword);
router.post(
  "/verify-password-reset-token",
  isValidPassResetToken,
  sendResetPasswordTokenStatus
);
router.post("/reset-password", isValidPassResetToken, resetPassword);

module.exports = router;

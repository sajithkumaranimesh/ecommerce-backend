const User = require("../models/User");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const secretKey = "nimesh-secret-key";
const sendEmail = require("../utils/email");
const crypto = require("crypto");

const registerUser = async ({ name, email, password, passwordConfirm }) => {
  try {
    await new User({ name, email, password, passwordConfirm }).save();
    return { success: true, message: "user registered successfully!" };
  } catch (error) {
    throw new Error("user registration faild!");
  }
};

const loginUser = async ({ email, password }) => {
  try {
    const user = await User.findOne({ email: email }).select("+password");
    if (!user) {
      throw new Error("user not found with this username!");
    }

    const isPasswordValid = await user.comparePassword(password);
    console.log(isPasswordValid);
    if (!isPasswordValid) {
      throw new Error("invalid password!");
    }

    const token = jwt.sign({ userId: user._id }, secretKey, {
      expiresIn: "5d",
    });
    return { success: true, token };
  } catch (error) {
    throw new Error("Authentication failed!");
  }
};

const forgotPassword = async (email, protocol, host) => {
  const user = await User.findOne({ email: email });
  console.log(user);
  if (!user) {
    throw new Error("user not found with this email!");
  }
  try {
    const resetToken = await user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    const resetUrl = `${protocol}://${host}/api/v1/reset-password/${resetToken}`;

    const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetUrl}`;

    await sendEmail({
      email: user.email,
      subject: "Your password reset token valid for (10 minutes)",
      message,
    });
    return { success: true, message: "Token sent to email!" };
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpires = undefined;
    await user.save({ validateBeforeSave: false });

    throw new Error("can't sending email. try again leter!");
  }
};

const resetPassword = async (resetToken, password, passwordConfirm) => {
  try {
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      throw new Error("Token is invalid or has expired");
    }

    user.password = password;
    user.passwordConfirm = passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpires = undefined;

    await user.save();
    return { success: true, message: "Password reset successful!" };
  } catch (error) {
    throw new Error("can't reset password!");
  }
};

module.exports = { registerUser, loginUser, forgotPassword, resetPassword };

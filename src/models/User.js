const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { type } = require("os");

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required!"],
  },
  password: {
    type: String,
    required: [true, "Password is required!"],
  },
  passwordResetToken: {
    type: String,
  },
  passwordResetTokenExpires: {
    type: Date,
  },
});

UserSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);

  user.password = hash;

  next();
});

UserSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.methods.createPasswordResetToken = async function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetTokenExpires = Date.now() + 10 * 60 * 1000;

  console.log("Reset Token (Raw):", resetToken);
  console.log("Reset Token (Hashed):", this.passwordResetToken);

  return resetToken;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;

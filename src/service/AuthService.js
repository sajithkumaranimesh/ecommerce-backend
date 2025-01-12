const User = require("../models/User");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
const secretKey = "nimesh-secret-key";

const registerUser = async ({name, email, password }) => {
  try {
    await new User({name, email, password }).save();
    return { success: true, message: "user registered successfully!" };
  } catch (error) {
    throw new Error("user registration faild!");
  }
};


const loginUser = async ({ email, password }) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("user not found with this username!");
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new Error("invalid password!");
    }

    const token = jwt.sign({ userId: user._id }, secretKey, {expiresIn: "5d",});
    return { success: true, token };
  } catch (error) {
    throw new Error("Authentication failed!");
  }
};


const forgotPassword = async ({ email }) => {
  const user = await User.findOne({ email: email });
  if (!user) {
    throw new Error("user not found with this email!");
  }

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  const resetUrl = `http://localhost:3000/reset-password/${resetToken}`

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'nimesh@gmail.com',
        pass: '12345'
    }
  });

  const mailOptions = {
    from: 'nimesh@gmail.com',
    to: email,
    subject: 'Password Reset',
    text: `Click the following link to reset your password : ${resetUrl} `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if(error){
        throw new Error("Error sending email!");
    }else{
        return { success: true, message: 'Check your email for instructions on resetting your password' };
    }
  })

  
};

module.exports = { registerUser, loginUser, forgotPassword };

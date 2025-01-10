const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');


const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, "Username is required!"],
    },
    password: {
        type: String,
        required: [true, "Password is required!"],
    },
});




UserSchema.pre('save', async function (next) {

    const user = this;
    if(!user.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);

    user.password = hash;

    next();
    
})



UserSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
}



const User = mongoose.model("User", UserSchema);

module.exports = User;


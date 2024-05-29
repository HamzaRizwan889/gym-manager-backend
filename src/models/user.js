const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema(
    {   
        firstName: { type: String },
        lastName: { type: String },
        userName: { type: String },
        email: { type: String },
        password: { type: String },
        dateOfBirth: { type: String },
    },
    
    { timestamps: true }
);
const User = mongoose.model("User", userSchema);

module.exports = User;

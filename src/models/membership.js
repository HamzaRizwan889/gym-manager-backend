const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const membershipSchema = new Schema(
    {   
        name: { type: String },
        price: { type: String },
    },
    { timestamps: true }
);

const Membership = mongoose.model("Membership", membershipSchema);

module.exports = Membership;

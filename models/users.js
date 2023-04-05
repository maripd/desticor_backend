const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Users = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    emailAddress: { type: String },
    password: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", Users);

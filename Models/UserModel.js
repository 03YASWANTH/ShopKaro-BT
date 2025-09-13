const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  Email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
});

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;

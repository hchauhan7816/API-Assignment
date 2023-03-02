const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const validateEmail = (email) => {
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return reg.test(email);
};

const validateMobileNumber = (mobile) => {
  const reg = /^[0-9]{10}$/;
  if (reg.test(mobile) && mobile.toString().length === 10) return true;
  else return false;
};

const validateBirthday = (birthday) => {
  const reg = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/;
  return reg.test(birthday);
};

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    age: {
      type: Number,
      required: true,
      min: [18, "Minimum age should be 18"],
    },
    email: {
      type: String,
      required: true,
      unique: [true, "Already registered!"],
      validate: [validateEmail, "Invalid email"],
    },
    gender: { type: String, enum: ["male", "female"], required: true },
    mobile_number: {
      type: Number,
      unique: true,
      validate: [validateMobileNumber, "Invalid mobile number"],
    },
    birthday: {
      type: String,
      required: true,
      validate: [validateBirthday, "Invalid birthday"],
    },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    address_1: { type: String, required: true },
    address_2: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

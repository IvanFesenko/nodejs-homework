const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const emailRegExp = require("../emailRegExp");
const phoneRegExp = require("../phoneRegExp");

const contact = new Schema(
  {
    name: {
      type: String,
      required: [true, "this field is required"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "this field is required"],
      unique: true,
      validate: {
        validator: function (v) {
          return emailRegExp.test(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    phone: {
      type: String,
      required: [true, "this field is required"],
      unique: true,
      validate: {
        validator: function (v) {
          return phoneRegExp.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    subscription: {
      type: String,
      default: "free",
      enum: ["free", "pro", "premium"],
    },
    password: {
      type: String,
      default: "password",
    },
    token: {
      type: String,
      default: "",
    },
  },
  { versionKey: false }
);

const Contact = model("contact", contact);

module.exports = Contact;

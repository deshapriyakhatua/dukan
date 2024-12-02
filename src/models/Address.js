const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^[6-9]\d{9}$/.test(v); // Validates 10-digit Indian phone numbers starting with 6-9
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
  pincode: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^\d{6}$/.test(v); // Validates a 6-digit pincode
      },
      message: (props) => `${props.value} is not a valid pincode!`,
    },
  },
  locality: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  district: {
    type: String,
    required: true,
    trim: true,
  },
  state: {
    type: String,
    required: true,
    trim: true,
  },
  country: {
    type: String,
    required: true,
    trim: true,
    default: 'India', // Defaults to 'India' but can be customized
  },
  landmark: {
    type: String,
    trim: true,
  },
  alternatePhone: {
    type: String,
    validate: {
      validator: function (v) {
        return !v || /^[6-9]\d{9}$/.test(v); // Validates 10-digit phone numbers or allows empty
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
  user: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the User model
    required: true,
    ref: 'User', // Assumes there's a User model
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

module.exports = mongoose.models.Address || mongoose.model('Address', AddressSchema);

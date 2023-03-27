const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Destinations = new Schema(
  {
    city: { type: String, required: true },
    country: { type: String, required: true },
    address: { type: String }
  },
  { timestamps: true }
)

module.exports = mongoose.model('destinations', Destinations)

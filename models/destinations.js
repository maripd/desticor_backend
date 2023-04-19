const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Destinations = new Schema(
  {
    //destination description bec API provides city,state and country all in one string
    destinationDesc: { type: String, required: true },
    destinationImage: { type: String, required: true },
    bucketListId: { type: String, required: true }
  },
  { timestamps: true }
)

module.exports = mongoose.model('destinations', Destinations)

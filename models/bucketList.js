const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BucketList = new Schema(
  {
    bucketListName: { type: String, required: true },
    cityName: { type: String, required: true },
    countryName: { type: String, required: true },
    userId: { type: String, required: true },
    destinationId: { type: String, required: true }
  },
  { timestamps: true }
)

module.exports = mongoose.model('bucketList', BucketList)

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BucketList = new Schema(
  {
    bucketListName: { type: String, required: false },
    userId: { type: String, required: false },
    destinationId: { type: String, required: false }
    // comment: { type: String, required: false }
  },
  { timestamps: true }
)

module.exports = mongoose.model('bucketList', BucketList)

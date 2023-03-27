const bucketList = require('../models/bucketList.js')
const destinations = require('../models/destinations.js')
const users = require('../models/users.js')

const createBucketList = async (req, res) => {
  console.log(req.body)
  try {
    const newBucket = await new bucketList(req.body)
    await newBucket.save()
    return res.status(201).json({ newBucket })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const getAllBuckets = async (req, res) => {
  console.log(req.body)
  try {
    const allBuckets = await bucketList.find()
    await res.status(200).json({ allBuckets })
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const getBucketById = async (req, res) => {
  console.log(req.body)
  try {
    const bucketId = req.params.id
    const bucketItem = await bucketList.findById(bucketId)
    return res.status(200).json({ bucketItem })
  } catch (error) {
    console.log(error)
    return res.status(500).send(error.message)
  }
}

const updateBucket = async (req, res) => {
  try {
    const bucketId = req.params.id
    const editBucket = await bucketList.findByIdAndUpdate(bucketId, req.body)
    console.log('Edit bucket', editBucket)
    return res.status(200).json({ editBucket })
  } catch (error) {
    console.log(error)
    return res.status(500).send(error.message)
  }
}

const deleteBucket = async (req, res) => {
  const bucketId = req.params.id
  try {
    const removeBucket = await bucketList.findByIdAndDelete(bucketId)
    console.log('This item is deleted!', removeBucket)
    return res.status(200).json({ removeBucket })
  } catch (error) {
    console.log(error)
  }
  return res.status(500).send(error.message)
}

const createDestination = async (req, res) => {
  console.log(req.body)
  try {
    const newDestination = await new destinations(req.body)
    await newDestination.save()
    return res.status(200).json({ newDestination })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const getAllDestinations = async (req, res) => {
  console.log('This is the req.body', req.body)
  try {
    const allDestinations = await destinations.find()
    await res.status(200).json({ allDestinations })
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const getAllDestinationsByBucketId = async (req, res) => {
  const bucketId = req.params.bucketId
  try {
    const allDestinationsById = await destinations.find({ bucketId: bucketId })
    await res.status(200).json({ allDestinationsById })
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const getDestinationByID = async (req, res) => {
  try {
    const destinationId = req.params.id
    const destinationItem = await destinations.findById(destinationId)
    return res.status(200).json({ destinationItem })
  } catch (error) {
    console.log(error)
  }
  return res.status(500).send(error.message)
}

const deleteDestinationById = async (req, res) => {
  const destinationId = req.params.id
  try {
    const removeDestination = await destinations.findByIdAndDelete(
      destinationId
    )
    console.log('Item is removed', removeDestination)
    return res.status(200).json({ removeDestination })
  } catch (error) {
    console.log(error)
    return res.status(500).send(error.message)
  }
}

const createUser = async (req, res) => {
  console.log(req.body)
  try {
    const newUser = await new users(req.body)
    await newUser.save()
    return res.status(201).json({ newUser })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id
    const user = await users.findById(userId)
    return res.status(200).json({ user })
  } catch (error) {
    console.log(error)
    return res.status(500).send(error.message)
  }
}

const updateUserById = async (req, res) => {
  try {
    const userId = req.params.id
    const editUser = await users.findByIdAndUpdate(userId, req.body)
    console.log(editUser)
    return res.status(200).json({ editUser })
  } catch (error) {
    console.log(error)
    return res.status(500).send(error.message)
  }
}

const deleteUserById = async (req, res) => {
  try {
    const userId = req.params.id
    const deleteUser = await users.findByIdAndDelete(userId)
    console.log(deleteUser)
    return res.status(200).json({ deleteUser })
    // return res.status(200).send('deleted user')
  } catch (error) {
    console.log(error)
    return res.status(500).send(error.message)
  }
}

module.exports = {
  createBucketList,
  getAllBuckets,
  getBucketById,
  updateBucket,
  deleteBucket,
  createDestination,
  getAllDestinations,
  getAllDestinationsByBucketId,
  getDestinationByID,
  deleteDestinationById,
  createUser,
  getUserById,
  updateUserById,
  deleteUserById
}

const bucketList = require('../models/bucketList.js')
const destinations = require('../models/destinations.js')
const user = require('../models/user.js')
const bcrypt = require('bcrypt')

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
  const bucketListId = req.params.bucketid
  console.log('line 86 logging bucketListId', bucketListId)
  try {
    const allDestinationsById = await destinations.find({
      bucketListId: bucketListId
    })
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
    const newUser = await new user(req.body)
    await newUser.save()
    return res.status(201).json({ newUser })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
const loginUser = async (req, res) => {
  const { email, password } = req.body

  try {
    // Check if user with given email exists
    let user = await user.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'User not found' })
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    // Create and sign JWT token
    let payload = {
      user: {
        id: user.id
      }
    }
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err
        res.json({ token })
      }
    )
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}
const getUserById = async (req, res) => {
  try {
    const userId = req.params.id
    const getUser = await user.findById(userId)
    return res.status(200).json({ getUser })
  } catch (error) {
    console.log(error)
    return res.status(500).send(error.message)
  }
}

const updateUserById = async (req, res) => {
  try {
    const userId = req.params.id
    const editUser = await user.findByIdAndUpdate(userId, req.body)
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
    const deleteUser = await user.findByIdAndDelete(userId)
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
  loginUser,
  getUserById,
  updateUserById,
  deleteUserById
}

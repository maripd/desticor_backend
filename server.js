const express = require('express')
const app = express()
const routes = require('./routes/index.js')
const db = require('./db')
const logger = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const user = require('./models/user.js')
const jwt = require('jsonwebtoken')

const urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json(), urlencodedParser)

const PORT = process.env.PORT || 3001
app.use(express.json())
app.use(logger('dev'))
app.use(cors())
// app.use(express.urlencoded({}))
app.use(express.static(`${__dirname}/client/build`))
app.use('/', routes)

app.get('/*', (req, res) => {
  res.sendFile(`${__dirname}/client/build/index.html`)
})

app.use('/createuser', user)

const hashPassword = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hashedPassword) => {
      // create a new user instance and collect the data
      const user = new User({
        emailAddress: req.body.emailAddress,
        password: hashedPassword
      })

      // save the new user
      user
        .save()
        // return success if the new user is added to the database successfully
        .then((result) => {
          res.status(201).send({
            message: 'User Created Successfully',
            result
          })
        })
        // catch error if the new user wasn't added successfully to the database
        .catch((error) => {
          res.status(500).send({
            message: 'Error creating user',
            error
          })
        })
    })
    // catch error if the password hash isn't successful
    .catch((e) => {
      res.status(500).send({
        message: 'Password was not hashed successfully',
        e
      })
    })
}

// login endpoint
app.post('/login', (req, res) => {
  const { emailAddress, password } = req.body

  // find the user by email
  user.findOne({ emailAddress }, (err, user) => {
    if (err) {
      // return error if there's a database error
      return res.status(500).json({ error: err.message })
    }

    if (!user) {
      // return error if user not found
      return res.status(404).json({ message: 'User not found' })
    }

    // check the password
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        // return error if there's a password comparison error
        return res.status(500).json({ error: err.message })
      }

      if (!result) {
        // return error if password is incorrect
        return res.status(401).json({ message: 'Incorrect password' })
      }

      // return success if email and password are correct
      res.status(200).json({ message: 'Login successful', user })
    })
  })
})

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))

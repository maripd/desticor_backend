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
    .then((hash) => {
      req.body.password = hash
      next()
    })
    .catch((err) => {
      console.error('Error hashing password:', err)
      res.status(500).send('Password was not hashed successfully')
    })
}

app.post('/createuser', hashPassword, (req, res) => {
  const { email, password } = req.body

  const newUser = new user({ email, password })
  newUser
    .save()
    .then(() => {
      res.status(201).send('User created successfully')
    })
    .catch((err) => {
      console.error('Error creating user:', err)
      res.status(500).send('Internal server error')
    })
})

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))

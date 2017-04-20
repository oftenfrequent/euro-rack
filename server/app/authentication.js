require('dotenv').config()

import path from 'path'
import jwt from 'jsonwebtoken'

module.exports = function (app, db) {
  const User = db.model('user')
  const sessionSecret = process.env.SESSION_SECRET

  app.post('/login', function(req, res, next) {

    User.findOne({ where: { email: req.body.username } })
      .then( user => {
        if (!user || !user.correctPassword(req.body.password)) {
          errorResponse(res, 401, 'No authenticated user.')
        } else {
          createToken(user, sessionSecret)
            .then( token => sendSuccessResponse(res, token, user))
        }
      })
      .catch(() => errorResponse(res, 401, 'No authenticated user.'))
  })

  app.post('/signup', function(req, res, next) {
    User.findOne({ where: { email: req.body.username } })
      .then( user => {
        if (user && user.correctPassword(req.body.password)) {
          createToken(user, sessionSecret)
            .then( token => sendSuccessResponse(res, token, user))
        } else if (user) {
          errorResponse(res, 401, 'An account already exists')
        } else {
          User.create({ email: req.body.username, password: req.body.password })
            .then( user => {
              createToken(user, sessionSecret)
                .then( token => sendSuccessResponse(res, token, user))
            })
        }
      })
      .catch(() => errorResponse(res, 401, 'Something went wrong.'))
  })

  app.use(function(req, res, next) {
    const token = req.body.token || req.query.token || req.headers['x-access-token']
    if (token) {
      jwt.verify(token, sessionSecret, function(err, decoded) {
        if (err) errorResponse(res, 401, 'Failed to authenticate token.')
        else {
          // if everything is good, save to request for use in other routes
          req.decoded = decoded;
        }
      })
    }
    next()
    // else errorResponse(res, 403, 'No token provided.')
  })
}

const sendSuccessResponse = (res, token, sqlUser) => {
  const user = sqlUser.sanitize()
  res.json({
    success: true,
    message: 'Enjoy your token!',
    token,
    user
  })
}

const createToken = (user, sessionSecret) => {

  return new Promise((resolve, reject) => {
    const token = jwt.sign(user.sanitize(),
      sessionSecret,
      { expiresIn: "1m" },
      (err, token) => { resolve(token) })
  })
}

const errorResponse = (res, status, message) => res.status(status).json({ success: false, message })

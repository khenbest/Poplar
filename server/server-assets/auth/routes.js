//THIS FILE SHOULD NOT NEED TO BE CHANGED

let router = require('express').Router();
let Users = require('../models/user');
let session = require('./session')

//NEVER TELL USERS WHICH FAILED
let loginError = new Error('Bad Email or Password')

//CREATE A NEW USER
router.post('/auth/register', (req, res) => {
  //VALIDATE PASSWORD LENGTH
  if (req.body.password.length < 5) {
    return res.status(400).send({
      error: 'Password must be at least 6 characters'
    })
  }
  //CHANGE THE PASSWORD TO A HASHED PASSWORD
  req.body.hash = Users.generateHash(req.body.password)
  //CREATE THE USER
  Users.create(req.body)
    .then(user => {
      //REMOVE THE PASSWORD BEFORE RETURNING
      delete user._doc.hash
      //SET THE SESSION UID (SHORT FOR USERID)
      req.session.uid = user._id
      req.session.username = user.name
      res.status(201).send(user)
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

<<<<<<< HEAD
router.post('/auth/login', (req, res) => {
=======

router.post('/auth/login', async (req, res) => {
>>>>>>> 0e16b962893276762de0255d7d6bc1c50ef92c0b
  //FIND A USER BASED ON PROVIDED EMAIL
  Users.findOne({
    email: req.body.email,
  }).populate('participated')
    .then(user => {
      if (!user) {
        return res.status(400).send(loginError)
      }
<<<<<<< HEAD
      if (!user.validatePassword(req.body.password)) {
        return res.status(400).send(loginError)
      }


      //ALWAYS REMOVE THE PASSWORD FROM THE USER OBJECT
      delete user._doc.hash
      req.session.uid = user._id
      req.session.username = user.name
      res.send(user)
    }).catch(err => {
      res.status(400).send(loginError)
=======
      user.validatePassword(req.body.password).then(validPass => {
        if (!validPass) {
          return res.status(400).send(loginError)
        }
        //ALWAYS REMOVE THE PASSWORD FROM THE USER OBJECT
        delete user._doc.hash
        req.session.uid = user._id
        req.session.username = user.name
        res.send(user)
      }).catch(err => {
        res.status(400).send(loginError)
      }).catch(err => {
        res.status(400).send(loginError)
      })
>>>>>>> 0e16b962893276762de0255d7d6bc1c50ef92c0b
    })
})

//REMOVE THE ACTIVE SESSION FROM THE DATABASE
router.delete('/auth/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.send(err)
    }
    return res.send({
      message: 'Logout Successful'
    })
  })
})


//Validates req.session.uid
router.get('/auth/authenticate', (req, res) => {
  Users.findById(req.session.uid)
    .then(user => {
      if (!user) {
        return res.status(401).send({
          error: 'Please login to continue'
        })
      }
      delete user._doc.hash
      res.send(user)
    }).catch(err => {
      res.status(500).send(err)
    })
})


module.exports = {
  router,
  session
}

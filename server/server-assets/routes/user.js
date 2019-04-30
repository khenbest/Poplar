let router = require('express').Router()
let Posts = require('../models/post')
let Users = require('../models/user')


router.put('/follow/:id', (req, res, next) => {
  Users.findByIdAndUpdate(req.session.uid, { $addToSet: { following: req.params.id } }, { new: true }, (err, user) => {
    if (err) {
      return res.status(400).send("Failed to update user")
    }
    Users.findByIdAndUpdate(req.params.id, { $addToSet: { followedBy: req.session.uid } }, { new: true }, (err, follower) => {
      if (err) return res.status(400).send("Failed to update follower")
      res.send({ user, follower })
    })
  })
})

router.put('/unfollow/:id', (req, res, next) => {
  Users.findByIdAndUpdate(req.session.uid, { $pullAll: { following: [req.params.id] } }, { new: true }, (err, user) => {
    if (err) {
      return res.status(400).send("Failed to update user")
    }
    Users.findByIdAndUpdate(req.params.id, { $pullAll: { followedBy: [req.session.uid] } }, { new: true }, (err, follower) => {
      if (err) return res.status(400).send("Failed to update follower")
      res.send({ user, follower })
    })
  })
})

router.get('/all', (req, res, next) => {
  Users.find()
    .then(users => {
      res.send(users)
    })
    .catch(err => {
      res.status(400).send(err)
    })
})



module.exports = router
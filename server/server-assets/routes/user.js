let router = require('express').Router()
let Posts = require('../models/post')
let Users = require('../models/user')


router.put('/:id/follow', (req, res, next) => {
  Users.findById(req.body.user)
    .then(user => {
      return user.update({ $addToSet: { following: req.body.id } })
    })
    .catch(err => {
      res.status(400).send(err)
    })
    .then(user => {
      Users.findById(req.body.id)
        .then(user => {
          res.send(user)
        })
    })
})

router.put('/:id/follower', (req, res, next) => {
  Users.findById(req.params.id)
    .then(user => {
      return user.update({ $addToSet: { followedBy: req.body.user } })
    })
    .catch(err => {
      res.status(400).send(err)
    })
    .then(user => {
      Users.findById(req.body.user)
        .then(user => {
          res.send(user)
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

// router.get('/auth/authenticate', (req, res) => {
//   Users.findById(req.session.uid).populate('participated')
//     .then(user => {
//       if (!user) {
//         return res.status(401).send({
//           error: 'Please login to continue'
//         })
//       }
//       delete user._doc.hash
//       res.send(user)
//     }).catch(err => {
//       res.status(500).send(err)
//     })
// })

router.put('/user/:id/delete/:toDelete', (req, res, next) => {
  Users.findById(req.body.id)
    .then(user => {
      return user.update({ $pullAll: { following: [req.body.name] } })
    })
    .then(user => {
      res.send(user.following)
    })
    .catch(err => res.status(400).send(err))
})

// users.forEach((user, index) => {
//   if (user == data.name) {
//     connectedUsers[data.postId].splice(index, 1)
//   }

module.exports = router
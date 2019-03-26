let router = require('express').Router()
let Posts = require('../models/post')
let User = require('../models/user')


router.put('/:id/follow', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      user.update(user.following.push(req.body.following))
      return res.send(user)
    }).catch(err => {
      res.status(400).send(err)
    })
})

module.exports = router
let router = require('express').Router()
let Posts = require('../models/post')
let User = require('../models/user')

//GET

router.get('/:myPosts?', (req, res, next) => {
  let params = {}
  if (req.params.myPosts) {
    params['authorId'] = req.session.uid
  }
  Posts.find(params)
    .then(posts => {
      res.send(posts)
    })
    .catch(err => {
      console.log(err)
    })
})
//get posts that you participated in is handled in your user routes

//GET friends posts
// router.get('/', (req, res, next) => {
//   Posts.find({ authorId: req.session.uid })
//     .then(data => {
//       res.send(data)
//     })
//     .catch(err => {
//       console.log(err)
//       next()
//     })
// })


//POST
router.post('/', (req, res, next) => {
  req.body.authorId = req.session.uid
  req.body.user = req.session.username
  Posts.create(req.body)
    .then(newPost => {
      res.send(newPost)
    })
    .catch(err => {
      console.log(err)
      next()
    })
})

//PUT

//logic inside of your vote route will need to update the user document as well as including the post id in the user's participated array
router.put('/:id/vote', (req, res, next) => {
  Posts.findById(req.params.id)
    .then(post => {
      //updated the post's votes
      //save the updated post
      if (!post.votes) post.votes = {} //this logic is for if not a single vote yet
      post.votes[req.session.uid] = req.body.vote
      post.markModified('votes')
      return post.save()
    })
    .then(() => {
      //this logic runs after the post has been updated
      //add the post._id to the user's participated array
      User.findById(req.session.uid)
        .then(user => {
          return user.update({ $addToSet: { participated: req.params.id } })
        })
        .then(() => {
          return res.send({ message: "post and user updated" })
        })
    })
    .catch(err => {
      res.status(500).send(err)
    })
})

// router.put('/:id', (req, res, next) => {
//   Posts.findById(req.params.id)
//     .then(post => {
//       if (!post.authorId.equals(req.session.uid)) {
//         return res.status(401).send("ACCESS DENIED!")
//       }
//       post.update(req.body, (err) => { 
//         if (err) {
//           console.log(err)
//           next()
//           return
//         }
//         res.send("Successfully Updated")
//       });
//     })
//     .catch(err => {
//       console.log(err)
//       next()
//     })
// })
//DELETE
router.delete('/:id', (req, res, next) => {
  Posts.findById(req.params.id)
    .then(post => post.remove())
    .then(() => res.send('THIS POST WAS BOTTOM TO TOP'))
    .catch(err => res.status(400).send(err))
})

// router.delete('/:id', (req, res, next) => {
//   Posts.findOne({ _id: req.params.id, authorId: req.session.uid })
//     .then(post => {
//       post.remove(err => {
//         if (err) {
//           console.log(err)
//           next()
//           return
//         }
//       })
//       res.send("Successfully Deleted")
//     })
//     .catch(err => {
//       res.status(400).send('ACCESS DENIED; Invalid Request')
//     })
// })


module.exports = router
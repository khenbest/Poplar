let router = require('express').Router()
let Posts = require('../models/post')
let User = require('../models/user')

//GET

router.get('/:myProfile?', (req, res, next) => {
  var pageNo = parseInt(req.query.pageNo)
  var size = 9
  var query = {}
  if (req.query.myProfile) {
    Posts.find({ authorId: req.session.uid }).then(posts => {
      res.send(posts)
    })
  }
  if (pageNo < 0 || pageNo === 0) {
    response = { "error": true, "message": "invalid page number, should start with 1" };
    return res.send(response)
  }
  query.skip = size * (pageNo - 1)
  query.limit = size
  Posts.count({}, function (err, totalCount) {
    if (err) {
      response = { "error": true, "message": "Error fetching data" }
    }
    Posts.find({}, {}, query, function (err, data) {
      // Mongo command to fetch all data from collection.
      if (err) {
        response = { "error": true, "message": "Error fetching data" }
      } else {
        var totalPages = Math.ceil(totalCount / size)
        response = { data, totalPages };
      }
      res.send(response)
    })
  })

})

// if you ever use this then add an additional path
router.get('/get/:activePostId', (req, res, next) => {
  Posts.findById(req.params.activePostId)
    .then(post => {
      if (!post) {
        return res.status(400).send('Bad Post Id')
      }
      res.send(post)
    }).catch(err => {
      res.status(400).send(err)
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
//for development
router.put('/:id', async (req, res, next) => {
  try {
    let post = await Posts.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.send(post)
  } catch (err) {
    res.status(400).send(err)
  }
})

//logic inside of your vote route will need to update the user document as well as including the post id in the user's participated array
router.put('/:id/vote', (req, res, next) => {
  let post;
  Posts.findById(req.params.id)
    .then(p => {
      if (!p) {
        return Promise.reject("No Post Found")
      }
      post = p;
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
      User.findByIdAndUpdate(req.session.uid, { $addToSet: { participated: req.params.id } }, { new: true })
        .then((user) => {
          return res.send({ user, post })
        })
    })
    .catch(err => {
      res.status(500).send(err)
    })
})

//DELETE
router.delete('/:id', (req, res, next) => {
  Posts.findById(req.params.id)
    .then(post => post.remove())
    .then(() => res.send('THIS POST WAS BOTTOM TO TOP'))
    .catch(err => res.status(400).send(err))
})



module.exports = router
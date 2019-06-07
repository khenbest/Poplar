let router = require('express').Router()
let Posts = require('../models/post')
let User = require('../models/user')

//GET

router.get('/:myProfile?', (req, res, next) => {
  var pageNum = parseInt(req.query.pageNum)
  var pageSize = 12;
  var skips = pageSize * (pageNum - 1)
  if (pageNum < 0 || pageNum === 0) {
    res.status(404).send("Invalid Page Number");
  } else if
    (req.params.myProfile) {
    Posts.find({ authorId: req.session.uid }).skip(skips).limit(pageSize).then(posts => {
      res.send(posts)
    })
  }
  else {
    Posts.find().skip(skips).limit(pageSize).then(posts => {
      res.send(posts)
    }).catch(err => {
      res.status(400).send(err)
    })
  }
})


//GET for chatrooms
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


// GET friends posts
// router.get('/yo/friendPosts', (req, res, next) => {
//   let posts = []
//   let user = User.findById(req.session.uid).then(
//     Posts.find(post => {
//       if (user.following.contains(post.authorId)
//       ) {
//         posts.push(post)
//       }

//     })).then(
//       res.send(posts)
//     )
//     .catch(err => {
//       console.log(err)
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
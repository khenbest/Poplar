let router = require('express').Router()
let Posts = require('../models/post')
// let User = require('../models/user')

//GET
router.get('/', (req, res, next) => {
    Posts.find({ authorId: req.session.uid })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            console.log(err)
            next()
        })
})

//PUT
// router.put('/:id', (req, res, next) => {
//     Posts.findById(req.params.id)
//         .then(post => {
//             if (!post.authorId.equals(req.session.uid)) {
//                 return res.status(401).send("ACCESS DENIED!")
//             }
//             post.update(req.body, (err) => {
//                 if (err) {
//                     console.log(err)
//                     next()
//                     return
//                 }
//                 res.send("Successfully Updated")
//             });
//         })
//         .catch(err => {
//             console.log(err)
//             next()
//         })
// })

//logic inside of your vote route will need to update the user document as well by including the post id in the user's participated array

//DELETE
router.delete('/:id', (req, res, next) => {
    Posts.findOneAndRemove({ _id: req.params.id, authorId: req.session.uid })
        .then(post => {
            res.send("Successfully Deleted")
        })
        .catch(err => {
            res.status(400).send('ACCESS DENIED; Invalid Request')
        })
})


module.exports = router
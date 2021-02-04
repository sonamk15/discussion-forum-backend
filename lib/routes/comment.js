const express = require('express')
const router = express.Router();
const CommentService = require('../services/comments')
const commentService = new CommentService();

router.post('/',  async (req, res) => {
    return await commentService.commentOnQuery(req, res)
})

router.get('/getAllComment',  (req, res, next) => {
    return commentService.getAllComment(req, res)
})

module.exports = router;
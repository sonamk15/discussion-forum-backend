const Queries = require('../models/queries');
// const Users = require('../models/users');
const Comments = require('../models/comments');
const { user } = require('../validator');

// var jwt = require('jsonwebtoken');
// // const { secret } = require('./config');
// const { query } = require('../models/queries');

class CommentService {
  constructor() {
  }

  // add new query
  async commentOnQuery(req, res) {
    const {userId, queryId, comment } = req.body;
    if (userId && queryId && comment ) {
      const commentAdded = await Comments.query().insert(req.body)
      return res.status(201).send(commentAdded);
    } else {
      res.status(400).send({
        data: "All fields are required!"
      })
    }
  }

  async getAllComment(req, res) {
    try {
      const commentList = await Comments.query();
      return res.status(200).send(commentList);
    }
    catch (err) {
      res.send({
        sucess: 0,
        message: err
      });
    }
  }

}

module.exports = CommentService

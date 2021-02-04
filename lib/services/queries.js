const Queries = require('../models/queries');
const Users = require('../models/users');

class QueryService {
  constructor() {
  }

  async getAllPost(req, res) {
    try {
      const posts = await Queries.query();
      return res.status(200).send(posts);
    }
    catch (err) {
      res.send({
        sucess: 0,
        message: err
      });
    }
  }
  
  async getAllPostById(req, res) {
    try {
      const id = req.params.id
      const getAllQueries = await Users.query().where('id', id)
        .withGraphFetched({
          queries: {
            comments: {
              user: true
            }
          }
      });
      
      if (getAllQueries.length) {
        return res.status(200).send(getAllQueries[0].queries);
      } else {
        return res.send("user not exist")
      }
    } catch (err) {
      res.send({
        sucess: 0,
        message: err
      });
    }
  }
  
  // add new query
  async addNewQuery(req, res) {
    const newQuery = req.body;
    const userId = newQuery.userId
    const userData = await Users.query().where('id', userId);
    if (userData[0]) {
      const queryAdded = await Queries.query().insert(newQuery)
      console.log(queryAdded)
      return res.status(201).send(queryAdded);
    }
    else {
      res.send("user not exist")
    }
  }

  async updateQuery(req, res) {
    console.log(req.body)
    try {
      const userId = req.params.userId
      const matchedUser = await Users.query().where('id', userId);
      if (matchedUser[0]) {
        const updated_data = req.body;
        const update = await Queries.query().findById(req.params.id).patch(updated_data);
        res.status(200).send({ sucess: 1, message: "updated successfully" });
      }
      else {
        return res.status(404).send('User not Found')
      }
    }
    catch (err) {
      return res.status(404).send(err);
    }

  }
  async deleteQuery(req, res) {
    console.log(req.body)
    try {
      const userId = req.params.userId
      const matchedUser = await Users.query().where('id', userId);
      if (matchedUser[0]) {
        const updated_data = req.body;
        const update = await Queries.query().findById(req.params.id).delete();
        res.status(200).send({ sucess: 1, message: "delete successfully" });
      }
      else {
        return res.status(404).send('User not Found')
      }
    }
    catch (err) {
      return res.status(404).send(err);
    }
  }

}

module.exports = QueryService

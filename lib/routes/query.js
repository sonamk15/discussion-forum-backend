const express = require('express')
const router = express.Router();
const { query } = require('../validator')
const QueryService = require('../services/queries')
const queryService = new QueryService();
// const {checkToken} = require('../auth/auth');

router.post('/', query.create.body, async (req, res) => {
    return await queryService.addNewQuery(req, res)
})

router.get('/getAllQueries',  (req, res, next) => {
    return queryService.getAllPost(req, res)
})

router.get('/getAllQueriesByUserId/:id',  (req, res, next) => {
    return queryService.getAllPostById(req, res)
})

router.post('/updateById/:id',  (req, res, next) => {
    return queryService.updateQuery(req, res)
})

router.delete('/deleteById/:id',  (req, res, next) => {
    return queryService.deleteQuery(req, res)
})

module.exports = router;
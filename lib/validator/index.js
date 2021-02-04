const Joi = require('joi')
const validator = require('express-joi-validation').createValidator({})

module.exports = {
  user: {
    create: {
      query: validator.query(Joi.object({
        name: Joi.string().required()
      })),
      body: validator.body(Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
        profile: Joi.string()
      })),
      params: validator.params(Joi.object({
        id: Joi.number().integer().required()
      }))
    },

    login: {
      query: validator.query(Joi.object({
        name: Joi.string().required()
      })),
      body: validator.body(Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
      }))
    },

    update: {
      query: validator.query(Joi.object({
        name: Joi.string().required()
      })),
      body: validator.body(Joi.object({
        name: Joi.string(),
        profile: Joi.string(),
        email: Joi.string(),
        password: Joi.string(),
      })),
      params: validator.params(Joi.object({
        id: Joi.number().integer().required()
      }))
    },
    get: {
      query: validator.query(Joi.object({
        id: Joi.number().integer().required()
      })),
      params: validator.params(Joi.object({
        id: Joi.number().integer().required()
      }))
    },
    delete: {
      query: validator.query(Joi.object({
        name: Joi.string().required()
      })),
      body: validator.body(Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        passwrod: Joi.string().required()
      })),
      params: validator.params(Joi.object({
        id: Joi.number().integer().required()
      }))
    }
  },
  query: {
    create: {
      query: validator.query(Joi.object({
        name: Joi.string().required()
      })),
      body: validator.body(Joi.object({
        issue: Joi.string().required(),
        topic: Joi.string().required(),
        userId: Joi.number().required(),
        like: Joi.number()
       
      })),
      params: validator.params(Joi.object({
        id: Joi.number().integer().required()
      }))
    },

    update: {
      query: validator.query(Joi.object({
        name: Joi.string().required()
      })),
      body: validator.body(Joi.object({
        issue: Joi.string(),
        topic: Joi.string(),
      
      })),
      params: validator.params(Joi.object({
        id: Joi.number().integer().required()
      }))
    }

  }
}
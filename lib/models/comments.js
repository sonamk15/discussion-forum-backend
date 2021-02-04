const Model = require('./index');
const Joi = require('joi');
const { number } = require('joi');

class Comments extends Model {

  static get tableName() {
    return 'comments';
  }


  static get joiSchema() {
    return Joi.object({
      id: Joi.number().integer(),
      comment: Joi.string().required(),
      like: Joi.number().integer(),
      dislike: Joi.number().integer(),
      queryId: Joi.number().integer(),
      userId: Joi.number().integer(),
      createdAt: Joi.date().required(),
    });
  }

  static get relationMappings() {
    const Users = require('./users');
    
    return {
      user: {
        relation: Model.HasOneRelation,
        modelClass: Users,
        join: {
          from: 'comments.userId',
          to: 'users.id',
        },
      },
    }
  }

  async $beforeInsert() {
    const now = new Date();
    this.createdAt = now;
  }
}

module.exports = Comments;
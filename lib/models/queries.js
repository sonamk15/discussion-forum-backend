const Model = require('./index');
const Joi = require('joi')

class Queries extends Model {

  static get tableName() {
    return 'queries';
  }

  static get joiSchema() {
    return Joi.object({
      id: Joi.number().integer(),
      issue: Joi.string().required(),
      topic: Joi.string(),
      like: Joi.number().integer(),
      userId: Joi.number().integer(),
      createdAt: Joi.date().required(),
    });
  }

  static get relationMappings() {
    const Comments = require('./comments');
    
    return {
      comments: {
        relation: Model.HasManyRelation,
        modelClass: Comments,
        join: {
          from: 'queries.id',
          to: 'comments.queryId',
        },
      },
    }
  }

  async $beforeInsert() {
    const now = new Date();
    this.createdAt = now;
  }
}

module.exports = Queries;
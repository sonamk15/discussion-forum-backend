const Model = require('./index');
const Joi = require('joi')

class Users extends Model {

  static get tableName() {
    return 'users';
  }
  
  static get joiSchema() {
    return Joi.object({
      id: Joi.number().integer(),
      name: Joi.string().required(),
      profile: Joi.string(),
      email: Joi.string().required(),
      password: Joi.string(),
      createdAt: Joi.date().required(),
    });
  }
  
  static get relationMappings() {
    const Queries = require('./queries');
    return {
      queries: {
        relation: Model.HasManyRelation,
        modelClass: Queries,
        join: {
          from: 'users.id',
          to: 'queries.userId',
        },
      }
    }
  }
  
  async $beforeInsert() {
    const now = new Date();
    this.createdAt = now;
  }
}

module.exports = Users;
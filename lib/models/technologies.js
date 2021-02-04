const Model = require('./index');
const Joi = require('joi')

class Technologies extends Model {
  static get tableName() {
    return 'technologies';
  }
  static get joiSchema() {
    return Joi.object({
      id: Joi.number().integer(),
      topic: Joi.string().required(),
    });
  }
}

module.exports = Technologies;
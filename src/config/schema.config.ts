import * as Joi from 'joi';

export const schemaConfig = Joi.object({
  RMQ_HOST: Joi.string().required(),
  RMQ_PORT: Joi.number().default(5672),
  RMQ_USER: Joi.string().required(),
  RMQ_PASS: Joi.string().required(),
  ALCHEMY_API_KEY: Joi.string().required(),
  INFURA_API_KEY: Joi.string().required(),
});

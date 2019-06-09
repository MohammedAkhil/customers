'use strict';

const joi = require('joi');

/**
 * Generate a validation schema using joi to check the type of your environment variables
 */
const envSchema = joi
  .object({
    DB_USER: joi.string(),
    DB_HOST: joi.string(),
    DB_PASSWORD: joi
      .string()
      .optional()
      .empty(''),
    DB_DATABASE: joi.string(),
    DB_PORT: joi.number(),
  })
  .unknown()
  .required();

/**
 * Validate the env variables using joi.validate()
 */
const { error, value: envVars } = joi.validate(process.env, envSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  databaseConfig: {
    user: envVars.DB_USER || 'b1c4c884cd2471',
    host: envVars.DB_HOST || 'us-cdbr-iron-east-02.cleardb.net',
    password: envVars.DB_PASSWORD || 'c110b654',
    database: envVars.DB_DATABASE || 'heroku_c3a71333c176906',
    port: envVars.DB_PORT || 3306,
  },
};

module.exports = config;

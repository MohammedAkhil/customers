/* eslint-disable camelcase */
'use strict';
import database from '../../database';
import ApiError from '../../utils/api.error';
const { jwtSign } = require('../../utils/jwt.util');

exports.getOne = async ctx => {
  try {
    const query = `SELECT * FROM ${
      database.dbConfig.database
    }.users where id = ?`;
    const { userId } = ctx.params;
    const users = await database.query(query, userId);
    ctx.status = 200;
    ctx.body = users[0];
  } catch (err) {
    throw new ApiError({ message: err.sqlMessage, status: 409 });
  }
};

exports.getAll = async ctx => {
  try {
    const query = `SELECT * FROM ${database.dbConfig.database}.users`;
    const users = await database.query(query);
    ctx.status = 200;
    ctx.body = users;
  } catch (err) {
    throw new ApiError({ message: err.sqlMessage, status: 409 });
  }
};

exports.createOne = async (ctx, next) => {
  try {
    const insertQuery = `INSERT INTO ${database.dbConfig.database}.users SET ?`;
    await database.query(insertQuery, ctx.request.body);
    const user = await getUserByEmail(ctx.request.body.email);
    const { created_ts, ...payload } = user[0];
    ctx.body = {
      success: true,
      user: user[0],
      token: jwtSign(payload),
    };
  } catch (err) {
    console.log(err);
    throw new ApiError({ message: err.sqlMessage, status: 409 });
  }
};

const getUserByEmail = async email => {
  const query = `SELECT * FROM ${
    database.dbConfig.database
  }.users WHERE email = ?`;
  const data = await database.query(query, email);
  return data;
};

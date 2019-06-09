const mysql = require('mysql');
const dbConfig = require('./config').databaseConfig;
const userSchema = require('./schema/user.schema').userTableQuery;

class Database {
  constructor(dbConfig) {
    this.dbConfig = dbConfig;
    this.init();
  }

  async init() {
    this.pool = this.createPool();
    await this.createDatabase();
    await this.useDatabase();
    await this.createUserTable();
  }

  createPool() {
    return mysql.createPool({
      host: this.dbConfig.host,
      user: this.dbConfig.user,
      password: this.dbConfig.password,
      connectionLimit: this.dbConfig.connectionLimit || 10,
      debug: false,
    });
  }

  async createDatabase() {
    try {
      await this.query(
        'create database if not exists ' + this.dbConfig.database,
      );
      console.log('create ' + this.dbConfig.database);
    } catch (err) {
      console.log('database could not be created');
      console.log(err);
    }
  }

  async useDatabase() {
    try {
      const data = await this.query(`use ${this.dbConfig.database}`);
      console.log(data);
      console.log('use ' + this.dbConfig.database);
    } catch (err) {
      console.log('database could not be used');
      console.log(err);
    }
  }

  async createUserTable() {
    try {
      await this.query(userSchema);
      console.log('user table created');
    } catch (err) {
      console.log('user table could not be created');
      console.log(err);
    }
  }

  query(sql, args) {
    return new Promise((resolve, reject) => {
      this.pool.query(sql, args, (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  }
}

export default new Database(dbConfig);

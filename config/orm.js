const connection = require("./connection.js");

const orm = {
  selectAll(table, cb) {
    const queryString = `SELECT * FROM ${table};`;
    connection.query(queryString, (err, result) => {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  insertOne(table, cols, vals, cb) {
    let queryString = `INSERT INTO ${table} (${cols}) VALUES ('${vals}');`;
    console.log(queryString);
    connection.query(queryString, (err, result) => {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  updateOne(table, cols, vals, id, cb) {
    let queryString = `UPDATE ${table} SET ${cols} = ${vals} WHERE id = ${id}`;
    connection.query(queryString, (err, result) => {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
};

module.exports = orm;

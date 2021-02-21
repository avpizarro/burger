// Import the ORM to insertOne functions that will interact with the database.
const orm = require('../config/orm.js');

const burger = {
  selectAll(cb) {
    orm.selectAll('burgers', (res) => cb(res));
  },
  // The variables cols and vals are arrays.
  insertOne( cols, vals, cb) {
    orm.insertOne('burgers', cols, vals, (res) => cb(res));
  },
  updateOne(vals, id, cb) {
    orm.updateOne('burgers', 'devoured', vals, id, (res) => cb(res));
  },
};

// Export the database functions for the controller (catsController.js).
module.exports = burger;
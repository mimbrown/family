const { types } = require('pg');
var array = require('postgres-array');

function parseBigInteger (value) {
  if (value === null) return null;
  return parseInt(value);
}

function parseBigIntegerArray (value) {
  if (!value) return null;
  return array.parse(value, function (entry) {
    return parseBigInteger(entry);
  });
}

function parseDate (value) {
  return value;
}

var parseDateArray = function(value) {
  if (!value) return null;
  return array.parse(value, function (entry) {
    return parseDate(entry);
  });
};

types.setTypeParser(20, parseBigInteger);
types.setTypeParser(1016, parseBigIntegerArray);
types.setTypeParser(1082, parseDate);
types.setTypeParser(1182, parseDateArray);

module.exports = require('knex')({
  client: 'pg',
  connection: {
    database: 'family_site',
    host: 'localhost',
    user: 'postgres'
  }
});

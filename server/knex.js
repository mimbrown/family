module.exports = require('knex')({
  client: 'pg',
  connection: {
    database: 'family_site',
    host: 'localhost',
    user: 'postgres'
  }
});

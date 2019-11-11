const auth = require('../modules/auth');
const api = require('express').Router();
const knex = require('../knex');
const path = require('path');
const fs = require('fs');
const util = require('./util');
const errors = require('./errors');

function respond (rows) {
  return this.json(rows);
}

function succeed () {
  return this.json({ success: true });
}

api.use((req, res, next) => {
  res.respond = respond;
  res.succeed = succeed;
  next();
});

api.route('/token')
  .post(util.async(async (req, res) => {
    const { password, username } = req.body;
    const [user] = await knex('view_login')
      .where('username', username);
    if (user) {
      const { hash } = auth.createHash(password, user.salt);
      if (hash === user.hash) {
        return res.json({
          token: auth.getToken(user)
        });
      }
    }
    res.status(401).json({
      code: 'InvalidLogin'
    });
  }));

api.route('/pictures')
  .get((req, res) => {
    res.respond(fs.readdirSync(path.join(__dirname, '../../client/assets/')).map(file => ({ src: `/assets/${file}`})));
  });

api.route('/chapters')
  .get(util.async(async (req, res) => {
    const rows = await knex('chapter').orderBy('chapter_date');
    res.respond(rows);
  }))
  .post(util.async(async (req, res) => {
    const [chapter] = await knex('chapter')
      .insert(req.body)
      .returning('*');
    res.respond(chapter);
  }));

api.route('/chapters/:id')
  .put(util.async(async (req, res) => {
    await knex('chapter')
      .update(req.body)
      .where('id', req.params.id);
    res.succeed();
  }));

api.route('/writings')
  .get(util.async(async (req, res) => {
    const rows = await knex('resource as r')
      .select('r.id', 'r.title', 'r.type', 'r.date', 'm.first_name', 'm.profile_image')
      .join('member as m', 'r.member_id', 'm.id')
      .orderBy('r.date', 'desc');
    res.respond(rows);
  }));

api.route('/writings/:id')
  .get(util.async(async (req, res) => {
    const [writing] = await knex('resource')
      .where('id', req.params.id);
    res.respond(writing);
  }));

api.route('/members')
  .get(util.async(async (req, res) => {
    const rows = await knex('view_latest_member');
    res.respond(rows);
  }));

api.route('/members/:id')
  .get(util.async(async (req, res) => {
    const rows = await knex('view_member_snapshot')
      .where('member_id', req.params.id);
    res.respond(rows);
  }));

api.route('/snapshots/:id')
  .put(util.async(async (req, res) => {
    await knex('member_snapshot')
      .update(req.body)
      .where('id', req.params.id);
    res.succeed();
  }));

api.route('/familytree/:id')
  .get(util.async(async (req, res) => {
    const { rows: [{ relationships }] } = await knex.raw(
      'select family_relationships(?) as relationships',
      Number.parseInt(req.params.id)
    );
    res.respond(relationships);
  }));

api.use((err, req, res, next) => {
  err = errors.resolveError(err);
  console.error(err);
  res.status(err.status).json({ message: err.message, success: false });
});

module.exports = api;

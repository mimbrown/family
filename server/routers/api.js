const auth = require('../modules/auth');
const api = require('express').Router();
const knex = require('../knex');

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
  .post(async (req, res) => {
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
  });

api.route('/chapters')
  .get(async (req, res) => {
    try {
      const rows = await knex('chapter').orderBy('chapter_num');
      res.respond(rows);
    } catch (err) {
      res.status(500).json({
        code: 'ServerError'
      });
    }
  });

api.route('/chapters/:chapter')
  .put(async (req, res) => {
    await knex('chapter')
      .update(req.body)
      .where('chapter_num', req.params.chapter);
    res.succeed();
  });

api.route('/writings')
  .get(async (req, res) => {
    try {
      const rows = await knex('resource as r')
        .select('r.id', 'r.title', 'r.type', 'r.date', 'm.first_name', 'm.profile_image')
        .join('member as m', 'r.member_id', 'm.id')
        .orderBy('r.date', 'desc');
      res.respond(rows);
    } catch (err) {
      res.status(500).json({
        code: 'ServerError'
      });
    }
  });

api.route('/writings/:id')
  .get(async (req, res) => {
    try {
      const [writing] = await knex('resource')
        .where('id', req.params.id);
      res.respond(writing);
    } catch (err) {
      res.status(500).json({
        code: 'ServerError'
      });
    }
  });

api.route('/members')
  .get(async (req, res) => {
    const rows = await knex('view_latest_member');
    res.respond(rows);
  });

api.route('/members/:id')
  .get(async (req, res) => {
    const rows = await knex('view_member_snapshot')
      .where('member_id', req.params.id);
    res.respond(rows);
  });

api.route('/familytree/:id')
  .get(async (req, res) => {
    const { rows: [{ relationships }] } = await knex.raw(
      'select family_relationships(?) as relationships',
      Number.parseInt(req.params.id)
    );
    res.respond(relationships);
  });

module.exports = api;

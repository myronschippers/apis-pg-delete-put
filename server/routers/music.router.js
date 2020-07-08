const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
  const queryText = `SELECT * FROM "songs" ORDER BY "artist" ASC;`;

  pool.query(queryText)
    .then((dbResponse) => {
      res.send(dbResponse.rows);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

router.post('/', (req, res) => {
  // music.push(req.body)
  const musicData = req.body;
  const queryText = `INSERT INTO "songs" ("artist", "track", "rank", "published")
    VALUES ($1, $2, $3, $4);`;

  pool.query(queryText, [
    musicData.artist,
    musicData.track,
    musicData.rank,
    musicData.published,
  ])
    .then((dbResponse) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

module.exports = router;
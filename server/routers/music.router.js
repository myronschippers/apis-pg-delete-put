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

// delete a song from my DB
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  const queryText = `DELETE FROM "songs" WHERE "id" = $1;`

  pool.query(queryText, [id])
    .then((dbResponse) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log('error', err);
      res.sendStatus(500);
    });
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const songData = req.body;

  const queryText = `UPDATE "songs" SET "rank" = $1 WHERE "id" = $2;`;

  pool.query(queryText, [
    songData.rank,
    id
  ])
  .then((dbResponse) => {
    res.sendStatus(200);
  })
  .catch((err) => {
    console.log('error', err);
    res.sendStatus(500);
  });
});

module.exports = router;
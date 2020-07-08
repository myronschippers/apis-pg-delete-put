# Introduction to PG and PostgreSQL using Node

[PG](https://www.npmjs.com/package/pg) is a node module that allows us to communicate with our PostgreSQL database.

PG lives between the server and database:

```
,________,         .------,            .------,                  .------.
|________|       ,'_____,'|    req > ,'_____,'|                 (        )
|        |       |      | |          | ____ | |       PG        |~------~|
|        |       |      | | - AJAX - | ____ | |    <------->    |~------~|
|        |       |      | ;          | ____ | ;                 |~------~|
|________|       |______|'   < res   |______|'                  `.______.'
 HTML/CSS          jQuery          Node / Express               PostgreSQL
```


## Installation

Music Library Project!
---
To spin up this project:

```
npm install
```
```
npm start
```


## Accessing our database from Node with PG

From our code's point of view, we need a way to talk to our new database server and tables. We need to connect to our database server before issuing queries. We will be using an npm package called `pg`.

Add it to our application dependencies: `npm install pg`

```js
const pg = require('pg');

// Setup PG to connect to the database
const Pool = pg.Pool;
const pool = new Pool({
    database: 'apis_sql_intro', // the name of database, This can change!
    host: 'localhost', // where is your database?
    port: 5432, // the port for your database, 5432 is default for postgres
    max: 10, // how many connections (queries) at one time
    idleTimeoutMillis: 30000 // 30 second to try to connect, otherwise cancel query
});
```

## GET ROUTE

Let's setup a GET route to send back all of the songs in our database.

```JavaScript
router.get('/', (req, res) => {
    let queryText = 'SELECT * FROM songs;';
    pool.query(queryText)
        .then((result) => {
            res.send(result.rows);
        })
        .catch((err) => {
            console.log(`Error making query ${queryText}`, err);
            res.sendStatus(500);
        });
});
```

## POST Route
Let's setup a POST route to add a new song to the database.

We could do something like this...
```JavaScript
router.post('/', (req, res) => {
    const newSong = req.body;
    const queryText = `INSERT INTO songs (artist, track, published) 
        VALUES (${newSong.artist}, ${newSong.track}, ${newSong.published});`;
    pool.query(queryText)
        .then((result) => {
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log(`Error making query ${queryText}`, err);
            res.sendStatus(500);
        });
});
```

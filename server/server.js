const express = require('express');
const bodyParser = require('body-parser');
const musicRouter = require('./routers/music.router');

const app = express();
const PORT = 5000;


//
// APP CONFIGURATION
// --------------------

// Setup body parser - to translating request body into JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Define the location for static assets to be served from
app.use(express.static('server/public'));

//
// ROUTES
// --------------------

app.use('/api/music', musicRouter);


//
// APP LAUNCH
// --------------------

app.listen(PORT, () => {
  console.log('up and running on port', PORT);
});

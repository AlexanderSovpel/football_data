var express = require('express');
var cors = require('cors');
var axios = require('axios');

var app = express();

app.use(cors());

app.get('*', function (req, res, next) {
  console.log('handling ', req.url);
  axios.get(`http://api.football-data.org/v4${req.url}`, {
    headers: {
      'X-Auth-Token': 'e87fc6cb24504657941f9cbf5387da1a',
    },
  })
  .then(response => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader("Content-Type", "application/json");
    res.json(response.data);
  })
  .catch(error => {
    res
      .status(error.response.data.errorCode)
      .send(error.response.data);
  });
});

app.listen(8080, function () {
  console.log('CORS-enabled web server listening on port 8080');
});

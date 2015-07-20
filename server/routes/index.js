var express = require('express');
var router = express.Router();
var pg = require('pg');
var path = require('path');

var connection_string = 'postgres://jellyvish:WhaleHunter22@postsql-game-oregon.ctwjtsopybio.us-west-2.rds.amazonaws.com:5432/game_data';

router.get('/api/v1/getuser', function(req, res) {

    var results = [];

    // Get a Postgres client from the connection pool
    pg.connect(connection_string, function(err, client, done) {

        // SQL Query > Select Data
      if(Math.random() < .5) {
        var query = client.query("SELECT * FROM profiles WHERE decision = 'false' ORDER BY RANDOM() LIMIT 1")
      }
      else {
        var query = client.query("SELECT * FROM profiles WHERE decision = 'false' ORDER BY RANDOM() LIMIT 1")
      }
      // Stream results back one row at a time
      query.on('row', function(row) {
          results.push(row);
      });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            client.end();
            return res.json(results);
        });

        // Handle Errors
        if(err) {
          console.log(err);
        }

    });

});

//handles a guess
router.get('/api/v1/guess', function(req, res) {

    return_message = "";
    if (req.body.text === "true true" || req.body.text === "false false") {
        return_message = '{ "result": "wrong", "text": "Sorry, you didn\'t guess correctly :("'
    }
    else {
      return_message = '{ "result": "right", "text": "Yay you got it right!"'
    }

    return res.json(return_message);

});

module.exports = router;

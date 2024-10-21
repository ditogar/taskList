const express = require('express');
const router = express.Router();
const db = require('../db.js');

/* GET home page. */
router.get('/', function(req, res) {
  const query = 'SELECT * FROM Tasks';
  db.all(query, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.render('index', {
        title: 'Tasklist',
        notes: rows
      });
    }
  });
});

module.exports = router;
